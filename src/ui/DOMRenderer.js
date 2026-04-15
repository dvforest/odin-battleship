import { createEl } from '../utils/DOMBuilder.js';
import { img } from '../assets/assetImporter.js';

class DOMRenderer {
    static renderBoard(player) {
        const board = player.board;
        const type = player.type;

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

        // Create grid stage
        const gridStage = createEl('div', {
            classes: ['grid-stage', `${type}`],
            attrs: { style: `--cols:${board.width};` },
            children: [...cells],
        });

        // Append grid stage to app
        const app = document.querySelector('.app');
        app.appendChild(gridStage);
    }

    static previewShip(ship, valid, player) {
        const board = player.board;
        const gridStage = document.querySelector(`.grid-stage.${player.type}`);

        this.clearPreviewShip(player);

        const cellPercent = 100 / board.width;
        const previewShip = createEl('img', {
            classes: ['preview-ship'],
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
        if (valid) previewShip.classList.add('valid');
        gridStage.append(previewShip);
    }

    static previewTarget([x, y], player) {
        const board = player.board;
        const gridStage = document.querySelector(`.grid-stage.${player.type}`);

        this.clearPreviewTarget(player);

        const cellPercent = 100 / board.width;
        const previewTarget = createEl('img', {
            classes: ['preview-target'],
            attrs: {
                style: `
                        left: ${x * cellPercent}%;
                        top: ${y * cellPercent}%;
                        width: ${cellPercent}%;
                        height: ${cellPercent}%;
                    `,
                src: img.target,
            },
        });
        gridStage.append(previewTarget);
    }

    static clearPreviewShip(player) {
        const gridStage = document.querySelector(`.grid-stage.${player.type}`);
        const existing = gridStage.querySelector('.preview-ship');
        if (existing) existing.remove();
    }

    static clearPreviewTarget(player) {
        const gridStage = document.querySelector(`.grid-stage.${player.type}`);
        const existing = gridStage.querySelector('.preview-target');
        if (existing) existing.remove();
    }

    static renderPin([x, y], player, color) {
        const board = player.board;
        const cellPercent = 100 / board.width;
        const placedPin = createEl('img', {
            classes: ['pin'],
            attrs: {
                style: `
                        left: ${x * cellPercent}%;
                        top: ${y * cellPercent - 2}%;
                        width: ${cellPercent}%;
                        height: ${cellPercent}%;
                    `,
                src: img[`pin${color}`],
            },
        });
        document.querySelector(`.grid-stage.${player.type}`).append(placedPin);
    }

    static renderShip(ship, player) {
        const board = player.board;
        const cellPercent = 100 / board.width;
        const placedShip = createEl('img', {
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
        document.querySelector(`.grid-stage.${player.type}`).append(placedShip);
    }
}

export { DOMRenderer };
