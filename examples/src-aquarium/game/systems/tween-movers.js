import Tween from 'tween.js'
import randomInt from 'random-int'

export class TweenMovers {
  update () {
    Tween.update()
  }

  moveTo (entity, { x, y }) {
    const { transform, tweenMover } = entity
    tweenMover.isMoving = true

    const posTween = new Tween.Tween(transform.position)

    const moveTime = randomInt(1500, 3000)
    const rotTime = moveTime / 2
    const halfRotTime = moveTime / 4

    posTween
      .easing(Tween.Easing.Quadratic.InOut)
      .to({ x, y }, moveTime)
      .onComplete(() => {
        tweenMover.isMoving = false
      })
      .start()

    const deltaY = y - transform.position.y
    const deltaX = x - transform.position.x
    const angleRatio = 20
    let targetAngle = 0
    if (deltaY > 0 && deltaX < 0) {
      targetAngle = deltaY / -angleRatio
    } else if (deltaY > 0) {
      targetAngle = deltaY / angleRatio
    } else if (deltaY < 0 && deltaX > 0) {
      targetAngle = deltaY / angleRatio
    } else if (deltaY < 0) {
      targetAngle = deltaY / -angleRatio
    }
    const targetAngleRad = (targetAngle * Math.PI) / 180
    const rotTween = new Tween.Tween(transform)
    rotTween
      .easing(Tween.Easing.Quadratic.In)
      .to({ rotation: targetAngleRad }, rotTime)
      .onComplete(() => {
        const rotBackTween = new Tween.Tween(transform)
        rotBackTween
          .delay(halfRotTime)
          .easing(Tween.Easing.Quadratic.Out)
          .to({ rotation: 0 }, halfRotTime)
          .start()
      })
      .start()
  }
}
