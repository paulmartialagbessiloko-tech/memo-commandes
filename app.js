"use strict";

/* ---------- Données ---------- */
const CLE = "memo-commandes.v1";
const CLE_THEME = "memo-commandes.theme";

let entrees = charger();
let filtreCategorie = "Toutes";
let enEdition = null; // id de l'entrée modifiée, ou null pour un ajout

function charger() {
  try { return JSON.parse(localStorage.getItem(CLE)) || []; }
  catch { return []; }
}

// Fiches supprimées volontairement pendant cette session (pour ne pas les faire revenir à la fusion).
const supprimees = new Set();
function oublier(ids) { for (const id of ids) supprimees.add(id); }

// Copies de secours : les 8 dernières versions de la liste, gardées dans le téléphone.
const CLE_SECOURS = CLE + ".secours";
function lireSecours() {
  try { return JSON.parse(localStorage.getItem(CLE_SECOURS)) || []; } catch { return []; }
}
function copieDeSecours(liste) {
  if (!liste.length) return;
  const copies = lireSecours();
  const derniere = copies[0];
  if (derniere && JSON.stringify(derniere.entrees) === JSON.stringify(liste)) return;
  copies.unshift({ date: Date.now(), entrees: liste });
  try { localStorage.setItem(CLE_SECOURS, JSON.stringify(copies.slice(0, 8))); } catch { /* stockage plein */ }
}

// Enregistre SANS jamais écraser des fiches ajoutées ailleurs (autre onglet, application
// restée ouverte en arrière-plan) : les fiches présentes dans le stockage mais absentes
// de la mémoire sont réintégrées, sauf si elles ont été supprimées volontairement.
function sauver() {
  const stockees = charger();
  const ici = new Set(entrees.map((e) => e.id));
  const manquantes = stockees.filter((e) => !ici.has(e.id) && !supprimees.has(e.id));
  if (manquantes.length) entrees = entrees.concat(manquantes);
  // Avant toute diminution de la liste, on garde une copie de secours de l'ancienne version.
  if (entrees.length < stockees.length) copieDeSecours(stockees);
  localStorage.setItem(CLE, JSON.stringify(entrees));
  if (manquantes.length) afficher();
}

// Recharger la liste quand on revient sur l'application ou qu'un autre onglet la modifie.
function rafraichir() {
  if (document.querySelector("dialog[open]")) return; // ne pas perturber une saisie en cours
  entrees = charger();
  afficher();
}
document.addEventListener("visibilitychange", () => { if (!document.hidden) rafraichir(); });
window.addEventListener("pageshow", rafraichir);
window.addEventListener("storage", (ev) => { if (ev.key === CLE) rafraichir(); });
function nouvelId() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }

/* ---------- Raccourcis DOM ---------- */
const $ = (s) => document.querySelector(s);
const lignes = $("#lignes");
const fenetre = $("#fenetre");
const form = $("#formulaire");

