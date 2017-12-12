<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
  .progress-box
    padding 0 .32rem
    margin-top .666667rem
    color #ffffff
    position relative
    display flex
    justify-content space-around
    align-items center
    margin-bottom .6rem
    .progress
      width 7.24rem
      height .053333rem
      background #aaaaaa
      position relative
      margin 0 .4rem
      .progress-inner
        position absolute
        width 50%
        height 100%
        left 0
        top 0
        background $theme-color
      .progress-btn
        display block
        width 20px
        height 20px
        background #ffffff
        border-radius 50%
        position absolute
        left 0%
        transform translate3d(0,-50%,0)
        margin-left -.133333rem
        &:after
          content ''
          display block
          background $theme-color
          position absolute
          left 50%
          top 50%
          margin-top -3px
          margin-left -3px
          width 6px
          height 6px
          border-radius 50%
</style>
<template>
  <div class="progress-box">
    <div>{{format(currentTime,2)}}</div>
    <div @touchstart="innerTouch" ref="progress-box" class="progress">
      <div ref="inner-progress" class="progress-inner" :style="{width: percent}">
      </div>
      <div 
      ref="btn"
      @touchstart.stop="touchstart"
      @touchmove.stop="touchmove"
      @touchend.stop="touchend"
      :style="{left: percent}" class="progress-btn">
      </div>
    </div>
    <div>{{format(totalTime,2)}}</div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      percent: 0
    }
  },
  methods: {
    innerTouch (env) {
      const progressBox = this.$refs['progress-box']
      const box = progressBox.getBoundingClientRect()
      const touch = env.touches[0]
      const left = touch.pageX - box.left
      const percent = left / box.width * 100 + '%'
      const btn = this.$refs.btn
      btn.style.left = percent
      const innerProgress = this.$refs['inner-progress']
      innerProgress.style.width = percent
      const audio = document.getElementById('audio')
      const currentTime = this.totalTime * left / box.width
      audio.currentTime = currentTime
    },
    touchstart (env) {
      console.log(env)
      const progressBox = this.$refs['progress-box']
      const box = progressBox.getBoundingClientRect()
      // const btn = this.$refs.btn
      const touch = env.touches[0]
      this.touch = {}
      this.touch.x = touch.pageX
      this.touch.left = box.left
      this.touch.totalWidth = box.width
      this.touch.start = true
    },
    touchmove (env) {
      if (this.touch && this.touch.start) {
        console.log('move')
        const touch = env.touches[0]
        const deviation = touch.pageX - this.touch.left
        let percent = deviation / this.touch.totalWidth
        const btn = this.$refs.btn
        const innerProgress = this.$refs['inner-progress']
        console.log(percent)
        percent = percent > 1 ? 1 : percent
        this.touch.percent = percent
        btn.style.left = percent * 100 + '%'
        innerProgress.style.width = percent * 100 + '%'
      }
      // console.log(env)
    },
    touchend (env) {
      this.touch.start = false
      // console.log(env)
      const currentTime = this.totalTime * this.touch.percent
      const audio = document.getElementById('audio')
      audio.currentTime = currentTime
      if (this.playState) {
        audio.play()
      } else {
        audio.pause()
      }
    },
    format (time, num) {
      let minute = parseInt(time / 60)
      let second = parseInt(time % 60)
      //  2  40
      for (let i = 0; i < num; i++) {
        if (minute.toString().length < num) {
          minute = '0' + minute
        }
        if (second.toString().length < num) {
          second = '0' + second
        }
      }
      return minute + ':' + second
    }
  },
  computed: {
    ...mapGetters({
      totalTime: 'currentSongTotalTime',
      currentTime: 'currentSongTime',
      playState: 'playState'
    })
  },
  watch: {
    currentTime (newTime) {
      // if (this.touch && this.touch.start) return
      this.percent = (newTime / this.totalTime) * 100 + '%'
    }
  }
}
</script>
