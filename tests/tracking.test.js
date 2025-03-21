const OrderTracking = require('../tracking'); //Importation de la classe OrderTracking

describe('Suivi des commandes', () => {
    let tracking;

    beforeEach(() => {
        tracking = new OrderTracking(); //Création d'une instance d'OrderTracking avant chaque test
    });

    test('Préparation d\'une commande', () => {
        const result = tracking.createOrder(1); //Création d'une commande avec numéro 1
        expect(result).toBe(true); //Vérifie que la commande est bien créée
        expect(tracking.getStatus(1)).toBe('préparation'); //Vérifie que le statut est "préparation"
    });

    test('Mise à jour du statut', () => {
        tracking.createOrder(1); //Création d'une commande
        const result = tracking.updateStatus(1, 'prête'); //Mise à jour du statut en "prête"
        expect(result).toBe(true); //Vérifie que la mise à jour est réussie
        expect(tracking.getStatus(1)).toBe('prête'); //Vérifie que le statut est bien mis à jour
    });

    test('Mise à jour invalide', () => {
        tracking.createOrder(1); //Création d'une commande
        const result = tracking.updateStatus(1, 'expédiée'); //Tentative de mise à jour avec un statut invalide
        expect(result).toBe(false); //Vérifie que la mise à jour échoue
    });

    test('Annulation d\'une commande non livrée', () => {
        tracking.createOrder(1); //Création d'une commande
        const result = tracking.cancelOrder(1); //Annulation de la commande
        expect(result).toBe(true); //Vérifie que l'annulation est réussie
        expect(tracking.getStatus(1)).toBe('Commande inexistante'); //Vérifie que la commande est bien supprimée
    });

    test('Annulation d\'une commande livrée impossible', () => {
        tracking.createOrder(1); //Création d'une commande
        tracking.updateStatus(1, 'livrée'); //Mise à jour du statut en "livrée"
        const result = tracking.cancelOrder(1); //Tentative d'annulation après livraison
        expect(result).toBe(false); //Vérifie que l'annulation est refusée
    });
});
