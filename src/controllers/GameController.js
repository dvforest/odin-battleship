import { Player } from '../models/Player';
import { DOMRenderer } from '../ui/DOMRenderer.js';

class GameController {
    constructor() {
        this.player1 = new Player('real');
        this.player2 = new Player('computer');
        this.activePlayer = this.player1;
        this.isGameOver = false;
    }

    init() {
        const playerShips = this.getPlayerShips();
        playerShips.forEach((ship) => {
            this.player1.board.placeShip(ship);
        });
        DOMRenderer.renderBoard(this.player1.board);
    }

    switchTurn() {
        this.activePlayer = this.activePlayer === this.player1 ? this.player2 : this.player1;
    }

    getPlayerShips() {
        return [
            [
                [0, 0],
                [0, 1],
            ],
            [
                [5, 4],
                [5, 5],
                [5, 6],
            ],
            [
                [4, 7],
                [5, 7],
                [6, 7],
            ],
            [
                [6, 8],
                [7, 8],
                [8, 8],
                [9, 8],
            ],
            [
                [1, 3],
                [1, 4],
                [1, 5],
                [1, 6],
                [1, 7],
            ],
        ];
    }
}

export { GameController };
