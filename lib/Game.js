const Player = require('../lib/Player');
const Enemy = require('../lib/Enemy');
const inquirer = require('inquirer');

class Game {
    constructor() {
        this.roundNumber = 0;
        this.isPlayerTurn = false;
        this.enemies = [];
        this.currentEnemy;
        this.player;
    }

    initializeGame() {
        this.enemies.push(new Enemy('Goblin', 'sword'));
        this.enemies.push(new Enemy('Orc', 'baseball bat'));
        this.enemies.push(new Enemy('Skeleton', 'axe'));

        this.currentEnemy = this.enemies[0];

        inquirer
            .prompt({
                type: "text",
                name: "name",
                message: "What is your name?"
            })
            // destructure name from the prompt object
            .then(({ name }) => {
                this.player = new Player(name);
                // console.log(name);
                this.startNewBattle();
            });
    }
    // test the object creation
    // console.log(this.currentEnemy, this.player);
    startNewBattle() {
        if (this.player.agility > this.currentEnemy.agility) {
            this.isPlayerTurn = true;
        } else {
            this.isPlayerTurn = false;
        }
        console.log("Your stats are:");
        console.table(this.player.getStats());

        console.log(this.currentEnemy.getDescription());

        this.battle();
    };

    battle() {
        if (this.isPlayerTurn) {
            // player prompts go here
            inquirer
                .prompt({
                    type: "list",
                    message: "What would you like to do?",
                    name: "action",
                    choices: ['Attack', 'Use potion']
                })
                .then(({ action }) => {
                    if (action === 'Use potion') {
                        if (!this.player.getInventory()) {
                            console.log("You don't have any potions");
                            return this.checkEndOfBattle();
                        }

                        inquirer
                            .prompt({
                                type: "list",
                                message: "Which potion would you like to use?",
                                name: "action",
                                choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                            })
                            .then(({ action }) => {
                                const potionDetails = action.split(': ');

                                this.player.usePotion(potionDetails[0] - 1);
                                console.log(`You used a ${potionDetails[1]} potion.`);

                                this.checkEndOfBattle();
                            });
                        // follow-up prompt here
                    } else {
                        const damage = this.player.getAttackValue();
                        this.currentEnemy.reduceHealth(damage);

                        console.log(`You attacked ${this.currentEnemy.name}`);
                        console.log(this.currentEnemy.getHealth());

                        this.checkEndOfBattle();
                    }
                });
        } else {
            const damage = this.currentEnemy.getAttackValue();
            this.player.reduceHealth(damage);

            console.log(`You were attacked by ${this.currentEnemy.name}`);
            console.log(this.player.getHealth());

            this.checkEndOfBattle();
        }
    };
    checkEndOfBattle() {
        if (this.player.isAlive() && this.currentEnemy.isAlive()) {
            this.isPlayerTurn = !this.isPlayerTurn;
            this.battle();
        } else if
            (this.player.isAlive() && !this.currentEnemy.isAlive()) {
            console.log(`You've defeated the ${this.currentEnemy.name}`);

            this.player.addPotion(this.currentEnemy.potion);
            console.log(`${this.player.name} found a ${this.currentEnemy.potion.name} potion`);

            this.roundNumber++;

            if (this.roundNumber < this.enemies.length) {
                this.currentEnemy = this.enemies[this.roundNumber];
                this.startNewBattle()
            } else {
                console.log("You win!");
            }
        } else {
            console.log("You've been defeated!");
        }
    }
}

module.exports = Game;