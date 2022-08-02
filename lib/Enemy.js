const Potion = require('./Potion');
const Character = require('./Character');

class Enemy extends Character {
    constructor(name, weapon) {
        super(name);

        this.weapon = weapon;
        this.potion = new Potion();
    }

    // enemy description
    getDescription() {
        return `A ${this.name} wielding a ${this.weapon} has appeared.`;
    }
}

module.exports = Enemy;