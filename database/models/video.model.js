// Importation du module Mongoose
const mongoose = require('mongoose');

// Extraction de la classe Schema du module Mongoose
const schema = mongoose.Schema;

// Définition du schéma du video
const videoSchema = schema({

    // Pour stocker le lien de la vidéo
    video: {
        type: String, // Type de données pour stocker le lien de la vidéo
        required: [true, 'Vidéo requise']
    },
    // Titre de la vidéo
    videoTitle: {
        type: String,
        required: [true, 'Titre de la vidéo requis']
    },
    // Description de la vidéo
    videoDescription: {
        type: String,
        required: [true, 'Description de la vidéo requise']
    },
    // Catégorie de la vidéo
    videoCategory: {
        type: String,
        required: [true, 'Catégorie de la vidéo requise']
    }
});

//Création du modele de video a partir du schema
const Video = mongoose.model('video', videoSchema);

//Exportation du modele de video pour une utilisation ulterieure
module.exports = Video;