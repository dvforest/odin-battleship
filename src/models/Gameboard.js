class Gameboard {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.coordinates = Array(width * height).fill(null);
    }

    getIndex([x, y]) {
        return y * this.width + x;
    }

    assign(value, [x, y]) {
        this.coordinates[this.getIndex([x, y])] = value;
    }
}

export { Gameboard };
