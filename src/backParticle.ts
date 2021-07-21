import anime from 'animejs';
import type { backScreenSetter } from './components/BackScreen'


let canvas: HTMLCanvasElement, animFrameId: number
const particleList = []
const init = (canvas_p: HTMLCanvasElement)=> {
  canvas = canvas_p
  const ctx = canvas.getContext('2d');
  let backGradVectorYPos = {
    vStart: 0,
    vEnd: canvas.height * 3,
  };
  const drawMain = () => {
    ctx.beginPath();
    const backgroundGradient = ctx.createLinearGradient(0, backGradVectorYPos.vStart, canvas.width, backGradVectorYPos.vEnd);
    backgroundGradient.addColorStop(0, 'black');
    backgroundGradient.addColorStop(1 / 3, 'rgb(10, 15, 85)');
    backgroundGradient.addColorStop(2 / 3, 'rgb(10, 77, 166)');
    backgroundGradient.addColorStop(1, 'rgb(232, 118, 175)');
    ctx.fillStyle = backgroundGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();
  }
  const maxParticleRad = 4;
  class BackAnimatingParticle {
    x: number;
    y: number;
    radius: number;
    color: string;
    xVel: number;
    yVel: number;
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.radius = Math.random() * maxParticleRad + 1;
      this.color = `rgba(255, 255, 255, ${(1 - this.radius / maxParticleRad) ** 1.6})`;
      const v = this.radius * 0.4;
      this.xVel = v * Math.random() * 0.5;
      this.yVel = v * Math.random() * 0.5 + 0.5;
    }

    draw() {
      //const v = this.radius*0.5;
      this.x -= this.xVel;
      this.y -= this.yVel;
      if (this.x <= -this.radius) this.x = canvas.width + this.radius;
      if (this.y <= -this.radius) this.y = canvas.height + this.radius;
      //ctx.filter = `blur(${this.radius*0.3}px)`
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.filter = 'none';
      ctx.closePath();

    }
  }
  drawMain();
  const animateAllParticles = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMain();
    for(let i=particleList.length;i--;)particleList[i].draw()

    animFrameId = requestAnimationFrame(animateAllParticles);
  }
  const amountParticles = canvas.width * canvas.height * 0.000072
  //console.log(amountParticles);
  for (let i = 0; i < amountParticles; i++) {
    particleList.push(new BackAnimatingParticle());
  }
  //const start = () => {
    animFrameId = requestAnimationFrame(animateAllParticles);
    anime({
      targets: backGradVectorYPos,
      duration: 6000,
      //round: 1,
      vStart: [0, -canvas.height * 2],
      vEnd: [canvas.height * 3, canvas.height],
      easing: 'easeInOutCubic',
      //delay: 1000
    })
  //}
  //setTimeout(()=>start(),2500);
}
const dispose = ()=>{
  cancelAnimationFrame(animFrameId)
  particleList.length = 0
}
export default {
  init,
  dispose
} as backScreenSetter