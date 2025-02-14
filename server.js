const express = require('express');
const Menu = require('./menu');
const Order = require('./order');
const PaymentSystem = require('./payment_system');
const OrderTracking = require('./tracking');

const app = express();
app.use(express.json());

const menu = new Menu();
const order = new Order();
const paymentSystem = new PaymentSystem();
const tracking = new OrderTracking();

// Route pour ajouter un article au menu
app.post('/menu', (req, res) => {
    const { item } = req.body;
    menu.addItem(item);
    res.status(201).json({ message: 'Article ajouté', menu: menu.getMenu() });
});


// Route pour ajouter un article au panier
app.post('/order/cart', (req, res) => {
    const { item, price } = req.body;
    order.addToCart(item, price);
    res.status(201).json({ message: 'Article ajouté au panier', cart: order.cart });
});

// Route pour finaliser une commande
app.post('/order/place', (req, res) => {
    const result = order.placeOrder();
    tracking.createOrder(result.orderNumber); // Suivi de la commande
    res.status(201).json({ message: 'Commande passée', order: result });
});

// Route pour effectuer un paiement
app.post('/payment', (req, res) => {
    const { orderNumber, amount } = req.body;
    const result = paymentSystem.processPayment(orderNumber, amount);
    res.status(result.success ? 201 : 400).json(result);
});

// Route pour récupérer le statut d'un paiement
app.get('/payment/:orderNumber', (req, res) => {
    const { orderNumber } = req.params;
    const status = paymentSystem.getPaymentStatus(Number(orderNumber));
    res.json(status);
});

// Route pour récupérer le statut d'une commande
app.get('/tracking/:orderNumber', (req, res) => {
    const { orderNumber } = req.params;
    res.json({ status: tracking.getStatus(Number(orderNumber)) });
});

// Démarrer le serveur
if (require.main === module) {
    app.listen(3000, () => console.log('Serveur démarré sur http://localhost:3000'));
}

module.exports = app;
