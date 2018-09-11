<template>
  <div class="b-scroll" ref="wrapper">
    <div class="b-scroll-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BetterScroll from 'better-scroll'
export default {
  data() {
    return {
      scroll: ''
    }
  },
  props: {
    data: {
      type: Array,
      default: null
    },
    // 数据跟新后，刷新scroll的延时
    refreshTime: {
      type: Number,
      default: 20
    },
    // 是否派发点击事件
    // better-scroll会默认阻止浏览器原生事件
    click: {
      type: Boolean,
      default: true
    },
    // 1 滚动的时候会非实时（屏幕滑动超过一定时间后）派发scroll事件
    // 2 滚动的时候实时派发scroll事件
    // 3 滚动在动画进行时都会实时派发scroll事件，
    probeType: {
      type: Number,
      default: 3
    },
    // 滚动事件
    listenScroll: {
      type: Boolean,
      default: false
    },
    // 滚动到底部（一般用于上拉刷新）
    pullUp: {
      type: Boolean,
      default: false
    },
    // 滚到到顶部（一般用于下拉刷新）
    pullDown: {
      type: Boolean,
      default: false
    },
    // 滚动开始
    scrollStart: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (!this.$refs.wrapper) {
        console.log(1)
        return
      }

      this.scroll = new BetterScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      })

      if (this.listenScroll) {
        this.scroll.on('scroll', (pos) => {
          this.$emit('scroll', pos)
        })
      }

      if (this.pullUp) {
        this.scroll.on('scrollEnd', (pos) => {
          if (this.scroll.y <= this.scroll.maxScrollY + 50) {
            this.$emit('pullUp')
          }
        })
      }

      if (this.pullDown) {
        this.scroll.on('scrollEnd', (pos) => {
          if (this.scroll.y >= this.scroll.maxScrollY - 50) {
            this.$emit('pullDown')
          }
        })
      }

      if (this.scrollStart) {
        this.scroll.on('beforeScrollStart', (pos) => {
          this.$emit('scrollStart', pos)
        })
      }
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    scrollTo(...args) {
      this.scroll && this.scroll.scrollTo(...args)
    },
    scrollToElement(...args) {
      this.scroll && this.scroll.scrollToElemnt(...args)
    }
  },
  watch: {
    data(){
      setTimeout(() => {
        this.refresh()
      }, this.refreshTime)
    }
  }
}
</script>
