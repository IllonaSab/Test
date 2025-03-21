// tests/setup.js
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create(); // Démarrer MongoDB en mémoire
    const uri = mongoServer.getUri(); // Récupérer l'URI de la base de données
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }); // Connexion à MongoDB
});

afterAll(async () => {
    await mongoose.disconnect(); // Déconnexion de MongoDB
    await mongoServer.stop(); // Arrêter MongoDB en mémoire
});