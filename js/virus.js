"use strict"

const Virus = {
    count: 0,
    countBoard: document.querySelector('.virus-count-board'),
    generate(color) {
        const x = Math.floor(Math.random() * BOARD_SIZE.cols) + 1;
        const height = Math.floor((BOARD_SIZE.rows * 2) / 3);
        const y = Math.floor(Math.random() * height) + 1 + (BOARD_SIZE.rows-height);

        if(board[y][x].state != 'air') 
            return Virus.generate(color);

        Board.setField(x, y, color, false, null);
        board[y][x].virus = true;
        board[y][x].DOM.children[0].src = `./img/covid_${board[y][x].state}.png`;
        this.count++;
    },

    updateCountBoard() {
        if(this.count < 1)
            Game.finish('win');

        let count = this.count.toString();
        while (count.length < 2) {
            count = "0" + count;
        }
        console.log(count);

        this.countBoard.innerHTML = '';
        for (let digit of count) {
            const image = new Image();
            image.src = `./img/cyfry/${digit}.png`;
            this.countBoard.appendChild(image);
        }
    }
}

Virus.generate('color');
Virus.generate('br');
Virus.generate('yl');
Virus.generate('bl');
Virus.updateCountBoard();