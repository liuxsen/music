<style lang="stylus" scoped>
  .wrapper
    background #eee
    position relative
    overflow hidden
  .slide-group
    .slide-item
      float left  
      box-sizing border-box
      overflow hidden
      a
        display block
        width 100%
        overflow hidden
        text-decoration none
  .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      transform: translateZ(1px)
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: #fff
        &.active
          width: 20px
          border-radius: 5px
          background: #aaa
</style>

<template>
  <div ref="slide" class="wrapper">
    <div ref="slide-group" class="slide-group">
      <slot></slot>
    </div>
    <div class="dots" v-if="showDots">
      <span class="dot" 
      v-for="(item , i) in dots" 
      @click="goPage(i)"
      :class="{active: i === currentPageIndex}"
      :key="i"></span>
    </div>
  </div>
</template>
<script>
// import Bscroll from 'better-scroll'
import {addClass} from 'common/js/dom.js'
import Transform from 'css3transform'
import AlloyTouch from 'alloytouch'
export default {
  data () {
    return {
      currentPageIndex: 0,
      dots: []
    }
  },
  props: {
    showDots: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    init () {
      const scroller = this.$refs['slide-group']
      Transform(scroller)
      const that = this
      this.scroller = new AlloyTouch({
        vertical: false,
        property: 'translateX', // 被运动的属性
        touch: this.$refs['slide'],
        target: this.$refs['slide-group'],
        max: 0,
        min: -this.clientWidth * (this.children.length - 1),
        step: this.clientWidth,
        spring: true,
        preventDefault: false,
        inertia: false,
        bindSelf: true,
        touchStart: function (event) {
          event.stopPropagation()
        },
        touchMove: function (event) {
          event.stopPropagation()
        },
        touchEnd: function (event, v, index) {
          // console.log('event', event)
          // console.log('v', v)
          // console.log('index', index)
          var stepV = index * this.step * -1
          var dx = v - stepV
          if (v < this.min) {
            this.to(this.min)
          } else if (v > this.max) {
            this.to(this.max)
          } else if (Math.abs(dx) < 30) {
            this.to(stepV)
          } else if (dx > 0) {
            this.to(stepV + this.step)
          } else {
            this.to(stepV - this.step)
          }
          return false
        },
        animationEnd: function (event) {
          const index = Math.abs(parseInt(event / that.clientWidth))
          console.log(index)
          that.currentPageIndex = index
          that.$emit('animationEnd', index)
        }
      })
      console.log(this.scroller)
    },
    initDots () {
      if (this.showDots) {
        this.dots = new Array(this.children.length)
      }
    },
    initWidth () {
      const children = this.$refs['slide-group'].children
      console.log(children)
      const clientWidth = this.$refs['slide'].getBoundingClientRect().width
      this.clientWidth = clientWidth
      this.children = children
      console.log(clientWidth)
      let width = 0
      for (let i = 0; i < children.length; i++) {
        // if (this.loop) {
        //   width += clientWidth * 2
        // }
        width += clientWidth
        addClass(children[i], 'slide-item')
        children[i].style.width = clientWidth + 'px'
      }
      console.log(width)
      this.$refs['slide-group'].style.width = width + 'px'
    },
    autoPlay () {
      if (this.autoplay) {
        console.log(this.scroller)
      }
    },
    goPage (i) {
      const scrollX = -this.clientWidth * i
      this.scroller.to(scrollX)
    }
  },
  mounted () {
    this.initWidth()
    this.initDots()
    setTimeout(() => {
      this.init()
      this.autoPlay()
    }, 20)
  }
}
</script>
