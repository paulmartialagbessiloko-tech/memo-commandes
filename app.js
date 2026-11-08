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
function sauver() { localStorage.setItem(CLE, JSON.stringify(entrees)); }
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
function categories() {
  return [...new Set(entrees.map((e) => e.categorie || "Autre"))].sort((a, b) => a.localeCompare(b, "fr"));
}

/* ---------- Affichage ---------- */
function afficher() {
  const q = $("#recherche").value.trim();
  const nq = normaliser(q);
  const tri = $("#tri").value;

  // Puces de filtre
  const cats = categories();
  if (filtreCategorie !== "Toutes" && !cats.includes(filtreCategorie)) filtreCategorie = "Toutes";
  $("#filtres").innerHTML = ["Toutes", ...cats].map((c) => {
    const nb = c === "Toutes" ? entrees.length : entrees.filter((e) => (e.categorie || "Autre") === c).length;
    return `<button class="puce ${c === filtreCategorie ? "active" : ""}" data-cat="${echapper(c)}">${echapper(c)} · ${nb}</button>`;
  }).join("");
  $("#liste-categories").innerHTML = [...new Set(["Linux", "Git", "Python", "Arduino / ESP32", "Fonctions", ...cats])]
    .map((c) => `<option value="${echapper(c)}">`).join("");

  // Filtrage + tri
  let liste = entrees.filter((e) =>
    (filtreCategorie === "Toutes" || (e.categorie || "Autre") === filtreCategorie) &&
    (!nq || normaliser([e.cmd, e.role, e.exemple, e.categorie, e.notes].join(" ")).includes(nq)));

  if (tri === "alpha") liste.sort((a, b) => a.cmd.localeCompare(b.cmd, "fr"));
  else if (tri === "categorie") liste.sort((a, b) =>
    (a.categorie || "Autre").localeCompare(b.categorie || "Autre", "fr") || a.cmd.localeCompare(b.cmd, "fr"));
  else liste.sort((a, b) => b.cree - a.cree);

  lignes.innerHTML = liste.map((e) => `
    <tr data-id="${e.id}">
      <td class="c-cmd"><code class="cmd">${surligner(e.cmd, q)}</code></td>
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
  if (e) for (const k of ["cmd", "role", "exemple", "categorie", "notes"]) form.elements[k].value = e[k] || "";
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
    entrees = entrees.filter((x) => x.id !== enEdition);
    sauver(); fenetre.close(); afficher(); toast("Supprimé");
  }
};
fenetre.addEventListener("click", (ev) => { if (ev.target === fenetre) fenetre.close(); });

/* ---------- Événements de la liste ---------- */
lignes.addEventListener("click", async (ev) => {
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
  ({ exporter, importer: () => $("#fichier-import").click(), exemples: ajouterExemples, theme: basculerTheme, "tout-effacer": toutEffacer })[b.dataset.action]?.();
});

function exporter() {
  const blob = new Blob([JSON.stringify({ version: 1, date: new Date().toISOString(), entrees }, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `memo-commandes-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
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
        exemple: e.exemple || "", categorie: e.categorie || "Autre", notes: e.notes || "" });
      n++;
    }
    sauver(); afficher();
    toast(`${n} entrée(s) importée(s)`);
  } catch { toast("Fichier invalide"); }
});

function toutEffacer() {
  if (!entrees.length) return;
  if (confirm("Tout effacer ? Pense à exporter une sauvegarde avant.") && confirm("Vraiment tout effacer ?")) {
    entrees = []; sauver(); afficher(); toast("Tout a été effacé");
  }
}

