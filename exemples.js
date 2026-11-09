// Généré automatiquement à partir du guide APPRENDRE_LINUX (ne pas modifier à la main).
// Utilisé par le menu « Ajouter les commandes du guide ».
const EXEMPLES = [
 {
  "cmd": "pwd",
  "role": "Afficher le dossier où je me trouve",
  "exemple": "pwd",
  "categorie": "Linux",
  "notes": "« Print Working Directory » : affiche le chemin complet du dossier dans lequel tu es en ce moment. Le terminal est toujours « quelque part » dans l'arborescence ; pwd te le dit. À utiliser dès que tu te sens perdu.\n📌 Print Working Directory. Toujours le premier réflexe quand on est perdu."
 },
 {
  "cmd": "ls",
  "role": "Lister le contenu d'un dossier",
  "exemple": "ls -lah ~/apprentissage",
  "categorie": "Linux",
  "notes": "« List » : affiche les fichiers et dossiers du dossier courant (ou de celui que tu indiques). Sans option, l'affichage est court ; les options ajoutent des détails.\nOptions :\n  -l → format long : droits, propriétaire, taille, date\n  -a → affiche aussi les fichiers cachés (ceux qui commencent par un point, comme .bashrc)\n  -h → tailles lisibles (Ko, Mo) — avec -l\n  -R → affiche aussi le contenu des sous-dossiers\n  -t → trie du plus récent au plus ancien\n⚠️ Dans ls -l, la 1re lettre indique le type : d = dossier, - = fichier.\n📌 -l détails · -a cachés · -h tailles lisibles · -R sous-dossiers · -t par date. Les options se combinent : ls -lah"
 },
 {
  "cmd": "ls -l",
  "role": "Lister en format détaillé (droits, propriétaire, taille, date)",
  "exemple": "ls -l ~/testLinux",
  "categorie": "Linux",
  "notes": "-l = « long ». Une ligne par élément. 1re lettre : d = dossier, - = fichier. Puis : droits, propriétaire, taille (en octets), date, nom.\nExemple de ligne : -rw-r--r-- 1 e14paul e14paul 0 Nov 8 18:52 fichierTest1.txt"
 },
 {
  "cmd": "ls -a",
  "role": "Lister aussi les éléments cachés (dont le nom commence par un point)",
  "exemple": "ls -a ~",
  "categorie": "Linux",
  "notes": "-a = « all » (tout). Montre aussi . (ce dossier-ci), .. (le dossier parent) et les fichiers cachés comme .bashrc.\nSe combine : ls -la"
 },
 {
  "cmd": "ls -h",
  "role": "Afficher les tailles en Ko / Mo / Go (lisibles), avec -l",
  "exemple": "ls -lh",
  "categorie": "Linux",
  "notes": "-h = « human » (lisible par un humain). Ne sert qu'avec -l : 4096 devient 4.0K. Seul (ls -h), il ne change rien."
 },
 {
  "cmd": "ls -R",
  "role": "Lister aussi le contenu de tous les sous-dossiers",
  "exemple": "ls -R ~/testLinux",
  "categorie": "Linux",
  "notes": "-R = « récursif » : descend dans chaque sous-dossier. R MAJUSCULE (ls -r minuscule inverse l'ordre de tri)."
 },
 {
  "cmd": "ls -t",
  "role": "Trier du plus récent au plus ancien",
  "exemple": "ls -lt",
  "categorie": "Linux",
  "notes": "-t = « time ». Pratique pour retrouver le dernier fichier modifié : il est en haut."
 },
 {
  "cmd": "cd",
  "role": "Changer de dossier",
  "exemple": "cd ~/apprentissage/robot",
  "categorie": "Linux",
  "notes": "« Change Directory » : te déplace dans un autre dossier. Tu peux donner un chemin absolu (qui commence par /) ou relatif (à partir de l'endroit où tu es).\nOptions :\n  cd dossier → entre dans dossier (chemin relatif)\n  cd .. → remonte au dossier parent\n  cd ~ ou cd → retourne dans ton dossier personnel (/home/e14paul)\n  cd - → revient au dossier précédent\n  cd / → va à la racine du système\n⚠️ Un nom avec des espaces doit être entre guillemets : cd \"mon dossier\".\n📌 cd .. parent · cd ou cd ~ maison · cd - précédent · cd / racine. Touche Tab pour compléter les noms."
 },
 {
  "cmd": "cd ..",
  "role": "Remonter au dossier parent (d'un cran)",
  "exemple": "cd ..",
  "categorie": "Linux",
  "notes": ".. veut dire « le dossier au-dessus ». Depuis ~/testLinux, cd .. ramène dans ~.\nRemonter de 2 crans : cd ../.."
 },
 {
  "cmd": "cd ~",
  "role": "Retourner dans son dossier personnel (/home/e14paul)",
  "exemple": "cd ~",
  "categorie": "Linux",
  "notes": "~ = raccourci de /home/e14paul. cd tout seul fait la même chose.\n~/testLinux = /home/e14paul/testLinux, valable depuis n'importe où."
 },
 {
  "cmd": "cd -",
  "role": "Revenir au dossier où l'on était juste avant",
  "exemple": "cd -",
  "categorie": "Linux",
  "notes": "Comme le bouton « précédent » d'un navigateur. Deux cd - de suite font l'aller-retour."
 },
 {
  "cmd": "cd /",
  "role": "Aller à la racine du système (le tout premier dossier)",
  "exemple": "cd /",
  "categorie": "Linux",
  "notes": "/ seul = la racine, le sommet de l'arborescence (contient home, etc, usr, tmp…).\nUn chemin qui commence par / est ABSOLU : il part de la racine. Sinon il est RELATIF : il part du dossier où tu es."
 },
 {
  "cmd": "clear",
  "role": "Effacer l'écran du terminal",
  "exemple": "clear",
  "categorie": "Linux",
  "notes": "Vide l'affichage du terminal pour repartir sur un écran propre. Rien n'est supprimé : seul l'affichage est effacé, l'historique des commandes est conservé.\n📌 Raccourci : Ctrl + L"
 },
 {
  "cmd": "Tab",
  "role": "Compléter automatiquement un nom ou une commande",
  "exemple": "cd ~/appr  puis Tab  →  cd ~/apprentissage/",
  "categorie": "Linux",
  "notes": "Ce n'est pas une commande mais une touche. Tape le début d'un nom de fichier, de dossier ou de commande puis appuie sur Tab : le terminal complète. S'il y a plusieurs possibilités, appuie 2 fois pour les voir. Ça évite les fautes de frappe et fait gagner énormément de temps.\n📌 1 fois = compléter · 2 fois = voir les choix. Aussi : ↑ = commande précédente, Ctrl+R = chercher dans l'historique."
 },
 {
  "cmd": "mkdir",
  "role": "Créer un dossier",
  "exemple": "mkdir -p ~/apprentissage/robot/{src,config,donnees}",
  "categorie": "Linux",
  "notes": "« Make Directory » : crée un ou plusieurs dossiers. Avec -p, crée aussi tous les dossiers parents manquants, et ne fait pas d'erreur si le dossier existe déjà.\nOptions :\n  -p → crée les dossiers parents si besoin (a/b/c en une fois)\n  {a,b,c} → les accolades créent plusieurs noms d'un coup\n📌 -p crée les parents. Les accolades {a,b} créent plusieurs dossiers d'un coup."
 },
 {
  "cmd": "mkdir -p",
  "role": "Créer un dossier ET tous les dossiers parents manquants",
  "exemple": "mkdir -p robot/src",
  "categorie": "Linux",
  "notes": "-p = « parents ». Sans -p, mkdir robot/src échoue si robot n'existe pas (No such file or directory).\nAvec -p : pas d'erreur non plus si le dossier existe déjà.\nAvec accolades : mkdir -p robot/{config,donnees} (sans espace après la virgule)."
 },
 {
  "cmd": "touch",
  "role": "Créer un fichier vide",
  "exemple": "touch config/phrases.txt",
  "categorie": "Linux",
  "notes": "Crée un fichier vide s'il n'existe pas. S'il existe déjà, il n'est pas modifié : seule sa date de modification est mise à jour.\n📌 Ne touche pas au contenu d'un fichier existant (met juste à jour sa date)."
 },
 {
  "cmd": "cp",
  "role": "Copier un fichier ou un dossier",
  "exemple": "cp -r robot robot_sauvegarde",
  "categorie": "Linux",
  "notes": "« Copy » : comme une photocopieuse, fait une copie et laisse l'original en place. Ordre : cp SOURCE DESTINATION (« copie ceci vers là »). Si la destination est un dossier qui existe, la copie va dedans avec le même nom ; sinon, la copie porte le nom de la destination. Pour copier un dossier et tout son contenu, il faut -r.\nOptions :\n  -r → copie un dossier et tout ce qu'il contient (récursif)\n  -i → demande confirmation avant d'écraser un fichier existant\n  -v → affiche chaque fichier copié\n⚠️ Si la destination existe déjà, elle est écrasée sans prévenir (sauf avec -i).\n📌 cp SOURCE DESTINATION · -r pour un dossier · -i demande avant d'écraser"
 },
 {
  "cmd": "cp fichier nouveau_nom",
  "role": "Faire une copie d'un fichier sous un autre nom",
  "exemple": "cp fichierTest1.txt copie1.txt",
  "categorie": "Linux",
  "notes": "Ordre : cp SOURCE DESTINATION (« copie ceci vers là »).\nLa destination n'existe pas → cp crée une copie qui porte ce nom. L'original reste en place.\nAucun message = tout s'est bien passé."
 },
 {
  "cmd": "cp fichier dossier/",
  "role": "Copier un fichier DANS un dossier (il garde son nom)",
  "exemple": "cp fichierTest2.txt rangement/",
  "categorie": "Linux",
  "notes": "La destination est un dossier qui existe → la copie va dedans, avec le même nom.\nPour changer aussi le nom : cp fichierTest1.txt rangement/sauvegarde.txt\nAstuce : le / final garantit qu'on vise un dossier."
 },
 {
  "cmd": "cp -r",
  "role": "Copier un dossier entier avec tout son contenu",
  "exemple": "cp -r rangement rangement2",
  "categorie": "Linux",
  "notes": "-r = « récursif » (le dossier et tout ce qu'il contient).\nSans -r : cp: -r not specified; omitting directory (le dossier est ignoré)."
 },
 {
  "cmd": "cp -i",
  "role": "Copier en demandant confirmation avant d'écraser un fichier existant",
  "exemple": "cp -i fichierTest1.txt copie1.txt",
  "categorie": "Linux",
  "notes": "-i = « interactif ». Sans -i, cp écrase la destination SANS prévenir.\nQuestion : cp: overwrite 'copie1.txt'? → y (oui) ou n (non), puis Entrée."
 },
 {
  "cmd": "mv",
  "role": "Déplacer ou renommer un fichier ou un dossier",
  "exemple": "mv brouillon.txt notes.txt",
  "categorie": "Linux",
  "notes": "« Move » : déplace un fichier ou un dossier. Si la destination est un nouveau nom dans le même dossier, c'est un renommage. Pas besoin de -r pour les dossiers.\nOptions :\n  -i → demande confirmation avant d'écraser\n⚠️ Comme cp, écrase la destination sans prévenir (sauf avec -i).\n📌 Renommer = déplacer vers un nouveau nom. Pas de -r nécessaire pour un dossier."
 },
 {
  "cmd": "mv ancien nouveau",
  "role": "Renommer un fichier ou un dossier",
  "exemple": "mv copie1.txt brouillon.txt",
  "categorie": "Linux",
  "notes": "Renommer = déplacer vers un nouveau nom, au même endroit. L'ancien nom disparaît.\nPas besoin de -r pour un dossier."
 },
 {
  "cmd": "mv fichier dossier/",
  "role": "Déplacer un fichier dans un dossier",
  "exemple": "mv brouillon.txt rangement/",
  "categorie": "Linux",
  "notes": "Même ordre que cp : SOURCE puis DESTINATION. Différence avec cp : l'original quitte son ancienne place.\nmv -i : demande avant d'écraser."
 },
 {
  "cmd": "rm",
  "role": "Supprimer des fichiers (définitivement)",
  "exemple": "rm -ri ancien_dossier",
  "categorie": "Linux",
  "notes": "« Remove » : supprime des fichiers. Il n'y a pas de corbeille : ce qui est supprimé est perdu. Pour supprimer un dossier et son contenu, il faut -r.\nOptions :\n  -r → supprime un dossier et tout son contenu\n  -i → demande confirmation pour chaque fichier\n  -f → force, sans aucune question (dangereux)\n⚠️ Vérifie toujours avec ls ce que tu vas supprimer avant de lancer rm, surtout avec *.\n📌 ⚠️ Pas de corbeille. -r pour un dossier, -i pour confirmer. Éviter rm -rf sauf certitude."
 },
 {
  "cmd": "rm -i",
  "role": "Supprimer en demandant confirmation pour chaque fichier",
  "exemple": "rm -i essai.txt",
  "categorie": "Linux",
  "notes": "Pas de corbeille sous Linux : rm est définitif. -i = « interactif », conseillé quand on débute.\nQuestion : rm: remove regular empty file 'essai.txt'? → y ou n."
 },
 {
  "cmd": "rm -r",
  "role": "Supprimer un dossier et TOUT son contenu",
  "exemple": "rm -ri sauvegarde_robot",
  "categorie": "Linux",
  "notes": "-r = « récursif ». Sans -r : cannot remove '…': Is a directory.\nToujours vérifier avec ls -R avant. Version prudente : rm -ri.\nrm -rf (f = force, sans question) : à éviter tant qu'on n'est pas sûr de soi."
 },
 {
  "cmd": "rmdir",
  "role": "Supprimer un dossier vide",
  "exemple": "rmdir dossier_vide",
  "categorie": "Linux",
  "notes": "Supprime un dossier seulement s'il est vide. Plus sûr que rm -r : si le dossier contient encore quelque chose, la commande refuse.\n📌 Refuse si le dossier n'est pas vide : version prudente de rm -r."
 },
 {
  "cmd": "* et ?",
  "role": "Jokers : désigner plusieurs fichiers d'un coup",
  "exemple": "ls *.txt",
  "categorie": "Linux",
  "notes": "Les jokers (wildcards) remplacent des caractères dans un nom : * remplace n'importe quelle suite de caractères, ? remplace un seul caractère. Le terminal les remplace par la liste des fichiers correspondants avant d'exécuter la commande.\n⚠️ rm * supprime tout le dossier courant. Teste d'abord le motif avec ls.\n📌 *.txt = tous les .txt · photo?.jpg = photo1.jpg, photoA.jpg… Tester avec ls avant rm."
 },
 {
  "cmd": "nano",
  "role": "Éditer un fichier texte dans le terminal",
  "exemple": "nano config/phrases.txt",
  "categorie": "Linux",
  "notes": "Un éditeur de texte simple qui s'ouvre dans le terminal. Les raccourcis sont affichés en bas de l'écran : ^ veut dire Ctrl. Si le fichier n'existe pas, il sera créé à l'enregistrement.\nOptions :\n  Ctrl + O puis Entrée → enregistrer\n  Ctrl + X → quitter (propose d'enregistrer si besoin)\n  Ctrl + W → chercher un mot\n  Ctrl + K / Ctrl + U → couper une ligne / la coller\n  Alt + U → annuler\n📌 ^ = Ctrl. Ctrl+O enregistrer, Ctrl+X quitter, Ctrl+W chercher, Ctrl+K couper, Ctrl+U coller."
 },
 {
  "cmd": "cat",
  "role": "Afficher tout le contenu d'un fichier",
  "exemple": "cat -n config/phrases.txt",
  "categorie": "Linux",
  "notes": "Affiche le contenu complet d'un fichier d'un seul coup. Parfait pour les petits fichiers. Pour les gros fichiers, utilise plutôt less. (Le nom vient de « concatenate » : cat a b affiche les deux fichiers à la suite.)\nOptions :\n  -n → numérote les lignes\n📌 Pour les petits fichiers. -n numérote les lignes. Gros fichier → less."
 },
 {
  "cmd": "cat -n",
  "role": "Afficher un fichier avec les lignes numérotées",
  "exemple": "cat -n phrases.txt",
  "categorie": "Linux",
  "notes": "-n = « number ». Pratique pour repérer une ligne précise (par exemple quand une erreur Python cite un numéro de ligne)."
 },
 {
  "cmd": "less",
  "role": "Lire un long fichier page par page",
  "exemple": "less /etc/os-release",
  "categorie": "Linux",
  "notes": "Ouvre un fichier en lecture seule, page par page, sans le charger d'un coup. Idéal pour les longs fichiers et les journaux (logs).\nOptions :\n  Espace / b → page suivante / précédente\n  /mot puis Entrée → chercher « mot » (n = occurrence suivante)\n  g / G → aller au début / à la fin\n  q → quitter\n📌 Espace page suivante · b précédente · /mot chercher · n suivant · q quitter"
 },
 {
  "cmd": "head",
  "role": "Afficher les premières lignes d'un fichier",
  "exemple": "head -n 3 essais.csv",
  "categorie": "Linux",
  "notes": "Affiche le début d'un fichier : 10 lignes par défaut. Pratique pour jeter un œil à un gros fichier de données (par exemple l'en-tête d'un CSV).\nOptions :\n  -n 5 → affiche les 5 premières lignes\n📌 10 lignes par défaut, -n pour choisir le nombre."
 },
 {
  "cmd": "head -n",
  "role": "Afficher les N premières lignes d'un fichier",
  "exemple": "head -n 3 phrases.txt",
  "categorie": "Linux",
  "notes": "head = la tête (le début). Sans -n : 10 lignes."
 },
 {
  "cmd": "tail",
  "role": "Afficher les dernières lignes d'un fichier",
  "exemple": "tail -f robot.log",
  "categorie": "Linux",
  "notes": "Affiche la fin d'un fichier : 10 lignes par défaut. Avec -f (follow), il reste ouvert et affiche en direct les nouvelles lignes : indispensable pour surveiller le journal de ton robot pendant qu'il tourne.\nOptions :\n  -n 20 → affiche les 20 dernières lignes\n  -f → suit le fichier en direct (Ctrl + C pour arrêter)\n📌 -n nombre de lignes · -f suivre en direct (logs). Ctrl+C pour arrêter."
 },
 {
  "cmd": "tail -n",
  "role": "Afficher les N dernières lignes d'un fichier",
  "exemple": "tail -n 2 phrases.txt",
  "categorie": "Linux",
  "notes": "tail = la queue (la fin). Sans -n : 10 lignes."
 },
 {
  "cmd": "tail -f",
  "role": "Suivre un fichier en direct (affiche les lignes au fur et à mesure qu'elles s'ajoutent)",
  "exemple": "tail -f robot.log",
  "categorie": "Linux",
  "notes": "-f = « follow » (suivre). Ne rend pas la main, c'est normal : Ctrl + C pour arrêter.\nSur le robot : regarder son journal pendant qu'il fonctionne."
 },
 {
  "cmd": "echo",
  "role": "Afficher un texte (ou la valeur d'une variable)",
  "exemple": "echo \"Bonjour $USER\"",
  "categorie": "Linux",
  "notes": "Affiche le texte qu'on lui donne. Seul, ça semble inutile ; combiné aux redirections (>, >>), il sert à écrire dans un fichier, et avec $, à afficher des variables.\n📌 Avec > ou >> pour écrire dans un fichier. Avec $VAR pour afficher une variable."
 },
 {
  "cmd": ">",
  "role": "Envoyer le résultat d'une commande dans un fichier (en l'écrasant)",
  "exemple": "ls > liste.txt",
  "categorie": "Linux",
  "notes": "La redirection : au lieu d'afficher le résultat à l'écran, il est écrit dans un fichier. Le fichier est créé s'il n'existe pas, et son contenu est remplacé s'il existe.\n⚠️ > sur un fichier important le vide d'abord : attention.\n📌 ⚠️ Écrase le fichier. Pour ajouter à la fin : >>"
 },
 {
  "cmd": ">>",
  "role": "Ajouter le résultat d'une commande à la fin d'un fichier",
  "exemple": "echo \"J'ai faim\" >> config/phrases.txt",
  "categorie": "Linux",
  "notes": "Comme >, mais ajoute à la fin du fichier au lieu de l'écraser. Parfait pour tenir un journal.\n📌 Ajoute sans effacer. Idéal pour un journal."
 },
 {
  "cmd": "|",
  "role": "Envoyer le résultat d'une commande à une autre commande (tube)",
  "exemple": "cat phrases.txt | grep -i \"mal\" | wc -l",
  "categorie": "Linux",
  "notes": "Le tube (pipe, touche AltGr + 6) relie deux commandes : la sortie de la première devient l'entrée de la seconde. C'est l'idée centrale de Linux : de petites commandes simples qu'on enchaîne pour faire des choses puissantes.\n📌 sortie de gauche → entrée de droite. On peut en enchaîner plusieurs."
 },
 {
  "cmd": "grep",
  "role": "Chercher un mot ou un motif dans des fichiers",
  "exemple": "grep -rin \"soif\" config/",
  "categorie": "Linux",
  "notes": "Affiche les lignes qui contiennent un mot (ou un motif). Indispensable pour retrouver une information dans du code, une configuration ou des journaux.\nOptions :\n  -i → ignore majuscules/minuscules\n  -n → affiche le numéro de ligne\n  -r → cherche dans tous les fichiers d'un dossier (récursif)\n  -v → inverse : lignes qui ne contiennent PAS le mot\n  -c → compte les lignes trouvées\n📌 -i sans casse · -n numéros · -r dans un dossier · -v inverse · -c compter"
 },
 {
  "cmd": "grep -i",
  "role": "Chercher un mot sans tenir compte des majuscules/minuscules",
  "exemple": "grep -i MERCI phrases.txt",
  "categorie": "Linux",
  "notes": "-i = « ignore case ». Trouve Merci, MERCI et merci."
 },
 {
  "cmd": "grep -n",
  "role": "Chercher un mot et afficher le numéro des lignes trouvées",
  "exemple": "grep -n mal phrases.txt",
  "categorie": "Linux",
  "notes": "Résultat sous la forme 3:J'ai mal (numéro de ligne : contenu)."
 },
 {
  "cmd": "grep -r",
  "role": "Chercher un mot dans tous les fichiers d'un dossier",
  "exemple": "grep -r mal ~/testLinux",
  "categorie": "Linux",
  "notes": "-r = « récursif ». Chaque résultat commence par le nom du fichier.\nSe combine : grep -rin mot dossier/"
 },
 {
  "cmd": "grep -v",
  "role": "Afficher les lignes qui NE contiennent PAS le mot",
  "exemple": "grep -v J phrases.txt",
  "categorie": "Linux",
  "notes": "-v = « inverse ». Utile pour retirer des lignes sans intérêt."
 },
 {
  "cmd": "grep -c",
  "role": "Compter les lignes qui contiennent le mot",
  "exemple": "grep -c veux phrases.txt",
  "categorie": "Linux",
  "notes": "Affiche un nombre au lieu des lignes. Équivaut à : grep veux phrases.txt | wc -l"
 },
 {
  "cmd": "wc",
  "role": "Compter les lignes, mots et caractères",
  "exemple": "wc -l config/phrases.txt",
  "categorie": "Linux",
  "notes": "« Word Count » : compte les lignes, les mots et les octets d'un fichier (ou de ce qu'on lui envoie par un tube).\nOptions :\n  -l → lignes seulement\n  -w → mots seulement\n  -c → octets seulement\n📌 -l lignes · -w mots · -c octets. Souvent après un tube : … | wc -l"
 },
 {
  "cmd": "wc -l",
  "role": "Compter les lignes d'un fichier",
  "exemple": "wc -l phrases.txt",
  "categorie": "Linux",
  "notes": "-l = « lines ». Résultat : 9 phrases.txt. Et -w compte les mots, -c les octets."
 },
 {
  "cmd": "ls -l (droits)",
  "role": "Lire les droits d'accès d'un fichier",
  "exemple": "ls -l bonjour.sh",
  "categorie": "Linux",
  "notes": "Les 10 premiers caractères de ls -l décrivent le fichier : 1 caractère de type (d dossier, - fichier), puis 3 groupes de 3 droits pour le propriétaire, le groupe et les autres. r = lire, w = écrire, x = exécuter (pour un dossier : y entrer), - = droit absent.\n📌 type + 3×(r w x) : moi / groupe / autres. r=lire w=écrire x=exécuter"
 },
 {
  "cmd": "chmod",
  "role": "Changer les droits d'un fichier",
  "exemple": "chmod +x bonjour.sh",
  "categorie": "Linux",
  "notes": "« Change Mode » : modifie les droits. Le cas le plus courant : rendre un script exécutable avec +x. Forme chiffrée : chaque droit vaut un nombre (r = 4, w = 2, x = 1) qu'on additionne pour moi / groupe / autres. Ainsi 755 = rwx r-x r-x et 644 = rw- r-- r--.\nOptions :\n  +x → ajoute le droit d'exécution\n  -w → retire le droit d'écriture\n  755 / 644 → forme chiffrée (script / fichier normal)\n📌 +x = exécutable. Chiffres : r=4 w=2 x=1 → 755 script, 644 fichier normal"
 },
 {
  "cmd": "chmod +x",
  "role": "Rendre un fichier exécutable (pour pouvoir le lancer)",
  "exemple": "chmod +x bonjour.sh",
  "categorie": "Linux",
  "notes": "+x = ajouter le droit d'exécution. Ensuite : ./bonjour.sh\nSans lui : Permission denied."
 },
 {
  "cmd": "./script.sh",
  "role": "Lancer un programme ou un script du dossier courant",
  "exemple": "./bonjour.sh",
  "categorie": "Linux",
  "notes": "Pour lancer un fichier exécutable qui se trouve dans le dossier courant, il faut écrire ./ devant son nom (. = « ici »). Par sécurité, Linux ne cherche pas les programmes dans le dossier courant automatiquement.\n📌 ./ = dans le dossier courant. Il faut d'abord chmod +x. Erreur « Permission denied » = pas exécutable."
 },
 {
  "cmd": "sudo",
  "role": "Exécuter une commande en administrateur",
  "exemple": "sudo apt update",
  "categorie": "Linux",
  "notes": "« Super User Do » : exécute la commande avec les droits d'administrateur (root). Nécessaire pour installer des logiciels ou modifier le système. Ton mot de passe est demandé : rien ne s'affiche quand tu le tapes, c'est normal.\n⚠️ Ne mets pas sudo devant tout « pour que ça marche » : une erreur en administrateur peut casser le système. Et jamais sudo pip install.\n📌 Mot de passe invisible quand on le tape. À n'utiliser que quand c'est nécessaire."
 },
 {
  "cmd": "apt update",
  "role": "Mettre à jour la liste des logiciels disponibles",
  "exemple": "sudo apt update",
  "categorie": "Linux",
  "notes": "Télécharge la liste à jour des logiciels et de leurs versions. N'installe rien : c'est l'étape à faire avant apt install ou apt upgrade.\n📌 Met à jour la LISTE seulement. Toujours avant install/upgrade."
 },
 {
  "cmd": "apt upgrade",
  "role": "Installer les mises à jour des logiciels",
  "exemple": "sudo apt update && sudo apt upgrade -y",
  "categorie": "Linux",
  "notes": "Installe les nouvelles versions de tous les logiciels déjà installés (d'après la liste obtenue avec apt update).\nOptions :\n  -y → répond « oui » automatiquement\n📌 && = lance la 2e commande seulement si la 1re a réussi."
 },
 {
  "cmd": "apt install",
  "role": "Installer un logiciel",
  "exemple": "sudo apt install -y tree htop",
  "categorie": "Linux",
  "notes": "Télécharge et installe un logiciel (un « paquet ») ainsi que tout ce dont il a besoin. On peut en installer plusieurs à la fois.\nOptions :\n  -y → sans demander de confirmation\n📌 Plusieurs paquets possibles d'un coup. Voir aussi : apt search, apt remove."
 },
 {
  "cmd": "apt search",
  "role": "Chercher un logiciel à installer",
  "exemple": "apt search opencv",
  "categorie": "Linux",
  "notes": "Cherche un paquet par mot-clé dans la liste des logiciels disponibles. Ne nécessite pas sudo.\n📌 Pas besoin de sudo. Pour désinstaller : sudo apt remove nom"
 },
 {
  "cmd": "ps aux",
  "role": "Lister tous les programmes en cours",
  "exemple": "ps aux | grep python",
  "categorie": "Linux",
  "notes": "Affiche tous les processus (programmes en cours d'exécution) avec leur PID (numéro d'identification), leur utilisation du processeur et de la mémoire. Presque toujours utilisé avec grep pour trouver un programme précis.\n📌 2e colonne = PID. Combiner avec | grep nom."
 },
 {
  "cmd": "kill",
  "role": "Arrêter un programme grâce à son numéro (PID)",
  "exemple": "kill 4321",
  "categorie": "Linux",
  "notes": "Envoie un signal d'arrêt au processus dont on donne le PID. D'abord un arrêt « poli » ; si le programme ne répond pas, kill -9 le force à s'arrêter.\nOptions :\n  kill PID → demande l'arrêt propre\n  kill -9 PID → arrêt forcé (en dernier recours)\n📌 Trouver le PID avec ps aux | grep. -9 = forcer (dernier recours). Programme au premier plan : Ctrl+C."
 },
 {
  "cmd": "kill -9",
  "role": "Forcer l'arrêt d'un programme bloqué",
  "exemple": "kill -9 4321",
  "categorie": "Linux",
  "notes": "Seulement si kill PID (arrêt propre) ne suffit pas. Le PID (numéro du programme) se trouve avec ps aux."
 },
 {
  "cmd": "htop",
  "role": "Voir en direct l'activité du processeur et de la mémoire",
  "exemple": "htop",
  "categorie": "Linux",
  "notes": "Un tableau de bord en direct : utilisation de chaque cœur du processeur, de la mémoire, et liste des programmes triable. Très utile sur le Raspberry Pi pour voir ce qui ralentit le robot.\nOptions :\n  F6 → choisir la colonne de tri\n  F9 → arrêter le programme sélectionné\n  q ou F10 → quitter\n📌 À installer : sudo apt install htop. q pour quitter."
 },
 {
  "cmd": "&",
  "role": "Lancer un programme en arrière-plan",
  "exemple": "sleep 300 &",
  "categorie": "Linux",
  "notes": "Ajouté à la fin d'une commande, & la lance en arrière-plan : tu récupères la main tout de suite pendant qu'elle tourne. jobs liste ces tâches, fg ramène la dernière au premier plan.\n📌 jobs = lister · fg = ramener au premier plan · le nombre affiché est le PID"
 },
 {
  "cmd": "df -h",
  "role": "Voir la place libre sur les disques",
  "exemple": "df -h ~",
  "categorie": "Linux",
  "notes": "« Disk Free » : affiche, pour chaque disque, la taille, l'espace utilisé et l'espace libre. -h rend les tailles lisibles.\n📌 Colonne « Disp. » = place libre. Utile avant d'enregistrer des données."
 },
 {
  "cmd": "du -sh",
  "role": "Connaître la taille d'un dossier",
  "exemple": "du -sh ~/apprentissage",
  "categorie": "Linux",
  "notes": "« Disk Usage » : calcule la place occupée par un dossier. -s donne un total (summary), -h des tailles lisibles.\n📌 -s total · -h lisible. du -sh * = taille de chaque élément du dossier."
 },
 {
  "cmd": "free -h",
  "role": "Voir la mémoire vive (RAM) utilisée et libre",
  "exemple": "free -h",
  "categorie": "Linux",
  "notes": "Affiche la mémoire vive totale, utilisée et disponible. La colonne importante est « disponible ».\n📌 Regarder la colonne « disponible »."
 },
 {
  "cmd": "$VARIABLE",
  "role": "Utiliser une variable d'environnement",
  "exemple": "echo $PATH",
  "categorie": "Linux",
  "notes": "Le terminal garde des variables : $HOME (ton dossier personnel), $USER (ton nom d'utilisateur), $PATH (la liste des dossiers où Linux cherche les programmes). export NOM=valeur en crée une, valable jusqu'à la fermeture du terminal.\n📌 $HOME, $USER, $PATH. export NOM=valeur pour en créer une (temporaire)."
 },
 {
  "cmd": "which",
  "role": "Trouver où est installé un programme",
  "exemple": "which python3",
  "categorie": "Linux",
  "notes": "Affiche le chemin du programme qui sera réellement lancé quand tu tapes son nom. Très utile pour vérifier quel Python est utilisé (celui du système ou celui de ton environnement virtuel).\n📌 Pour vérifier quel python est utilisé (venv activé ou non)."
 },
 {
  "cmd": "man",
  "role": "Lire le manuel d'une commande",
  "exemple": "man ls",
  "categorie": "Linux",
  "notes": "Ouvre le manuel complet d'une commande : toutes ses options et leur rôle. Il se lit comme less (Espace, /mot, q). Plus court : commande --help.\n📌 Navigation comme less : /mot chercher, q quitter. Version courte : commande --help"
 },
 {
  "cmd": "history",
  "role": "Afficher l'historique des commandes tapées",
  "exemple": "history | tail -n 5",
  "categorie": "Linux",
  "notes": "Liste les commandes que tu as tapées, numérotées. !n relance la commande numéro n, !! relance la dernière.\n📌 !! relance la dernière commande (sudo !! = la relancer en administrateur). Ctrl+R pour chercher."
 },
 {
  "cmd": "curl",
  "role": "Télécharger depuis internet dans le terminal",
  "exemple": "curl -LsSf https://astral.sh/uv/install.sh | sh",
  "categorie": "Linux",
  "notes": "Télécharge le contenu d'une adresse web. Utilisé pour récupérer des fichiers ou des scripts d'installation. curl … | sh télécharge un script et l'exécute directement.\nOptions :\n  -L → suit les redirections\n  -O → enregistre dans un fichier du même nom\n  -s / -S → silencieux / mais affiche les erreurs\n  -f → échoue proprement si le serveur renvoie une erreur\n⚠️ curl … | sh exécute un programme venu d'internet : ne le fais que pour des sites officiels et connus.\n📌 curl -O URL pour enregistrer un fichier. Ne lancer « | sh » que depuis une source de confiance."
 },
 {
  "cmd": "source ~/.bashrc",
  "role": "Recharger la configuration du terminal",
  "exemple": "source ~/.bashrc",
  "categorie": "Linux",
  "notes": ".bashrc est le fichier de configuration lu à l'ouverture de chaque terminal. Après une installation qui le modifie (comme uv), source le relit sans avoir à fermer et rouvrir le terminal.\n📌 Équivaut à fermer et rouvrir le terminal."
 },
 {
  "cmd": "uv python install",
  "role": "Installer une version précise de Python",
  "exemple": "uv python install 3.11",
  "categorie": "Python",
  "notes": "uv télécharge et installe la version de Python demandée, à côté de celle du système, sans rien casser. Indispensable car MediaPipe demande Python 3.11 alors qu'Ubuntu en fournit une plus récente.\n📌 N'altère pas le Python du système. uv python list pour voir les versions disponibles."
 },
 {
  "cmd": "uv venv",
  "role": "Créer un environnement virtuel Python",
  "exemple": "uv venv --python 3.11 .venv",
  "categorie": "Python",
  "notes": "Crée un dossier (.venv) qui contient une version de Python et ses propres bibliothèques, isolées du reste de l'ordinateur. Un environnement par projet.\n📌 Un .venv par projet. À mettre dans .gitignore. Se recrée facilement avec requirements.txt."
 },
 {
  "cmd": "source .venv/bin/activate",
  "role": "Activer l'environnement virtuel",
  "exemple": "source .venv/bin/activate",
  "categorie": "Python",
  "notes": "Active l'environnement : à partir de là, python et pip utilisent ceux du .venv. Le nom (.venv) apparaît au début de la ligne de commande. deactivate pour en sortir.\n📌 (.venv) devant le prompt = actif. deactivate pour sortir. À refaire dans chaque nouveau terminal."
 },
 {
  "cmd": "uv pip install",
  "role": "Installer une bibliothèque Python dans l'environnement",
  "exemple": "uv pip install numpy opencv-python",
  "categorie": "Python",
  "notes": "Installe une ou plusieurs bibliothèques dans l'environnement virtuel activé. -r requirements.txt installe toute une liste d'un coup.\nOptions :\n  -r requirements.txt → installe toutes les bibliothèques de la liste\n⚠️ ModuleNotFoundError en lançant ton programme ? L'environnement n'est probablement pas activé.\n📌 Jamais sudo pip install. -r requirements.txt pour tout réinstaller."
 },
 {
  "cmd": "uv pip install -r",
  "role": "Installer toutes les bibliothèques listées dans un fichier",
  "exemple": "uv pip install -r requirements.txt",
  "categorie": "Python",
  "notes": "Le fichier se crée avec : uv pip freeze > requirements.txt\nPermet de réinstaller le même environnement sur le Raspberry Pi."
 },
 {
  "cmd": "uv pip freeze",
  "role": "Lister les bibliothèques installées (avec leurs versions)",
  "exemple": "uv pip freeze > requirements.txt",
  "categorie": "Python",
  "notes": "Affiche toutes les bibliothèques de l'environnement avec leur version exacte. Redirigé dans requirements.txt, ça permet de réinstaller exactement la même chose ailleurs (sur le Raspberry Pi).\n📌 > requirements.txt pour sauvegarder la liste. À refaire après chaque installation."
 },
 {
  "cmd": "python fichier.py",
  "role": "Lancer un programme Python",
  "exemple": "python phrases.py",
  "categorie": "Python",
  "notes": "Exécute un programme Python. Si l'environnement est activé, c'est le Python du .venv qui est utilisé. python --version affiche la version.\n📌 Vérifier la version : python --version. Arrêter un programme : Ctrl+C."
 },
 {
  "cmd": "git config",
  "role": "Configurer Git (nom, e-mail)",
  "exemple": "git config --global user.name \"Ton Nom\"",
  "categorie": "Git",
  "notes": "À faire une seule fois sur chaque ordinateur : indique ton nom et ton e-mail, qui seront inscrits dans chaque commit.\n📌 Aussi : git config --global user.email \"...\" et git config --global init.defaultBranch main"
 },
 {
  "cmd": "git init",
  "role": "Créer un dépôt Git dans le dossier courant",
  "exemple": "git init",
  "categorie": "Git",
  "notes": "Transforme le dossier courant en dépôt Git : un dossier caché .git est créé pour stocker tout l'historique. À faire une fois par projet.\n📌 Une fois par projet. Crée le dossier caché .git (ne pas le supprimer)."
 },
 {
  "cmd": "git status",
  "role": "Voir ce qui a changé depuis le dernier commit",
  "exemple": "git status",
  "categorie": "Git",
  "notes": "Ta commande « boussole » : indique les fichiers modifiés, nouveaux, ou prêts à être enregistrés. Lance-la avant et après chaque autre commande Git.\n📌 À taper tout le temps. Rouge = modifié non préparé · vert = préparé (add)."
 },
 {
  "cmd": "git add",
  "role": "Préparer des fichiers pour le prochain commit",
  "exemple": "git add config/phrases.txt",
  "categorie": "Git",
  "notes": "Place les modifications dans la zone de préparation : c'est choisir ce qui fera partie de la prochaine « photo » (commit). git add . prépare tout le dossier.\n📌 git add . = tout préparer. Trajet : modifié → (add) → préparé → (commit) → historique"
 },
 {
  "cmd": "git commit",
  "role": "Enregistrer une version dans l'historique",
  "exemple": "git commit -m \"Ajout des phrases du mode C\"",
  "categorie": "Git",
  "notes": "Prend une photo de tout ce qui est préparé et l'enregistre dans l'historique, avec un message qui explique ce qui a changé et pourquoi.\nOptions :\n  -m \"message\" → donne le message directement\n📌 Un commit = une modification cohérente. Message clair au présent ou à l'infinitif."
 },
 {
  "cmd": "git commit -m",
  "role": "Enregistrer une version avec son message, en une seule commande",
  "exemple": "git commit -m \"Ajout des phrases du mode C\"",
  "categorie": "Git",
  "notes": "-m = « message ». Sans -m, Git ouvre un éditeur pour écrire le message."
 },
 {
  "cmd": "git log",
  "role": "Afficher l'historique des commits",
  "exemple": "git log --oneline",
  "categorie": "Git",
  "notes": "Liste les commits, du plus récent au plus ancien. Chaque commit a un identifiant (une suite de chiffres et de lettres) qui permet d'y revenir.\nOptions :\n  --oneline → une ligne par commit (plus lisible)\n📌 --oneline pour un affichage court. q pour quitter si la liste est longue."
 },
 {
  "cmd": "git log --oneline",
  "role": "Afficher l'historique des commits, une ligne par commit",
  "exemple": "git log --oneline",
  "categorie": "Git",
  "notes": "Chaque ligne : identifiant court + message. q pour quitter si la liste est longue."
 },
 {
  "cmd": "git diff",
  "role": "Voir précisément ce qui a été modifié",
  "exemple": "git diff",
  "categorie": "Git",
  "notes": "Affiche les lignes ajoutées (en vert, avec +) et supprimées (en rouge, avec -) depuis le dernier commit, pour les modifications pas encore préparées.\n📌 + ajouté · - supprimé. git diff --staged pour ce qui est déjà préparé."
 },
 {
  "cmd": "git restore",
  "role": "Annuler des modifications d'un fichier",
  "exemple": "git restore config/phrases.txt",
  "categorie": "Git",
  "notes": "Remet un fichier dans l'état du dernier commit (les modifications non enregistrées sont perdues). Avec --source=identifiant, le remet dans l'état d'un commit plus ancien.\n📌 --source=<id> pour revenir à une ancienne version. ⚠️ Les modifications non commitées sont perdues."
 },
 {
  "cmd": ".gitignore",
  "role": "Lister les fichiers que Git doit ignorer",
  "exemple": "echo \".venv/\" >> .gitignore",
  "categorie": "Git",
  "notes": "Un fichier texte à la racine du projet : chaque ligne est un nom ou un motif que Git ne suivra jamais (environnements virtuels, vidéos, données personnelles…).\n📌 Mettre : .venv/, __pycache__/, les vidéos, les données des signeurs."
 },
 {
  "cmd": "git push",
  "role": "Envoyer ses commits sur GitHub",
  "exemple": "git push -u origin main",
  "categorie": "Git",
  "notes": "Envoie tes commits vers le dépôt en ligne (GitHub). La première fois, il faut relier le dossier au dépôt avec git remote add origin URL, puis git push -u origin main. Ensuite, git push suffit.\n📌 1re fois : git remote add origin URL. Connexion simple à GitHub : gh auth login"
 },
 {
  "cmd": "git clone",
  "role": "Télécharger un dépôt existant",
  "exemple": "git clone https://github.com/utilisateur/projet.git",
  "categorie": "Git",
  "notes": "Copie un dépôt en ligne avec tout son historique sur l'ordinateur. C'est comme ça que tu installeras ton projet sur le Raspberry Pi. git pull récupère ensuite les nouveautés.\n📌 git pull = récupérer les derniers commits d'un dépôt déjà cloné."
 },
 {
  "cmd": "code .",
  "role": "Ouvrir le dossier courant dans VS Code",
  "exemple": "code .",
  "categorie": "Outils",
  "notes": "Ouvre VS Code sur le dossier courant (. = ici). Depuis WSL, VS Code s'ouvre « connecté » à Linux : son terminal est un terminal Ubuntu.\n📌 Nécessite VS Code + l'extension WSL. Choisir le Python du .venv : Ctrl+Maj+P → Python: Select Interpreter"
 },
 {
  "cmd": "explorer.exe .",
  "role": "Ouvrir le dossier courant dans l'Explorateur Windows",
  "exemple": "explorer.exe .",
  "categorie": "Outils",
  "notes": "Spécifique à WSL : ouvre le dossier Linux courant dans l'Explorateur de fichiers Windows, pour y glisser des fichiers par exemple.\n📌 WSL seulement. Fichiers Windows depuis Linux : /mnt/c/Users/E14/"
 },
 {
  "cmd": "/mnt/c",
  "role": "Accéder au disque C: de Windows depuis Linux (WSL)",
  "exemple": "cd \"/mnt/c/Users/E14/Desktop/robot suiveur de geste\"",
  "categorie": "Linux",
  "notes": "C: devient /mnt/c, les \\ deviennent des /, et les majuscules comptent.\nGuillemets obligatoires si le nom contient des espaces.\nLe ~ de Linux (/home/e14paul) n'est PAS ton dossier Windows C:\\Users\\E14."
 }
];
