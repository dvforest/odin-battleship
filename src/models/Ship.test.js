import { describe, test, expect, beforeEach } from 'vitest';
import { Ship } from './Ship.js';

describe('Ship', () => {
    let ship;
    beforeEach(() => {
        ship = new Ship(3);
    });
    describe('constructor()', () => {
        test('should initialize with correct length and 0 hits', () => {
            expect(ship.length).toBe(3);
            expect(ship.hits).toBe(0);
        });
    });
    describe('hit()', () => {
        test('should increment hits', () => {
            ship.hit();
            expect(ship.hits).toBe(1);
        });
    });

    describe('isSunk()', () => {
        test('should return true when hits equals length', () => {
            ship.hit();
            ship.hit();
            ship.hit();
            expect(ship.isSunk()).toBe(true);
        });

        test('should return false if not enough hits', () => {
            ship.hit();
            expect(ship.isSunk()).toBeFalsy();
        });
    });
});
