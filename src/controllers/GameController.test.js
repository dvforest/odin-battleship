import { describe, test, expect, beforeEach } from 'vitest';
import { GameController } from './GameController.js';
import { Player } from '../models/Player.js';

describe('GameController', () => {
    let player1;
    let player2;

    beforeEach(() => {
        player1 = new Player('real');
        player2 = new Player('computer');
    });

    describe('constructor()', () => {
        test('should throw an error if either player is not a Player instance', () => {
            const fakePlayer = { name: 'impostor' };
            expect(() => new GameController(player1, fakePlayer)).toThrowError();
            expect(() => new GameController(player1, player2)).not.toThrowError();
        });

        test('should be initialized with isGameOver set to false', () => {
            const game = new GameController(player1, player2);
            expect(game.isGameOver).toBe(false);
        });
    });

    describe('switchTurn()', () => {
        test('should switch the active player to become the opposite player', () => {
            const game = new GameController(player1, player2);
            expect(game.activePlayer).toBe(player1);
            game.switchTurn();
            expect(game.activePlayer).toBe(player2);
        });
    });
});
