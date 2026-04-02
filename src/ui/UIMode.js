export const UIMode = {
    PLACING_SHIPS: 'placing-ships',
    PLAYER_TURN: 'player-turn',
    DISABLED: 'disabled',
};

let currentState = UIMode.DISABLED;

export function getUIMode() {
    return currentState;
}

export function setUIMode(mode) {
    currentState = mode;
}
