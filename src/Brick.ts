export class Brick {
    width: number;
    height: number;
    x: number;
    y: number;
    break: boolean;
   
    constructor(
    width: number,
    height: number,
    x: number,
    y: number,
    breakBrick: boolean,
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.break = breakBrick;
    }
}