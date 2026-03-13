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

    describe('assign()', () => {
        test('should assign the given value to the passed in [x, y] coordinates.', () => {
            board.assign('test', [4, 4]);
            const index = board.getIndex([4, 4]);
            expect(board.coordinates[index]).toBe('test');
        });
    });

    describe('getIndex()', () => {
        test('should return the index of this.coordinates matching the given [x, y].', () => {
            expect(board.getIndex([4, 4])).toBe(36);
        });
    });
});
