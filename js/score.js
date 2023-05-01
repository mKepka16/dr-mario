"use strict"

const Score = {
    scoreDOM: document.querySelector('.score'),
    topDOM: document.querySelector('.top'),

    score: 0,
    top: 0,

    add() {
        this.score += 100;
        this.update();
    },

    update() {
        this.changeImages(this.score, this.scoreDOM);
        if (!localStorage.getItem('top'))
            localStorage.setItem('top', 0);

        this.top = parseInt(localStorage.getItem('top')); 
        if (this.score > this.top) {
            this.top = this.score;
            localStorage.setItem('top', this.top);
        }
        this.changeImages(this.top, this.topDOM);
    },

    changeImages(score, target) {
        score = score.toString();
        while (score.length < 7) {
            score = "0" + score;
        }

        target.innerHTML = '';
        for (let digit of score) {
            const image = new Image();
            image.src = `./img/cyfry/${digit}.png`;
            target.appendChild(image);
        }
    }
}

Score.update();