import { UIMode, getUIMode } from './UIMode';

let gameController = null;

export function init(controller) {
    gameController = controller;
    document.addEventListener('mousemove', onHover);
    document.addEventListener('click', onClick);
}

function onHover() {
    if (getUIMode() !== UIMode.PLACING_SHIPS) return;
    console.log('hovered');
}

function onClick() {
    if (getUIMode() !== UIMode.PLACING_SHIPS) return;
    console.log('clicked');
}
