class OrderTracking {
    constructor() {
        this.orders = {}; //Stocke les statuts des commandes par numéro de commande
    }

    createOrder(orderNumber) {
        if (!this.orders[orderNumber]) {
            this.orders[orderNumber] = "préparation"; //Initialise le statut de la commande en "préparation"
            return true;
        }
        return false; //Retourne false si la commande existe déjà
    }

    updateStatus(orderNumber, newStatus) {
        const validStatuses = ["préparation", "prête", "livrée"]; //Liste des statuts valides
        if (this.orders[orderNumber] && validStatuses.includes(newStatus)) {
            this.orders[orderNumber] = newStatus; //Met à jour le statut de la commande
            return true;
        }
        return false; //Retourne false si le numéro de commande est invalide ou si le statut est incorrect
    }

    getStatus(orderNumber) {
        return this.orders[orderNumber] || "Commande inexistante"; //Retourne le statut de la commande ou un message d'erreur
    }

    cancelOrder(orderNumber) {
        if (this.orders[orderNumber] && this.orders[orderNumber] !== "livrée") {
            delete this.orders[orderNumber]; //Supprime la commande si elle n'est pas encore livrée
            return true;
        }
        return false; //Retourne false si la commande est déjà livrée et ne peut être annulée
    }
}

module.exports = OrderTracking; //Exporte la classe OrderTracking