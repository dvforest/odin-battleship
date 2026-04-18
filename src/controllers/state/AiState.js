class Cluster {
    constructor() {
        this.direction = null;
        this.coords = []; // Array of [x, y] coordinates;
    }
}

class AiState {
    constructor(board) {
        this.board = board;
        this.clusters = [];
    }

    // Return the next logical target.
    getNextAttack() {
        let target = null;

        // If at least one cluster has been found, focus on it
        if (this.clusters.length) {
            const cluster = this.clusters[0];

            // If cluster only has a single coordinate, try to find a second to determine direction
            if (cluster.coords.length === 1) {
                // Search the four adjacent coordinates for a target with no peg
                target = this.findAdjacentTarget(cluster.coords[0]);

                // If the hit is successful, register the coordinate and use it to calculate the cluster's direction

                if (this.board.getValue(target).ship) {
                    cluster.coords.push(target);
                    this.findDirection(cluster);
                }
                return target;
            }

            // If cluster has a direction
            if (cluster.direction) {
                // Search either end of the line of known coordinates
                target = this.findDirectionalTarget(cluster);

                // If the hit is successful, register the coord
                if (this.board.getValue(target).ship) {
                    cluster.coords.push(target);
                }
                return target;
            }
        }

        // Search for random target as a fallback.
        if (!target) {
            const randomTarget = this.findRandomTarget();
            if (this.board.getValue(randomTarget).ship) {
                const cluster = new Cluster();
                cluster.coords.push(randomTarget);
                this.clusters.push(cluster);
            }
            return randomTarget;
        }
    }

    // Given a cluster with two coordinates, calculate and set that cluster's direction.
    findDirection(cluster) {
        const x1 = cluster.coords[0][0];
        const x2 = cluster.coords[1][0];

        if (x1 === x2) cluster.direction = 'vertical';
        else cluster.direction = 'horizontal';
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

    // Given a cluster with a direction, return a coordinate at either end of the known coordinates.
    findDirectionalTarget(cluster) {
        // Determine whether to use the x [0] or y [1] component.
        let index = null;
        cluster.direction === 'horizontal' ? (index = 0) : (index = 1);

        // Sort the coords based on the direction
        cluster.coords.sort((a, b) => a[index] - b[index]);

        // If horizontal direction, try to find a valid target to the left (first value) and right (last value)
        if (cluster.direction === 'horizontal') {
            // Search for target left
            let [x, y] = cluster.coords[0];
            const attackLeft = [x - 1, y];
            if (this.isInBounds(attackLeft) && !this.board.getValue(attackLeft).peg)
                return attackLeft;

            // Search for target right
            [x, y] = cluster.coords[cluster.coords.length - 1];
            const attackRight = [x + 1, y];
            if (this.isInBounds(attackRight) && !this.board.getValue(attackRight).peg)
                return attackRight;
        }

        // If vertical direction, try to find a valid target up (first value) and down (last value)
        if (cluster.direction === 'vertical') {
            // Search for target up
            let [x, y] = cluster.coords[0];
            const attackUp = [x, y - 1];
            if (this.isInBounds(attackUp) && !this.board.getValue(attackUp).peg) return attackUp;

            // Search for target down
            [x, y] = cluster.coords[cluster.coords.length - 1];
            const attackDown = [x, y + 1];
            if (this.isInBounds(attackDown) && !this.board.getValue(attackDown).peg)
                return attackDown;
        }
    }

    // Removes exhausted clusters from the clusters list.
    // An exhausted cluster is defined by containing pegs past each end of its directional axis.
    removeExhaustedClusters() {
        this.clusters = this.clusters.filter((cluster) => {
            if (!cluster.direction) return true;
            return !!this.findDirectionalTarget(cluster);
        });
    }

    isInBounds([x, y]) {
        return x >= 0 && x < this.board.width && y >= 0 && y < this.board.height;
    }
}

export { AiState };
