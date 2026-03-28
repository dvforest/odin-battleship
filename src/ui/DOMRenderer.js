import { createEl } from '../utils/DOMBuilder';

class DOMRenderer {
    static renderBoard(board) {
        // Create cells
        const cells = [];
        board.coordinates.forEach((value, index) => {
            const [x, y] = board.getCoord(index);
            const cell = createEl('div', {
                classes: ['cell'],
                attrs: {
                    'data-x': x,
                    'data-y': y,
                    style: `grid-area: ${y + 1} / ${x + 1}`,
                },
            });
            cells.push(cell);
        });

        // Create ships
        const ships = [];
        board.ships.forEach((ship) => {
            const xStart = ship.position[1] + 1, // Add 1 to conform to css grid 1-based indexing
                yStart = ship.position[0] + 1;

            const rStart = yStart,
                cStart = xStart,
                rEnd = ship.direction === 'vertical' ? yStart + ship.length : yStart,
                cEnd = ship.direction === 'horizontal' ? xStart + ship.length : xStart;

            const shipEl = createEl('div', {
                classes: ['ship'],
                attrs: { style: `grid-area : ${rStart} / ${cStart} / ${rEnd} / ${cEnd}` },
            });
            ships.push(shipEl);
        });

        // Create grid layer
        const gridLayer = createEl('div', {
            classes: ['layer', 'grid'],
            attrs: { style: `--cols:${board.width};` },
            children: [...cells, ...ships],
        });

        // Create grid stage and append grid layer
        const gridStage = createEl('div', {
            classes: ['grid-stage'],
            children: [gridLayer],
        });

        // Append grid stage to app
        const app = document.querySelector('.app');
        app.appendChild(gridStage);
    }
}

export { DOMRenderer };