/* ---------- Utilitaires ---------- */
function echapper(t) {
  return String(t ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function normaliser(t) {
  return String(t ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}
// Surligne la recherche (insensible à la casse et aux accents)
function surligner(texte, q) {
  texte = String(texte ?? "");
  if (!q) return echapper(texte);
  const n = normaliser(texte), nq = normaliser(q);
  let res = "", i = 0, pos;
  while ((pos = n.indexOf(nq, i)) !== -1) {
    res += echapper(texte.slice(i, pos)) + "<mark>" + echapper(texte.slice(pos, pos + nq.length)) + "</mark>";
    i = pos + nq.length;
  }
  return res + echapper(texte.slice(i));
}
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg; t.hidden = false;
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => (t.hidden = true), 2200);
}
const estBiblio = (e) => normaliser(e.categorie) === "bibliotheques";
// Suggestions : les bibliothèques déjà notées (catégorie « Bibliothèques » ou champ biblio) + celles du projet
function bibliotheques() {
  const projet = ["numpy", "cv2", "mediapipe", "sklearn", "keras", "tensorflow", "joblib", "pyserial", "pygame", "vosk", "piper", "ESP32Encoder"];
  const notees = entrees.flatMap((e) => [estBiblio(e) ? e.cmd : "", e.biblio || ""]).filter(Boolean);
  const vues = new Map();
  for (const b of [...notees, ...projet]) if (!vues.has(normaliser(b))) vues.set(normaliser(b), b);
  return [...vues.values()].sort((a, b) => a.localeCompare(b, "fr"));
}
// Nombre de fonctions rattachées à une bibliothèque
const nbFonctions = (nom) => entrees.filter((e) => e.biblio && normaliser(e.biblio) === normaliser(nom)).length;

function categories() {
  return [...new Set(entrees.map((e) => e.categorie || "Autre"))].sort((a, b) => a.localeCompare(b, "fr"));
}

/* ---------- Affichage ---------- */
function parCategorie(a, b) {
  return (a.categorie || "Autre").localeCompare(b.categorie || "Autre", "fr") || a.cmd.localeCompare(b.cmd, "fr");
}

// Entrées visibles avec la recherche, le filtre et le tri actuels
function listeAffichee() {
  const nq = normaliser($("#recherche").value.trim());
  const tri = $("#tri").value;
  const liste = entrees.filter((e) =>
    (filtreCategorie === "Toutes" || (e.categorie || "Autre") === filtreCategorie) &&
    (!nq || normaliser([e.cmd, e.role, e.exemple, e.categorie, e.biblio, e.notes].join(" ")).includes(nq)));
  if (tri === "alpha") liste.sort((a, b) => a.cmd.localeCompare(b.cmd, "fr"));
  else if (tri === "categorie") liste.sort(parCategorie);
  else liste.sort((a, b) => b.cree - a.cree);
  return liste;
}

function afficher() {
  const q = $("#recherche").value.trim();

  // Puces de filtre
  const cats = categories();
  if (filtreCategorie !== "Toutes" && !cats.includes(filtreCategorie)) filtreCategorie = "Toutes";
  $("#filtres").innerHTML = ["Toutes", ...cats].map((c) => {
    const nb = c === "Toutes" ? entrees.length : entrees.filter((e) => (e.categorie || "Autre") === c).length;
    return `<button class="puce ${c === filtreCategorie ? "active" : ""}" data-cat="${echapper(c)}">${echapper(c)} · ${nb}</button>`;
  }).join("");
  $("#liste-categories").innerHTML = [...new Set(["Linux", "Git", "Python", "Arduino / ESP32", "Fonctions", "Bibliothèques", ...cats])]
    .map((c) => `<option value="${echapper(c)}">`).join("");
  $("#liste-biblios").innerHTML = bibliotheques().map((b) => `<option value="${echapper(b)}">`).join("");

  const liste = listeAffichee();

  lignes.innerHTML = liste.map((e) => `
    <tr data-id="${e.id}">
      <td class="c-cmd"><code class="cmd">${surligner(e.cmd, q)}</code>${
        e.biblio ? `<button class="etiquette biblio lien" data-chercher="${echapper(e.biblio)}" title="Voir tout ${echapper(e.biblio)}">📦 ${surligner(e.biblio, q)}</button>` : ""}${
        estBiblio(e) && nbFonctions(e.cmd) ? `<button class="etiquette lien" data-chercher="${echapper(e.cmd)}" title="Voir ses fonctions">🔗 ${nbFonctions(e.cmd)} fonction(s)</button>` : ""}</td>
      <td class="c-role">${surligner(e.role, q)}${e.notes ? `<div class="notes">${surligner(e.notes, q)}</div>` : ""}</td>
      <td class="c-ex">${e.exemple ? `<code class="exemple">${surligner(e.exemple, q)}</code>` : ""}</td>
      <td class="c-cat"><span class="etiquette">${echapper(e.categorie || "Autre")}</span></td>
      <td class="c-act"><button class="copier" data-copier="${e.id}" title="Copier la commande">📋</button></td>
    </tr>`).join("");

  $("#tableau").hidden = liste.length === 0;
  $("#vide").hidden = entrees.length !== 0;
  $("#aucun-resultat").hidden = !(entrees.length && !liste.length);
  $("#compteur").textContent = entrees.length ? `${entrees.length}` : "";
}

/* ---------- Ajout / modification ---------- */
function ouvrir(id = null) {
  enEdition = id;
  form.reset();
  const e = entrees.find((x) => x.id === id);
  $("#fenetre-titre").textContent = e ? "Modifier" : "Nouvelle commande";
  $("#btn-supprimer").hidden = !e;
  if (e) for (const k of ["cmd", "role", "exemple", "categorie", "biblio", "notes"]) form.elements[k].value = e[k] || "";
  else if (filtreCategorie !== "Toutes") form.elements.categorie.value = filtreCategorie;
  fenetre.showModal();
  if (!e) form.elements.cmd.focus();
}

form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const d = Object.fromEntries(new FormData(form));
  for (const k in d) d[k] = d[k].trim();
  if (!d.cmd || !d.role) return;
  d.categorie = d.categorie || "Autre";
  if (enEdition) {
    Object.assign(entrees.find((x) => x.id === enEdition), d, { modifie: Date.now() });
    toast("Modifié ✔");
  } else {
    entrees.push({ id: nouvelId(), cree: Date.now(), ...d });
    toast("Ajouté ✔");
  }
  sauver(); fenetre.close(); afficher();
});
$("#btn-annuler").onclick = () => fenetre.close();
$("#btn-supprimer").onclick = () => {
  const e = entrees.find((x) => x.id === enEdition);
  if (e && confirm(`Supprimer « ${e.cmd} » ?`)) {
    oublier([enEdition]);
    entrees = entrees.filter((x) => x.id !== enEdition);
    sauver(); fenetre.close(); afficher(); toast("Supprimé");
  }
};
fenetre.addEventListener("click", (ev) => { if (ev.target === fenetre) fenetre.close(); });

