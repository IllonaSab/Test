const request = require('supertest');
const app = require('../server');

describe('API de gestion des commandes', () => {
    test('Ajout d\'un article au menu', async () => {
        const response = await request(app)
            .post('/menu')
            .send({ item: 'Pizza' });

        expect(response.status).toBe(201);
        expect(response.body.menu).toEqual([{ item: 'Pizza', customizations: [] }]);
    });

    test('Récupérer le menu', async () => {
        const response = await request(app).get('/menu');

        expect(response.status).toBe(200);
        expect(response.body.menu.length).toBeGreaterThan(0);
    });

    test('Ajout d\'un article au panier', async () => {
        const response = await request(app)
            .post('/order/cart')
            .send({ item: 'Burger', price: 10 });

        expect(response.status).toBe(201);
        expect(response.body.cart).toContainEqual({ item: 'Burger', price: 10 });
    });

    test('Passage d\'une commande', async () => {
        await request(app).post('/order/cart').send({ item: 'Pizza', price: 12.99 });

        const response = await request(app).post('/order/place');

        expect(response.status).toBe(201);
        expect(response.body.order.orderNumber).toBe(1);
    });

    test('Effectuer un paiement', async () => {
        await request(app).post('/order/cart').send({ item: 'Pâtes', price: 15 });
        await request(app).post('/order/place');

        const response = await request(app)
            .post('/payment')
            .send({ orderNumber: 2, amount: 15 });

        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
    });

    test('Récupérer le statut d\'une commande', async () => {
        await request(app).post('/order/cart').send({ item: 'Sushi', price: 20 });
        await request(app).post('/order/place');

        const response = await request(app).get('/tracking/3');

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('préparation');
    });

    test('Récupérer un paiement inexistant', async () => {
        const response = await request(app).get('/payment/99');

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(false);
    });
});
