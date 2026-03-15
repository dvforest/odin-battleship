import { describe, test, expect, beforeEach } from 'vitest';
import { GameController } from './GameController.js';
import { Player } from '../models/Player.js';

describe('GameController', () => {
    let game;

    beforeEach(() => {
        game = new GameController();
    });

    describe('constructor()', () => {
        test('should have two valid Player instances', () => {
            expect(game.player1 instanceof Player).toBe(true);
            expect(game.player2 instanceof Player).toBe(true);
        });

        test('should be initialized with isGameOver set to false', () => {
            expect(game.isGameOver).toBe(false);
        });
    });

    describe('switchTurn()', () => {
        test('should switch the active player to become the opposite player', () => {
            expect(game.activePlayer).toBe(game.player1);
            game.switchTurn();
            expect(game.activePlayer).toBe(game.player2);
        });
    });

    describe('init()', () => {
        test('player1.board should contain iterable coordinates', () => {
            const coords = game.player1.board.coordinates;
            expect(Array.isArray(coords)).toBe(true);
            expect(coords.length).toBeGreaterThan(0);
        });
    });
});
