const { PI, random } = Math;
const easeInOutCubic = (x) => {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};
const transition = (fromValue, toValue, easing, duration, listener) => {
  const dValue = toValue - fromValue;
  let beginTime;
  const result = {
    done: false,
    started: false,
    start: (timestamp) => {
      if (result.started)
        return null;
      beginTime = timestamp;
      result.started = true;
    },
    step: (timestamp) => {
      if (!result.started)
        return null;
      const progress = (timestamp - beginTime) / duration;
      if (progress > 1) {
        result.done = true;
        return null;
      }
      listener(fromValue + dValue * easing(progress));
    }
  };
  return result;
};
const particleList = [];
const init = (ctx) => {
  let animFrameId;
  const canvas = ctx.canvas;
  const backGradVectorYPos = {
    vStart: 0,
    vEnd: canvas.height * 3
  };
  const drawMain = () => {
    ctx.beginPath();
    const backgroundGradient = ctx.createLinearGradient(0, backGradVectorYPos.vStart, canvas.width, backGradVectorYPos.vEnd);
    backgroundGradient.addColorStop(0, "black");
    backgroundGradient.addColorStop(1 / 3, "rgb(10, 15, 85)");
    backgroundGradient.addColorStop(2 / 3, "rgb(10, 77, 166)");
    backgroundGradient.addColorStop(1, "rgb(232, 118, 175)");
    ctx.fillStyle = backgroundGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();
  };
  const MAX_PARTICLE_RADIUS = 4;
  class BackAnimatingParticle {
    x;
    y;
    radius;
    color;
    xVel;
    yVel;
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
      this.x -= this.xVel;
      this.y -= this.yVel;
      if (this.x <= -this.radius)
        this.x = canvas.width + this.radius;
      if (this.y <= -this.radius)
        this.y = canvas.height + this.radius;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, PI * 2);
      ctx.fill();
      ctx.filter = "none";
      ctx.closePath();
    }
  }
  const vTrans = transition(0, -canvas.height * 2, easeInOutCubic, 6e3, (value) => {
    backGradVectorYPos.vStart = value;
    backGradVectorYPos.vEnd = value + canvas.height * 3;
  });
  const amountParticles = canvas.width * canvas.height * 36e-6 | 0;
  for (let i = amountParticles; i > 0; i--) {
    particleList.push(new BackAnimatingParticle());
  }
  const render = (timestamp) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMain();
    for (let i = amountParticles; i--; )
      particleList[i].draw();
    if (!vTrans.started)
      vTrans.start(timestamp);
    if (!vTrans.done)
      vTrans.step(timestamp);
    animFrameId = requestAnimationFrame(render);
  };
  animFrameId = requestAnimationFrame(render);
  return {
    dispose: () => {
      cancelAnimationFrame(animFrameId);
      particleList.length = 0;
    }
  };
};
export const painters = {
  "2d": {
    init
  }
};
