import { UIMode, getUIMode } from './UIMode';

let gameController = null;

export function init(controller) {
    gameController = controller;
    document.addEventListener('mousemove', onHover);
    document.addEventListener('click', onClick);
    document.addEventListener('keypress', onKeyPressed);
}

function onHover(e) {
    const cell = e.target.closest('.grid-cell');
    if (!cell) return;
    if (getUIMode() === UIMode.PLACING_SHIPS && cell.closest('.computer')) return;
    if (getUIMode() === UIMode.PLAYER_TURN && !cell.closest('.computer')) return;
    if (getUIMode() === UIMode.DISABLED) return;
    const x = Number(cell.dataset.x);
    const y = Number(cell.dataset.y);
    gameController.handleHover(x, y);
}

function onClick(e) {
    const cell = e.target.closest('.grid-cell');
    if (!cell) return;
    if (getUIMode() === UIMode.PLACING_SHIPS && cell.closest('.computer')) return;
    if (getUIMode() === UIMode.PLAYER_TURN && !cell.closest('.computer')) return;
    if (getUIMode() === UIMode.DISABLED) return;
    const x = Number(cell.dataset.x);
    const y = Number(cell.dataset.y);
    gameController.handleClick(x, y);
}

function onKeyPressed(e) {
    gameController.handleKeyPressed(e.code);
}
