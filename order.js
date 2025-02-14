class Order {
    constructor() {
        this.cart = []; // Liste des articles ajoutés au panier
        this.total = 0; // Total du panier
        this.orderNumber = 0; // Numéro de commande unique
    }

    addToCart(item, price) {
        this.cart.push({ item, price }); // Ajoute un article avec son prix au panier
        this.updateTotal(); // Met à jour le total du panier
    }

    updateTotal() {
        this.total = this.cart.reduce((sum, item) => sum + item.price, 0); // Calcule la somme des prix des articles du panier
    }

    applyPromotion(discount) {
        this.total -= this.total * (discount / 100); // Applique une réduction en pourcentage sur le total
    }

    placeOrder() {
        this.orderNumber += 1; // Incrémente le numéro de commande
        const orderDetails = {
            orderNumber: this.orderNumber, // Numéro unique de la commande
            items: this.cart, // Liste des articles commandés
            total: this.total.toFixed(2) // Total de la commande formaté en 2 décimales
        };

        this.cart = []; //Vider le panier après la commande
        this.total = 0; //Réinitialiser le total

        return orderDetails; //Retourne les détails de la commande
    }
}

module.exports = Order; //Assurez-vous que l'exportation est correcte