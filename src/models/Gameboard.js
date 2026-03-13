import { Ship } from './Ship.js';

class Gameboard {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.ships = [];
        this.coordinates = Array(width * height).fill(null);
    }

    getIndex([x, y]) {
        return y * this.width + x;
    }

    assign(value, [x, y]) {
        this.coordinates[this.getIndex([x, y])] = value;
    }

    canPlaceShip(coordinates) {
        return coordinates.every((coord) => {
            const index = this.getIndex(coord);
            return this.coordinates[index] === null;
        });
    }

    placeShip(coordinates) {
        if (!this.canPlaceShip(coordinates)) {
            throw new Error('Invalid ship placement');
        }
        const ship = new Ship(coordinates.length);
        this.ships.push(ship);
        coordinates.forEach((coord) => {
            this.assign(ship, coord);
        });
        return ship;
    }
}

export { Gameboard };
