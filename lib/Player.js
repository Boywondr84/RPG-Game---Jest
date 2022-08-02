const Potion = require('./Potion');
const Character = require('./Character');

class Player extends Character {
    constructor(name = "") {
        super(name);

    this.inventory = [new Potion('health'), new Potion()];
}

    // returns an object with various player properties
    getStats() {
        return {
            potions: this.inventory.length,
            health: this.health,
            strength: this.strength,
            agility: this.agility
        };
    }

    // return the inventory array or false if empty
    getInventory() {
        if (this.inventory.length) {
            return this.inventory;
        } 
            return false;
        }

    // check if potion added to player inventory
    addPotion(potion) {
        this.inventory.push(potion);
    }

    // check that potion inventory decreases by 1
    usePotion(index) {
        const potion = this.getInventory().splice(index, 1) [0];

        switch (potion.name) {
            case 'agility':
                this.agility += potion.value;
            case 'health':
                this.health += potion.value;
            case 'strength':
                this.strength += potion.value;
                break;
        }
    }
}

module.exports = Player;