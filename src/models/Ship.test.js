import { describe, test, expect, beforeEach } from 'vitest';
import { Ship } from './Ship.js';

describe('Ship', () => {
    let ship;
    beforeEach(() => {
        ship = new Ship({
            name: 'Submarine',
            position: [5, 4],
            direction: 'vertical',
            length: 3,
        });
    });
    describe('constructor()', () => {
        test('should initialize with correct length', () => {
            expect(ship.length).toBe(3);
        });
        test('should throw error if length is not between 2 and 5.', () => {
            expect(
                () =>
                    new Ship({
                        name: 'badLength',
                        position: [0, 0],
                        direction: 'horizontal',
                        length: -1,
                    }),
            ).toThrowError();
        });
        test('should initialize with zero hits', () => {
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
            expect(ship.isSunk()).toBe(false);
        });
    });
});
