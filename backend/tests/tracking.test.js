const Tracking = require('../models/tracking');
const { connect, closeDatabase, clearDatabase } = require('../utils/testUtils');

beforeAll(async () => {
    await connect();
});

afterAll(async () => {
    await closeDatabase();
});

describe('Suivi des Commandes', () => {
    let tracking;

    beforeEach(async () => {
        await clearDatabase();
        tracking = new Tracking();
    });

    test('Création d\'une commande', async () => {
        const result = await tracking.createTracking(1);
        expect(result.success).toBe(true);
        expect(result.tracking.orderNumber).toBe(1);
        expect(result.tracking.status).toBe('préparation');
    });

    test('Création d\'une commande existante', async () => {
        await tracking.createTracking(1);
        const result = await tracking.createTracking(1);
        expect(result.success).toBe(false);
        expect(result.message).toBe('Le suivi de cette commande existe déjà.');
    });

    test('Mise à jour du statut d\'une commande', async () => {
        await tracking.createTracking(1);
        const result = await tracking.updateStatus(1, 'prêt');
        expect(result.success).toBe(true);
        expect(result.tracking.status).toBe('prêt');
    });

    test('Mise à jour du statut d\'une commande inexistante', async () => {
        const result = await tracking.updateStatus(999, 'prêt');
        expect(result.success).toBe(false);
        expect(result.message).toBe('Commande non trouvée.');
    });

    test('Récupération du statut d\'une commande inexistante', async () => {
        const result = await tracking.getOrderStatus(999);
        expect(result.success).toBe(false);
        expect(result.message).toBe('Commande non trouvée.');
    });

    test('Annulation d\'une commande', async () => {
        await tracking.createTracking(1);
        const result = await tracking.cancelOrder(1);
        expect(result.success).toBe(true);
        expect(result.tracking.status).toBe('annulée');
    });

    test('Annulation d\'une commande inexistante', async () => {
        const result = await tracking.cancelOrder(999);
        expect(result.success).toBe(false);
        expect(result.message).toBe('Commande non trouvée.');
    });

    test('Récupération des détails de suivi', async () => {
        await tracking.createTracking(1);
        await tracking.updateStatus(1, 'prêt');
        const result = await tracking.getTrackingDetails(1);
        expect(result.success).toBe(true);
        expect(result.tracking.orderNumber).toBe(1);
        expect(result.tracking.status).toBe('prêt');
    });

    test('Mise à jour du temps de livraison estimé', async () => {
        await tracking.createTracking(1);
        const result = await tracking.updateEstimatedTime(1, 30);
        expect(result.success).toBe(true);
        expect(result.tracking.estimatedTime).toBe(30);
    });

    test('Ajout d\'une note à une commande', async () => {
        await tracking.createTracking(1);
        const result = await tracking.addNote(1, 'Note de test');
        expect(result.success).toBe(true);
        expect(result.tracking.notes).toContain('Note de test');
    });
});