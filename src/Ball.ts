export class Ball {
    width: number;
    height: number;
    speedX: number;
    speedY: number;
    x: number;
    y: number;
   
    constructor(
    width: number,
    height: number,
    speedX: number,
    speedY: number,
    x: number,
    y: number,
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speedX = speedX;
        this.speedY = speedY
    }
}