/* ---------- Événements de la liste ---------- */
lignes.addEventListener("click", async (ev) => {
  const lien = ev.target.closest("[data-chercher]");
  if (lien) { // clic sur 📦 numpy → affiche tout ce qui concerne numpy
    $("#recherche").value = lien.dataset.chercher;
    filtreCategorie = "Toutes";
    afficher();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const btn = ev.target.closest("[data-copier]");
  if (btn) {
    const e = entrees.find((x) => x.id === btn.dataset.copier);
    try { await navigator.clipboard.writeText(e.cmd); toast("Copié : " + e.cmd); }
    catch { toast("Copie impossible"); }
    return;
  }
  const tr = ev.target.closest("tr[data-id]");
  if (tr) ouvrir(tr.dataset.id);
});
$("#filtres").addEventListener("click", (ev) => {
  const p = ev.target.closest("[data-cat]");
  if (p) { filtreCategorie = p.dataset.cat; afficher(); }
});
$("#recherche").addEventListener("input", afficher);
$("#tri").addEventListener("change", () => { localStorage.setItem(CLE + ".tri", $("#tri").value); afficher(); });
$("#btn-ajouter").onclick = () => ouvrir();

/* ---------- Menu ---------- */
const menu = $("#menu");
$("#btn-menu").onclick = (ev) => { ev.stopPropagation(); menu.hidden = !menu.hidden; };
document.addEventListener("click", (ev) => { if (!menu.contains(ev.target)) menu.hidden = true; });

document.addEventListener("click", (ev) => {
  const b = ev.target.closest("[data-action]");
  if (!b) return;
  menu.hidden = true;
  ({
    pdf: ouvrirPdf,
    exporter,
    importer: () => $("#fichier-import").click(),
    exemples: ajouterExemples,
    "retirer-exemples": retirerExemples,
    theme: basculerTheme,
    "tout-effacer": toutEffacer,
    secours: restaurerSecours,
  })[b.dataset.action]?.();
});

function exporter() {
  const blob = new Blob([JSON.stringify({ version: 1, date: new Date().toISOString(), entrees }, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `memo-commandes-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  localStorage.setItem(CLE + ".dernierExport", Date.now());
  toast("Sauvegarde téléchargée");
}

$("#fichier-import").addEventListener("change", async (ev) => {
  const f = ev.target.files[0];
  ev.target.value = "";
  if (!f) return;
  try {
    const data = JSON.parse(await f.text());
    const liste = Array.isArray(data) ? data : data.entrees;
    if (!Array.isArray(liste)) throw new Error();
    const cles = new Set(entrees.map((e) => normaliser(e.cmd) + "|" + normaliser(e.categorie)));
    let n = 0;
    for (const e of liste) {
      if (!e || !e.cmd || !e.role) continue;
      const cle = normaliser(e.cmd) + "|" + normaliser(e.categorie || "Autre");
      if (cles.has(cle)) continue;
      cles.add(cle);
      entrees.push({ id: nouvelId(), cree: e.cree || Date.now(), cmd: e.cmd, role: e.role,
        exemple: e.exemple || "", categorie: e.categorie || "Autre", biblio: e.biblio || "", notes: e.notes || "" });
      n++;
    }
    sauver(); afficher();
    toast(`${n} entrée(s) importée(s)`);
  } catch { toast("Fichier invalide"); }
});

// Restaurer une copie de secours : les fiches de la copie qui manquent sont AJOUTÉES
// (rien n'est supprimé ni écrasé dans la liste actuelle).
function restaurerSecours() {
  const copies = lireSecours();
  if (!copies.length) return toast("Aucune copie de secours pour l'instant");
  const choix = copies.map((c, i) => `${i + 1}) ${new Date(c.date).toLocaleString("fr-FR")} : ${c.entrees.length} fiches`).join("\n");
  const rep = prompt(`Copies de secours (la plus récente en premier) :\n${choix}\n\nNuméro de la copie à restaurer :`);
  const c = copies[parseInt(rep, 10) - 1];
  if (!c) return;
  const ici = new Set(entrees.map((e) => e.id));
  const ajout = c.entrees.filter((e) => !ici.has(e.id));
  for (const e of ajout) supprimees.delete(e.id);
  entrees = entrees.concat(ajout);
  sauver(); afficher();
  toast(ajout.length ? `${ajout.length} fiche(s) restaurée(s)` : "Rien à restaurer : toutes ces fiches sont déjà là");
}

function toutEffacer() {
  if (!entrees.length) return;
  if (confirm("Tout effacer ? Pense à exporter une sauvegarde avant.") && confirm("Vraiment tout effacer ?")) {
    oublier(entrees.map((e) => e.id));
    entrees = []; sauver(); afficher(); toast("Tout a été effacé");
  }
}

/* ---------- Commandes du guide (APPRENDRE_LINUX) ---------- */
// La liste EXEMPLES est dans exemples.js (générée à partir du guide).
// Anciennes fiches (versions 1 à 5 de l'application), pour les reconnaître et les mettre à jour.
const ANCIENS_EXEMPLES = [
  ["pwd", "Afficher le dossier où je suis", "Linux"], ["ls", "Lister le contenu d'un dossier", "Linux"],
  ["cd", "Changer de dossier", "Linux"], ["clear", "Effacer l'écran du terminal", "Linux"],
  ["mkdir -p", "Créer un dossier (et ses parents)", "Linux"], ["touch", "Créer un fichier vide", "Linux"],
  ["cp", "Copier un fichier (-r pour un dossier)", "Linux"], ["mv", "Déplacer ou renommer", "Linux"],
  ["rm", "Supprimer (définitif, pas de corbeille)", "Linux"], ["nano", "Éditer un fichier dans le terminal", "Linux"],
  ["cat", "Afficher tout un fichier", "Linux"], ["less", "Lire un fichier page par page", "Linux"],
  ["head / tail", "Premières / dernières lignes d'un fichier", "Linux"], ["grep", "Chercher un mot dans des fichiers", "Linux"],
  ["wc -l", "Compter les lignes", "Linux"], ["|", "Envoyer la sortie d'une commande vers une autre", "Linux"],
  ["> / >>", "Écrire (écrase) / ajouter dans un fichier", "Linux"], ["chmod +x", "Rendre un fichier exécutable", "Linux"],
  ["sudo", "Exécuter en administrateur", "Linux"], ["apt install", "Installer un logiciel", "Linux"],
  ["ps aux", "Lister les programmes en cours", "Linux"], ["kill", "Arrêter un programme par son numéro (PID)", "Linux"],
  ["df -h", "Place libre sur les disques", "Linux"], ["free -h", "Mémoire RAM utilisée / libre", "Linux"],
  ["man", "Lire le manuel d'une commande", "Linux"], ["which", "Trouver où est installé un programme", "Linux"],
  ["uv venv", "Créer un environnement virtuel Python", "Python"], ["source .venv/bin/activate", "Activer l'environnement virtuel", "Python"],
  ["uv pip install", "Installer une bibliothèque Python", "Python"], ["uv pip freeze", "Lister les bibliothèques installées", "Python"],
  ["git init", "Créer un dépôt Git", "Git"], ["git status", "Voir ce qui a changé", "Git"],
  ["git add", "Préparer des fichiers pour le commit", "Git"], ["git commit", "Enregistrer une version", "Git"],
  ["git log --oneline", "Historique résumé", "Git"], ["git diff", "Voir les modifications non préparées", "Git"],
];
const cleCmd = (cmd, cat) => normaliser(cmd) + "|" + normaliser(cat || "Autre");

// Ajoute les fiches du guide. Les fiches du guide déjà présentes et jamais modifiées par
// l'utilisateur sont mises à jour avec la version détaillée ; les anciennes fiches devenues
// inutiles (ex. « head / tail », remplacée par « head » et « tail ») sont retirées.
function ajouterExemples() {
  const nouvelles = new Set(EXEMPLES.map((x) => cleCmd(x.cmd, x.categorie)));
  const avant = entrees.length;
  oublier(entrees.filter((e) => estDuGuide(e) && !e.modifie && !nouvelles.has(cleCmd(e.cmd, e.categorie))).map((e) => e.id));
  entrees = entrees.filter((e) => !(estDuGuide(e) && !e.modifie && !nouvelles.has(cleCmd(e.cmd, e.categorie))));
  const remplacees = avant - entrees.length;
  let ajoutees = 0, majs = 0;
  const t = Date.now();
  EXEMPLES.forEach((x, i) => {
    const e = entrees.find((y) => cleCmd(y.cmd, y.categorie) === cleCmd(x.cmd, x.categorie));
    if (!e) {
      entrees.push({ id: nouvelId(), cree: t - i, ...x, source: "guide" });
      ajoutees++;
    } else if (estDuGuide(e) && !e.modifie && (e.role !== x.role || e.exemple !== x.exemple || e.notes !== x.notes)) {
      Object.assign(e, { role: x.role, exemple: x.exemple, notes: x.notes, source: "guide" });
      majs++;
    }
  });
  sauver(); afficher();
  const msg = [ajoutees && `${ajoutees} ajoutée(s)`, majs && `${majs} mise(s) à jour`, remplacees && `${remplacees} ancienne(s) remplacée(s)`].filter(Boolean);
  toast(msg.length ? "Commandes du guide : " + msg.join(", ") : "Déjà toutes présentes et à jour");
}

// Une entrée vient du guide si elle a été ajoutée par le bouton (source "guide"),
// ou, pour les plus anciennes, si elle est identique à une fiche du guide (ancienne ou nouvelle).
function estDuGuide(e) {
  if (e.source === "guide") return true;
  const cle = (c, r, k) => normaliser(c) + "|" + normaliser(r) + "|" + normaliser(k);
  const k = cle(e.cmd, e.role, e.categorie);
  return EXEMPLES.some((x) => cle(x.cmd, x.role, x.categorie) === k) ||
    ANCIENS_EXEMPLES.some(([c, r, cat]) => cle(c, r, cat) === k);
}

function retirerExemples() {
  const duGuide = entrees.filter(estDuGuide);
  if (!duGuide.length) return toast("Aucune commande du guide à retirer");
  const modifiees = duGuide.filter((e) => e.modifie);
  let aRetirer = duGuide;
  let msg = `Retirer les ${duGuide.length} commandes du guide ?\nTes propres commandes ne seront pas touchées.`;
  if (modifiees.length) {
    msg += `\n\n${modifiees.length} d'entre elles ont été modifiées par toi : elles seront CONSERVÉES.`;
    aRetirer = duGuide.filter((e) => !e.modifie);
  }
  if (!aRetirer.length) return toast("Toutes les commandes du guide ont été modifiées : rien à retirer");
  if (!confirm(msg)) return;
  const ids = new Set(aRetirer.map((e) => e.id));
  oublier(ids);
  entrees = entrees.filter((e) => !ids.has(e.id));
  sauver(); afficher();
  toast(`${aRetirer.length} commandes du guide retirées`);
}

/* ---------- Export PDF (via l'impression du navigateur) ---------- */
const fenetrePdf = $("#fenetre-pdf");
const formPdf = $("#form-pdf");

function ouvrirPdf() {
  if (!entrees.length) return toast("Le mémo est vide");
  const nbAffiche = listeAffichee().length;
  $("#nb-tout").textContent = `(${entrees.length})`;
  $("#nb-affiche").textContent = `(${nbAffiche})`;
  const filtreActif = nbAffiche > 0 && nbAffiche !== entrees.length;
  $("#ligne-filtre").hidden = !filtreActif;
  formPdf.elements.portee.value = "tout";
  fenetrePdf.showModal();
}
fenetrePdf.querySelector("[data-fermer]").onclick = () => fenetrePdf.close();
fenetrePdf.addEventListener("click", (ev) => { if (ev.target === fenetrePdf) fenetrePdf.close(); });

formPdf.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const portee = formPdf.elements.portee.value;
  const cols = [...formPdf.querySelectorAll('[name="col"]:checked')].map((c) => c.value);
  const grouper = formPdf.elements.grouper.checked;
  let liste = portee === "affiche" ? listeAffichee() : [...entrees];
  if (grouper) liste.sort(parCategorie);
  else if (portee === "tout") liste.sort((a, b) => a.cmd.localeCompare(b.cmd, "fr"));
  fenetrePdf.close();
  preparerImpression(liste, cols, grouper);
  // Laisser le temps à la page de se mettre en forme avant d'ouvrir l'impression
  setTimeout(() => window.print(), 150);
});

