class Menu {
    constructor() {
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
        return this.items;
    }

    modifyItem(index, newItem) {
        if (index >= 0 && index < this.items.length) {
            this.items[index] = newItem;
            return true;
        }
        return false;
    }

    removeItem(index) {
        if (index >= 0 && index < this.items.length) {
            this.items.splice(index, 1);
            return true;
        }
        return false;
    }
}

module.exports = Menu;
