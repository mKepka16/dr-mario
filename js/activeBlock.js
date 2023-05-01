"use strict"

const ActiveBlock = {
    speed: 600,
    dropSpeed: 80,
    handleInterval: null,
    rotation: "horizontal",
    blocks: [],
    isDropping: false,
    nextLeft: Board.colors[Math.floor(Math.random() * 3)],
    nextRight: Board.colors[Math.floor(Math.random() * 3)],
    pushedKeys: [],

    addEvents() {
        window.addEventListener("keydown", e => {
            if(this.pushedKeys.includes(e.key)) return;

            if(this.isDropping) return;
            if(e.key=="Shift") this.rotate(1);
            else if(e.key=="ArrowLeft" || e.key=="a" || e.key=="A") this.moveHorizontal(-1);
            else if(e.key=="ArrowRight" || e.key=="d" || e.key=="D") this.moveHorizontal(1);
            else if(e.key=="ArrowDown" || e.key=="s" || e.key=="S") this.dropBlock();
            else if(e.key=="ArrowUp" || e.key=="w" || e.key=="W") this.rotate(-1);
            this.pushedKeys.push(e.key);

        })

        window.addEventListener("keyup", e => {
            if(this.pushedKeys.includes(e.key)) {
                const index = this.pushedKeys.indexOf(e.key);
                this.pushedKeys.splice(index, 1);
            }
        })
    },

    start() {
        if(this.handleInterval) clearInterval(this.handleInterval);
        this.handleInterval = null;
        this.rotation = "horizontal";

        if(this.checkIfPlayerLost()) {
            Game.finish('lost');
            return;
        }
        if(Game.stageCompleted)
            return;

        const left = this.nextLeft;
        const right = this.nextRight;

        Doctor.animation(left, right)
        .then(({ nextLeft, nextRight }) => {
            this.nextLeft = nextLeft;
            this.nextRight = nextRight;

            const half = Math.floor(BOARD_SIZE.cols/2);

            this.blocks = [
                {
                    cords: [half, 1],
                    color: Board.setField(half, 1, left, true, 0, 'left')
                },
                {
                    cords: [half+1, 1],
                    color: Board.setField(half+1, 1, right, true, 0, 'right')
                }  
            ]; 
            
            this.handleInterval = setInterval(this.moveDown, this.speed);
        });
    },

    checkIfPlayerLost() {
        return !(board[1][BOARD_SIZE.cols/2].state == 'air' && 
            board[1][BOARD_SIZE.cols/2+1].state == 'air'); 
    },

    getSrc(isPrimary = true) {
        if(isPrimary) return this.rotation == 'horizontal' ? 'left' : 'down';
        return this.rotation == 'horizontal' ? 'right' : 'up';
    },

    moveDown() {
        const [first, second] = ActiveBlock.blocks;

        if(!ActiveBlock.checkMoveDown()) {
            if(this.handleInterval) clearInterval(this.handleInterval);

            Board.setField(first.cords[0], first.cords[1], first.color, false, ++Board.blocksCount, ActiveBlock.getSrc());
            Board.setField(second.cords[0], second.cords[1], second.color, false, Board.blocksCount, ActiveBlock.getSrc(false));
            
            if(ActiveBlock.crash(ActiveBlock.blocks)) {
                Board.useGravityContinuously();
            }
            else {
                ActiveBlock.start(); 
            }

            return false;        
        }  

        Board.setField(first.cords[0], first.cords[1]+1, first.color, true, 0, ActiveBlock.getSrc());
        Board.setField(second.cords[0], second.cords[1]+1, second.color, true, 0, ActiveBlock.getSrc(false));

        if(ActiveBlock.rotation == "horizontal")
            Board.setField(first.cords[0], first.cords[1], "air", false, null);
        Board.setField(second.cords[0], second.cords[1], "air", false, null);

        ActiveBlock.blocks[0].cords[1] = first.cords[1]+1;
        ActiveBlock.blocks[1].cords[1] = second.cords[1]+1;

        return true;
    },

    checkMoveDown() {
        const [first, second] = ActiveBlock.blocks;

        if(board[first.cords[1]+1][first.cords[0]].state != "air") 
            return false;
        if(this.rotation == "horizontal" && board[second.cords[1]+1][second.cords[0]].state != "air")
            return false;
        return true;
    },

    rotate(dirNum) {
        const [first, second] = ActiveBlock.blocks;
        if(first.cords[1] == 1) return;
        this.rotation = this.rotation == "horizontal" ? "vertical" : "horizontal";
        
        if(this.rotation == "vertical") {
            Board.setField(first.cords[0], first.cords[1]-1, second.color, true, 0, ActiveBlock.getSrc(false));
            Board.setField(first.cords[0], first.cords[1], first.color, true, 0, ActiveBlock.getSrc());
            Board.setField(second.cords[0], second.cords[1], "air", false, null);
            this.blocks[1].cords = [first.cords[0], first.cords[1]-1];
            if(dirNum == 1) this.swap();
        }
        else {
            if(board[first.cords[1]][first.cords[0]+1].state != "air" && board[first.cords[1]][first.cords[0]+1].state != "border") {
                this.rotation = "vertical";
                return;
            }
            if(second.cords[0] == BOARD_SIZE.cols) {
                this.moveHorizontal(-1);
                if(!this.checkMoveHorizontal(-1)) 
                {
                    this.rotation = "vertical";
                    return;
                }
            }
            Board.setField(first.cords[0]+1, first.cords[1], second.color, true, 0, ActiveBlock.getSrc(false));
            Board.setField(first.cords[0], first.cords[1], first.color, true, 0, ActiveBlock.getSrc());
            Board.setField(second.cords[0], second.cords[1], "air", false);
            this.blocks[1].cords = [first.cords[0]+1, first.cords[1]];
            if(dirNum == -1) this.swap();
        }
    },

    swap() {
        const tempColor = ActiveBlock.blocks[0].color;
        ActiveBlock.blocks[0].color = ActiveBlock.blocks[1].color;
        ActiveBlock.blocks[1].color = tempColor;
        
        const [first, second] = ActiveBlock.blocks;
        Board.setField(first.cords[0], first.cords[1], first.color, null, 0, ActiveBlock.getSrc());
        Board.setField(second.cords[0], second.cords[1], second.color, null, 0, ActiveBlock.getSrc(false));
    },

    moveHorizontal(dirNum) {
        const [first, second] = ActiveBlock.blocks;

        if(!ActiveBlock.checkMoveHorizontal(dirNum))
            return;  

        Board.setField(first.cords[0]+dirNum, first.cords[1], first.color, true, 0, ActiveBlock.getSrc());
        Board.setField(second.cords[0]+dirNum, second.cords[1], second.color, true, 0, ActiveBlock.getSrc(false));

        const toClearAlways = dirNum == 1 ? first : second;
        const toClear = dirNum == 1 ? second : first;

        Board.setField(toClearAlways.cords[0], toClearAlways.cords[1], "air", false, null);
        if(this.rotation == "vertical")
            Board.setField(toClear.cords[0], toClear.cords[1], "air", false, null);

        ActiveBlock.blocks[0].cords[0] = first.cords[0]+dirNum;
        ActiveBlock.blocks[1].cords[0] = second.cords[0]+dirNum;
    },

    checkMoveHorizontal(dirNum) {
        const [first, second] = ActiveBlock.blocks;

        if(dirNum == 1 && board[second.cords[1]][second.cords[0]+1].state != "air")
            return false;
        if(dirNum == 1 && board[first.cords[1]][first.cords[0]+1].state != "air" && this.rotation == "vertical")
            return false;
        if(dirNum == -1 && board[first.cords[1]][first.cords[0]-1].state != "air")
            return false;
        if(dirNum == -1 && board[second.cords[1]][second.cords[0]-1].state != "air" && this.rotation == "vertical")
            return false;
        if(this.rotation == "vertical" && board[second.cords[1]][second.cords[0]+dirNum].state != "air")
            return false;
        return true;
    },

    dropBlock() {
        this.isDropping = true;

        clearInterval(this.handleInterval);
        this.handleInterval = setInterval(() => {
            const isEnd = !this.moveDown();
            if(isEnd)
                this.isDropping = false;
        }, this.dropSpeed);
    },

    crash(blocks) {
        let fieldsToCrash = [];
        blocks.forEach(block => {
            //console.log(block);
            fieldsToCrash = [
                ...fieldsToCrash,
                ...this.crashInRow(block),
                ...this.crashInColumn(block),
            ];
        })
        
        fieldsToCrash.forEach(field => {
            if(field.state == 'air') return;
            if(field.virus) {
                Score.add();
                field.DOM.children[0].src = `./img/${field.state}_x.png`;
                Virus.count--;
                Virus.updateCountBoard();
            }
            else
                field.DOM.children[0].src = `./img/${field.state}_o.png`;
            setTimeout(() => field.DOM.children[0].src = '', 300);
            field.state = "air";
            field.id = null;
            field.virus = null;
        });

        return fieldsToCrash.length > 0;
    },

    crashInRow({ color, cords: [x, y] }) {
        //horizontall
        let fields = [board[y][x]];

        //left
        let xNow = x-1;
        while(board[y][xNow].state == color) {
            fields.push(board[y][xNow]);
            xNow--;
        }

        //right
        xNow = x+1;
        while(board[y][xNow].state == color) {
            fields.push(board[y][xNow]);
            xNow++;
        }

        return fields.length >= 4 ? fields : [];
    },

    crashInColumn({ color, cords: [x, y] }) {
        //vertical
        let fields = [board[y][x]];

        //up
        let yNow = y-1;
        while(board[yNow][x].state == color) {
            fields.push(board[yNow][x]);
            yNow--;
        }

        //down
        yNow = y+1;
        while(board[yNow][x].state == color) {
            fields.push(board[yNow][x]);
            yNow++;
        }

        return fields.length >= 4 ? fields : [];
    }
}
ActiveBlock.addEvents();

