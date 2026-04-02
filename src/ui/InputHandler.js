import { UIMode, getUIMode } from './UIMode';

let gameController = null;

export function init(controller) {
    gameController = controller;
    document.addEventListener('mousemove', onHover);
    document.addEventListener('click', onClick);
}

function onHover(e) {
    if (getUIMode() !== UIMode.PLACING_SHIPS) return;
    const cell = e.target.closest('.grid-cell');
    if (!cell) return;
    const x = Number(cell.dataset.x);
    const y = Number(cell.dataset.y);
    gameController.handleHover(x, y);
}

function onClick(e) {
    if (getUIMode() !== UIMode.PLACING_SHIPS) return;
    const cell = e.target.closest('.grid-cell');
    if (!cell) return;
    const x = Number(cell.dataset.x);
    const y = Number(cell.dataset.y);
    gameController.handleClick(x, y);
}
