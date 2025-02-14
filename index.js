const Menu = require('./menu'); // Importation de la classe Menu
const Order = require('./order'); // Importation de la classe Order

const menu = new Menu(); // Création d'une instance du menu
const order = new Order(); // Création d'une instance de commande

menu.addItem("Pizza"); // Ajoute une pizza au menu
menu.addCustomization(0, "Supplément fromage"); // Ajoute un supplément fromage à la pizza
console.log("Menu:", menu.getMenu()); // Affiche le menu avec les articles et leurs personnalisations

order.addToCart("salade", 12.99); // Ajoute une pizza au panier avec un prix de 12.99
order.applyPromotion(10); // Applique une réduction de 10%console.log("Commande passée:", order.placeOrder()); // Finalise la commande et affiche les détails

