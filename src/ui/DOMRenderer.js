import { createEl } from '../utils/DOMBuilder';

class DOMRenderer {
    static renderBoard(board) {
        // Create cells
        const cells = [];
        board.coordinates.forEach((value, index) => {
            const [x, y] = board.getCoord(index);
            const cell = createEl('div', {
                classes: ['cell'],
                attrs: { 'data-x': x, 'data-y': y },
            });
            cells.push(cell);
        });

        // Create grid layer and append cells
        const gridLayer = createEl('div', {
            classes: ['layer', 'grid'],
            attrs: { style: `--cols:${board.width};` },
            children: cells,
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
