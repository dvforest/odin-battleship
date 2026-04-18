class PlacementState {
    constructor() {
        this.shipsToPlace = [
            { name: 'Destroyer', direction: 'vertical', length: 2 },
            { name: 'Submarine', direction: 'vertical', length: 3 },
            { name: 'Cruiser', direction: 'vertical', length: 3 },
            { name: 'Battleship', direction: 'vertical', length: 4 },
            { name: 'Aircraft Carrier', direction: 'vertical', length: 5 },
        ];
        this.currentShipIndex = 0;
        this.currentDirection = 'vertical';
        this.currentPosition = null;
    }

    getCurrentShip() {
        return this.shipsToPlace[this.currentShipIndex];
    }

    rotate() {
        this.currentDirection = this.currentDirection === 'vertical' ? 'horizontal' : 'vertical';
    }

    isComplete() {
        return this.currentShipIndex === this.shipsToPlace.length;
    }
}

export { PlacementState };
