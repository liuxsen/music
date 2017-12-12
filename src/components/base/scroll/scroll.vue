<style lang="stylus" scoped>
  .box
    position relative
</style>

<template>
  <div class="box" ref="scroll">
     <slot></slot>
  </div>
</template>
<script>
import Transform from 'css3transform'
import AlloyTouch from 'alloytouch'
export default {
  props: {
    originalHeight: {
      type: Number,
      required: true
    }
  },
  methods: {
    init () {
      const scroll = this.$refs.scroll
      const slideGroup = scroll.children[0]
      const totalHeight = this.initHeight(slideGroup.children)
      const min = -(totalHeight - this.originalHeight)
      scroll.style.height = this.originalHeight + 'px'
      Transform(slideGroup, true)
      let that = this
      this.scroll = new AlloyTouch({
        vertical: true,
        property: 'translateY',
        touch: scroll,
        target: slideGroup,
        min: min,
        max: 0,
        touchStart: function (event) {
        },
        touchMove: function (event) {
          reset.call(this)
        },
        animationEnd: function (event) {
        }
      })
      function reset () {
        const totalHeight = that.initHeight(slideGroup.children)
        let min = -(totalHeight - that.originalHeight)
        this.min = min
      }
    },
    initHeight (parentEl) {
      let totalHeight = 0
      const newParentEl = Array.apply(null, parentEl)
      newParentEl.forEach((el, i) => {
        totalHeight += el.offsetHeight
      })
      return totalHeight
    }
  },
  mounted () {
    setTimeout(() => {
      this.init()
    }, 20)
  }
}
</script>
