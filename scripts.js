
const canvas = document.getElementById('example');
const ctx = canvas.getContext('2d');

const canvasElement = document.querySelector('canvas');

const game = new Game(canvasElement);
const startScreenElement = document.getElementById('start-screen');
const playingScreenElement = document.getElementById('playing-screen');
const endScreenElement = document.getElementById('game-over-screen');

const startButton = startScreenElement.querySelector('button');

startButton.addEventListener('click', () => {
    startScreenElement.style.display ='none';
    playingScreenElement.style.display = 'block';
    game.loop();
    
});

const tryAgainButton = endScreenElement.querySelector('button');

tryAgainButton.addEventListener('click', () => {
    startScreenElement.style.display = 'none';
    playingScreenElement.style.display = 'block';
    game.loop();
});
