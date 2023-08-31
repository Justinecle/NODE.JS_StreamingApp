# Travail Pratique 2

Ce projet est une application web qui permet de gérer et de diffuser des vidéos en ligne. Les utilisateurs peuvent télécharger des vidéos, les visualiser en streaming ainsi que faire des recherches de vidéos.

# Configuration

- Node.js installé
- MongoDB installé et  en cours d'exécution (Database name: streaming, collection name: videos)

# Installation

Si vous n'avez pas déjà installé les dépendances ci-dessous, veuillez le faire :

    bootstrap : npm install bootstrap
    express : npm install express
    mongodb : npm install mongodb
    mongoose : npm install mongoose
    morgan : npm install morgan
    multer : npm install multer
    nodemon : npm install nodemon --save-dev
    pug : npm install pug

# Utilisation

1. Tapez npm run start pour démarrer l'application.
2. Assurez-vous que le message "Connected to MongoDB" s'affiche dans le terminal avant de procéder. 
2. Ouvrez votre navigateur et allez à l'URL http://localhost:3000 pour accéder à l'application.
3. Pour télécharger une vidéo, cliquez sur "Upload" dans la barre de navigation, ce qui vous redirigera vers localhost:3000/video/upload. Vous pouvez ensuite ajouter les détails de la vidéo et la télécharger. Le message "Video uploaded successfully" s'affichera si le téléchargement est réalisé avec succès.
4. Pour visionner la vidéo, cliquez sur "Stream" dans la barre de navigation. En cliquant sur "Watch the video", vous serez redirigé vers localhost:3000/videos/stream/:filename où la lecture de la vidéo sera possible.
5. Pour rechercher une vidéo, cliquez sur le champ "Search" dans la barre de navigation. Vous pourrez alors effectuer une recherche parmi les vidéos téléchargées.

# Base de données

- L'application utilise MongoDB comme base de données.
- Les vidéos sont stockées avec des données telles que le titre, la description et la catégorie.

# Auteurs

Ce projet a été développé par:

 - Daniel Sevigny
 - Justine Clément
 - René Barber

Dernière modification le 25 août 2023
Cégep Gérald Godin - 420-106-GG PROGRAMMATION WEB CLIENT