function preparerImpression(liste, cols, grouper) {
  const titres = { exemple: "Exemple", biblio: "Bibliothèque", categorie: "Catégorie", notes: "Notes" };
  // Colonne Catégorie inutile si on regroupe déjà par catégorie ; colonne Bibliothèque inutile si personne n'en a
  const colsTableau = cols.filter((c) => !(grouper && c === "categorie") && !(c === "biblio" && !liste.some((e) => e.biblio)));
  const entete = `<tr><th class="p-num">#</th><th>Commande / fonction</th><th>Rôle</th>${
    colsTableau.map((c) => `<th>${titres[c]}</th>`).join("")}</tr>`;
  let num = 0;
  const ligne = (e) => `<tr><td class="p-num">${++num}</td><td><code>${echapper(e.cmd)}</code></td><td>${echapper(e.role)}</td>${
    colsTableau.map((c) => `<td>${c === "exemple" && e.exemple ? `<code>${echapper(e.exemple)}</code>` : echapper(e[c] || "")}</td>`).join("")}</tr>`;

  let corps = "";
  if (grouper) {
    const groupes = new Map();
    for (const e of liste) {
      const k = e.categorie || "Autre";
      if (!groupes.has(k)) groupes.set(k, []);
      groupes.get(k).push(e);
    }
    for (const [cat, items] of groupes) {
      corps += `<h2>${echapper(cat)} <span>(${items.length})</span></h2><table><thead>${entete}</thead><tbody>${items.map(ligne).join("")}</tbody></table>`;
    }
  } else {
    corps = `<table><thead>${entete}</thead><tbody>${liste.map(ligne).join("")}</tbody></table>`;
  }

  const date = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  $("#impression").innerHTML =
    `<header><h1>Mémo commandes</h1><p>${liste.length} entrée(s) · ${date}</p></header>${corps}`;
  const ancienTitre = document.title;
  document.title = `memo-commandes-${new Date().toISOString().slice(0, 10)}`; // nom proposé pour le PDF
  window.addEventListener("afterprint", () => { document.title = ancienTitre; }, { once: true });
}

