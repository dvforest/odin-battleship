class Cluster {
    constructor() {
        this.direction = null;
        this.coords = []; // Array of [x, y] coordinate pairs;
    }
}

class AiState {
    constructor(board) {
        this.board = board;
        this.clusters = []; // Array of Cluster instances
        this.hits = []; // Array of all successful hits as [x, y] coordinate pairs.
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
                    this.hits.push(target);
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
                    this.hits.push(target);
                }
                return target;
            }
        }

        // So as to not be too predictable, ai has 1:2 chance
        // to search for targets next to previous successful hits

        const rand = Math.floor(Math.random() * 2);

        if (rand > 0) {
            for (const hit of this.hits) {
                const target = this.findAdjacentTarget(hit);
                if (target) {
                    // If ship is found at target, add the new hit
                    if (this.board.getValue(target).ship) {
                        this.hits.push(target);

                        // create a new directional cluster using previous and new hit
                        const cluster = new Cluster();
                        cluster.coords.push(hit);
                        cluster.coords.push(target);
                        this.findDirection(cluster);

                        // Add it to clusters list
                        this.clusters.push(cluster);
                    }
                    return target;
                }
            }
        }

        // Search for random target as a last fallback.
        target = this.findRandomTarget();
        if (this.board.getValue(target).ship) {
            const cluster = new Cluster();
            cluster.coords.push(target);
            this.clusters.push(cluster);
            this.hits.push(target);
        }
        return target;
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
        const deltas = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
        ];

        for (const [dx, dy] of deltas) {
            const coord = [x + dx, y + dy];
            if (this.isInBounds(coord) && !this.board.getValue(coord).peg) {
                return coord;
            }
        }
    }

    // Returns true if all adjacent coordinates contain a peg.
    isHitExhausted([x, y]) {
        const deltas = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
        ];

        for (const [dx, dy] of deltas) {
            const coord = [x + dx, y + dy];
            if (this.isInBounds(coord) && !this.board.getValue(coord).peg) {
                return false;
            }
        }
        return true;
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
    // An exhausted hit is defined by contained pegs on each adjacent coordinate.
    removeExhausted() {
        console.log(this.hits);
        this.clusters = this.clusters.filter((cluster) => {
            if (cluster.coords.length === 1) {
                return !this.isHitExhausted(cluster.coords[0]);
            }
            if (!cluster.direction) return true;
            return !!this.findDirectionalTarget(cluster);
        });

        this.hits = this.hits.filter((hit) => {
            return !this.isHitExhausted(hit);
        });
    }

    isInBounds([x, y]) {
        return x >= 0 && x < this.board.width && y >= 0 && y < this.board.height;
    }
}

export { AiState };
