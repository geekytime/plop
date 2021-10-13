import { BinarySearchTree } from 'binary-search-tree'

export class Timers {
  constructor ({ loop }) {
    this.loop = loop
    this.events = new BinarySearchTree()
  }

  fireAfter (delay, callback) {
    const target = this.loop.getElapsedTime() + delay
    const event = {
      target,
      callback
    }
    this.events.insert(target, event)
  }

  fireEvery (interval, callback) {
    const target = this.loop.getElapsedTime() + interval
    const event = {
      target,
      callback,
      interval
    }
    this.events.insert(target, event)
  }

  update (step) {
    const time = this.loop.getElapsedTime()
    const lastTime = time - step
    const eventsToFire = this.events.betweenBounds({
      $lte: time,
      $gte: lastTime
    })
    for (let i = 0; i < eventsToFire.length; i++) {
      const event = eventsToFire[i]
      event.callback(time, step)
      this.events.delete(event.target)
      if (event.interval > 0) {
        this.fireEvery(event.interval, event.callback)
      }
    }
  }
}