/* ---------- Quiz (répétition espacée, méthode Leitner) ---------- */
// Niveau 1 à 5 ; délai avant de revoir la carte, en jours.
const DELAIS = { 1: 0, 2: 1, 3: 3, 4: 7, 5: 14 };
const JOUR = 24 * 3600 * 1000;
const NB_CHOIX = 4;
const fenetreQuiz = $("#fenetre-quiz");
// quiz = { sens, mode, cartes: [{ e, sens, choix? }], i, bonnes, presque, rates: [] }
let quiz = null;

const aReviser = (e) => !e.quiz || e.quiz.prochaine <= Date.now();
const niveau = (e) => e.quiz?.boite || 0;

function melanger(t) {
  for (let i = t.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [t[i], t[j]] = [t[j], t[i]];
  }
  return t;
}

function vueQuiz(nom) {
  for (const v of ["config", "question", "fin"]) $("#quiz-" + v).hidden = v !== nom;
}

function ouvrirQuiz() {
  if (!entrees.length) return toast("Ajoute d'abord des commandes à ton mémo");
  const sel = $("#quiz-categorie");
  const avant = sel.value;
  sel.innerHTML = `<option value="Toutes">Toutes (${entrees.length})</option>` + categories().map((c) =>
    `<option value="${echapper(c)}">${echapper(c)} (${entrees.filter((e) => (e.categorie || "Autre") === c).length})</option>`).join("");
  sel.value = [...sel.options].some((o) => o.value === avant) ? avant
    : (filtreCategorie !== "Toutes" ? filtreCategorie : "Toutes");
  majStatsQuiz();
  majChoixMode();
  vueQuiz("config");
  if (!fenetreQuiz.open) fenetreQuiz.showModal();
}

