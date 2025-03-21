// jest.config.js
module.exports = {
    testEnvironment: 'node', // Environnement Node.js
    setupFilesAfterEnv: ['./tests/setup.js'], // Fichier de configuration après l'environnement
    testTimeout: 10000, // Temps d'attente pour les tests
};