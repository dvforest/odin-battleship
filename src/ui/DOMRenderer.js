import { createEl } from '../utils/DOMBuilder';

class DOMRenderer {
    static renderBoard(board) {
        const cells = [];
        board.coordinates.forEach((value, index) => {
            const [x, y] = board.getCoord(index);
            const cell = createEl('div', {
                classes: ['cell'],
                attrs: { 'data-x': x, 'data-y': y },
            });
            cells.push(cell);
        });

        const grid = createEl('div', {
            classes: ['grid'],
            attrs: { id: 'player-board', style: `--cols:${board.width};` },
            children: cells,
        });

        const app = document.querySelector('.app');
        app.appendChild(grid);
    }
}

export { DOMRenderer };