function poolQuiz() {
  const c = $("#quiz-categorie").value;
  return entrees.filter((e) => c === "Toutes" || (e.categorie || "Autre") === c);
}
function majStatsQuiz() {
  const p = poolQuiz();
  $("#st-total").textContent = p.length;
  $("#st-due").textContent = p.filter(aReviser).length;
  $("#st-maitrise").textContent = p.filter((e) => niveau(e) >= 4).length;
}
// Le choix QCM / libre ne concerne que les questions « À quoi sert… ? »
function majChoixMode() {
  $("#choix-mode-reponse").hidden = $("#form-quiz").elements.sens.value === "role";
}
$("#quiz-categorie").addEventListener("change", majStatsQuiz);
$("#form-quiz").addEventListener("change", (ev) => { if (ev.target.name === "sens") majChoixMode(); });

$("#form-quiz").addEventListener("submit", (ev) => {
  ev.preventDefault();
  const f = ev.target.elements;
  const pool = poolQuiz();
  if (!pool.length) return toast("Aucune commande dans cette catégorie");
  // D'abord les cartes à réviser (les plus faibles en premier), puis les autres (les plus anciennes en premier)
  const dues = melanger(pool.filter(aReviser)).sort((a, b) => niveau(a) - niveau(b));
  const autres = pool.filter((e) => !aReviser(e)).sort((a, b) => a.quiz.prochaine - b.quiz.prochaine);
  const n = Number(f.nombre.value) || pool.length;
  demarrer(melanger([...dues, ...autres].slice(0, n)), f.sens.value, f.reponse.value);
});

// 3 mauvais rôles pour le QCM : de préférence de la même catégorie (plus difficile), tous différents
function choixQcm(e) {
  const vus = new Set([normaliser(e.role)]);
  const pioche = (liste) => {
    const res = [];
    for (const x of melanger([...liste])) {
      const k = normaliser(x.role);
      if (!vus.has(k)) { vus.add(k); res.push(x.role); }
    }
    return res;
  };
  const cat = e.categorie || "Autre";
  const memeCat = pioche(entrees.filter((x) => x !== e && (x.categorie || "Autre") === cat));
  const autres = pioche(entrees.filter((x) => x !== e && (x.categorie || "Autre") !== cat));
  const faux = [...memeCat, ...autres].slice(0, NB_CHOIX - 1);
  if (faux.length < NB_CHOIX - 1) return null; // pas assez d'entrées : réponse libre
  return melanger([e.role, ...faux]);
}

function demarrer(liste, sens, mode) {
  quiz = {
    sens, mode,
    cartes: liste.map((e) => {
      const s = sens === "mixte" ? (Math.random() < 0.5 ? "role" : "cmd") : sens;
      return { e, sens: s, choix: s === "cmd" && mode === "qcm" ? choixQcm(e) : null };
    }),
    i: 0, bonnes: 0, presque: 0, rates: [],
  };
  if (mode === "qcm" && quiz.cartes.some((c) => c.sens === "cmd" && !c.choix)) {
    toast(`Il faut au moins ${NB_CHOIX} rôles différents pour le QCM : réponse libre utilisée`);
  }
  vueQuiz("question");
  afficherQuestion();
}

function afficherQuestion() {
  const { e, sens, choix } = quiz.cartes[quiz.i];
  const total = quiz.cartes.length;
  $("#quiz-progression").textContent = `Question ${quiz.i + 1} / ${total}`;
  $("#quiz-score").textContent = `✅ ${quiz.bonnes}` + (quiz.presque ? `  🟡 ${quiz.presque}` : "");
  $("#quiz-barre").style.width = `${(quiz.i / total) * 100}%`;
  $("#quiz-consigne").textContent = sens === "role" ? "Quelle commande pour :" : "À quoi sert :";
  const enonce = $("#quiz-enonce");
  enonce.className = "enonce" + (sens === "cmd" ? " mono" : "");
  enonce.textContent = sens === "role" ? e.role : e.cmd;
  $("#quiz-cat").textContent = e.categorie || "Autre";
  $("#quiz-biblio").hidden = !e.biblio;
  $("#quiz-biblio").textContent = e.biblio ? "📦 " + e.biblio : "";
  $("#quiz-solution").hidden = true;

  // QCM
  const zoneChoix = $("#quiz-choix");
  zoneChoix.classList.remove("fige");
  zoneChoix.hidden = !choix;
  zoneChoix.innerHTML = choix ? choix.map((r, k) =>
    `<button class="choix-btn" data-choix="${k}"><span class="lettre">${"ABCD"[k]}</span><span>${echapper(r)}</span></button>`).join("") : "";

  // Réponse tapée (rôle → commande, ou réponse libre)
  $("#form-reponse").hidden = !!choix;
  const saisie = $("#quiz-saisie");
  saisie.value = "";
  saisie.rows = sens === "role" ? 1 : 2;
  saisie.className = sens === "role" ? "mono" : "";
  saisie.placeholder = sens === "role" ? "Tape la commande (facultatif)" : "Explique avec tes mots (facultatif)";
  $("#btn-verifier").textContent = "Voir la réponse";
  // Sur ordinateur, curseur directement dans la case ; sur téléphone, on évite d'ouvrir le clavier d'office
  if (!choix && matchMedia("(pointer: fine)").matches) saisie.focus();
}
$("#quiz-saisie").addEventListener("input", (ev) => {
  $("#btn-verifier").textContent = ev.target.value.trim() ? "Vérifier" : "Voir la réponse";
});
// Entrée = valider (Maj + Entrée pour aller à la ligne)
$("#quiz-saisie").addEventListener("keydown", (ev) => {
  if (ev.key === "Enter" && !ev.shiftKey) { ev.preventDefault(); $("#form-reponse").requestSubmit(); }
});

