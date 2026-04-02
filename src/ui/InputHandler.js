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
    gameController.handleHover(cell);
    console.log('Hovered cell:', cell.dataset.x, cell.dataset.y);
}

function onClick() {
    if (getUIMode() !== UIMode.PLACING_SHIPS) return;
    console.log('clicked');
}
