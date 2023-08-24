// Importation des modules nécessaires
const express = require('express'); // Express est un framework web pour Node.js
const morgan = require('morgan'); // Morgan est un middleware de logging pour Express
const path = require('path'); // Le module 'path' fournit des utilitaires pour travailler avec les chemins de fichiers et de répertoire
const upload = require('./multerConfig'); // Le module d'instances configurées
const fs = require('fs'); // le module de FileSystem

const videoRoute = require('./routes/api.videos');

// Importation des routes définies dans le fichier './route.js'
const index = require('./routes');

// Initialisation de la base de données
require('./database');

// Création de l'application Express
const app = express();

// Configuration pour servir les fichiers statiques (CSS, images, etc.)
app.use(express.static('public'));

// Définition du numéro de port sur lequel l'application va écouter
const port = process.env.PORT || 3000;
// Le code utilise la variable d'environnement 'PORT' si elle existe, sinon il utilise le port 3000 par défaut

// Configuration des paramètres de l'application
app.set('views', path.join(__dirname, 'views')); // Définit le dossier 'views' comme emplacement des fichiers de vue (pug)
app.set('view engine', 'pug'); // Définit le moteur de rendu de vue à utiliser (pug dans ce cas)

// // //  Utilisation des middlewares

// Utilise le middleware de logging Morgan pour enregistrer les requêtes entrantes 
app.use(morgan('short'));
// Définit le dossier 'public' pour servir les fichiers statiques (css, images, etc.)
app.use(express.json());
app.use(express.urlencoded({ extended: true })) // Le middleware pour analyser les corps de requête au format x-www-form-urlencoded
// Le format x-www-form-urlencoded est couramment utilisé pour envoyer des données à partir de formulaires HTML.
// Lorsque vous soumettez un formulaire HTML avec la méthode POST et l'en-tête Content-Type défini sur
// application/x-www-form-urlencoded, les données du formulaire sont encodées dans le format de requête x-www-form-urlencoded.

// Utilisation du routeur videoRoute pour gérer les routes liées aux vidéos
app.use('/videos', videoRoute);

// Utilise les routes définies dans le fichier './routes.js'
app.use(index);

// Démarre le serveur en écoutant les requêtes sur le port spécifié
app.listen(port);

