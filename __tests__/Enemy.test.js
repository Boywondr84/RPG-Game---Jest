const Enemy = require('../lib/Enemy');
const Potion = require('../lib/Potion');
jest.mock('../lib/Potion');

test('creates an enemy object', () => {
    const enemy = new Enemy('Dale', 'club');

    expect(enemy.name).toBe('Dale');
    expect(enemy.weapon).toBe('club');
    expect(enemy.health).toEqual(expect.any(Number));
    expect(enemy.strength).toEqual(expect.any(Number));
    expect(enemy.agility).toEqual(expect.any(Number));

    expect(enemy.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)])
    );
});

test('gets enemy stats as an object', () => {
    const enemy = new Enemy('Dale');

    expect(enemy.getStats()).toHaveProperty('potions');
    expect(enemy.getStats()).toHaveProperty('health');
    expect(enemy.getStats()).toHaveProperty('strength');
    expect(enemy.getStats()).toHaveProperty('agility');
});

test('gets inventory from enemy or returns false', () => {
    const enemy = new Enemy('Dale', 'club');

    expect(enemy.getInventory()).toEqual(expect.any(Array));
    enemy.inventory = [];
    expect(enemy.getInventory()).toEqual(false);
});

test('gets enemy health value', () => {
    const enemy = new Enemy('Dave', 'club');

    expect(enemy.getHealth()).toEqual(expect.stringContaining(enemy.health.toString()));
});

test('check if enemy is alive', () => {
    const enemy = new Enemy('Dale', 'club');

    expect(enemy.isAlive()).toBeTruthy();

    enemy.health = 0;

    expect(enemy.isAlive()).toBeFalsy();
});

test('check if enemy health reduced', () => {
    const enemy = new Enemy('Dale', 'club');
    const oldHealth = enemy.health;

    enemy.reduceHealth(5);
    expect(enemy.health).toBe(oldHealth - 5);
    enemy.reduceHealth(99999);
    expect(enemy.health).toBe(0);
});

test('get enemy attack value', () => {
    const enemy = new Enemy('Dale', 'club');
    enemy.strength = 10;

    expect(enemy.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(enemy.getAttackValue()).toBeLessThanOrEqual(15);
});

test('get enemy description', () => {
    const enemy = new Enemy('Dale', 'club');

    expect(enemy.getDescription()).toEqual(expect.stringContaining('Dale'));
    expect(enemy.getDescription()).toEqual(expect.stringContaining('club'));
});