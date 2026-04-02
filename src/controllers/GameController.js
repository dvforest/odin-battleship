import { Player } from '../models/Player';
import { DOMRenderer } from '../ui/DOMRenderer.js';
import { UIMode, getUIMode, setUIMode } from '../ui/UIMode.js';

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
        this.activePlayer = this.player1;
        this.isGameOver = false;
        this.phase = null;
    }

    start() {
        // Set game phase and UI mode to PLACING SHIPS
        this.phase = gamePhase.PLACING_SHIPS;
        setUIMode(UIMode.PLACING_SHIPS);

        // Get preassigned ship locations
        const playerShips = this.getPlayerShips();
        playerShips.forEach((ship) => {
            this.player1.board.placeShip(ship);
        });

        // Render board
        DOMRenderer.renderBoard(this.player1.board);
    }

    switchTurn() {
        this.activePlayer = this.activePlayer === this.player1 ? this.player2 : this.player1;
    }

    getPlayerShips() {
        return [
            {
                name: 'Destroyer',
                position: [0, 0],
                direction: 'vertical',
                length: 2,
            },
            {
                name: 'Submarine',
                position: [5, 4],
                direction: 'vertical',
                length: 3,
            },
            {
                name: 'Cruiser',
                position: [4, 7],
                direction: 'horizontal',
                length: 3,
            },
            {
                name: 'Battleship',
                position: [6, 8],
                direction: 'horizontal',
                length: 4,
            },
            {
                name: 'Aircraft Carrier',
                position: [1, 3],
                direction: 'vertical',
                length: 5,
            },
        ];
    }
}

export { GameController };
