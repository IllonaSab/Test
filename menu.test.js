const Menu = require('./menu');

describe('Gestion du Menu', () => {
    let menu;

    beforeEach(() => {
        menu = new Menu();
    });

    test('Ajout d\'un article au menu', () => {
        menu.addItem('Pizza');
        expect(menu.items).toContain('Pizza');
    });

    test('Modification d\'un article du menu', () => {
        menu.addItem('Salade');
        const result = menu.modifyItem(0, 'Burger');
        expect(result).toBe(true);
        expect(menu.items[0]).toBe('Burger');
    });

    test('Suppression d\'un article du menu', () => {
        menu.addItem('Pâtes');
        const result = menu.removeItem(0);
        expect(result).toBe(true);
        expect(menu.items.length).toBe(0);
    });

    test('Modification d\'un article inexistant', () => {
        const result = menu.modifyItem(1, 'Tacos');
        expect(result).toBe(false);
    });

    test('Suppression d\'un article inexistant', () => {
        const result = menu.removeItem(2);
        expect(result).toBe(false);
    });
});

