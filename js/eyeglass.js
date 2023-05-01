"use strict"

const Eyeglass = {
    animationIntervals: [],
    bl: document.querySelector('.eyeglass-bl'),
    br: document.querySelector('.eyeglass-br'),
    yl: document.querySelector('.eyeglass-yl'),
    settings: {
        alfa: 0,
        radius: 43,
        speed: 1000,
        step: 18,
        direction: 1 //1 - left, -1 - right
    },
    
    middleCoordinates: {
        x: 85-(65/2),
        y: 60
    },
    
    relativeCoordinates: {
        x: 0,
        y: 0
    },

    setPosition(img, shift=0) {
        const {radius, alfa} = this.settings;
        const radian = (alfa + shift) * 0.0175;

        this.relativeCoordinates.x = radius * Math.cos(radian);
        this.relativeCoordinates.y = -radius * Math.sin(radian);

        img.style.left = `${this.middleCoordinates.x + this.relativeCoordinates.x}px`;
        img.style.top = `${this.middleCoordinates.y + this.relativeCoordinates.y}px`;
    },

    startAnimation() {
        this.animationIntervals.push(setInterval(() => {
            this.setPosition(Eyeglass.bl, 0 + Eyeglass.settings.step);
            this.setPosition(Eyeglass.yl, 120 + Eyeglass.settings.step);
            this.setPosition(Eyeglass.br, 240 + Eyeglass.settings.step);
        
            const {step, direction} = this.settings;
            this.settings.alfa += step * direction;
        
        }, this.settings.speed));

        this.setPosition(Eyeglass.bl, 0);
        this.setPosition(Eyeglass.yl, 120);
        this.setPosition(Eyeglass.br, 240);
    
        const {step, direction} = this.settings;
        this.settings.alfa += step * direction;
    },

    monsterMimicry(name, img) {
        const frame = () => {
            const timeInterval = Eyeglass.settings.speed / 4;
            setTimeout(() => img.src = `./img/lupa/${name}/1.png`, timeInterval);
            setTimeout(() => img.src = `./img/lupa/${name}/2.png`, timeInterval * 2);
            setTimeout(() => img.src = `./img/lupa/${name}/3.png`, timeInterval * 3);
            setTimeout(() => img.src = `./img/lupa/${name}/2.png`, timeInterval * 4);
        }
        frame();
        this.animationIntervals.push(setInterval(frame, Eyeglass.settings.speed));
    },

    celebration() {
        this.animationIntervals.forEach(animationInterval => clearInterval(animationInterval));

        [[this.yl, 'yl'], [this.br, 'br'], [this.bl, 'bl']].forEach(([img, name]) => {
            setInterval(() => {
                const timeInterval = Eyeglass.settings.speed / 4;
                img.src = `./img/lupa/${name}/4.png`;
                setTimeout(() => img.src = `./img/lupa/${name}/2.png`, timeInterval);
            }, Eyeglass.settings.speed/2);
        });
    }
};

Eyeglass.startAnimation();
Eyeglass.monsterMimicry('bl', Eyeglass.bl);
Eyeglass.monsterMimicry('yl', Eyeglass.yl);
Eyeglass.monsterMimicry('br', Eyeglass.br);