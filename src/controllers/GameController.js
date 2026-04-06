import { Player } from '../models/Player';
import { DOMRenderer } from '../ui/DOMRenderer.js';
import { UIMode, getUIMode, setUIMode } from '../ui/UIMode.js';
import { PlacementState } from './placement/PlacementState.js';

const gamePhase = {
    PLACING_SHIPS: 'placing-ships',
    PLAYER_TURN: 'player-turn',
    ENEMY_TURN: 'enemy-turn',
    GAME_OVER: 'game-over',
};

class GameController {
    constructor() {
        this.player1 = new Player('real');
        this.player2 = new Player('computer');
        this.playerShipPlacement = new PlacementState();
        this.activePlayer = this.player1;
        this.isGameOver = false;
        this.phase = null;
    }

    start() {
        DOMRenderer.renderBoard(this.player1.board);
        this.setPhase(gamePhase.PLACING_SHIPS, UIMode.PLACING_SHIPS);
    }

    switchTurn() {
        this.activePlayer = this.activePlayer === this.player1 ? this.player2 : this.player1;
    }

    handleHover(x, y) {
        if (this.phase === gamePhase.PLACING_SHIPS) {
            const playerBoard = this.player1.board;
            const ship = this.playerShipPlacement.getCurrentShip();
            this.playerShipPlacement.currentPosition = [x, y];

            ship.position = this.playerShipPlacement.currentPosition;
            ship.direction = this.playerShipPlacement.currentDirection;

            const valid = playerBoard.canPlaceShip(ship);
            if (valid) DOMRenderer.previewShip(ship, valid, playerBoard);
        }
    }

    handleClick(x, y) {
        if (this.phase === gamePhase.PLACING_SHIPS) {
            const playerBoard = this.player1.board;
            const ship = this.playerShipPlacement.getCurrentShip();

            ship.position = this.playerShipPlacement.currentPosition;
            ship.direction = this.playerShipPlacement.currentDirection;

            const valid = playerBoard.canPlaceShip(ship);

            if (valid) {
                playerBoard.placeShip(ship);
                DOMRenderer.renderShip(ship, playerBoard);
                this.playerShipPlacement.currentShipIndex += 1;
                if (this.playerShipPlacement.isComplete()) {
                    this.advancePhase();
                }
            }
        }
    }

    handleKeyPressed(keyCode) {
        if (this.phase === gamePhase.PLACING_SHIPS) {
            switch (keyCode) {
                case 'KeyR': {
                    this.playerShipPlacement.rotate();
                    const playerBoard = this.player1.board;
                    const ship = this.playerShipPlacement.getCurrentShip();

                    ship.position = this.playerShipPlacement.currentPosition;
                    ship.direction = this.playerShipPlacement.currentDirection;

                    const valid = playerBoard.canPlaceShip(ship);
                    if (valid) DOMRenderer.previewShip(ship, valid, playerBoard);
                    break;
                }
            }
        }
    }

    setPhase(phase, UIMode) {
        this.phase = phase;
        setUIMode(UIMode);
    }

    advancePhase() {
        switch (this.phase) {
            case gamePhase.PLACING_SHIPS:
                this.setPhase(gamePhase.PLAYER_TURN, UIMode.PLAYER_TURN);
                break;
        }
    }
}

export { GameController };
