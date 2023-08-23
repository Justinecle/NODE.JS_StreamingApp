// Importation des modules pour gérer les 'uploads' et les chemins
const multer = require('multer');
const path = require('path');

// Configure les réglages de stockage pour Multer
const storage = multer.diskStorage({
    // Défini la destination pour les fichiers 'uploaded'
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'uploads'));
    },
    // Défini comment générer le nom des fichiers 'uploaded'
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Crée une instance de Multer avec les réglages configurés
const upload = multer({ storage: storage });

// Exporte les instances configurées de multer pour être utilisées par d'autres modules
module.exports = { upload }; 
