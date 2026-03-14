import { Player } from '../models/Player';

class GameController {
    constructor(player1, player2) {
        if (!(player1 instanceof Player) || !(player2 instanceof Player)) {
            throw new Error(
                'Invalid arguments. All players must be a valid instance of Player class.',
            );
        }
        this.players = [player1, player2];
        this.activePlayer = player1;
        this.isGameOver = false;
    }

    switchTurn() {
        this.activePlayer =
            this.activePlayer === this.players[0] ? this.players[1] : this.players[0];
    }
}

export { GameController };
