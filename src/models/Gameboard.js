import { Ship } from './Ship.js';

class Gameboard {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.ships = [];
        this.coordinates = Array.from({ length: width * height }, () => ({
            ship: null,
            peg: null,
        }));
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
        const coord = this.coordinates[this.getIndex([x, y])];
        if (value instanceof Ship) {
            coord.ship = value;
        }
        if (value === 'miss') coord.peg = 'miss';
        if (value === 'hit') coord.peg = 'hit';
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
            return this.coordinates[index].ship === null;
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

    removeShip(ship) {
        const index = this.ships.indexOf(ship);
        this.ships.splice(index, 1);
    }

    receiveAttack([x, y]) {
        // Get value of target at given coordinate
        const target = this.getValue([x, y]);

        // If target contains a ship but no peg, hit the ship
        if (target.ship && !target.peg) {
            const ship = target.ship;
            ship.hit();
            this.setValue('hit', [x, y]);
            if (ship.isSunk()) {
                this.removeShip(ship);
            }
        }

        // If target contains no ship nor peg, assign 'miss'
        if (!target.ship && !target.peg) {
            this.setValue('miss', [x, y]);
        }

        return this.getValue([x, y]);
    }
}

export { Gameboard };
