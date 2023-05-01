"use strict"

const Game = {
    stageCompleted: false,

    finish(status) {
        if(status == 'win') {
            // this.stageCompleted = true;
            // Messenger.playerWon();
        }
        else {
            Messenger.playerLost();
            Eyeglass.celebration();
            Doctor.gameOver();
        }
    }
}

ActiveBlock.start();