/* ---------- Commandes du guide (APPRENDRE_LINUX) ---------- */
const EXEMPLES = [
  ["pwd", "Afficher le dossier où je suis", "pwd", "Linux"],
  ["ls", "Lister le contenu d'un dossier", "ls -la", "Linux", "-l détails, -a fichiers cachés"],
  ["cd", "Changer de dossier", "cd ~/projets", "Linux", "cd .. parent, cd ~ maison, cd - précédent"],
  ["clear", "Effacer l'écran du terminal", "clear", "Linux", "Raccourci : Ctrl + L"],
  ["mkdir -p", "Créer un dossier (et ses parents)", "mkdir -p robot/{src,config}", "Linux"],
  ["touch", "Créer un fichier vide", "touch notes.txt", "Linux"],
  ["cp", "Copier un fichier (-r pour un dossier)", "cp -r src sauvegarde", "Linux"],
  ["mv", "Déplacer ou renommer", "mv ancien.txt nouveau.txt", "Linux"],
  ["rm", "Supprimer (définitif, pas de corbeille)", "rm -r dossier", "Linux", "⚠️ Aucune corbeille"],
  ["nano", "Éditer un fichier dans le terminal", "nano phrases.txt", "Linux", "Ctrl+O enregistrer, Ctrl+X quitter"],
  ["cat", "Afficher tout un fichier", "cat phrases.txt", "Linux"],
  ["less", "Lire un fichier page par page", "less log.txt", "Linux", "q quitter, /mot chercher"],
  ["head / tail", "Premières / dernières lignes d'un fichier", "tail -f log.txt", "Linux", "tail -f suit le fichier en direct"],
  ["grep", "Chercher un mot dans des fichiers", "grep -rin \"mal\" config/", "Linux", "-r récursif, -i sans casse, -n numéros de ligne"],
  ["wc -l", "Compter les lignes", "wc -l phrases.txt", "Linux"],
  ["|", "Envoyer la sortie d'une commande vers une autre", "cat f.txt | grep soif", "Linux"],
  ["> / >>", "Écrire (écrase) / ajouter dans un fichier", "echo \"salut\" >> notes.txt", "Linux"],
  ["chmod +x", "Rendre un fichier exécutable", "chmod +x script.sh && ./script.sh", "Linux"],
  ["sudo", "Exécuter en administrateur", "sudo apt update", "Linux", "Le mot de passe ne s'affiche pas quand on le tape"],
  ["apt install", "Installer un logiciel", "sudo apt install htop", "Linux", "Toujours faire sudo apt update avant"],
  ["ps aux", "Lister les programmes en cours", "ps aux | grep python", "Linux"],
  ["kill", "Arrêter un programme par son numéro (PID)", "kill 1234", "Linux"],
  ["df -h", "Place libre sur les disques", "df -h", "Linux"],
  ["free -h", "Mémoire RAM utilisée / libre", "free -h", "Linux"],
  ["man", "Lire le manuel d'une commande", "man ls", "Linux"],
  ["which", "Trouver où est installé un programme", "which python3", "Linux"],
  ["uv venv", "Créer un environnement virtuel Python", "uv venv --python 3.11 .venv", "Python"],
  ["source .venv/bin/activate", "Activer l'environnement virtuel", "source .venv/bin/activate", "Python", "deactivate pour en sortir"],
  ["uv pip install", "Installer une bibliothèque Python", "uv pip install numpy", "Python", "Jamais sudo pip install"],
  ["uv pip freeze", "Lister les bibliothèques installées", "uv pip freeze > requirements.txt", "Python"],
  ["git init", "Créer un dépôt Git", "git init", "Git"],
  ["git status", "Voir ce qui a changé", "git status", "Git"],
  ["git add", "Préparer des fichiers pour le commit", "git add .", "Git"],
  ["git commit", "Enregistrer une version", "git commit -m \"Ajout des phrases\"", "Git"],
  ["git log --oneline", "Historique résumé", "git log --oneline", "Git"],
  ["git diff", "Voir les modifications non préparées", "git diff", "Git"],
];
function ajouterExemples() {
  const cles = new Set(entrees.map((e) => normaliser(e.cmd) + "|" + normaliser(e.categorie)));
  let n = 0, t = Date.now();
  for (const [cmd, role, exemple, categorie, notes = ""] of EXEMPLES) {
    if (cles.has(normaliser(cmd) + "|" + normaliser(categorie))) continue;
    entrees.push({ id: nouvelId(), cree: t - n, cmd, role, exemple, categorie, notes });
    n++;
  }
  sauver(); afficher();
  toast(n ? `${n} commandes ajoutées` : "Déjà toutes présentes");
}

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
