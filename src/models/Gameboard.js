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

    getShipCoords(ship) {
        if (!ship) {
            console.error('getShipCoords called with ship = undefined');
        }
        if (!ship.position) {
            console.error('Ship has no position!', ship);
        }

        const coordinates = [];
        let [x, y] = ship.position;
        while (coordinates.length < ship.length) {
            coordinates.push([x, y]);
            if (ship.direction === 'horizontal') {
                x += 1;
            } else if (ship.direction === 'vertical') {
                y += 1;
            }
        }
        return coordinates;
    }

    canPlaceShip(ship) {
        if (!ship.position) return false;
        if (!ship.direction) return false;
        if (!this.isInBounds(ship)) return false;
        const coordinates = this.getShipCoords(ship);
        return coordinates.every(([x, y]) => {
            let index = this.getIndex([x, y]);
            return this.coordinates[index] === null;
        });
    }

    isInBounds(ship) {
        const coordinates = this.getShipCoords(ship);
        return coordinates.every(([x, y]) => {
            const inBounds = x >= 0 && x < this.width && y >= 0 && y < this.height;
            return inBounds;
        });
    }

    placeShip(shipData) {
        const coordinates = this.getShipCoords(shipData);
        if (!this.canPlaceShip(shipData)) {
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
        if (ship instanceof Ship) {
            ship.hit();
            if (ship.isSunk()) {
                const index = this.ships.indexOf(ship);
                this.ships.splice(index, 1);
            }
        } else {
            this.setValue('miss', [x, y]);
        }
        return this.getValue([x, y]);
    }
}

export { Gameboard };
