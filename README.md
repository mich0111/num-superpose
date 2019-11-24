# num-superpose
 Widget avec superposition des éléments d'affichage

Le fond affiché est scindéz entre l’image de fond et le bandeau.
L’incrustation d’une image logo par-dessus le fond de permet de visualiser l’équipement en question.
Il est possible également d’afficher ou non de l’unité de mesure.
Ce widget bascule automatiquement du thème sombre au clair et adapte le fond du widget en conséquence.
Le choix du bandeau se fait automatiquement en fonction d'une plage définie par des valeurs min et max. Le pas de changement de couleur s’adapte automatiquement. Il y a 10 couleurs de bandeau (aqua, blue, lime, yellow, lightsalmon, orange, darkorange, red, darkred, black).

Plusieurs paramètres sont à prendre en compte pour l’utilisation de ce widget :

    - min = (obligatoire) valeur minimale à prendre en compte. A partir de cette valeur et en-dessous, fond bleu clair.
    - max = (obligatoire) valeur maximale à prendre en compte. A partir de cette valeur et au-dessus, fond noir.
    - icon = (optionnel) dossier/image - dossier = dossier où se trouve le l’image, image = nom de l’image avec son suffixe.
    - unit = (optionnel) no : si “no” pas d’affichage d’unité, tout autre valeur ou paramètre absent, unité affichée.
    - theme = (optionnel) nom : nom du thème de fond à afficher. Les fichiers de fond devront alors s’appeler fo_bkg_nom_dark.png et fo_bkg_nom_light.png. Si le paramètre est absent, les thèmes par défaut seront affichés.
    - min < max et le pas doit être supérieur à 1. Donc max >= min + 10.

Les fichiers de fond, standards ou optionnels, se trouvent dans le répertoire “data/customTemplates/dashboard/cmd.action.other.Multi-action-Defaut/fond”.
Les logos superposées se trouvent dans le répertoire “data/customTemplates/dashboard/cmd.action.other.Multi-action-Defaut/” auquel il convient d’ajouter le dossier et l’image spécifique.
L'installation préalable du widget Multi-action-Defaut de @JAG est obligatoire.
Si les images requises ne s’y trouvent pas, vous devrez les transférer par Jeexplorer.
