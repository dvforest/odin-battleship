import { Gameboard } from './Gameboard';

class Player {
    constructor(type) {
        if (!(type === 'real' || type === 'computer')) {
            throw new Error("Invalid player type. The value must be either 'real' or 'computer'.");
        }
        this.type = type;
        this.board = new Gameboard(10, 10);
    }
}

export { Player };
