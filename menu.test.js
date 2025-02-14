const Menu = require('./menu'); // Importation de la classe Menu

describe('Gestion du Menu', () => {
    let menu;

    beforeEach(() => {
        menu = new Menu(); // Initialisation d'un nouvel objet Menu avant chaque test
    });

    test('Ajout d\'un article au menu', () => {
        menu.addItem('Pizza'); // Ajoute un article 'Pizza' au menu
        expect(menu.items).toContain('Pizza'); // Vérifie que 'Pizza' est bien ajouté
    });

    test('Modification d\'un article du menu', () => {
        menu.addItem('Salade'); // Ajoute un article 'Salade' au menu
        const result = menu.modifyItem(0, 'Burger'); // Modifie l'article à l'index 0 en 'Burger'
        expect(result).toBe(true); // Vérifie que la modification est réussie
        expect(menu.items[0]).toBe('Burger'); // Vérifie que l'article a bien été modifié
    });

    test('Suppression d\'un article du menu', () => {
        menu.addItem('Pâtes'); // Ajoute un article 'Pâtes' au menu
        const result = menu.removeItem(0); // Supprime l'article à l'index 0
        expect(result).toBe(true); // Vérifie que la suppression est réussie
        expect(menu.items.length).toBe(0); // Vérifie que la liste est vide après suppression
    });

    test('Ajout d\'un supplément', () => {
        const result = menu.addCustomization(2); // Tente d'ajouter une personnalisation à un index invalide
        expect(result).toBe(false); // Vérifie que l'opération échoue
    });

    test('Suppression d\'un supplément', () => {
        const result = menu.removeCustomization(2); // Tente de supprimer une personnalisation à un index invalide
        expect(result).toBe(false); // Vérifie que l'opération échoue
    });
});