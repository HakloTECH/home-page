<g ref={[refs, 'titleChars']} stroke="white" stroke-linecap="round" stroke-width='5' stroke-dashoffset='1' fill="none">
<line ref={[refs, 'line1']} stroke-dasharray='1,1' pathLength='1' x1="-110" y1="46" x2="-110" y2="-50" />
<line ref={[refs, 'line2']} stroke-dasharray='1,1' pathLength='1' y1="-5" x2="-110" y2="-5" x1="-50" />
<line ref={[refs, 'line3']} stroke-dasharray='1,1' pathLength='1' x1="-50" y1="-50" x2="-50" y2="46" />
<path ref={[refs, 'line4']} stroke-dasharray='1,1' pathLength='1' d="M 28 19 C 28 4.098 15.902 -8 1 -8 C -13.902 -8 -26 4.098 -26 19 C -26 33.902 -13.902 46 1 46 C 15.902 46 28 33.902 28 19 Z"></path>
<line ref={[refs, 'line5']} stroke-dasharray='1,1' pathLength='1' x1="29" y1="46" x2="29" y2="-10" />
<line ref={[refs, 'line6']} stroke-dasharray='1,1' pathLength='1' x1="55" y1="46" x2="55" y2="-50" />
<line ref={[refs, 'line7']} stroke-dasharray='1,1' pathLength='1' x1="55" y1="20" x2="100" y2="-25" />
<line ref={[refs, 'line8']} stroke-dasharray='1,1' pathLength='1' x1="100" y1="46" x2="70" y2="5" />
<line ref={[refs, 'line9']} stroke-dasharray='1,1' pathLength='1' x1="127" y1="46" x2="127" y2="-50" />
<path ref={[refs, 'line10']} stroke-dasharray='1,1' pathLength='1' d="M 182 46 C 165.994 46 153 33.006 153 17 C 153 0.994 165.994 -12 182 -12 C 198.006 -12 211 0.994 211 17 C 211 33.006 198.006 46 182 46 Z"></path>
</g>
</g>
</svg>
</div>
const { logo, logoG, colorStop, pathAround, pathCentr, logoShape, titleChars,
line1, line2, line3, line4, line5, line6, line7, line8, line9, line10, 
} = refs
const DURATION_GATHER = 1000, DURATION_ROLL = 1600, DURATION_ANIMATE = DURATION_GATHER + DURATION_ROLL,
LOGO_HALF_WIDTH = 190