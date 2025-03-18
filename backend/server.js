const express = require('express');
const cors = require('cors');
const { connectDB } = require('./utils/db');
const Menu = require('./models/menu');
const Order = require('./models/order');
const PaymentSystem = require('./models/payment_system');
const Tracking = require('./models/tracking');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Instances
const menu = new Menu();
const order = new Order();
const paymentSystem = new PaymentSystem();
const tracking = new Tracking();

// Routes
app.post('/menu', async (req, res) => {
    try {
        const result = await menu.addItem(req.body);
        res.status(201).json({ menu: await menu.getMenu() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/menu', async (req, res) => {
    try {
        const menuItems = await menu.getMenu();
        res.json({ menu: menuItems });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/order/cart', async (req, res) => {
    try {
        const result = await order.addToCart(req.body.item, req.body.price);
        res.status(201).json({ cart: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/order/place', async (req, res) => {
    try {
        const result = await order.placeOrder();
        // Créer un suivi de commande
        await tracking.createTracking(result.orderNumber);
        res.status(201).json({ order: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/payment', async (req, res) => {
    try {
        const result = await paymentSystem.processPayment(
            req.body.orderNumber,
            req.body.amount,
            req.body.paymentMethod
        );
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/payment/:id', async (req, res) => {
    try {
        const result = await paymentSystem.getPaymentStatus(req.params.id);
        if (!result.success) {
            return res.status(200).json(result);
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/tracking/:orderNumber', async (req, res) => {
    try {
        const result = await tracking.getOrderStatus(req.params.orderNumber);
        if (!result.success) {
            return res.status(200).json(result);
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Une erreur est survenue sur le serveur'
    });
});

// Start server
const PORT = process.env.PORT || 3001;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Serveur démarré sur le port ${PORT}`);
        });
    } catch (error) {
        console.error('Erreur lors du démarrage du serveur:', error);
        process.exit(1);
    }
};

if (process.env.NODE_ENV !== 'test') {
    startServer();
}

module.exports = app; 