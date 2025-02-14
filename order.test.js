const Order = require('./order'); // ✅ Importation de la classe Order

describe('Gestion des commandes', () => {
    let order;

    beforeEach(() => {
        order = new Order(); //Création d'une instance de commande avant chaque test
    });

    test('Passage d\'une commande', () => {
        order.addToCart('Pizza', 10); //Ajoute une pizza au panier avec un prix de 10
        const result = order.placeOrder(); //Passe la commande

        expect(result.orderNumber).toBe(1); //Vérifie que le numéro de commande est 1
        expect(result.total).toBe('10.00'); //Vérifie que le total est bien 10.00
        expect(order.cart.length).toBe(0); //Vérifie que le panier est vidé après la commande
    });
});
