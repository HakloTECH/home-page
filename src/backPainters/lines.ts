

//-------------------------------------------
const turnRatio = 0.1;   //how much the lines turns
const bc = '0, 255, 233' //RGB line color
const speed = 40;       //the line moving speed
const lineWidth = 1;
const backgroundColor = 'rgb(0,0,0)';
//-------------------------------------------



//shortcuts
const { PI, random, cos, sin } = Math
//directions that the lines could go
const dirs = [0, PI / 2, PI, PI / 2 * 3, PI / 4, PI / 4 * 3, PI / 4 * 5, PI / 4 * 7]

class RunningLine {
  prevTurnPoint = []
  x: number;
  dir: any;
  y: number;
  width: number;
  v: number;
  vx: number;
  vy: number;
  fadeout: boolean;
  opacity: number;
  color: string;
  constructor(public canvas: HTMLCanvasElement) {

    this.init();
  }
  init() {
    this.prevTurnPoint = []
    const r = random()
    if (r < 0.25) {
      this.x = random() * this.canvas.width;
      this.dir = dirs[1];
      this.y = 0;
    } else if (r < 0.5) {
      this.x = random() * this.canvas.width;
      this.dir = dirs[3];
      this.y = this.canvas.height;
    } else if (r < 0.75) {
      this.x = 0;
      this.dir = dirs[0];
      this.y = random() * this.canvas.height;
    } else {
      this.x = this.canvas.width;
      this.dir = dirs[2];
      this.y = random() * this.canvas.height;
    }
    //this.dir = dirs[dirs.length*random()^0]
    this.prevTurnPoint.push({
      x: this.x,
      y: this.y,
    })
    this.width = lineWidth;

    this.v = speed;

    this.vx = this.v * cos(this.dir);
    this.vy = this.v * sin(this.dir);
    this.fadeout = false;
    this.opacity = (random()) ** 0.2
    this.color = `rgba(${bc}, ${this.opacity})`;
    //console.log(this.x, this.y);
  }
  draw(ctx: CanvasRenderingContext2D) {
    //console.log(this.opacity);
    if (this.fadeout) {
      if (this.opacity < 0.1) {
        this.init();

      } else {
        this.opacity *= 0.9;
        this.color = `rgba(${bc}, ${this.opacity})`;
        //console.log(this.opacity);
      }

    } else {
      this.outOfScreen()
      this.x += this.vx;
      this.y += this.vy;

      if (random() < turnRatio) this.turn()
    }
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.width;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    //let remainL = this.length;
    //let continuous = true, lastLen=0;
    for (let i = this.prevTurnPoint.length - 1; i >= 0; i--) {
      const p = this.prevTurnPoint[i];
      ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
    //ctx.filter = 'none';
    ctx.closePath();

  }
  turn() {
    const choice = dirs.filter(v => {
      let a = Math.abs(this.dir - v);
      if (a > PI) a = 2 * PI - a;
      return a <= PI / 2
    })
    //console.log(choice);
    this.dir = choice[random() * choice.length ^ 0]
    this.vx = this.v * cos(this.dir);
    this.vy = this.v * sin(this.dir);
    this.prevTurnPoint.push({
      x: this.x,
      y: this.y,
    })

  }
  outOfScreen() {
    if (this.x >= this.canvas.width && this.vx > 0 || this.y >= this.canvas.height && this.vy > 0 || this.x <= 0 && this.vx < 0 || this.y <= 0 && this.vy < 0) {
      this.fadeout = true;
    }
  }
}
const init = (ctx: CanvasRenderingContext2D) => {

  const { canvas } = ctx

  const lines: RunningLine[] = [];
  let animFrameId: number
  const amountParticles = Math.min(canvas.width * canvas.height * 0.00001, 20)
  for (let i = 0; i < amountParticles; i++) {
    lines.push(new RunningLine(canvas));
  }


  function animateAll() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for(let i=lines.length; i--;) lines[i].draw(ctx)
    //console.log(lines[0].x, lines[0].y)
    ////console.log('aa');
    animFrameId = requestAnimationFrame(animateAll);
  }
  animFrameId = requestAnimationFrame(animateAll);

  return {
    dispose: () =>{
      cancelAnimationFrame(animFrameId)
      lines.length = 0
    }
  }
}
export const painters = {
  '2d': {
    init
  }
} 