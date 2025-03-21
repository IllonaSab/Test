const PaymentSystem = require('../payment_system'); //Importation de la classe PaymentSystem


describe('Système de paiement', () => {
    let paymentSystem;

    beforeEach(() => {
        paymentSystem = new PaymentSystem(); //Création d'une instance de PaymentSystem avant chaque test
    });

    test('Valider un paiement avec un numéro de commande valide', () => {
        const result = paymentSystem.processPayment(1, 100); //Effectue un paiement valide
        expect(result.success).toBe(true); //Vérifie que le paiement est accepté
        expect(result.message).toBe("Paiement effectué avec succès."); //Vérifie le message de confirmation
        expect(result.amount).toBe(100); //Vérifie le montant du paiement
    });

    test('Rejeter un paiement avec un numéro de commande invalide', () => {
        const result = paymentSystem.processPayment(null, 100); //Teste un paiement avec un numéro de commande invalide
        expect(result.success).toBe(false); //Vérifie que le paiement est rejeté
        expect(result.message).toBe("Numéro de commande invalide ou montant incorrect."); //Vérifie le message d'erreur
    });

    test('Rejeter un paiement avec un montant invalide', () => {
        const result = paymentSystem.processPayment(1, -50); //Teste un paiement avec un montant négatif
        expect(result.success).toBe(false); //Vérifie que le paiement est rejeté
        expect(result.message).toBe("Numéro de commande invalide ou montant incorrect."); //Vérifie le message d'erreur
    });

    test('Récupérer le statut d\'un paiement existant', () => {
        paymentSystem.processPayment(1, 200); //Effectue un paiement valide
        const status = paymentSystem.getPaymentStatus(1); //Récupère le statut du paiement
        expect(status.status).toBe("validé"); //Vérifie que le statut est "validé"
        expect(status.amount).toBe(200); //Vérifie que le montant est correct
    });

    test('Récupérer un paiement inexistant', () => {
        const status = paymentSystem.getPaymentStatus(99); //Tente de récupérer un paiement qui n'existe pas
        expect(status.success).toBe(false); //Vérifie que la récupération échoue
        expect(status.message).toBe("Paiement non trouvé."); //Vérifie le message d'erreur
    });
});
