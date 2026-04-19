import { Player } from '../models/Player';
import { Ship } from '../models/Ship.js';
import { DOMRenderer } from '../ui/DOMRenderer.js';
import { UIMode, getUIMode, setUIMode } from '../ui/UIMode.js';
import { PlacementState } from './state/PlacementState.js';
import { AiState } from './state/AiState.js';

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
        this.playerPlacement = new PlacementState();
        this.enemyPlacement = new PlacementState();
        this.ai = new AiState(this.player1.board);
        this.isGameOver = false;
        this.phase = null;
    }

    start() {
        DOMRenderer.renderBoard(this.player2);
        DOMRenderer.renderBoard(this.player1);
        this.placeRandomShips(this.player2, this.enemyPlacement);
        this.setPhase(gamePhase.PLACING_SHIPS, UIMode.PLACING_SHIPS);
    }

    placeRandomShips(player, placementState) {
        let index = placementState.currentShipIndex;

        while (index < placementState.shipsToPlace.length) {
            // Assign a random direction
            const options = ['vertical', 'horizontal'];
            const direction = options[Math.floor(Math.random() * options.length)];
            const currentShip = placementState.shipsToPlace[index];
            currentShip.direction = direction;

            // Test positions until a valid placement is found
            do {
                const x =
                    direction === 'horizontal'
                        ? Math.floor(Math.random() * (player.board.width - currentShip.length))
                        : Math.floor(Math.random() * player.board.width);
                const y =
                    direction === 'vertical'
                        ? Math.floor(Math.random() * (player.board.height - currentShip.length))
                        : Math.floor(Math.random() * player.board.height);
                currentShip.position = [x, y];
            } while (!player.board.canPlaceShip(currentShip));

            // Place the ship on the board and iterate
            player.board.placeShip(currentShip);
            index++;

            // Uncomment this line to preview ship placement
            DOMRenderer.renderShip(currentShip, player);
        }
    }

    handleHover(x, y) {
        if (this.phase === gamePhase.PLACING_SHIPS) {
            const playerBoard = this.player1.board;
            const ship = this.playerPlacement.getCurrentShip();
            this.playerPlacement.currentPosition = [x, y];

            ship.position = this.playerPlacement.currentPosition;
            ship.direction = this.playerPlacement.currentDirection;

            const valid = playerBoard.canPlaceShip(ship);
            if (playerBoard.isInBounds(ship)) DOMRenderer.previewShip(ship, valid, this.player1);
        }

        if (this.phase === gamePhase.PLAYER_TURN) {
            const enemyBoard = this.player2.board;
            DOMRenderer.previewTarget([x, y], this.player2);
        }
    }

    handleClick(x, y) {
        if (this.phase === gamePhase.PLACING_SHIPS) {
            const playerBoard = this.player1.board;
            const ship = this.playerPlacement.getCurrentShip();

            ship.position = this.playerPlacement.currentPosition;
            ship.direction = this.playerPlacement.currentDirection;

            const valid = playerBoard.canPlaceShip(ship);

            if (valid) {
                playerBoard.placeShip(ship);
                DOMRenderer.renderShip(ship, this.player1);
                this.playerPlacement.currentShipIndex += 1;
                if (this.playerPlacement.isComplete()) {
                    DOMRenderer.clearPreviewShip(this.player1);
                    this.advancePhase();
                }
            }
            return;
        }

        if (this.phase === gamePhase.PLAYER_TURN) {
            // Deal attack on the board
            const enemyBoard = this.player2.board;
            const target = enemyBoard.receiveAttack([x, y]);

            // If valid target, render the peg
            if (target.peg) {
                if (target.peg === 'miss') DOMRenderer.renderPeg([x, y], this.player2, 'White');
                if (target.peg === 'hit') DOMRenderer.renderPeg([x, y], this.player2, 'Red');

                this.advancePhase();
            }
        }

        if (this.phase === gamePhase.ENEMY_TURN) {
            const enemyAttackCoord = this.ai.getNextAttack();
            this.player1.board.receiveAttack(enemyAttackCoord);
            const target = this.player1.board.getValue(enemyAttackCoord);

            // Render the peg
            if (target.peg === 'miss')
                DOMRenderer.renderPeg(enemyAttackCoord, this.player1, 'White');
            if (target.peg === 'hit') DOMRenderer.renderPeg(enemyAttackCoord, this.player1, 'Red');

            this.ai.removeExhausted();
            this.advancePhase();
        }
    }

    handleKeyPressed(keyCode) {
        if (this.phase === gamePhase.PLACING_SHIPS) {
            switch (keyCode) {
                case 'KeyR': {
                    this.playerPlacement.rotate();
                    const playerBoard = this.player1.board;
                    const ship = this.playerPlacement.getCurrentShip();

                    ship.position = this.playerPlacement.currentPosition;
                    ship.direction = this.playerPlacement.currentDirection;

                    const valid = playerBoard.canPlaceShip(ship);
                    if (valid) DOMRenderer.previewShip(ship, valid, this.player1);
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
            case gamePhase.PLAYER_TURN:
                this.setPhase(gamePhase.ENEMY_TURN, UIMode.DISABLED);
                break;
            case gamePhase.ENEMY_TURN:
                this.setPhase(gamePhase.PLAYER_TURN, UIMode.PLAYER_TURN);
                break;
        }
    }
}

export { GameController };