// Comparaison tolérante : casse, espaces multiples ; « head / tail » accepte « head » ou « tail »
function compacter(t) { return normaliser(t).replace(/\s+/g, " ").trim(); }
function bonneCommande(saisie, cmd) {
  const s = compacter(saisie);
  if (!s) return false;
  const bases = [cmd, ...cmd.split(" / ")];
  // Pour une fonction, le nom sans les arguments suffit : np.linalg.norm == np.linalg.norm(v)
  const variantes = [...bases, ...bases.map((b) => b.replace(/\(.*\)\s*$/, ""))].map(compacter);
  return variantes.includes(s) || variantes.some((v) => v.replace(/ /g, "") === s.replace(/ /g, ""));
}

// Affiche la zone « solution ». note : 1 / 0 = corrigé automatiquement ; null = l'utilisateur juge.
function montrerSolution({ verdict, classe, note, saisie }) {
  const { e, sens } = quiz.cartes[quiz.i];
  $("#form-reponse").hidden = true;
  $("#quiz-solution").hidden = false;

  const v = $("#quiz-verdict");
  v.textContent = verdict;
  v.className = "verdict " + (classe || "");

  // Réponse libre écrite : les deux réponses côte à côte
  const comparer = sens === "cmd" && note === null && !!saisie;
  $("#quiz-comparaison").hidden = !comparer;
  $("#quiz-bloc-reponse").hidden = comparer || (sens === "cmd" && !!quiz.cartes[quiz.i].choix);
  if (comparer) {
    $("#cmp-toi").textContent = saisie;
    $("#cmp-note").textContent = e.role;
  } else {
    const rep = $("#quiz-reponse");
    rep.className = "sol-texte" + (sens === "role" ? " mono" : "");
    rep.textContent = sens === "role" ? e.cmd : e.role;
  }

  const details = [];
  if (sens === "cmd" && quiz.cartes[quiz.i].choix) details.push(`Bonne réponse : <b>${echapper(e.role)}</b>`);
  if (e.exemple) details.push(`Exemple : <code>${echapper(e.exemple)}</code>`);
  if (e.notes) details.push(`📝 ${echapper(e.notes)}`);
  $("#quiz-detail").innerHTML = details.join("<br>");

  const auto = note !== null;
  $("#quiz-auto").hidden = !auto;
  $("#quiz-manuel").hidden = auto;
  $("#quiz-question-juge").hidden = !(sens === "cmd" && !auto);
  if (auto) {
    const b = $("#quiz-auto .btn");
    b.dataset.note = String(note);
    b.focus({ preventScroll: true });
  } else {
    $("#quiz-manuel .btn-ok").focus({ preventScroll: true });
  }
}

$("#form-reponse").addEventListener("submit", (ev) => {
  ev.preventDefault();
  const { e, sens } = quiz.cartes[quiz.i];
  const saisie = $("#quiz-saisie").value.trim();
  if (sens === "role" && bonneCommande(saisie, e.cmd)) {
    montrerSolution({ verdict: "✅ Correct !", classe: "ok", note: 1 });
  } else if (sens === "role" && saisie) {
    montrerSolution({ verdict: `❌ Tu as écrit : ${saisie}`, classe: "rate", note: null });
  } else if (sens === "cmd" && saisie) {
    montrerSolution({ verdict: "Compare les deux réponses", note: null, saisie });
  } else {
    montrerSolution({ verdict: "Tu savais ?", note: null });
  }
});

// Clic sur un choix du QCM : correction immédiate
$("#quiz-choix").addEventListener("click", (ev) => {
  const b = ev.target.closest("[data-choix]");
  if (!b || $("#quiz-choix").classList.contains("fige")) return;
  const { e, choix } = quiz.cartes[quiz.i];
  const bonIndex = choix.indexOf(e.role);
  const ok = Number(b.dataset.choix) === bonIndex;
  $("#quiz-choix").classList.add("fige");
  $("#quiz-choix").querySelectorAll(".choix-btn").forEach((x, k) => {
    x.disabled = true;
    if (k === bonIndex) x.classList.add("bon");
    else if (x === b) x.classList.add("mauvais");
  });
  montrerSolution(ok
    ? { verdict: "✅ Correct !", classe: "ok", note: 1 }
    : { verdict: "❌ Raté", classe: "rate", note: 0 });
});

