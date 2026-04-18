class FoundShip {
    constructor() {
        this.direction = null;
        this.coords = []; // Array of [x, y] coordinates;
    }
}

class AiState {
    constructor(board) {
        this.board = board;
        this.foundShips = [];
    }

    // Return the next logical target.
    getNextAttack() {
        let target = null;

        // If at least one ship has been found, try to sink it
        if (this.foundShips.length) {
            const currentShip = this.foundShips[0];

            // If ship only has a single coordinate, try to find a second to determine direction
            if (currentShip.coords.length === 1) {
                // Search the four adjacent coordinates for a target with no peg
                target = this.findAdjacentTarget(currentShip.coords[0]);

                // If a ship is found at the target, register the coord and use it to calculate the ship's direction
                if (this.board.getValue(target).ship) {
                    currentShip.coords.push(target);
                    this.findDirection(currentShip);
                }
                return target;
            }

            // If ship has a direction
            if (currentShip.direction) {
                // Search either end of the line of known coordinates
                target = this.findDirectionalTarget(currentShip);

                // If a ship is found at the target, register the coord
                if (this.board.getValue(target).ship) {
                    currentShip.coords.push(target);
                    this.removeSunkShip(currentShip);
                }
                return target;
            }
        }

        // Search for random target as a fallback.
        if (!target) {
            const randomTarget = this.findRandomTarget();
            const ship = this.board.getValue(randomTarget).ship;
            if (ship) {
                const newShip = new FoundShip();
                newShip.coords.push(randomTarget);
                this.foundShips.push(newShip);
            }
            return randomTarget;
        }
    }

    // Given a ship with two coordinates, calculate and set that ship's direction.
    findDirection(ship) {
        const x1 = ship.coords[0][0];
        const x2 = ship.coords[1][0];

        if (x1 === x2) ship.direction = 'vertical';
        else ship.direction = 'horizontal';
    }

    // Search for a random target that doesn't contain a peg
    findRandomTarget() {
        let [x, y] = [null, null];
        do {
            x = Math.floor(Math.random() * this.board.width);
            y = Math.floor(Math.random() * this.board.height);
        } while (this.board.getValue([x, y]).peg);
        return [x, y];
    }

    // Given a coordinate, return an empty target adjacent to it.
    findAdjacentTarget([x, y]) {
        const attackRight = [x + 1, y];
        if (this.isInBounds(attackRight) && !this.board.getValue(attackRight).peg) {
            return attackRight;
        }

        const attackLeft = [x - 1, y];
        if (this.isInBounds(attackLeft) && !this.board.getValue(attackLeft).peg) {
            return attackLeft;
        }

        const attackDown = [x, y + 1];
        if (this.isInBounds(attackDown) && !this.board.getValue(attackDown).peg) {
            return attackDown;
        }

        const attackUp = [x, y - 1];
        if (this.isInBounds(attackUp) && !this.board.getValue(attackUp).peg) {
            return attackUp;
        }
    }

    // Given a ship with a direction, return a coordinate at either end of the known coordinates.
    findDirectionalTarget(ship) {
        // Determine whether to use the x [0] or y [1] component.
        let index = null;
        ship.direction === 'horizontal' ? (index = 0) : (index = 1);

        // Sort the coords based on the direction
        ship.coords.sort((a, b) => a[index] - b[index]);

        // If horizontal direction, try to find a valid target to the left (first value) and right (last value)
        if (ship.direction === 'horizontal') {
            // Search for target left
            let [x, y] = ship.coords[0];
            const attackLeft = [x - 1, y];
            if (this.isInBounds(attackLeft) && !this.board.getValue(attackLeft).peg)
                return attackLeft;

            // Search for target right
            [x, y] = ship.coords[ship.coords.length - 1];
            const attackRight = [x + 1, y];
            if (this.isInBounds(attackRight) && !this.board.getValue(attackRight).peg)
                return attackRight;
        }

        // If vertical direction, try to find a valid target up (first value) and down (last value)
        if (ship.direction === 'vertical') {
            // Search for target up
            let [x, y] = ship.coords[0];
            const attackUp = [x, y - 1];
            if (this.isInBounds(attackUp) && !this.board.getValue(attackUp).peg) return attackUp;

            // Search for target down
            [x, y] = ship.coords[ship.coords.length - 1];
            const attackDown = [x, y + 1];
            if (this.isInBounds(attackDown) && !this.board.getValue(attackDown).peg)
                return attackDown;
        }
    }

    // Removes ship from foundShips list if the number of coordinates matches the real length of the ship
    removeSunkShip(ship) {
        const realLength = this.board.getValue(ship.coords[0]).ship.length;
        if (ship.coords.length === realLength) {
            const index = this.foundShips.indexOf(ship);
            this.foundShips.splice(index, 1);
        }
    }

    isInBounds([x, y]) {
        return x >= 0 && x < this.board.width && y >= 0 && y < this.board.height;
    }
}

export { AiState };
