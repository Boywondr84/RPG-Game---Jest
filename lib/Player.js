const Potion = require('../lib/Potion');

function Player(name = "") {
    this.name = name;

    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 + 7);

    this.inventory = [new Potion('health'), new Potion()];


    // returns an object with various player properties
    Player.prototype.getStats = function() {
        return {
            potions: this.inventory.length,
            health: this.health,
            strength: this.strength,
            agility: this.agility
        };
    };


    // return the inventory array or false if empty
    Player.prototype.getInventory = function() {
        if (this.inventory.length) {
            return this.inventory;
        } else {
            return false;
        }
    };

    // returns player health or false if empty
    Player.prototype.getHealth = function() {
        return `${this.name}'s health is now ${this.health}!`;
    };

    // check if player is alive
    Player.prototype.isAlive = function() {
        if (this.health === 0) {
            return false;
        } else {
            return true;
        }
    };

    // return new health
    Player.prototype.reduceHealth = function(health) {
        this.health -= health;

        if (this.health < 0) {
            this.health = 0;
        }
    };

    // return player attack value
    Player.prototype.getAttackValue = function() {
        const min = this.strength - 5;
        const max = this.strength + 5;

        return Math.floor(Math.random() * (max - min) + min);
    };

    // check if potion added to player inventory
    Player.prototype.addPotion = function(potion) {
        this.inventory.push(potion);
    };

    // check that potion inventory decreases by 1
    Player.prototype.usePotion = function(index) {
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
    };
};

module.exports = Player;