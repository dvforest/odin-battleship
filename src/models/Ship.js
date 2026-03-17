class Ship {
    constructor({ name = '', position = [], direction = '', length = 0 } = {}) {
        if (!(direction === 'horizontal' || direction === 'vertical')) {
            throw new Error('Ship direction must be either "horizontal" or "vertical".');
        }
        if (length < 2 || length > 5) {
            throw new Error('Ship length must be between 2 and 5.');
        }
        if (!Array.isArray(position) && position.length !== 2) {
            throw new Error('Ship position must be a [x, y] coordinate');
        }
        this.name = name;
        this.position = position;
        this.direction = direction;
        this.length = length;
        this.hits = 0;
    }

    hit() {
        this.hits += 1;
    }

    isSunk() {
        return this.hits >= this.length;
    }
}

export { Ship };
