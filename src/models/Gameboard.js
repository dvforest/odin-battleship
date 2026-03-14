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

    setValue(value, [x, y]) {
        this.coordinates[this.getIndex([x, y])] = value;
    }

    getValue([x, y]) {
        return this.coordinates[this.getIndex([x, y])];
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
            this.setValue(ship, coord);
        });
        return ship;
    }

    receiveAttack([x, y]) {
        const ship = this.getValue([x, y]);
        if (ship) {
            ship.hit();
            if (ship.isSunk()) {
                const index = this.ships.indexOf(ship);
                this.ships.splice(index, 1);
            }
        }
        this.setValue('miss', [x, y]);
    }
}

export { Gameboard };
