import { describe, test, expect, beforeEach } from 'vitest';
import { Gameboard } from './Gameboard.js';

describe('Gameboard', () => {
    let board;

    beforeEach(() => {
        board = new Gameboard(8, 8);
    });

    describe('constructor()', () => {
        test('should initialize Gameboard.coordinates as an array of length width * height', () => {
            expect(board.coordinates.length).toBe(board.width * board.height);
        });

        test('should initialize each value of Gameboard.coordinates as null', () => {
            expect(board.coordinates.every((value) => value === null)).toBe(true);
        });
    });

    describe('setValue() and getValue()', () => {
        test('should set or retrieve the value of a given [x, y] coordinate.', () => {
            board.setValue('test', [4, 4]);
            expect(board.getValue([4, 4])).toBe('test');
        });
    });

    describe('getIndex()', () => {
        test('should return the index of this.coordinates matching the given [x, y].', () => {
            expect(board.getIndex([4, 4])).toBe(36);
        });
    });

    describe('getCoord()', () => {
        test('should return a [x, y] coordinate matching the given index.', () => {
            expect(board.getCoord(36)).toEqual([4, 4]);
        });
    });

    describe('receiveAttack()', () => {
        test('should look up the given coordinate, and if a ship is present, hit it', () => {
            const ship = board.placeShip([
                [2, 3],
                [2, 4],
            ]);
            board.receiveAttack([2, 3]);
            expect(ship.hits).toBe(1);
        });
        test('should remove the ship if it is sunk after being hit', () => {
            const ship = board.placeShip([
                [2, 3],
                [2, 4],
            ]);
            expect(board.ships.includes(ship)).toBe(true);
            board.receiveAttack([2, 3]);
            board.receiveAttack([2, 4]);
            expect(board.containsShip(ship)).toBe(false);
        });
        test('should mark the coordinate as a miss if no ship is present', () => {
            const ship = board.placeShip([
                [2, 3],
                [2, 4],
            ]);
            board.receiveAttack([2, 5]);
            expect(board.getValue([2, 5])).toBe('miss');
        });
    });

    describe('containsShip', () => {
        test('should return true if the given ship is on the board, otherwise false', () => {
            const ship = board.placeShip([
                [2, 3],
                [2, 4],
            ]);
            expect(board.containsShip(ship)).toBe(true);
        });

        test('should return true if at least one ship is on the board, otherwise false', () => {
            expect(board.containsShip()).toBe(false);
            const ship = board.placeShip([
                [2, 3],
                [2, 4],
            ]);
            expect(board.containsShip()).toBe(true);
        });
    });
});
