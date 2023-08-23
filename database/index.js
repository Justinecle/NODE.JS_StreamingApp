const mongoose = require('mongoose');

const uri = "mongodb+srv://Justinecle:Prog1995@cluster0.9qjjkev.mongodb.net/streaming?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB', error);
  });