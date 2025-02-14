class PaymentSystem {
    constructor() {
        this.payments = {}; //Stocke les paiements par numéro de commande
    }

    processPayment(orderNumber, amount) {
        if (!orderNumber || amount <= 0) {
            return { success: false, message: "Numéro de commande invalide ou montant incorrect." }; //Vérifie si les données sont valides
        }

        this.payments[orderNumber] = {
            amount, //Montant du paiement
            status: "validé" //Marque le paiement comme validé
        };

        return { success: true, message: "Paiement effectué avec succès.", orderNumber, amount }; //Retourne la confirmation du paiement
    }

    getPaymentStatus(orderNumber) {
        return this.payments[orderNumber] || { success: false, message: "Paiement non trouvé." }; //Vérifie si le paiement existe et retourne son statut
    }
}

module.exports = PaymentSystem; //Exporte la classe PaymentSystem

