import { ElemType } from 'bluejsx'
import anime from 'animejs';
import { logo_anime as CLASS_LOGO} from './Splash.module.scss'
import { bottomLines as CLASS_BOTTOM_LINE } from './Header.module.scss'

const { min, max } = Math
const rootStyle = document.documentElement.style

const DURATION_GATHER = 1300, DURATION_ROLL = 2300, DURATION_ANIMATE = DURATION_GATHER + DURATION_ROLL,
  LOGO_HALF_WIDTH = 170, LOGO_HEIGHT = 180//, BOTTOM_LINE_RATIO = 
const lineAnimKeyFrame = {
  strokeDashoffset: [
    1, 0
  ]
}, lineAnimOption = {
  fill: 'forwards',
  easing: 'ease-in-out'
} as {
  fill: 'forwards',
  easing: string
}, bottomLineAnimKeyframe = {
  strokeDashoffset: [
    1, .14
  ]
}

export { DURATION_ANIMATE }
export default () => {
  const refs: {
    logo?: ElemType<'svg'>
    logoG?: ElemType<'g'>
    pathCentr?: ElemType<'path'>
    pathAround?: ElemType<'path'>
    colorStop?: ElemType<'stop'>
    logoShape?: ElemType<'g'>
    titleChars?: ElemType<'g'>
    bottomLine1?: ElemType<'line'>
    bottomLine2?: ElemType<'line'>
    line1?: ElemType<'line'>
    line2?: ElemType<'line'>
    line3?: ElemType<'line'>
    line4?: ElemType<'path'>
    line5?: ElemType<'line'>
    line6?: ElemType<'line'>
    line7?: ElemType<'line'>
    line8?: ElemType<'line'>
    line9?: ElemType<'line'>
    line10?: ElemType<'path'>

  } = {}
  const self = <div class={CLASS_LOGO}>
    <svg ref={[refs, 'logo']}>
      <linearGradient id='logo_grad' gradientUnits='userSpaceOnUse'
        x1='-20px'
        x2='20px'
        y1='-57.73502691896257px'
        y2='57.73502691896257px'
      >
        <stop offset="0%" stop-color='#01fdff' ></stop>
        <stop offset="85%" stop-color='#01fdff' ref={[refs, 'colorStop']}></stop>
      </linearGradient>
      <clipPath id="cut-in-logo">
        <rect x="-80%" y="65" width="160%" height="300" />
      </clipPath>
      <g ref={[refs, 'logoG']} >
        
        <g ref={[refs, 'logoShape']} stroke='transparent' fill="url(#logo_grad)">
          <path ref={[refs, 'pathAround']} d='M 0 0 l 0 0 l 0 0 l 0 0 z m 0 0 l 0 0 l 0 0 l 0 0 z M 0 0 l 0 0 l 0 0 l 0 0 z m 0 0 l 0 0 l 0 0 l 0 0 z M 0 0 l 0 0 l 0 0 l 0 0 z m 0 0 l 0 0 l 0 0 l 0 0 z M 0 0 l 0 0 l 0 0' >
          </path>
          <path ref={[refs, 'pathCentr']} d='M 0 0 l 0 0 l 0 0 z'></path>
        </g>
        <g ref={[refs, 'titleChars']} stroke="white" stroke-linecap="round" stroke-width='5' stroke-dashoffset='1' fill="none">
          <line ref={[refs, 'line1']} stroke-dasharray='1,1' pathLength='1' x1="-89" y1="46" x2="-89" y2="-50" />
          <line ref={[refs, 'line2']} stroke-dasharray='1,1' pathLength='1' x1="-29" y1="-5" x2="-89" y2="-5" />
          <line ref={[refs, 'line3']} stroke-dasharray='1,1' pathLength='1' x1="-29" y1="-50" x2="-29" y2="46" />
          <path ref={[refs, 'line4']} stroke-dasharray='1,1' pathLength='1' d="M 45 19 C 45 4.098 32.902 -8 18 -8 C 3.098 -8 -9 4.098 -9 19 C -9 33.902 3.098 46 18 46 C 32.902 46 45 33.902 45 19 Z"></path>
          <line ref={[refs, 'line5']} stroke-dasharray='1,1' pathLength='1' x1="46" y1="46" x2="46" y2="-10" />
          <line ref={[refs, 'line6']} stroke-dasharray='1,1' pathLength='1' x1="71" y1="46" x2="71" y2="-50" />
          <line ref={[refs, 'line7']} stroke-dasharray='1,1' pathLength='0.999' x1="71" y1="20" x2="116" y2="-25" />
          <line ref={[refs, 'line8']} stroke-dasharray='1,1' pathLength='0.999' x1="116" y1="46" x2="86" y2="5" />
          <line ref={[refs, 'line9']} stroke-dasharray='1,1' pathLength='1' x1="141" y1="46" x2="141" y2="-50" />
          <path ref={[refs, 'line10']} stroke-dasharray='1,1' pathLength='1' d="M 190 46 C 173.994 46 161 33.006 161 17 C 161 0.994 173.994 -12 190 -12 C 206.006 -12 219 0.994 219 17 C 219 33.006 206.006 46 190 46 Z"></path>
        </g>
        <line ref={[refs, 'bottomLine1']} class={CLASS_BOTTOM_LINE} stroke="white" stroke-dasharray='1,1' pathLength='1' stroke-dashoffset="1" stroke-width='2' x1='0' y1='70px' y2='70px' ></line>
        <line ref={[refs, 'bottomLine2']} class={CLASS_BOTTOM_LINE} stroke="white" stroke-dasharray='1,1' pathLength='1' stroke-dashoffset="1" stroke-width='2' x1='0' y1='70px' y2='70px' ></line>
      </g>

    </svg>
  </div>
  const { logo, logoG, colorStop, pathAround, pathCentr, logoShape, titleChars, bottomLine1, bottomLine2,
    line1, line2, line3, line4, line5, line6, line7, line8, line9, line10,
  } = refs
  let bigger: number
  self.bottomLinePosY = 0
  const onResize = () => {
    const bw = self.clientWidth,
      bh = self.offsetHeight,
      bwh = bw * .5,
      bhh = bh * .5
    const scale = min(1, bw / LOGO_HALF_WIDTH * .3, bh / LOGO_HEIGHT)
    bigger = max(bw, bh) / scale * 1.3
    rootStyle.setProperty('--header-logo-bottom-y',  `${bhh + 72 * scale}px`)
    
    const bottomLineHalfLength = max(bwh / scale, LOGO_HALF_WIDTH)
    bottomLine1.setAttribute('x2', `-${bottomLineHalfLength}`)
    bottomLine2.setAttribute('x2', `${bottomLineHalfLength}`)
    logoG.setAttribute('transform', `translate(${bwh} ${bhh + 2}) scale(${scale})`)

  }
  new ResizeObserver(onResize).observe(self)



  document.addEventListener('DOMContentLoaded', () => {
    onResize()
    anime({
      targets: pathAround,
      d: [
        {
          value: [
            `M ${-20 + bigger * 0.34641016151377546}  ${-57.73502691896257 + bigger * 0.6} l -10 17.32050807568877 l 10 17.32050807568877 l 20 0 z m ${40 - bigger * 0.6928203230275509}  ${34.64101615137754 - bigger * 1.2} l 20 0 l -20 -34.64101615137754 l -20 0 z M ${59.999999999999986 + bigger * 0.34641016151377546 * -0.4999999999999998 - bigger * 0.6 * 0.8660254037844387}  ${11.547005383792495 + bigger * 0.34641016151377546 * 0.8660254037844387 + bigger * 0.6 * -0.4999999999999998} l -10.000000000000002 -17.32050807568877 l -20 5.329070518200751e-15 l -9.999999999999996 17.320508075688775 z m ${-49.99999999999999 - bigger * 0.6928203230275509 * -0.4999999999999998 + bigger * 1.2 * 0.8660254037844387}  ${17.320508075688785 - bigger * 0.6928203230275509 * 0.8660254037844387 - bigger * 1.2 * -0.4999999999999998} l -9.999999999999996 17.320508075688775 l 40 -1.0658141036401503e-14 l 9.999999999999996 -17.320508075688775 z M ${-39.99999999999998 + bigger * 0.34641016151377546 * -0.5000000000000004 - bigger * 0.6 * -0.8660254037844385}  ${46.18802153517008 + bigger * 0.34641016151377546 * -0.8660254037844385 + bigger * 0.6 * -0.5000000000000004} l 20 -7.105427357601002e-15 l 9.999999999999993 -17.320508075688778 l -10.000000000000009 -17.32050807568877 z m ${9.999999999999975 - bigger * 0.6928203230275509 * -0.5000000000000004 + bigger * 1.2 * -0.8660254037844385}  ${-51.96152422706633 - bigger * 0.6928203230275509 * -0.8660254037844385 - bigger * 1.2 * -0.5000000000000004} l -10.000000000000009 -17.32050807568877 l -19.999999999999986 34.641016151377556 l 10.000000000000009 17.32050807568877 z`,
            `M ${-20 + bigger * 0.34641016151377546}  ${-57.73502691896257 + bigger * 0.6} l -10 17.32050807568877 l 10 17.32050807568877 l 20 0 z m ${40 - bigger * 0.6928203230275509}  ${34.64101615137754 - bigger * 1.2} l 20 0 l -20 -34.64101615137754 l -20 0 z M ${59.999999999999986 + bigger * 0.34641016151377546 * -0.4999999999999998 - bigger * 0.6 * 0.8660254037844387}  ${11.547005383792495 + bigger * 0.34641016151377546 * 0.8660254037844387 + bigger * 0.6 * -0.4999999999999998} l -10.000000000000002 -17.32050807568877 l -20 5.329070518200751e-15 l -9.999999999999996 17.320508075688775 z m ${-49.99999999999999 - bigger * 0.6928203230275509 * -0.4999999999999998 + bigger * 1.2 * 0.8660254037844387}  ${17.320508075688785 - bigger * 0.6928203230275509 * 0.8660254037844387 - bigger * 1.2 * -0.4999999999999998} l -9.999999999999996 17.320508075688775 l 40 -1.0658141036401503e-14 l 9.999999999999996 -17.320508075688775 z M ${-39.99999999999998 + bigger * 0.34641016151377546 * -0.5000000000000004 - bigger * 0.6 * -0.8660254037844385}  ${46.18802153517008 + bigger * 0.34641016151377546 * -0.8660254037844385 + bigger * 0.6 * -0.5000000000000004} l 20 -7.105427357601002e-15 l 9.999999999999993 -17.320508075688778 l -10.000000000000009 -17.32050807568877 z m ${9.999999999999975 - bigger * 0.6928203230275509 * -0.5000000000000004 + bigger * 1.2 * -0.8660254037844385}  ${-51.96152422706633 - bigger * 0.6928203230275509 * -0.8660254037844385 - bigger * 1.2 * -0.5000000000000004} l -10.000000000000009 -17.32050807568877 l -19.999999999999986 34.641016151377556 l 10.000000000000009 17.32050807568877 z`,
          ]
        },
        {
          value:
            `M ${-20 + bigger / 6.928203230275509}  ${-57.73502691896257 + bigger / 4} l -10 17.32050807568877 l 70 121.2435565298214 l 20 0 z m ${40 - bigger / 3.4641016151377544}  ${34.64101615137754 - bigger / 2} l 20 0 l -140 -242.4871130596428 l -20 0 z M ${59.999999999999986 + bigger / 6.928203230275509 * -0.4999999999999998 - bigger / 4 * 0.8660254037844387}  ${11.547005383792495 + bigger / 6.928203230275509 * 0.8660254037844387 + bigger / 4 * -0.4999999999999998} l -10.000000000000002 -17.32050807568877 l -140 3.552713678800501e-14 l -9.999999999999996 17.320508075688775 z m ${-49.99999999999999 - bigger / 3.4641016151377544 * -0.4999999999999998 + bigger / 2 * 0.8660254037844387}  ${17.320508075688785 - bigger / 3.4641016151377544 * 0.8660254037844387 - bigger / 2 * -0.4999999999999998} l -9.999999999999996 17.320508075688775 l 280 -7.105427357601002e-14 l 9.999999999999996 -17.320508075688775 z M ${-39.99999999999998 + bigger / 6.928203230275509 * -0.5000000000000004 - bigger / 4 * -0.8660254037844385}  ${46.18802153517008 + bigger / 6.928203230275509 * -0.8660254037844385 + bigger / 4 * -0.5000000000000004} l 20 -7.105427357601002e-15 l 69.99999999999994 -121.24355652982146 l -10.000000000000009 -17.32050807568877 z m ${9.999999999999975 - bigger / 3.4641016151377544 * -0.5000000000000004 + bigger / 2 * -0.8660254037844385}  ${-51.96152422706633 - bigger / 3.4641016151377544 * -0.8660254037844385 - bigger / 2 * -0.5000000000000004} l -10.000000000000009 -17.32050807568877 l -139.9999999999999 242.48711305964292 l 10.000000000000009 17.32050807568877 z`,
          duration: DURATION_GATHER * .333,
          easing: 'cubicBezier(0.42, 0, 1.0, 1.0)'
        },
        {
          value:
            `M 0 -23.094010767585026 l -10 17.32050807568877 l 15 25.980762113533157 l 20 0 z m 0 -34.64101615137754 l 20 0 l -30 -51.96152422706631 l -20 0 z M 19.999999999999996 11.547005383792508 l -10.000000000000002 -17.32050807568877 l -29.999999999999996 7.105427357601002e-15 l -9.999999999999996 17.320508075688775 z m 30 17.320508075688764 l -9.999999999999996 17.320508075688775 l 59.99999999999999 -1.4210854715202004e-14 l 9.999999999999996 -17.320508075688775 z M -19.999999999999993 11.547005383792524 l 20 -7.105427357601002e-15 l 14.999999999999986 -25.980762113533167 l -10.000000000000009 -17.32050807568877 z m -29.999999999999993 17.320508075688785 l -10.000000000000009 -17.32050807568877 l -29.99999999999997 51.961524227066334 l 10.000000000000009 17.32050807568877 z`,
          duration: DURATION_GATHER * .2669,
          easing: 'cubicBezier(0, 0, 0.58, 1.0)'
        },
        {
          value:
            `M -20 -57.73502691896257 l -10 17.32050807568877 l 10 17.32050807568877 l 20 0 z m 40 34.64101615137754 l 20 0 l -20 -34.64101615137754 l -20 0 z M 59.999999999999986 11.547005383792495 l -10.000000000000002 -17.32050807568877 l -20 5.329070518200751e-15 l -9.999999999999996 17.320508075688775 z m -49.99999999999999 17.320508075688785 l -9.999999999999996 17.320508075688775 l 40 -1.0658141036401503e-14 l 9.999999999999996 -17.320508075688775 z M -39.99999999999998 46.18802153517008 l 20 -7.105427357601002e-15 l 9.999999999999993 -17.320508075688778 l -10.000000000000009 -17.32050807568877 z m 9.999999999999975 -51.96152422706633 l -10.000000000000009 -17.32050807568877 l -19.999999999999986 34.641016151377556 l 10.000000000000009 17.32050807568877 z`,
          duration: DURATION_GATHER * .4,
          easing: 'easeOutCubic'
        }
      ],
    })
    anime({
      targets: pathCentr,
      d: [
        {
          value: [
            'M 0 0 l 0 0 l 0 0 z',
            'M 0 0 l 0 0 l 0 0 z'
          ],
          duration: DURATION_GATHER * .7
        },
        {
          value: `M 0 -23.094010767585026 l 20 34.64101615137754 l -40 0 z`,
          duration: 0,
        }
      ],
      duration: DURATION_GATHER,
    })
    const animations = [
      logoShape.animate({
        filter: [
          'drop-shadow(0px 0px 0px #8fd0ff)',
          'drop-shadow(0px 0px .8rem #8fd0ff)',
          'drop-shadow(0px 0px .5rem #8fd0ff)',
          'drop-shadow(0px 0px 0px #8fd0ff)'
        ]
      }, {
        easing: 'linear',
        delay: DURATION_ANIMATE + 200,
        duration: 800
      }),
      colorStop.animate({
        stopColor: ['#6ce9fb', '#d15af9'],
        easing: 'cubic-bezier(0.32, 0, 0.67, 0)',
      }, {
        easing: 'ease-in',
        delay: DURATION_ANIMATE - 700,
        duration: 1500,
        fill: 'forwards'
      }),

      logoShape.animate({
        transform: [
          'translateX(0) rotate(240deg)',
          `translateX(-${LOGO_HALF_WIDTH}px) rotate(0)`,
        ]
      }, {
        duration: DURATION_ROLL,
        delay: DURATION_GATHER,
        ...lineAnimOption
      }),
      titleChars.animate({
        transform: [
          `translateX(-${LOGO_HALF_WIDTH}px)`,
          'translateX(0)',
        ]
      }, {
        delay: DURATION_GATHER,
        duration: DURATION_ROLL,
        ...lineAnimOption
      }),
      bottomLine1.animate(bottomLineAnimKeyframe, {
        delay: DURATION_ANIMATE + 1500,
        duration: 400,
        ...lineAnimOption,
        fill: 'both'
      }),
      bottomLine2.animate(bottomLineAnimKeyframe, {
        delay: DURATION_ANIMATE + 1500,
        duration: 400,
        ...lineAnimOption,
        fill: 'both'
      }),

      //---- char lines ------ 

      line10.animate(lineAnimKeyFrame, {
        duration: DURATION_ROLL * 0.13,
        delay: DURATION_GATHER + DURATION_ROLL * 0.27,
        ...lineAnimOption
      }),
      line9.animate(lineAnimKeyFrame, {
        duration: DURATION_ROLL * 0.13,
        delay: DURATION_GATHER + DURATION_ROLL * 0.4,
        ...lineAnimOption
      }),
      line8.animate(lineAnimKeyFrame, {
        duration: DURATION_ROLL * 0.1,
        delay: DURATION_GATHER + DURATION_ROLL * 0.42,
        ...lineAnimOption
      }),
      line7.animate(lineAnimKeyFrame, {
        duration: DURATION_ROLL * 0.2,
        delay: DURATION_GATHER + DURATION_ROLL * 0.52,
        ...lineAnimOption
      }),
      line6.animate(lineAnimKeyFrame, {
        duration: DURATION_ROLL * 0.08,
        delay: DURATION_GATHER + DURATION_ROLL * 0.47,
        ...lineAnimOption
      }),
      line5.animate(lineAnimKeyFrame, {
        duration: DURATION_ROLL * 0.067,
        delay: DURATION_GATHER + DURATION_ROLL * 0.53,
        ...lineAnimOption
      }),
      line4.animate(lineAnimKeyFrame, {
        duration: DURATION_ROLL * 0.12,
        delay: DURATION_GATHER + DURATION_ROLL * 0.6,
        ...lineAnimOption
      }),
      line3.animate(lineAnimKeyFrame, {
        duration: DURATION_ROLL * 0.17,
        delay: DURATION_GATHER + DURATION_ROLL * 0.67,
        ...lineAnimOption
      }),
      line2.animate(lineAnimKeyFrame, {
        duration: DURATION_ROLL * 0.11,
        delay: DURATION_GATHER + DURATION_ROLL * 0.76,
        ...lineAnimOption
      }),
      line1.animate(lineAnimKeyFrame, {
        duration: DURATION_ROLL * 0.1,
        delay: DURATION_GATHER + DURATION_ROLL * 0.83,
        ...lineAnimOption
      }),
    ]
    const play = () => {
      for (let i = animations.length; i--;) animations[i].play()
    }
    const pause = () => {
      for (let i = animations.length; i--;) animations[i].pause()
    }
    pause()
    const onVisibilityChange = () => {
      if (document.hidden) return 0
      document.removeEventListener('visibilitychange', onVisibilityChange)
      play()


    }
    document.addEventListener('visibilitychange', onVisibilityChange)
    onVisibilityChange()
  })
  return self as ElemType<'div'> & { descScrollProgress: number }
}
/*pathAround.animate({
        d: [
          `path("M ${-20 + bigger * 0.34641016151377546}  ${-57.73502691896257 + bigger * 0.6} l -10 17.32050807568877 l 10 17.32050807568877 l 20 0 z m ${40 - bigger * 0.6928203230275509}  ${34.64101615137754 - bigger * 1.2} l 20 0 l -20 -34.64101615137754 l -20 0 z M ${59.999999999999986 + bigger * 0.34641016151377546 * -0.4999999999999998 - bigger * 0.6 * 0.8660254037844387}  ${11.547005383792495 + bigger * 0.34641016151377546 * 0.8660254037844387 + bigger * 0.6 * -0.4999999999999998} l -10.000000000000002 -17.32050807568877 l -20 5.329070518200751e-15 l -9.999999999999996 17.320508075688775 z m ${-49.99999999999999 - bigger * 0.6928203230275509 * -0.4999999999999998 + bigger * 1.2 * 0.8660254037844387}  ${17.320508075688785 - bigger * 0.6928203230275509 * 0.8660254037844387 - bigger * 1.2 * -0.4999999999999998} l -9.999999999999996 17.320508075688775 l 40 -1.0658141036401503e-14 l 9.999999999999996 -17.320508075688775 z M ${-39.99999999999998 + bigger * 0.34641016151377546 * -0.5000000000000004 - bigger * 0.6 * -0.8660254037844385}  ${46.18802153517008 + bigger * 0.34641016151377546 * -0.8660254037844385 + bigger * 0.6 * -0.5000000000000004} l 20 -7.105427357601002e-15 l 9.999999999999993 -17.320508075688778 l -10.000000000000009 -17.32050807568877 z m ${9.999999999999975 - bigger * 0.6928203230275509 * -0.5000000000000004 + bigger * 1.2 * -0.8660254037844385}  ${-51.96152422706633 - bigger * 0.6928203230275509 * -0.8660254037844385 - bigger * 1.2 * -0.5000000000000004} l -10.000000000000009 -17.32050807568877 l -19.999999999999986 34.641016151377556 l 10.000000000000009 17.32050807568877 z")`,
          `path("M ${-20 + bigger / 6.928203230275509}  ${-57.73502691896257 + bigger / 4} l -10 17.32050807568877 l 70 121.2435565298214 l 20 0 z m ${40 - bigger / 3.4641016151377544}  ${34.64101615137754 - bigger / 2} l 20 0 l -140 -242.4871130596428 l -20 0 z M ${59.999999999999986 + bigger / 6.928203230275509 * -0.4999999999999998 - bigger / 4 * 0.8660254037844387}  ${11.547005383792495 + bigger / 6.928203230275509 * 0.8660254037844387 + bigger / 4 * -0.4999999999999998} l -10.000000000000002 -17.32050807568877 l -140 3.552713678800501e-14 l -9.999999999999996 17.320508075688775 z m ${-49.99999999999999 - bigger / 3.4641016151377544 * -0.4999999999999998 + bigger / 2 * 0.8660254037844387}  ${17.320508075688785 - bigger / 3.4641016151377544 * 0.8660254037844387 - bigger / 2 * -0.4999999999999998} l -9.999999999999996 17.320508075688775 l 280 -7.105427357601002e-14 l 9.999999999999996 -17.320508075688775 z M ${-39.99999999999998 + bigger / 6.928203230275509 * -0.5000000000000004 - bigger / 4 * -0.8660254037844385}  ${46.18802153517008 + bigger / 6.928203230275509 * -0.8660254037844385 + bigger / 4 * -0.5000000000000004} l 20 -7.105427357601002e-15 l 69.99999999999994 -121.24355652982146 l -10.000000000000009 -17.32050807568877 z m ${9.999999999999975 - bigger / 3.4641016151377544 * -0.5000000000000004 + bigger / 2 * -0.8660254037844385}  ${-51.96152422706633 - bigger / 3.4641016151377544 * -0.8660254037844385 - bigger / 2 * -0.5000000000000004} l -10.000000000000009 -17.32050807568877 l -139.9999999999999 242.48711305964292 l 10.000000000000009 17.32050807568877 z")`,
          `path("M 0 -23.094010767585026 l -10 17.32050807568877 l 15 25.980762113533157 l 20 0 z m 0 -34.64101615137754 l 20 0 l -30 -51.96152422706631 l -20 0 z M 19.999999999999996 11.547005383792508 l -10.000000000000002 -17.32050807568877 l -29.999999999999996 7.105427357601002e-15 l -9.999999999999996 17.320508075688775 z m 30 17.320508075688764 l -9.999999999999996 17.320508075688775 l 59.99999999999999 -1.4210854715202004e-14 l 9.999999999999996 -17.320508075688775 z M -19.999999999999993 11.547005383792524 l 20 -7.105427357601002e-15 l 14.999999999999986 -25.980762113533167 l -10.000000000000009 -17.32050807568877 z m -29.999999999999993 17.320508075688785 l -10.000000000000009 -17.32050807568877 l -29.99999999999997 51.961524227066334 l 10.000000000000009 17.32050807568877 z")`,
          `path("M -20 -57.73502691896257 l -10 17.32050807568877 l 10 17.32050807568877 l 20 0 z m 40 34.64101615137754 l 20 0 l -20 -34.64101615137754 l -20 0 z M 59.999999999999986 11.547005383792495 l -10.000000000000002 -17.32050807568877 l -20 5.329070518200751e-15 l -9.999999999999996 17.320508075688775 z m -49.99999999999999 17.320508075688785 l -9.999999999999996 17.320508075688775 l 40 -1.0658141036401503e-14 l 9.999999999999996 -17.320508075688775 z M -39.99999999999998 46.18802153517008 l 20 -7.105427357601002e-15 l 9.999999999999993 -17.320508075688778 l -10.000000000000009 -17.32050807568877 z m 9.999999999999975 -51.96152422706633 l -10.000000000000009 -17.32050807568877 l -19.999999999999986 34.641016151377556 l 10.000000000000009 17.32050807568877 z")`,
        ],
        easing: ['ease-in', 'ease-out', 'cubic-bezier(0.33, 1, 0.68, 1)'],
        //easing: ['linear', 'linear', 'ease-out'],
        offset: [0, 0.333, 0.6],
      }, {
        fill: 'forwards',
        duration: DURATION_GATHER
      }),
      pathCentr.animate({
        d: [
          'path("M 0 0 l 0 0 l 0 0 z")',
          'path("M 0 -23.094010767585026 l 20 34.64101615137754 l -40 0 z")',
        ],
      }, {
        easing: 'step-start',
        delay: DURATION_GATHER * 0.58,
        fill: 'forwards',
        duration: 100
      }),*/