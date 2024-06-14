import { Paddle } from "./Paddle";
import { Brick } from "./Brick";
import { Ball } from "./Ball";

export class Game {
    board: HTMLCanvasElement;
    private context: CanvasRenderingContext2D | null;
    //Game board dimensions 
    gameBoardWidth = 500;
    gameBoardHeight = 500;
    paddle: Paddle;
    ball: Ball;

    brickArray: Brick[] = [];
    brickColumns = 12;
    brickRows = 3;
    brickHeight = 10;
    brickWidth = 25;
    brickX = 15;
    brickY = 45;
    brickCount = 0;

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

        this.ball = new Ball( 
          10,
          10,
          3,
          -3,
          this.gameBoardWidth / 2,
          this.gameBoardHeight / 2,
        )
      
        this.drawBricks();

        window.onload = () => {

      
        this.context!.fillStyle = 'white';
        this.context!.fillRect(
            this.paddle.x,
            this.paddle.y,
            this.paddle.width,
            this.paddle.height
        )

        console.log(this.brickCount)
        requestAnimationFrame(() => this.updateGame());
        document.addEventListener('keydown',(e) => this.movePaddle(e))
      }

    }
    
    public updateGame(){
      requestAnimationFrame(() => this.updateGame())
      this.context?.clearRect(0, 0, this.gameBoardWidth, this.gameBoardHeight);
     

        this.checkColision();

        this.context!.fillStyle = 'orange';
        for (let index = 0; index < this.brickArray.length; index++) {
          let brick = this.brickArray[index];
          this.context!.fillRect(
            brick.x,
            brick.y,
            brick.width,
            brick.height
          )
        }

        this.context!.fillStyle = 'green';
        this.ball.x += this.ball.speedX;
        this.ball.y += this.ball.speedY;
        this.context!.fillRect(
            this.ball.x,
            this.ball.y,
            this.ball.width,
            this.ball.height
        )

    }

    public movePaddle(e:KeyboardEvent) {
        if(e.code === 'ArrowLeft'){
            let nextx = this.paddle.x - this.paddle.speed;
            if(!this.outOfBoard(nextx)){
            this.paddle.x = nextx;
        }
      }
        else if(e.code === 'ArrowRight'){
          let nextx = this.paddle.x + this.paddle.speed;
          if(!this.outOfBoard(nextx)){
          this.paddle.x = nextx;
        }
      }
    }
    private outOfBoard(xPos: number): Boolean{
      return xPos < 0 || xPos + this.paddle.width > 500
    }

    private drawBricks () {
    
      this.brickArray = [];
      for (let column = 0; column < this.brickColumns; column++) {
        for (let row = 0; row < this.brickRows; row++) {
          let brick = new Brick(
            25,
            10,
            this.brickX + column * this.brickWidth + column * 10, 
            this.brickY + row * this.brickHeight + row * 10,
            false,
           );
            this.brickArray.push(brick) 
        }
         
      }
        this.brickCount = this.brickArray.length;
        console.log("funkcja wywołana")
     }
     
     public checkColision() {
      //checkColision with walls
      if(this.ball.x <= 0 || this.ball.x + this.ball.width >= this.gameBoardWidth){
        this.ball.speedX *= -1;
      }
      if(this.ball.y <= 0){
        this.ball.speedY *= -1;
      }
      if(
        this.ball.x < this.paddle.x + this.paddle.width && 
        this.ball.x + this.ball.width > this.paddle.x &&
        this.ball.y < this.paddle.y + this.paddle.height &&
        this.ball.y + this.ball.height > this.paddle.y 

      ){
        this.ball.speedY *= -1;
      }
      
      //CheckColision with Bricks
      for (let index = 0; index < this.brickArray.length; index++ ){
        let brick = this.brickArray[index]
        if(!brick.break) {
          if(
            this.ball.x < brick.x + brick.width &&
            this.ball.x + this.ball.width > brick.x &&
            this.ball.y < brick.y + brick.height &&
            this.ball.y + this.ball.height > brick.y
          ) {
            brick.break = true;
            this.ball.speedY *= -1;
            this.brickCount -= 1;
            console.log(this.brickCount)
          }

        }
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

