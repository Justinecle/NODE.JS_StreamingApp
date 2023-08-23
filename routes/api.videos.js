// Importations du routeur Express, du modele de video de Mongoose,
// du module FileSystem et du middleware Multer
const router = require('express').Router();
const Video = require('../database/models/video.model');
const fs = require('fs');
const upload = require('../multerConfig').upload;

// Route pour le chargement des vidéos
router.post('/upload', upload.single('video'), async (req, res) => {
    try {
        const { videoTitle, videoDescription, videoCategory } = req.body;
        const videoPath = req.file.path; // Reçoit le chemin de la vidéo "uploaded"

        // Vérification si toutes les informations requises sont présentes
        if (!videoTitle || !videoDescription || !videoCategory || !videoPath) {
            res.status(400).render('error', { errorMessage: 'Missing or wrong video information.' });
            return;
        }

        // Instanciation de l'objet 'Video'
        const newVideo = new Video({
            videoTitle,
            videoDescription,
            videoCategory,
            video: videoPath, 
        });

        // Affiche le message de réussite du "upload"
        await newVideo.save();
        res.status(200).render('error', { errorMessage: 'Video uploaded successfully.' });
    
    } catch (error) {
        // Affiche le message d'erreur em lien avec la bdd
        console.error(error);
        res.status(500).render('error', { errorMessage: 'Server error or database problem.' });
    }
});

// Route pour afficher toutes les vidéos avec des liens vers le streaming
router.get('/', async (req, res) => {
    try {
        // Renvoi la vue 'upload.pug'
        const videos = await Video.find().exec();
        res.render('videos/stream', { videos }); 
    } catch (error) {
        // Affiche le message d'erreur em lien avec la bdd
        console.error(error);
        res.status(500).render('error', { errorMessage: 'Server error or database problem.' });
    }
});

// Gère le 'streaming' des vidéos
router.get('/stream/:filename', async (req, res) => {
    try {
        // Déconstruit le nom de fichier à partir de l'URL
        const filename = decodeURIComponent(req.params.filename); 
        const video = await Video.findOne({ video: filename }).exec();
        
        // Trouve la vidéo dans la bdd par le nom du fichier
        if (!video) {
            res.status(404).render('error', { errorMessage: 'Video not found.' });
            return;
        }
        
        // Reçoit le chemin pour le fichier vidéo
        const videoPath = video.video; 

        // Reçoit la taille du fichier vidéo
        const stat = fs.statSync(videoPath);
        const fileSize = stat.size;

        // Reçoit 'Range' 'header' de la requête
        const range = req.headers.range;

        if (range) {
            // 'Parse' le début et la fin des bytes à partir de 'Range' 'header'
            const parts = range.replace(/bytes=/, '').split('-');
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

            // Calcule la taille du 'chunk' à envoyer
            const chunksize = (end - start) + 1;

            // Crée un flux de lecture pour le fichier vidéo selon le 'byte' de départ et celui de la fin
            const file = fs.createReadStream(videoPath, { start, end });

            // Établi la réponse 'headers' partielle
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            };

            // Écrit la réponse 'headers' et joint le fichier de flux de la réponse
            res.writeHead(206, head);
            file.pipe(res);
        } else {
            // Sinon 'Range' 'header', renvoi l'entiereté du fichier vidéo
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            };

            // Écrit la réponse 'headers' et joint le fichier de flux de la réponse
            res.writeHead(200, head);
            fs.createReadStream(videoPath).pipe(res);
        }
    } catch (error) {
        // Gère les erreurs et affiche la page d'erreur
        console.error(error);
        res.status(500).render('error', { errorMessage: 'Server error or problem with video file playback.' });
    }
});


// Exporte le routeur pour une utilisation dans d'autres parties de l'application
module.exports = router;
