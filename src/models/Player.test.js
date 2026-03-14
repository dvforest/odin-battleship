import { describe, test, expect, beforeEach } from 'vitest';
import { Player } from './Player.js';

describe('Player', () => {
    describe('constructor()', () => {
        test('should be of type real or computer', () => {
            expect(() => new Player('real')).not.toThrowError();
            expect(() => new Player('computer')).not.toThrowError();
            expect(() => new Player('1')).toThrowError();
        });
        test('should each contain their own instances of gameboards', () => {
            const player1 = new Player('real');
            const player2 = new Player('computer');
            expect(player1.board).toBeDefined;
            expect(player2.board).toBeDefined;
            expect(player1.board).not.toBe(player2.board);
        });
    });
});
