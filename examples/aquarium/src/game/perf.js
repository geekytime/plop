import Vue from 'vue'

export const perf = () => {
  return new Vue({
    data () {
      return {
        fps: 0,
        render: {
          start: 0,
          elapsed: 0
        }
      }
    },
    methods: {
      start (key) {
        this.render.start = performance.now()
      },
      end (key) {
        const elapsed = performance.now() - this.render.start
        this.render.elapsed = Math.round(elapsed * 100) / 100
        if (this.render.elapsed > 0.5) {
          console.log('slow render', this.render.elapsed)
        }
      },
      updateFps (fps) {
        this.fps = fps
      }
    }
  })
}
