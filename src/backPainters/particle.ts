//import anime from 'animejs';
import type { PainterObject } from '../components/BackScreen/util'

const { PI, random } = Math


/**
 * 0 < x < 1
 * 
 * 0 < output < 1
 */
type EasingFunction = (x: number) => number

const easeInOutCubic: EasingFunction = x => {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}
/**
 * @param fromValue start value
 * @param toValue end value
 * @param easing easing function
 * @param duration time interval in ms
 * @param listener listener function that takes a value between `fromValue` and `toValue`.
 */
const transition = (fromValue: number, toValue: number, easing: EasingFunction, duration: number, listener: (value: number) => void) => {
  const dValue = toValue - fromValue
  let beginTime: number
  const result = {
    done: false,
    started: false,
    start: (timestamp: number) => {
      if(result.started) return null
      beginTime = timestamp
      result.started = true
    },
    step: (timestamp: number) => {
      if(!result.started) return null
      const progress = (timestamp - beginTime) / duration
      if (progress > 1) {
        result.done = true
        return null
      }
      listener(fromValue + dValue * easing(progress))
    }
  }
  return result
}

const particleList = []
const init = (ctx: CanvasRenderingContext2D) => {
  let animFrameId: number
  const canvas = ctx.canvas
  const backGradVectorYPos = {
    vStart: 0,
    vEnd: canvas.height * 3,
  }
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
  const MAX_PARTICLE_RADIUS = 4;
  class BackAnimatingParticle {
    x: number;
    y: number;
    radius: number;
    color: string;
    xVel: number;
    yVel: number;
    constructor() {
      this.x = random() * canvas.width;
      this.y = random() * canvas.height;
      this.radius = random() * MAX_PARTICLE_RADIUS + 1;
      this.color = `rgba(255, 255, 255, ${(1 - this.radius / MAX_PARTICLE_RADIUS) ** 1.6})`;
      const v = this.radius * 0.4;
      this.xVel = v * random() * 0.5;
      this.yVel = v * random() * 0.5 + 0.5;
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
      ctx.arc(this.x, this.y, this.radius, 0, PI * 2);
      ctx.fill();
      ctx.filter = 'none';
      ctx.closePath();

    }
  }
  const vTrans = transition(0, -canvas.height * 2, easeInOutCubic, 6000, (value) => {
    backGradVectorYPos.vStart = value
    backGradVectorYPos.vEnd = value + canvas.height * 3
  })
  const amountParticles = (canvas.width * canvas.height * 0.000036)|0
  for (let i = amountParticles; i > 0; i--) {
    particleList.push(new BackAnimatingParticle());
  }
  const render: FrameRequestCallback = (timestamp) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMain();
    for (let i = amountParticles; i--;)particleList[i].draw()
    if (!vTrans.started) vTrans.start(timestamp)
    if (!vTrans.done) vTrans.step(timestamp)
    animFrameId = requestAnimationFrame(render);
  }
  
  //setTimeout(()=> {
  animFrameId = requestAnimationFrame(render);
  //},2500);
  return {
    dispose: () => {
      cancelAnimationFrame(animFrameId)
      particleList.length = 0
    }
  }
}

export const painters = {
  '2d': {
    init
  }
} as PainterObject["painters"]