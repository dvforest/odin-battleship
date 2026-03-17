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

    getCoord(index) {
        const x = index % this.width;
        const y = Math.floor(index / this.width);
        return [x, y];
    }

    setValue(value, [x, y]) {
        this.coordinates[this.getIndex([x, y])] = value;
    }

    getValue([x, y]) {
        return this.coordinates[this.getIndex([x, y])];
    }

    getShipCoords(shipData) {
        const coordinates = [];
        let [x, y] = shipData.position;
        while (coordinates.length < shipData.length) {
            coordinates.push([x, y]);
            if (shipData.direction === 'horizontal') {
                x += 1;
            } else if (shipData.direction === 'vertical') {
                y += 1;
            }
        }
        return coordinates;
    }

    canPlaceShip(coordinates) {
        return coordinates.every(([x, y]) => {
            const inBounds = x >= 0 && x < this.width && y >= 0 && y < this.height;
            if (!inBounds) return false;

            let index = this.getIndex([x, y]);
            return this.coordinates[index] === null;
        });
    }

    placeShip(shipData) {
        const coordinates = this.getShipCoords(shipData);
        if (!this.canPlaceShip(coordinates)) {
            return null;
        }
        const ship = new Ship(shipData);
        this.ships.push(ship);
        coordinates.forEach((coord) => this.setValue(ship, coord));
        return ship;
    }

    containsShip(ship = null) {
        if (ship) {
            return this.ships.includes(ship);
        }
        return this.ships.length > 0 ? true : false;
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
