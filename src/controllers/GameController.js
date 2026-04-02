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
        DOMRenderer.renderBoard(this.player1.board);
        this.setPhase(gamePhase.PLACING_SHIPS, UIMode.PLACING_SHIPS);

        /*
        const playerShips = this.getPlayerShips();
        playerShips.forEach((ship) => {
            this.player1.board.placeShip(ship);
        });*/
    }

    switchTurn() {
        this.activePlayer = this.activePlayer === this.player1 ? this.player2 : this.player1;
    }

    handleHover(x, y) {
        if (this.phase === gamePhase.PLACING_SHIPS) {
            const board = this.player1.board;
            const ship = {
                name: 'Destroyer',
                position: [x, y],
                direction: 'vertical',
                length: 2,
            };

            const valid = board.canPlaceShip(ship);
            if (valid) DOMRenderer.previewShip(ship, valid, this.player1.board);
        }
    }

    handleClick(x, y) {
        console.log('click handled');
    }

    handlePlaceShip() {
        const playerShips = this.player1.board.ships;
        const targetShips = 5;
        if (playerShips.length === targetShips) {
            console.log('move to next phase');
        }
    }

    setPhase(phase, UIMode) {
        this.phase = phase;
        setUIMode(UIMode);
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
