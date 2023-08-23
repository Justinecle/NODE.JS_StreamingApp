// Importation des modules nécessaires
// Importation du routeur Express
const router = require('express').Router();

// Importation du sous-routeur 'api.videos' qui gere les operations liees aux videos
const videos = require('./api.videos');

// Montage du sous-routeur 'videos' sur le chemin '/videos'
// Cela signifie que toutes les routes definies dans 'api.videos' seront prefixes par '/videos'
router.use ('/videos', videos);

// Exportation du routeur pour l'utiliser dans l'application principale
module.exports = router;