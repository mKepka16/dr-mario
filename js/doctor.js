"use strict"

const Doctor = {
    animationBox: [],
    animationSpeed: 20,

    generateAnimationBox() {
        const width = 12;
        const height = 8;

        const DOMBox = document.createElement('div');
        DOMBox.classList.add('animation-box');
    
        for(let rowNum=1; rowNum<=height; rowNum++) {
            const row = [];
            const DOMRow = document.createElement('div');
            DOMRow.classList.add('row');
    
            for(let colNum=1; colNum<=width; colNum++) {
                const DOMField = document.createElement('div');
                DOMField.classList.add('frame-cell');
                
                const DOMImage = document.createElement('img');
                DOMImage.src = "";
                DOMField.appendChild(DOMImage);
                row.push(DOMImage);

                DOMRow.appendChild(DOMField);
            }
            DOMBox.appendChild(DOMRow);
            this.animationBox.push(row);
        }
    
        document.querySelector('.backgroundImage').prepend(DOMBox);
    },

    setSrc(x, y, src) {
        this.animationBox[y-1][x-1].src = src;
    },

    animation(left, right) {
        const nextLeft = Board.colors[Math.floor(Math.random() * 3)];
        const nextRight = Board.colors[Math.floor(Math.random() * 3)];

        const frames = [
            [
                { x: 12, y: 5, src: 'hands/up_1' },
                { x: 12, y: 6, src: 'hands/up_2' },
                { x: 12, y: 7, src: 'hands/up_3' },
                { x: 12, y: 4, src: `${right}_right` },
                { x: 11, y: 4, src: `${left}_left` }
            ],
            [
                { x: 12, y: 5, src: 'hands/up_1' },
                { x: 12, y: 6, src: 'hands/up_2' },
                { x: 12, y: 7, src: 'hands/up_3' },
                { x: 11, y: 3, src: `${left}_up` },
                { x: 11, y: 4, src: `${right}_down` }
            ],
            [
                { x: 12, y: 5, src: 'hands/up_1' },
                { x: 12, y: 6, src: 'hands/up_2' },
                { x: 12, y: 7, src: 'hands/up_3' },
                { x: 11, y: 3, src: `${left}_right` },
                { x: 10, y: 3, src: `${right}_left` }
            ],
            [
                { x: 12, y: 5, src: 'hands/up_1' },
                { x: 12, y: 6, src: 'hands/up_2' },
                { x: 12, y: 7, src: 'hands/up_3' },
                { x: 10, y: 2, src: `${left}_up` },
                { x: 10, y: 3, src: `${right}_down` }
            ],
            [
                { x: 11, y: 6, src: 'hands/middle11' },
                { x: 12, y: 6, src: 'hands/middle12' },
                { x: 11, y: 7, src: 'hands/middle21' },
                { x: 12, y: 7, src: 'hands/middle22' },
                { x: 9, y: 2, src: `${left}_left` },
                { x: 10, y: 2, src: `${right}_right` }
            ],
            [
                { x: 11, y: 6, src: 'hands/middle11' },
                { x: 12, y: 6, src: 'hands/middle12' },
                { x: 11, y: 7, src: 'hands/middle21' },
                { x: 12, y: 7, src: 'hands/middle22' },
                { x: 9, y: 2, src: `${left}_down` },
                { x: 9, y: 1, src: `${right}_up` }
            ],
            [
                { x: 11, y: 6, src: 'hands/middle11' },
                { x: 12, y: 6, src: 'hands/middle12' },
                { x: 11, y: 7, src: 'hands/middle21' },
                { x: 12, y: 7, src: 'hands/middle22' },
                { x: 9, y: 2, src: `${left}_right` },
                { x: 8, y: 2, src: `${right}_left` }
            ],
            [
                { x: 12, y: 7, src: 'hands/down_1' },
                { x: 12, y: 8, src: 'hands/down_2' },
                { x: 8, y: 1, src: `${left}_up` },
                { x: 8, y: 2, src: `${right}_down` }
            ],
            [
                { x: 12, y: 7, src: 'hands/down_1' },
                { x: 12, y: 8, src: 'hands/down_2' },
                { x: 7, y: 2, src: `${left}_left` },
                { x: 8, y: 2, src: `${right}_right` }
            ],
            [
                { x: 12, y: 7, src: 'hands/down_1' },
                { x: 12, y: 8, src: 'hands/down_2' },
                { x: 7, y: 2, src: `${left}_down` },
                { x: 7, y: 1, src: `${right}_up` }
            ],
            [
                { x: 12, y: 7, src: 'hands/down_1' },
                { x: 12, y: 8, src: 'hands/down_2' },
                { x: 7, y: 2, src: `${left}_right` },
                { x: 6, y: 2, src: `${right}_left` }
            ],
            [
                { x: 12, y: 7, src: 'hands/down_1' },
                { x: 12, y: 8, src: 'hands/down_2' },
                { x: 6, y: 1, src: `${left}_up` },
                { x: 6, y: 2, src: `${right}_down` }
            ],
            [
                { x: 12, y: 7, src: 'hands/down_1' },
                { x: 12, y: 8, src: 'hands/down_2' },
                { x: 5, y: 2, src: `${left}_left` },
                { x: 6, y: 2, src: `${right}_right` }
            ],
            [
                { x: 12, y: 7, src: 'hands/down_1' },
                { x: 12, y: 8, src: 'hands/down_2' },
                { x: 5, y: 2, src: `${left}_down` },
                { x: 5, y: 1, src: `${right}_up` }
            ],
            [
                { x: 12, y: 7, src: 'hands/down_1' },
                { x: 12, y: 8, src: 'hands/down_2' },
                { x: 5, y: 2, src: `${left}_right` },
                { x: 4, y: 2, src: `${right}_left` }
            ],
            [
                { x: 12, y: 7, src: 'hands/down_1' },
                { x: 12, y: 8, src: 'hands/down_2' },
                { x: 4, y: 1, src: `${left}_up` },
                { x: 4, y: 2, src: `${right}_down` }
            ],
            [
                { x: 12, y: 7, src: 'hands/down_1' },
                { x: 12, y: 8, src: 'hands/down_2' },
                { x: 3, y: 2, src: `${left}_left` },
                { x: 4, y: 2, src: `${right}_right` }
            ],
            [
                { x: 12, y: 7, src: 'hands/down_1' },
                { x: 12, y: 8, src: 'hands/down_2' },
                { x: 3, y: 2, src: `${left}_down` },
                { x: 3, y: 1, src: `${right}_up` }
            ],
            [
                { x: 12, y: 7, src: 'hands/down_1' },
                { x: 12, y: 8, src: 'hands/down_2' },
                { x: 3, y: 3, src: `${left}_right` },
                { x: 2, y: 3, src: `${right}_left` }
            ],
            [
                { x: 12, y: 7, src: 'hands/down_1' },
                { x: 12, y: 8, src: 'hands/down_2' },
                { x: 2, y: 2, src: `${left}_up` },
                { x: 2, y: 3, src: `${right}_down` }
            ],
            [
                { x: 12, y: 7, src: 'hands/down_1' },
                { x: 12, y: 8, src: 'hands/down_2' },
                { x: 1, y: 3, src: `${left}_left` },
                { x: 2, y: 3, src: `${right}_right` }
            ],
            [
                { x: 12, y: 7, src: 'hands/down_1' },
                { x: 12, y: 8, src: 'hands/down_2' },
                { x: 1, y: 4, src: `${left}_left` },
                { x: 2, y: 4, src: `${right}_right` }
            ],
            [
                { x: 12, y: 7, src: 'hands/down_1' },
                { x: 12, y: 8, src: 'hands/down_2' },
                { x: 1, y: 5, src: `${left}_left` },
                { x: 2, y: 5, src: `${right}_right` }
            ],
            [
                { x: 12, y: 7, src: 'hands/down_1' },
                { x: 12, y: 8, src: 'hands/down_2' },
                { x: 1, y: 6, src: `${left}_left` },
                { x: 2, y: 6, src: `${right}_right` }
            ],
            [
                { x: 12, y: 7, src: 'hands/down_1' },
                { x: 12, y: 8, src: 'hands/down_2' }
            ],
            [
                { x: 12, y: 5, src: 'hands/up_1' },
                { x: 12, y: 6, src: 'hands/up_2' },
                { x: 12, y: 7, src: 'hands/up_3' },
                { x: 12, y: 4, src: `${nextRight}_right` },
                { x: 11, y: 4, src: `${nextLeft}_left` }
            ],
        ];

        return new Promise((resolve, reject) => {
            let i=0;

            this.setSrc(12, 7, '');
            this.setSrc(12, 8, '');

            const animationInterval = setInterval(() => {
                if(i == frames.length) {
                    clearInterval(animationInterval);
                    resolve({ nextLeft, nextRight });
                    return;
                };

                if(i != 0) {
                    frames[i-1].forEach(frame => {
                        Doctor.setSrc(frame.x, frame.y, '');
                    });
                }

                frames[i++].forEach(frame => {
                    Doctor.setSrc(frame.x, frame.y, `img/${frame.src}.png`);
                });
            }, this.animationSpeed);
        });
    },

    gameOver() {
        const image = document.querySelector('.doctor-game-over');
        image.style.display = 'block';
    }
}

Doctor.generateAnimationBox();
Doctor.animation('yl', 'br');