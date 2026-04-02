import './style.css';
import { GameController } from './controllers/GameController.js';
import * as InputHandler from './ui/InputHandler.js';

document.addEventListener('DOMContentLoaded', () => {
    const game = new GameController();
    game.start();
    InputHandler.init(game);
});
