<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
  .title
    display flex
    font-size 14px
    margin-top .533333rem
  .tip
    display block
    width 2px
    height .426667rem
    font-size 16px
    background $theme-color
    margin-right .266667rem
  .list
    display flex
    justify-content space-between
    flex-wrap wrap
    line-height 1.5
    .list-item
      box-sizing border-box
      margin-top .493333rem
      text-align center
      position relative
      img
        width 100%
        &[lazy=loading]
          width .6rem
          height .6rem
          position absolute
          left 50%
          top 50%
          transform translate3d(-50%,-50%,0)
      h2
        font-size 12px
      h1
        elipise()
      p
        font-size 10px
        color $bcolor
</style>
<template>
  <div>
    <h1 v-if="showTitle" class="title">
      <div class="tip"></div>
      <div><slot name="title">推荐</slot></div>
    </h1>
    <div class="list" ref="list">
    <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: {
    num: {
      type: Number,
      default: 2
    },
    showTitle: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    setTimeout(() => {
      const children = this.$refs['list'].children
      for (let i = 0; i < children.length; i++) {
        children[i].style.width = (1 / this.num) * 100 + '%'
        if (this.num === 3) {
          if (i % this.num === 0) {
            children[i].style.paddingRight = '1px'
          }
          if (i % this.num === 1) {
            children[i].style.padding = '0 1px'
          }
          if (i % this.num === 2) {
            children[i].style.paddingLeft = '2px'
          }
        }
        if (this.num === 2) {
          if (i % this.num === 0) {
            children[i].style.paddingRight = '2px'
          }
          if (i % this.num === 1) {
            children[i].style.paddingLeft = '2px'
          }
        }
      }
    }, 30)
  }
}
</script>
