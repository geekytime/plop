import lerpLib from 'lerp'

export const lerp = lerpLib
export const lerpVec2 = (start, end, interp) => {
  const x = lerp(start.x, end.x, interp)
  const y = lerp(start.y, end.y, interp)
  return { x, y }
}
