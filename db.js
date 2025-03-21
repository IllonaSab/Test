//Connexion à la base de donnée dans un fichier db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Quitte le processus en cas d'erreur de connexion
  }
};

module.exports = connectDB; // Exporte la fonction connectDB pour une utilisation externe