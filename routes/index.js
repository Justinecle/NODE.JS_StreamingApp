// Importation des modules necessaires
const router = require('express').Router(); // Importation du routeur Express
const api = require('./api'); // Importation des route d'API
const Video = require('../database/models/video.model'); // Importation du modele de Vidéo

// Montage des route d'API sur le chemin '/api' (c'est-a-dire que toutes les routes definies dans 'api' commenceront pas './api')
router.use('/api', api);

// Route pour la recherche
router.get('/search', async (req, res) => {
    try {
      const query = req.query.query; // Récupérez le terme de recherche depuis les paramètres de requête
      
      // Effectuez une recherche dans la base de données en utilisant le terme de recherche
      const searchResults = await Video.find({
        $or: [
          { videoTitle: { $regex: query, $options: 'i' } }, // Recherche insensible à la casse dans le titre
          { videoDescription: { $regex: query, $options: 'i' } } // Recherche insensible à la casse dans la description
        ]
      }).exec();
      
      // Renvoyez les résultats de la recherche à la vue
      res.render('searchResults', { results: searchResults, query });
    } catch (error) {
      console.error(error);
      res.status(500).render('message', { errorMessage: 'An error occurred during search.' });
    }
});

//Route pour afficher la page searchResults
router.get('/searchResults', (req, res) => {
    res.render('searchResults'); // Rend le fichier searchResults.pug
});

//Route pour afficher la page about
router.get('/about', (req, res) => {
    res.render('about'); // Rend le fichier about.pug
});

//Route pour afficher la page login
router.get('/login', (req, res) => {
    res.render('login'); // Rend le fichier login.pug
  });

//Route pour afficher le formulaire permettant de créer de nouvelles vidéos
router.get('/video/upload', (req, res) => {
    res.render('videos/upload'); // Rend le template `videos/upload.pug'
});

// Route pour la page d'accueil
router.get('/', async (req, res) => {
    try {
        // Tente de recuperer toutes les vidéos de la base de donnees
        const videos = await Video.find({}).exec();
        if (videos.length === 0) {
            res.status(404).render('message', { errorMessage: 'There are no videos to display' });
           } else {
            // Si la recuperation est reussie, rend la page de liste des vidéos avec les vidéos recuperées
            res.render('videos/stream', { videos }); }

    } catch (err) {
        // Si une erreur se produit pendant la recuperation des vidéos, log l'erreur et envoie un message d'erreur 500 au client
        console.error(err);
        res.status(500).render('message', { errorMessage: 'Server error or problem with video file playback.' });
        }
}); 
  
// Exportation du routeur pour l'utiliser dans l'application principale
module.exports = router;