$("#quiz-solution").addEventListener("click", (ev) => {
  const b = ev.target.closest("[data-note]");
  if (!b || !quiz) return;
  const carte = quiz.cartes[quiz.i];
  const note = Number(b.dataset.note);
  noter(carte.e, note);
  if (note === 1) quiz.bonnes++;
  else { if (note === 0.5) quiz.presque++; quiz.rates.push({ ...carte, note }); }
  quiz.i++;
  $("#quiz-choix").classList.remove("fige");
  if (quiz.i < quiz.cartes.length) afficherQuestion(); else finQuiz();
});

// note : 1 = juste (niveau +1), 0.5 = presque (on garde le niveau mais on revoit plus tôt), 0 = faux (niveau 1)
function noter(e, note) {
  e = entrees.find((x) => x.id === e.id) || e; // la liste a pu être rechargée entre-temps
  const q = e.quiz || { boite: 1, vus: 0, reussis: 0 };
  q.vus++;
  if (note === 1) { q.reussis++; q.boite = Math.min(5, q.boite + 1); q.prochaine = Date.now() + DELAIS[q.boite] * JOUR; }
  else if (note === 0.5) { q.prochaine = Date.now() + DELAIS[Math.max(1, q.boite - 1)] * JOUR; }
  else { q.boite = 1; q.prochaine = Date.now(); }
  e.quiz = q;
  sauver();
}

function finQuiz() {
  const total = quiz.cartes.length;
  const pct = Math.round(((quiz.bonnes + quiz.presque / 2) / total) * 100);
  $("#quiz-resultat").innerHTML = `<b>${quiz.bonnes} / ${total}</b><span>${
    quiz.presque ? `+ ${quiz.presque} presque · ` : ""}${pct} %</span>`;
  $("#quiz-message").textContent =
    pct === 100 ? "Parfait ! 🎉 Ces commandes reviendront dans quelques jours pour bien les ancrer." :
    pct >= 70 ? "Très bien ! Les ratées reviendront en priorité au prochain quiz." :
    "Continue : c'est en se trompant qu'on retient. Refais les ratées maintenant.";
  $("#quiz-rates").innerHTML = quiz.rates.length
    ? `<p class="sol-label">À revoir :</p><ul class="liste-rates">${quiz.rates.map(({ e, note }) =>
        `<li><span class="ligne-rate">${note === 0.5 ? "🟡" : "❌"} <code class="cmd">${echapper(e.cmd)}</code></span><span>${echapper(e.role)}</span></li>`).join("")}</ul>`
    : "";
  $("#btn-refaire-rates").hidden = !quiz.rates.length;
  vueQuiz("fin");
  afficher();
}

$("#btn-refaire-rates").onclick = () => demarrer(melanger(quiz.rates.map((c) => c.e)), quiz.sens, quiz.mode);
$("#btn-nouveau-quiz").onclick = ouvrirQuiz;
$("#btn-quiz").onclick = ouvrirQuiz;
fenetreQuiz.addEventListener("click", (ev) => {
  if (!ev.target.closest("[data-quitter]")) return;
  if (!$("#quiz-question").hidden && quiz && quiz.i > 0 && !confirm("Arrêter le quiz ? Tes réponses déjà données sont enregistrées.")) return;
  fenetreQuiz.close();
  afficher();
});

/* ---------- Thème ---------- */
function appliquerTheme(t) { document.documentElement.dataset.theme = t; }
function basculerTheme() {
  const t = document.documentElement.dataset.theme === "sombre" ? "clair" : "sombre";
  localStorage.setItem(CLE_THEME, t); appliquerTheme(t);
}
appliquerTheme(localStorage.getItem(CLE_THEME) ||
  (matchMedia("(prefers-color-scheme: dark)").matches ? "sombre" : "clair"));

/* ---------- Installation (PWA) ---------- */
let invite = null;
window.addEventListener("beforeinstallprompt", (ev) => {
  ev.preventDefault(); invite = ev; $("#btn-installer").hidden = false;
});
$("#btn-installer").onclick = async () => {
  if (!invite) return;
  invite.prompt();
  await invite.userChoice;
  invite = null; $("#btn-installer").hidden = true;
};
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js"));
}
// Demander au navigateur de ne pas effacer les données
navigator.storage?.persist?.();

/* ---------- Démarrage ---------- */
$("#tri").value = localStorage.getItem(CLE + ".tri") || "recent";
afficher();
// Une copie de secours par jour au minimum.
if (!lireSecours().length || Date.now() - lireSecours()[0].date > 864e5) copieDeSecours(entrees);
// Rappel d'export : la copie de secours reste dans le téléphone ; un fichier exporté est plus sûr.
{
  const dernier = Number(localStorage.getItem(CLE + ".dernierExport")) || 0;
  if (entrees.length >= 10 && Date.now() - dernier > 7 * 864e5)
    setTimeout(() => toast("💾 Pense à exporter une sauvegarde (menu ⋮ → Exporter)"), 1500);
}
