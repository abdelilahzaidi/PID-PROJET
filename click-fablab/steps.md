initialisation du projet : npm init -y
installation des dépendances nécessaires avec les environements de config: 
    - npm i express dotenv  nodemon
        - Rq : npm install -g nodemon pour eviter ce type d'erreur
                Le terme «nodemon» n'est pas reconnu comme nom d'applet de commande, fonction, fichier de script ou programme exécutable. Vérifiez l'orthographe du nom,    
                ou si un chemin d'accès existe, vérifiez que le chemin d'accès est correct et réessayez.
                Au caractère Ligne:1 : 1
    - Rq : après l'installation, on peut voir que nos dependences sont bien installées dans node_modules
            et que dans le package.json, on  trouve : express et ...
On crée le fichier caché .env où on mettra les variables d'environement
Et un fichier index.js car dans le package.json, on voit bien que notre fichier d'entrée est index.js


Système de routage
---
On ne peut pas mettre le traîtement et les routes dans le même fichier(index.js)
Une route contient une methode
On va créer un dossier  route qui contient le système de routage et son applicatif :




