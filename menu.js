class Menu {
    constructor() {
        this.items = []; // Liste des articles du menu
        this.customizations = {}; // Stocke les options de personnalisation par index d'item
    }

    addItem(item) {
        this.items.push(item); // Ajoute un nouvel article au menu
        this.customizations[this.items.length - 1] = []; // Initialise les personnalisations pour cet article
        return this.items; //Ca retourne le nouvel article
    }

    modifyItem(index, newItem) {
        if (index >= 0 && index < this.items.length) {
            this.items[index] = newItem; // Modifie l'article à l'index spécifié
            return true; //l'index est vraie
        }
        return false; //sinon il retourne false si l'index est invalide
    }

    removeItem(index) {
        if (index >= 0 && index < this.items.length) {
            this.items.splice(index, 1); // Supprime l'article du menu
            delete this.customizations[index]; // Supprime les personnalisations associées
            return true; //l'index est vraie
        }
        return false; //sinon il retourne false si l'index est invalide
    }

    addCustomization(index, customization) {
        if (index >= 0 && index < this.items.length) {
            this.customizations[index].push(customization); // Ajoute une personnalisation à un article existant
            return true;//l'index est vraie
        }
        return false; //sinon il retourne false si l'index est invalide
    }

    removeCustomization(index) {
        if (index >= 0 && index < this.items.length) {
            this.items.splice(index, 1); // Supprime l'article, ce qui n'est pas correct pour une seule personnalisation
            delete this.customizations[index]; // Supprime toutes les personnalisations associées
            return true; //l'index est vraie
        }
        return false; //sinon il retourne false si l'index est invalide
    }

    getMenu() {
        return this.items.map((item, index) => ({
            item, // Nom de l'article
            customizations: this.customizations[index] || [], // Liste des personnalisations pour cet article
        }));
    }
}

module.exports = Menu; // Exporte la classe Menu pour une utilisation externe
