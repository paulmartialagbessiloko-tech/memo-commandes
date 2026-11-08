// Généré automatiquement à partir du guide APPRENDRE_LINUX (ne pas modifier à la main).
// Utilisé par le menu « Ajouter les commandes du guide ».
const EXEMPLES = [
 {
  "cmd": "pwd",
  "role": "Afficher le dossier où je me trouve",
  "exemple": "pwd",
  "categorie": "Linux",
  "notes": "Print Working Directory. Toujours le premier réflexe quand on est perdu."
 },
 {
  "cmd": "ls",
  "role": "Lister le contenu d'un dossier",
  "exemple": "ls -lah ~/apprentissage",
  "categorie": "Linux",
  "notes": "-l détails · -a cachés · -h tailles lisibles · -R sous-dossiers · -t par date. Les options se combinent : ls -lah"
 },
 {
  "cmd": "cd",
  "role": "Changer de dossier",
  "exemple": "cd ~/apprentissage/robot",
  "categorie": "Linux",
  "notes": "cd .. parent · cd ou cd ~ maison · cd - précédent · cd / racine. Touche Tab pour compléter les noms."
 },
 {
  "cmd": "clear",
  "role": "Effacer l'écran du terminal",
  "exemple": "clear",
  "categorie": "Linux",
  "notes": "Raccourci : Ctrl + L"
 },
 {
  "cmd": "Tab",
  "role": "Compléter automatiquement un nom ou une commande",
  "exemple": "cd ~/appr  puis Tab  →  cd ~/apprentissage/",
  "categorie": "Linux",
  "notes": "1 fois = compléter · 2 fois = voir les choix. Aussi : ↑ = commande précédente, Ctrl+R = chercher dans l'historique."
 },
 {
  "cmd": "mkdir",
  "role": "Créer un dossier",
  "exemple": "mkdir -p ~/apprentissage/robot/{src,config,donnees}",
  "categorie": "Linux",
  "notes": "-p crée les parents. Les accolades {a,b} créent plusieurs dossiers d'un coup."
 },
 {
  "cmd": "touch",
  "role": "Créer un fichier vide",
  "exemple": "touch config/phrases.txt",
  "categorie": "Linux",
  "notes": "Ne touche pas au contenu d'un fichier existant (met juste à jour sa date)."
 },
 {
  "cmd": "cp",
  "role": "Copier un fichier ou un dossier",
  "exemple": "cp -r robot robot_sauvegarde",
  "categorie": "Linux",
  "notes": "cp SOURCE DESTINATION · -r pour un dossier · -i demande avant d'écraser"
 },
 {
  "cmd": "mv",
  "role": "Déplacer ou renommer un fichier ou un dossier",
  "exemple": "mv brouillon.txt notes.txt",
  "categorie": "Linux",
  "notes": "Renommer = déplacer vers un nouveau nom. Pas de -r nécessaire pour un dossier."
 },
 {
  "cmd": "rm",
  "role": "Supprimer des fichiers (définitivement)",
  "exemple": "rm -ri ancien_dossier",
  "categorie": "Linux",
  "notes": "⚠️ Pas de corbeille. -r pour un dossier, -i pour confirmer. Éviter rm -rf sauf certitude."
 },
 {
  "cmd": "rmdir",
  "role": "Supprimer un dossier vide",
  "exemple": "rmdir dossier_vide",
  "categorie": "Linux",
  "notes": "Refuse si le dossier n'est pas vide : version prudente de rm -r."
 },
 {
  "cmd": "* et ?",
  "role": "Jokers : désigner plusieurs fichiers d'un coup",
  "exemple": "ls *.txt",
  "categorie": "Linux",
  "notes": "*.txt = tous les .txt · photo?.jpg = photo1.jpg, photoA.jpg… Tester avec ls avant rm."
 },
 {
  "cmd": "nano",
  "role": "Éditer un fichier texte dans le terminal",
  "exemple": "nano config/phrases.txt",
  "categorie": "Linux",
  "notes": "^ = Ctrl. Ctrl+O enregistrer, Ctrl+X quitter, Ctrl+W chercher, Ctrl+K couper, Ctrl+U coller."
 },
 {
  "cmd": "cat",
  "role": "Afficher tout le contenu d'un fichier",
  "exemple": "cat -n config/phrases.txt",
  "categorie": "Linux",
  "notes": "Pour les petits fichiers. -n numérote les lignes. Gros fichier → less."
 },
 {
  "cmd": "less",
  "role": "Lire un long fichier page par page",
  "exemple": "less /etc/os-release",
  "categorie": "Linux",
  "notes": "Espace page suivante · b précédente · /mot chercher · n suivant · q quitter"
 },
 {
  "cmd": "head",
  "role": "Afficher les premières lignes d'un fichier",
  "exemple": "head -n 3 essais.csv",
  "categorie": "Linux",
  "notes": "10 lignes par défaut, -n pour choisir le nombre."
 },
 {
  "cmd": "tail",
  "role": "Afficher les dernières lignes d'un fichier",
  "exemple": "tail -f robot.log",
  "categorie": "Linux",
  "notes": "-n nombre de lignes · -f suivre en direct (logs). Ctrl+C pour arrêter."
 },
 {
  "cmd": "echo",
  "role": "Afficher un texte (ou la valeur d'une variable)",
  "exemple": "echo \"Bonjour $USER\"",
  "categorie": "Linux",
  "notes": "Avec > ou >> pour écrire dans un fichier. Avec $VAR pour afficher une variable."
 },
 {
  "cmd": ">",
  "role": "Envoyer le résultat d'une commande dans un fichier (en l'écrasant)",
  "exemple": "ls > liste.txt",
  "categorie": "Linux",
  "notes": "⚠️ Écrase le fichier. Pour ajouter à la fin : >>"
 },
 {
  "cmd": ">>",
  "role": "Ajouter le résultat d'une commande à la fin d'un fichier",
  "exemple": "echo \"J'ai faim\" >> config/phrases.txt",
  "categorie": "Linux",
  "notes": "Ajoute sans effacer. Idéal pour un journal."
 },
 {
  "cmd": "|",
  "role": "Envoyer le résultat d'une commande à une autre commande (tube)",
  "exemple": "cat phrases.txt | grep -i \"mal\" | wc -l",
  "categorie": "Linux",
  "notes": "sortie de gauche → entrée de droite. On peut en enchaîner plusieurs."
 },
 {
  "cmd": "grep",
  "role": "Chercher un mot ou un motif dans des fichiers",
  "exemple": "grep -rin \"soif\" config/",
  "categorie": "Linux",
  "notes": "-i sans casse · -n numéros · -r dans un dossier · -v inverse · -c compter"
 },
 {
  "cmd": "wc",
  "role": "Compter les lignes, mots et caractères",
  "exemple": "wc -l config/phrases.txt",
  "categorie": "Linux",
  "notes": "-l lignes · -w mots · -c octets. Souvent après un tube : … | wc -l"
 },
 {
  "cmd": "ls -l (droits)",
  "role": "Lire les droits d'accès d'un fichier",
  "exemple": "ls -l bonjour.sh",
  "categorie": "Linux",
  "notes": "type + 3×(r w x) : moi / groupe / autres. r=lire w=écrire x=exécuter"
 },
 {
  "cmd": "chmod",
  "role": "Changer les droits d'un fichier",
  "exemple": "chmod +x bonjour.sh",
  "categorie": "Linux",
  "notes": "+x = exécutable. Chiffres : r=4 w=2 x=1 → 755 script, 644 fichier normal"
 },
 {
  "cmd": "./script.sh",
  "role": "Lancer un programme ou un script du dossier courant",
  "exemple": "./bonjour.sh",
  "categorie": "Linux",
  "notes": "./ = dans le dossier courant. Il faut d'abord chmod +x. Erreur « Permission denied » = pas exécutable."
 },
 {
  "cmd": "sudo",
  "role": "Exécuter une commande en administrateur",
  "exemple": "sudo apt update",
  "categorie": "Linux",
  "notes": "Mot de passe invisible quand on le tape. À n'utiliser que quand c'est nécessaire."
 },
 {
  "cmd": "apt update",
  "role": "Mettre à jour la liste des logiciels disponibles",
  "exemple": "sudo apt update",
  "categorie": "Linux",
  "notes": "Met à jour la LISTE seulement. Toujours avant install/upgrade."
 },
 {
  "cmd": "apt upgrade",
  "role": "Installer les mises à jour des logiciels",
  "exemple": "sudo apt update && sudo apt upgrade -y",
  "categorie": "Linux",
  "notes": "&& = lance la 2e commande seulement si la 1re a réussi."
 },
 {
  "cmd": "apt install",
  "role": "Installer un logiciel",
  "exemple": "sudo apt install -y tree htop",
  "categorie": "Linux",
  "notes": "Plusieurs paquets possibles d'un coup. Voir aussi : apt search, apt remove."
 },
 {
  "cmd": "apt search",
  "role": "Chercher un logiciel à installer",
  "exemple": "apt search opencv",
  "categorie": "Linux",
  "notes": "Pas besoin de sudo. Pour désinstaller : sudo apt remove nom"
 },
 {
  "cmd": "ps aux",
  "role": "Lister tous les programmes en cours",
  "exemple": "ps aux | grep python",
  "categorie": "Linux",
  "notes": "2e colonne = PID. Combiner avec | grep nom."
 },
 {
  "cmd": "kill",
  "role": "Arrêter un programme grâce à son numéro (PID)",
  "exemple": "kill 4321",
  "categorie": "Linux",
  "notes": "Trouver le PID avec ps aux | grep. -9 = forcer (dernier recours). Programme au premier plan : Ctrl+C."
 },
 {
  "cmd": "htop",
  "role": "Voir en direct l'activité du processeur et de la mémoire",
  "exemple": "htop",
  "categorie": "Linux",
  "notes": "À installer : sudo apt install htop. q pour quitter."
 },
 {
  "cmd": "&",
  "role": "Lancer un programme en arrière-plan",
  "exemple": "sleep 300 &",
  "categorie": "Linux",
  "notes": "jobs = lister · fg = ramener au premier plan · le nombre affiché est le PID"
 },
 {
  "cmd": "df -h",
  "role": "Voir la place libre sur les disques",
  "exemple": "df -h ~",
  "categorie": "Linux",
  "notes": "Colonne « Disp. » = place libre. Utile avant d'enregistrer des données."
 },
 {
  "cmd": "du -sh",
  "role": "Connaître la taille d'un dossier",
  "exemple": "du -sh ~/apprentissage",
  "categorie": "Linux",
  "notes": "-s total · -h lisible. du -sh * = taille de chaque élément du dossier."
 },
 {
  "cmd": "free -h",
  "role": "Voir la mémoire vive (RAM) utilisée et libre",
  "exemple": "free -h",
  "categorie": "Linux",
  "notes": "Regarder la colonne « disponible »."
 },
 {
  "cmd": "$VARIABLE",
  "role": "Utiliser une variable d'environnement",
  "exemple": "echo $PATH",
  "categorie": "Linux",
  "notes": "$HOME, $USER, $PATH. export NOM=valeur pour en créer une (temporaire)."
 },
 {
  "cmd": "which",
  "role": "Trouver où est installé un programme",
  "exemple": "which python3",
  "categorie": "Linux",
  "notes": "Pour vérifier quel python est utilisé (venv activé ou non)."
 },
 {
  "cmd": "man",
  "role": "Lire le manuel d'une commande",
  "exemple": "man ls",
  "categorie": "Linux",
  "notes": "Navigation comme less : /mot chercher, q quitter. Version courte : commande --help"
 },
 {
  "cmd": "history",
  "role": "Afficher l'historique des commandes tapées",
  "exemple": "history | tail -n 5",
  "categorie": "Linux",
  "notes": "!! relance la dernière commande (sudo !! = la relancer en administrateur). Ctrl+R pour chercher."
 },
 {
  "cmd": "curl",
  "role": "Télécharger depuis internet dans le terminal",
  "exemple": "curl -LsSf https://astral.sh/uv/install.sh | sh",
  "categorie": "Linux",
  "notes": "curl -O URL pour enregistrer un fichier. Ne lancer « | sh » que depuis une source de confiance."
 },
 {
  "cmd": "source ~/.bashrc",
  "role": "Recharger la configuration du terminal",
  "exemple": "source ~/.bashrc",
  "categorie": "Linux",
  "notes": "Équivaut à fermer et rouvrir le terminal."
 },
 {
  "cmd": "uv python install",
  "role": "Installer une version précise de Python",
  "exemple": "uv python install 3.11",
  "categorie": "Python",
  "notes": "N'altère pas le Python du système. uv python list pour voir les versions disponibles."
 },
 {
  "cmd": "uv venv",
  "role": "Créer un environnement virtuel Python",
  "exemple": "uv venv --python 3.11 .venv",
  "categorie": "Python",
  "notes": "Un .venv par projet. À mettre dans .gitignore. Se recrée facilement avec requirements.txt."
 },
 {
  "cmd": "source .venv/bin/activate",
  "role": "Activer l'environnement virtuel",
  "exemple": "source .venv/bin/activate",
  "categorie": "Python",
  "notes": "(.venv) devant le prompt = actif. deactivate pour sortir. À refaire dans chaque nouveau terminal."
 },
 {
  "cmd": "uv pip install",
  "role": "Installer une bibliothèque Python dans l'environnement",
  "exemple": "uv pip install numpy opencv-python",
  "categorie": "Python",
  "notes": "Jamais sudo pip install. -r requirements.txt pour tout réinstaller."
 },
 {
  "cmd": "uv pip freeze",
  "role": "Lister les bibliothèques installées (avec leurs versions)",
  "exemple": "uv pip freeze > requirements.txt",
  "categorie": "Python",
  "notes": "> requirements.txt pour sauvegarder la liste. À refaire après chaque installation."
 },
 {
  "cmd": "python fichier.py",
  "role": "Lancer un programme Python",
  "exemple": "python phrases.py",
  "categorie": "Python",
  "notes": "Vérifier la version : python --version. Arrêter un programme : Ctrl+C."
 },
 {
  "cmd": "git config",
  "role": "Configurer Git (nom, e-mail)",
  "exemple": "git config --global user.name \"Ton Nom\"",
  "categorie": "Git",
  "notes": "Aussi : git config --global user.email \"...\" et git config --global init.defaultBranch main"
 },
 {
  "cmd": "git init",
  "role": "Créer un dépôt Git dans le dossier courant",
  "exemple": "git init",
  "categorie": "Git",
  "notes": "Une fois par projet. Crée le dossier caché .git (ne pas le supprimer)."
 },
 {
  "cmd": "git status",
  "role": "Voir ce qui a changé depuis le dernier commit",
  "exemple": "git status",
  "categorie": "Git",
  "notes": "À taper tout le temps. Rouge = modifié non préparé · vert = préparé (add)."
 },
 {
  "cmd": "git add",
  "role": "Préparer des fichiers pour le prochain commit",
  "exemple": "git add config/phrases.txt",
  "categorie": "Git",
  "notes": "git add . = tout préparer. Trajet : modifié → (add) → préparé → (commit) → historique"
 },
 {
  "cmd": "git commit",
  "role": "Enregistrer une version dans l'historique",
  "exemple": "git commit -m \"Ajout des phrases du mode C\"",
  "categorie": "Git",
  "notes": "Un commit = une modification cohérente. Message clair au présent ou à l'infinitif."
 },
 {
  "cmd": "git log",
  "role": "Afficher l'historique des commits",
  "exemple": "git log --oneline",
  "categorie": "Git",
  "notes": "--oneline pour un affichage court. q pour quitter si la liste est longue."
 },
 {
  "cmd": "git diff",
  "role": "Voir précisément ce qui a été modifié",
  "exemple": "git diff",
  "categorie": "Git",
  "notes": "+ ajouté · - supprimé. git diff --staged pour ce qui est déjà préparé."
 },
 {
  "cmd": "git restore",
  "role": "Annuler des modifications d'un fichier",
  "exemple": "git restore config/phrases.txt",
  "categorie": "Git",
  "notes": "--source=<id> pour revenir à une ancienne version. ⚠️ Les modifications non commitées sont perdues."
 },
 {
  "cmd": ".gitignore",
  "role": "Lister les fichiers que Git doit ignorer",
  "exemple": "echo \".venv/\" >> .gitignore",
  "categorie": "Git",
  "notes": "Mettre : .venv/, __pycache__/, les vidéos, les données des signeurs."
 },
 {
  "cmd": "git push",
  "role": "Envoyer ses commits sur GitHub",
  "exemple": "git push -u origin main",
  "categorie": "Git",
  "notes": "1re fois : git remote add origin URL. Connexion simple à GitHub : gh auth login"
 },
 {
  "cmd": "git clone",
  "role": "Télécharger un dépôt existant",
  "exemple": "git clone https://github.com/utilisateur/projet.git",
  "categorie": "Git",
  "notes": "git pull = récupérer les derniers commits d'un dépôt déjà cloné."
 },
 {
  "cmd": "code .",
  "role": "Ouvrir le dossier courant dans VS Code",
  "exemple": "code .",
  "categorie": "Outils",
  "notes": "Nécessite VS Code + l'extension WSL. Choisir le Python du .venv : Ctrl+Maj+P → Python: Select Interpreter"
 },
 {
  "cmd": "explorer.exe .",
  "role": "Ouvrir le dossier courant dans l'Explorateur Windows",
  "exemple": "explorer.exe .",
  "categorie": "Outils",
  "notes": "WSL seulement. Fichiers Windows depuis Linux : /mnt/c/Users/E14/"
 }
];
