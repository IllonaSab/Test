// tests/menu.test.js
const request = require('supertest');
const app = require('../server');
const MenuItem = require('../models/menuModel');

describe('GET /menu', () => {
    it('devrait retourner le menu avec les articles', async () => {
        // Ajouter un article de test dans la base de données
        await MenuItem.create({ name: 'Pizza', customizations: [] });

        const response = await request(app).get('/menu');
        expect(response.status).toBe(200);
        expect(response.body.menu).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ name: 'Pizza', customizations: [] }),
            ])
        );
    });
});