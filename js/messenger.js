"use strict"

const Messenger = {
    stageCompleted: document.querySelector('.stage-completed'),
    gameOver: document.querySelector('.game-over'),

    playerWon() {
        this.stageCompleted.style.display = "block";
    },

    playerLost() {
        this.gameOver.style.display = "block";
    }
}