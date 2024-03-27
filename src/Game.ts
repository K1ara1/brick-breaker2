import { Paddle } from "./Paddle";

export class Game {
    board: HTMLCanvasElement;
    private context: CanvasRenderingContext2D | null;
    //Game board dimensions 
    gameBoardWidth = 500;
    gameBoardHeight = 500;
    paddle: Paddle;
    constructor() { 
        this.board = document.getElementById("playField") as HTMLCanvasElement;
        this.context = this.board.getContext('2d');
        this.board.width = this.gameBoardWidth;
        this.board.height = this.gameBoardHeight;
        this.paddle = new Paddle( 
          this.gameBoardWidth / 10,
          this.gameBoardHeight / 50,
          10,
          this.gameBoardWidth / 2 - 50 / 2,
          this.gameBoardHeight - 25,


        )
        this.context!.fillStyle = 'white';
        this.context!.fillRect(
            this.paddle.x,
            this.paddle.y,
            this.paddle.width,
            this.paddle.height
        )
        
    }

    public movePaddle(e:KeyboardEvent) {
        if(e.code === 'ArrowLeft'){
            let nextx = this.paddle.x - this.paddle.speed;
            this.paddle.x = nextx;
        }

    }

}



/*export class CanvasView {
  canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;
  private scoreDisplay: HTMLObjectElement | null;
  private start: HTMLObjectElement | null;
  private info: HTMLObjectElement | null;

  constructor(canvasName: string) {
   
    this.scoreDisplay = document.querySelector('#score');
    this.start = document.querySelector('#start');
    this.info = document.querySelector('#info');
  }

  clear(): void {
    this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  initStartButton(startFunction: (view: CanvasView) => void): void {
    this.start?.addEventListener('click', () => startFunction(this));
  }

  drawScore(score: number): void {
    if (this.scoreDisplay) this.scoreDisplay.innerHTML = score.toString();
  }

  drawInfo(text: string): void {
    if (this.info) this.info.innerHTML = text;
  }

  drawSprite(brick: Brick | Paddle | Ball): void {
    if (!brick) return;

    this.context?.drawImage(
      brick.image,
      brick.pos.x,
      brick.pos.y,
      brick.width,
      brick.height
    );
  }

  drawBricks(bricks: Brick[]): void {
    bricks.forEach(brick => this.drawSprite(brick));
  }
}*/