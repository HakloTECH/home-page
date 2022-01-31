document.addEventListener('DOMContentLoaded', () => new SmoothScroll(document, 40, 6))
function SmoothScroll(targetD, speed: number, smooth: number) {
  let target: Element
  if (targetD === document)
    target = (document.scrollingElement
      || document.documentElement
      || document.body.parentNode
      || document.body); // cross browser support for document scrolling
  else target = targetD
  let moving = false
  let pos = target.scrollTop
  const frame = target === document.body
    && document.documentElement
    ? document.documentElement
    : target // safari is the new IE

  target.addEventListener('wheel', scrolled, { passive: false })

  function scrolled(e: WheelEvent) {
    e.preventDefault(); // disable default scrolling

    const delta = normalizeWheelDelta(e)

    pos += -delta * speed
    pos = Math.max(0, Math.min(pos, target.scrollHeight - frame.clientHeight)) // limit scrolling

    if (!moving) requestAnimationFrame(update)
  }

  function normalizeWheelDelta(e: WheelEvent) {
    if (e.detail) {
      if (e.deltaY)
        return e.deltaY / e.detail / 40 * (e.detail > 0 ? 1 : -1) // Opera
      else
        return -e.detail / 3 // Firefox
    } else
      return e.deltaY / 120 // IE,Safari,Chrome
  }

  function update() {
    moving = true

    const delta = (pos - target.scrollTop) / smooth

    target.scrollTop += delta

    if (Math.abs(delta) > 0.5)
      requestAnimationFrame(update)
    else
      moving = false
  }
}