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
        DOMRenderer.renderBoard(this.player1.board);
    }

    switchTurn() {
        this.activePlayer = this.activePlayer === this.player1 ? this.player2 : this.player1;
    }
}

export { GameController };
