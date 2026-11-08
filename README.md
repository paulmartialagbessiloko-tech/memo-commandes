# Mémo commandes

Un petit carnet pour noter les commandes (Linux, Git, Python, Arduino/ESP32…) et les fonctions, avec leur rôle, sous forme de tableau.

**Ouvrir l'application :** https://paulmartialagbessiloko-tech.github.io/memo-commandes/

## Fonctionnalités
- Tableau : commande / fonction, rôle, exemple, catégorie, notes
- Recherche instantanée, filtres par catégorie, tri
- Bouton 📋 pour copier une commande
- Installable sur téléphone (PWA), fonctionne **sans internet**
- Thème clair / sombre
- Export / import d'une sauvegarde (fichier JSON)
- **Export PDF** : un tableau quadrillé (commande, rôle, exemple, catégorie, notes), regroupé par catégorie si on le souhaite. Menu ⋮ → Exporter en PDF, puis choisir « Enregistrer en PDF » comme imprimante.
- Ajouter / retirer d'un coup les commandes du guide Linux (les commandes du guide que tu as modifiées sont conservées)

## Installer sur le téléphone
- **Android (Chrome)** : ouvrir le lien → menu ⋮ → **Installer l'application** (ou « Ajouter à l'écran d'accueil »).
- **iPhone (Safari)** : ouvrir le lien → bouton Partager → **Sur l'écran d'accueil**.

## Où sont mes données ?
Uniquement **sur l'appareil** (stockage du navigateur). Rien n'est envoyé sur internet.
Le téléphone et l'ordinateur ont donc chacun leurs propres notes. Pour les transférer : menu ⋮ → **Exporter**, envoie le fichier sur l'autre appareil, puis menu ⋮ → **Importer**. Les doublons sont ignorés.
Pense à exporter une sauvegarde de temps en temps.

## Mettre à jour le site
Modifier les fichiers, changer `VERSION` dans `sw.js` (ex. `"v2"`), puis :
```bash
git add . && git commit -m "Mise à jour" && git push
```
