<style lang="stylus" scoped>
  @import '~common/stylus/variable.styl'
  .box
    background-color #aaaaaa
    color #fff
    width 100vw
    height 100vh
    overflow hidden
    position relative
    z-index 3
    .box-filter
      width 100%
      height 100%
      background-color #000000
      background-repeat no-repeat
      background-position center
      background-size cover
      position absolute
      filter blur(40px)
    .con
      position absolute
      width 100%
      height 100%
      left 0
      top 0
      z-index 3
    .top
      display flex
      justify-content space-between
      padding .293333rem .493333rem
      border1px($bcolor,'bottom')
      .iconfont
        font-size 22px
      .title-box
        text-align center
      .title
        font-size 14px
      .from
        elipise()
        max-width 4rem
    .disk-wrap
      padding .933333rem
      padding-top 1.906667rem
      .disk
        padding-top 100%
        background red
        border-radius 50%
        position relative
        background url(./disc.png) no-repeat center center/100%
        .disk-inner
          background-color #000000
          background-repeat no-repeat
          background-position center
          background-size 100%
          width 5.333333rem
          height 5.333333rem
          position absolute
          left 50%
          top 50%
          transform translate3d(-50%,-50%,0)      
          border-radius 50%    
    .operation
      margin .933333rem 1.866667rem .666667rem
      display flex
      justify-content space-between
      align-items center
      .iconfont
        font-size 20px
    .infinite
      animation myfirst 9s linear infinite
    @keyframes myfirst {
      0% {transform: rotateZ(0deg)}
      100% {transform: rotateZ(360deg)}
    }
    .toggle-area
      display flex
      justify-content space-around
      align-items center
      .iconfont
        font-size 23px
        &.play
          font-size 43px
          margin 0 1.186667rem
      .control-box
        display flex
        justify-content space-around
        align-items center
    .footer
      position absolute
      left 0
      width 100%
      bottom .266667rem
    .container
      position relative
    .scale-enter-active
      animation scale .5s forwards
    .scale-leave-active
      animation scale .5s reverse forwards
    @keyframes scale
      0%
        transform scale(0)
      100%
        transform scale(1)
    .slide-enter-active
      animation slide .5s reverse forwards
    .slide-leave-active
      animation slide .5s forwards
    @keyframes slide
      0%
        transform translateY(0)
        opacity 1
      100%
        transform translateY(100%)
        opacity 0
</style>
<template>
<transition name="bounce">
<div class="box">
    <div class="box-filter" :style="{backgroundImage: `url(${playingSong.picUrl})`}"></div>
    <div class="con">
      <div class="top">
        <i @click="back" class="iconfont icon-fanhui"></i>
        <div class="title-box">
          <span class="title from">{{playingSong.name}}</span>
          <p class="from">{{playingSong.from}}</p>
        </div>
        <i class="iconfont icon-fenxiang"></i>
      </div>
      <div class="container" 
      @touchstart="middleTouchstart"
      @touchmove="middleTouchmove"
      @touchend="middleTouchEnd"
      ref="container">
        <!-- 圆盘区 -->
        <transition name="scale">
          <div v-show="!showLiryc">
            <div class="disk-wrap">
              <div class="disk" :class="[playState ? 'infinite' : '']">
                <div class="disk-inner" :style="{backgroundImage: `url(${playingSong.picUrl})`}"></div>
              </div>
            </div>
        </div>
        </transition>
        <!-- 功能区 -->
        <transition name="slide">
          <div v-show="!showLiryc" class="operation">
            <i class="iconfont icon-shoucang1"></i>
            <i class="iconfont icon-xiazai"></i>
            <i class="iconfont icon-xinxi"></i>
            <i class="iconfont icon-jinlingyingcaiwangtubiao41"></i>
          </div>
        </transition>
        
        <liryc ref="liryc"></liryc>
      </div>
      <div class="footer" ref="footer">
        <!-- progress -->
        <progressbar></progressbar>
        <!-- toggle 切换歌曲 -->
        <div class="toggle-area">
          <div class="mode">
            <i class="iconfont icon-danquxunhuan"></i>
          </div>
          <div class="control-box">
            <i @click="preSong" class="iconfont icon-preMusic"></i>
            <i @click="togglePlay" :class="[playState ? 'icon-zanting' : 'icon-bofang1']" class="iconfont  play"></i>
            <i @click="nextSong" class="iconfont icon-shangyiqu101"></i>
          </div>
          <div class="list">
            <i class="iconfont icon-gedan"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>
