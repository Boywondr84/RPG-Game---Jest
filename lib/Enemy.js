const Potion = require('../lib/Potion');

function Enemy(name, weapon) {
    this.name = name;
    this.weapon = weapon;
    this.potion = new Potion();

    this.health = Math.floor(Math.random() * 10 + 85);
    this.strength = Math.floor(Math.random() * 5 + 5);
    this.agility = Math.floor(Math.random() * 5 + 5);

    this.inventory = [new Potion('health'), new Potion()];

    // returns an object with various enemy properties
    Enemy.prototype.getStats = function() {
        return {
            potions: this.inventory.length,
            health: this.health,
            strength: this.strength,
            agility: this.agility
        };
    };

    // returns inventory array or false if empty
    Enemy.prototype.getInventory = function() {
        if (this.inventory.length) {
            return this.inventory;
        } else {
            return false;
        }
    };

    // check enemy health
    Enemy.prototype.getHealth = function() {
        return `${this.name}'s health is now ${this.health}!`;
    };

    // is enemy alive
    Enemy.prototype.isAlive = function() {
        if (this.health === 0) {
            return false;
        } else {
            return true;
        }
    };

    // get new health
    Enemy.prototype.reduceHealth = function(health) {
        this.health -= health;

        if (this.health < 0) {
            this.health = 0;
        }
    };

    // return enemy attack value
    Enemy.prototype.getAttackValue = function() {
        const min = this.strength - 5;
        const max = this.strength + 5;

        return Math.floor(Math.random() * (max - min) + min);
    };

    // enemy description
    Enemy.prototype.getDescription = function() {
        return `A ${this.name} wielding a ${this.weapon} has appeared.`;
    };
};

module.exports = Enemy;