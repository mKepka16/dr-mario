"use strict";

const Board = {
    colors: ["br", "yl", "bl"],
    blocksCount: 0,
    freeFallSpeed: 100,

    init() {
        this.initArray();
        this.initDOM();
    },

    initArray() {
        for(let rowNum=0; rowNum<=BOARD_SIZE.rows+1; rowNum++) {
            const row = [];
            for(let colNum=0; colNum<=BOARD_SIZE.cols+1; colNum++) {
                
                const cell = rowNum != 0 && rowNum != BOARD_SIZE.rows+1 && colNum!= 0 && colNum != BOARD_SIZE.cols+1 ?
                {
                    state: "air",
                    active: false
                } :
                {
                    state: "border",
                }
    
                row.push(cell);
            }
            board.push(row);
        }
    },


    initDOM() {
        const DOMBoard = document.createElement('div');
        DOMBoard.classList.add('board');
    
        for(let rowNum=1; rowNum<=BOARD_SIZE.rows; rowNum++) {
            const DOMRow = document.createElement('div');
            DOMRow.classList.add('row');
    
            for(let colNum=1; colNum<=BOARD_SIZE.cols; colNum++) {
                const DOMField = document.createElement('div');
                DOMField.classList.add('field');
                
                const DOMImage = document.createElement('img');
                DOMField.appendChild(DOMImage);

                DOMRow.appendChild(DOMField);
                board[rowNum][colNum].DOM = DOMField;
            }
            DOMBoard.appendChild(DOMRow);
        }
    
        document.querySelector('.backgroundImage').prepend(DOMBoard);
    },

    setField(x, y, state=null, active=null, id=0, direction='left') {
        if(id != 0)
            board[y][x].id = id;
        if(state) {
            if(state == "color") {
                const color = this.colors[Math.floor(Math.random() * 3)];
                board[y][x].state = color;
                board[y][x].DOM.children[0].src = `./img/${color}_${direction}.png`;
            }
            else if(state==="air") {
                board[y][x].state = state;
                board[y][x].DOM.children[0].src = ``;
            }
            else {
                board[y][x].state = state;
                board[y][x].DOM.children[0].src = `./img/${state}_${direction}.png`;
            }
        }
        if(active!==null)
            board[y][x].active = active;

        board[y][x].virus = null;

        return board[y][x].state;
        
    },

    useGravityContinuously() {
        console.log("useGravityContinuoslu used");
        const shouldContinue = Board.useGravityOnAll();
        if(shouldContinue) {
            // Board.useGravityContinuously();
            setTimeout(Board.useGravityContinuously, Board.freeFallSpeed);
        }
        else {
            const crashed = Board.crashOnWholeBoard();
            Board.repairWithNoPair();
            if(crashed) {
                Board.useGravityContinuously();
                //setTimeout(Board.useGravityContinuously, Board.freeFallSpeed);
            }
            else {
                ActiveBlock.start();
            }
        }
    },

    useGravityOnAll() {
        let continuationNeeded = false;

        for(let y = BOARD_SIZE.rows; y>=1; y--) {
            for(let x = 1; x <= BOARD_SIZE.cols; x++) {
                if(this.useGravity(x, y))
                    continuationNeeded = true;
            }
        }

        return continuationNeeded;
    },

    useGravity(x, y) {
        const pairMate = this.getInPair(x, y);
        let continuationNeeded = false

        if(pairMate) {
            if(
                pairMate.direction == 'right' &&
                board[y+1][x].state == 'air' &&
                board[y+1][x+1].state == 'air' 
            ) {
                x++;
                this.dropDown(x, y);
                this.dropDown(x+1, y);

                continuationNeeded = true;
                // console.log('on the right');
            }
            else if(
                pairMate.direction == 'up' &&
                board[y+1][x].state == 'air'
            ) {
                this.dropDown(x, y);
                this.dropDown(x, y-1);
                continuationNeeded = true;
                // console.log('up');
            }
        }
        else if(
            board[y][x].state != 'air' &&
            !board[y][x].virus &&
            board[y+1][x].state == 'air'
        ) {
            this.dropDown(x, y);
            continuationNeeded = true;
            // console.log('only one');
        }
        return continuationNeeded;
    },

    getInPair(x, y) {
        if(board[y][x+1].id && board[y][x].id == board[y][x+1].id) return { direction: 'right' };
        if(board[y][x-1].id && board[y][x].id == board[y][x-1].id) return { direction: 'left', };
        if(board[y-1][x].id && board[y][x].id == board[y-1][x].id) return { direction: 'up' };
        if(board[y+1][x].id && board[y][x].id == board[y+1][x].id) return { direction: 'down' };
        return null;
    },

    dropDown(x, y) {
        this.setField(x, y+1, board[y][x].state, false, board[y][x].id);
        board[y+1][x].DOM.children[0].src = board[y][x].DOM.children[0].src;
        this.setField(x, y, 'air', false, null);
    },

    repairWithNoPair() {
        for(let y = BOARD_SIZE.rows; y>=1; y--) {
            for(let x = 1; x <= BOARD_SIZE.cols; x++) {
                if(board[y][x].state != 'air' && !board[y][x].virus && !Board.getInPair(x, y))
                board[y][x].DOM.children[0].src = `./img/${board[y][x].state}_dot.png`;
            }
        }
    },

    crashOnWholeBoard() {
        let crashed = false;

        for(let y=1; y<=BOARD_SIZE.rows; y++) {
            for(let x=1; x<=BOARD_SIZE.cols; x++) {
                if(board[y][x].state == 'air')      continue;

                const isCrashed = ActiveBlock.crash([{
                    cords: [x, y],
                    color: board[y][x].state
                }])

                crashed = isCrashed ? isCrashed : crashed;
            }
        }
        
        return crashed;
    }
}

Board.init();