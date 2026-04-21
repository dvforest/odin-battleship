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
        let battlefield = document.querySelector('.battlefield');
        if (!battlefield) {
            battlefield = createEl('div', {
                classes: ['battlefield'],
            });
            app.appendChild(battlefield);
        }
        battlefield.appendChild(gridStage);
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

    static renderPeg([x, y], player, color) {
        const board = player.board;
        const cellPercent = 100 / board.width;
        const placedPeg = createEl('img', {
            classes: ['peg'],
            attrs: {
                style: `
                        left: ${x * cellPercent}%;
                        top: ${y * cellPercent - 2}%;
                        width: ${cellPercent}%;
                        height: ${cellPercent}%;
                    `,
                src: img[`peg${color}`],
            },
        });
        document.querySelector(`.grid-stage.${player.type}`).append(placedPeg);
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

    static renderTitle() {
        const app = document.querySelector('.app');
        const title = createEl('div', {
            classes: ['main-title'],
            text: 'BATTLESHIP',
        });
        app.append(title);
    }

    static renderMessage(text, hintText) {
        const app = document.querySelector('.app');

        // Search for text box, or create it if non-existing
        let message = document.querySelector('.message');
        if (!message) {
            message = createEl('div', {
                classes: ['message'],
            });
            app.append(message);
        }
        this.animateTypewriter(message, text);

        // Search for hint, or create it if non-existing
        let hint = document.querySelector('.hint');
        if (!hint) {
            hint = createEl('div', {
                classes: ['message', 'hint'],
                text: hintText.toUpperCase(),
            });
            app.append(hint);
        }
        this.animateFade(hint);
    }

    static animateTypewriter(el, msg) {
        const chars = [...msg];
        el.textContent = '';
        let index = 0;

        function step() {
            el.textContent += chars[index];
            index++;

            if (index < chars.length) {
                requestAnimationFrame(step);
            }
        }
        requestAnimationFrame(step);
    }

    static animateFade(el) {
        el.classList.add('fade');
        el.classList.remove('show');
        void el.offsetWidth;
        el.classList.add('show');
        requestAnimationFrame(() => {
            el.classList.add('show');
        });
    }
}

export { DOMRenderer };
