export class Paddle {
    width: number;
    height: number;
    speed: number;
    x: number;
    y: number;
   
    constructor(
    width: number,
    height: number,
    speed: number,
    x: number,
    y: number,
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }
}