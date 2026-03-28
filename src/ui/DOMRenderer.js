import { createEl } from '../utils/DOMBuilder.js';
import { img } from '../assets/assetImporter.js';

class DOMRenderer {
    static renderBoard(board) {
        // Create cells
        const cells = [];
        board.coordinates.forEach((value, index) => {
            const [x, y] = board.getCoord(index);
            const cell = createEl('div', {
                classes: ['grid-cell'],
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
        const cellPercent = 100 / board.width;
        board.ships.forEach((ship) => {
            const shipEl = createEl('img', {
                classes: ['ship'],
                attrs: {
                    style: `
                        left: ${ship.position[0] * cellPercent}%;
                        top: ${ship.position[1] * cellPercent}%;
                        width: ${ship.length * cellPercent}%;
                        height: ${cellPercent}%;
                        transform-origin: ${50 / ship.length}% 50%;
                        rotate: ${ship.direction === 'vertical' ? '90deg' : '0deg'};
                    `,
                    src: img[`ship${ship.length}`],
                },
            });
            ships.push(shipEl);
        });

        // Create grid layer
        const gridStage = createEl('div', {
            classes: ['grid-stage'],
            attrs: { style: `--cols:${board.width};` },
            children: [...cells, ...ships],
        });

        // Append grid stage to app
        const app = document.querySelector('.app');
        app.appendChild(gridStage);
    }
}

export { DOMRenderer };