<script>
import progressbar from '@/components/progressbar/progressbar'
import liryc from '@/components/liryc/liryc'
import {mapGetters, mapMutations} from 'vuex'
export default {
  data () {
    return {
      audioUrl: '',
      showLiryc: false
    }
  },
  methods: {
    nextSong () {
      let index = this.getCurrentSongIndex
      this.changeCurrentTime(0)
      this.switchIndex(++index)
    },
    preSong () {
      let index = this.getCurrentSongIndex
      this.changeCurrentTime(0)
      this.switchIndex(--index)
    },
    back () {
      this.$router.back()
    },
    middleTouchstart (env) {
      let lirycEl = this.$refs.liryc.$el
      this.touch = {}
      const touch = env.touches[0]
      this.touch.start = true
      this.touch.startX = touch.pageX
      this.touch.x = 0
      this.touch.startY = touch.pageY
      this.touch.startPos = lirycEl.style.transform
    },
    middleTouchmove (env) {
      let lirycEl = this.$refs.liryc.$el
      let touch = env.touches[0]
      // this.touch.x = pageX
      this.touch.x = touch.pageX
      this.touch.y = touch.pageY
      let pageX = touch.pageX - this.touch.startX
      if (pageX > 0 && !this.showLiryc) {
        return
      }
      let offY = this.touch.startY - this.touch.y
      let offX = this.touch.startX - this.touch.x
      if (Math.abs(-offY) - Math.abs(-offX) > 0) {
        lirycEl.style.transform = this.touch.startPos
        return
      }
      lirycEl.style.transform = `translateX(${pageX}px)`
    },
    middleTouchEnd (env) {
      let lirycEl = this.$refs.liryc.$el
      let offY = this.touch.startY - this.touch.y
      let offX = this.touch.startX - this.touch.x
      if (Math.abs(-offY) - Math.abs(-offX) > 0) {
        lirycEl.style.transform = this.touch.startPos
        return
      }
      console.log(offX)
      if (offX > 50) {
        lirycEl.style.transform = `translateX(0)`
        this.showLiryc = true
      } else if (offX < 50) {
        lirycEl.style.transform = `translateX(100%)`
        this.showLiryc = false
      }
    },
    togglePlay () {
      this.changePlayState(!this.playState)
    },
    getUrl (songId) {
      // /music/url?id=347230,347231
      this.postHttp(`/app/music/url?id=${songId}`)
        .then(({ data }) => {
          console.log(data)
          if (data.code === 200) {
            this.updateSongUrl(data.data[0].url)
            this.playSong(true)
          }
        })
    },
    ...mapMutations({
      changePlayState: 'TOGGLE_PLAYING_STATE',
      updateSongUrl: 'CHANGE_CURRNET_SONG_URL',
      playSong: 'TOGGLE_PLAYING_STATE',
      switchIndex: 'CHANGE_CUREENT_SONG_USE_INDEX',
      changeCurrentTime: 'CHANGE_CUREENT_SONG_TIME'
    })
  },
  computed: {
    ...mapGetters({
      playingSong: 'playingSong',
      playState: 'playState',
      getCurrentSongIndex: 'getCurrentSongIndex'
    })
  },
  watch: {
    // 切换播放歌曲
    playingSong (newSong) {
      const songId = newSong.id
      this.getUrl(songId)
    }
  },
  created () {
    this.getUrl(this.playingSong.id)
  },
  mounted () {},
  components: {
    progressbar, liryc
  }
}
</script>
