<style lang="stylus" scoped>
 @import '~common/stylus/variable.styl'
  .box-container
    top 0
    left 0
    position fixed
    overflow hidden
    z-index 33
    width 100%
    background-color rgba(0,0,0,.1)
    transform translateX(100%)
    transition ease-in-out .3s
    .liryc
      text-align center
      p
      line-height 1.5
      font-size 14px
      color #eaeaea
      p.active
        color $theme-color
</style>
<template>
  <div class="box-container" ref="box">
    <scroll ref="scroll" :originalHeight="originalHeight" v-if="lirycList.length>0">
      <ul ref="scroll-box" class="liryc">
        <li ref="liryc-list" v-for="(item, i) in lirycList" :key="i">
          <p :class="{active: i === compuLirycIndex ? true : false}">{{item.text}}</p>
        </li>
      </ul>
    </scroll>
  </div>
</template>
<script>
import scroll from 'base/scroll/scroll'
import LiricParser from './lirycParse'
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      liryc: '',
      lirycList: [],
      originalHeight: 0
    }
  },
  methods: {
    getLiryc (songId) {
      const url = `/app/lyric?id=${songId}`
      this.postHttp.get(url)
        .then(({ data }) => {
          if (data.code === 200) {
            this.liryc = data.lrc.lyric
            this.normalizeLiryc()
          }
        })
    },
    normalizeLiryc () {
      let liryc = new LiricParser(this.liryc)
      this.lirycList = liryc.parseLiryc()
      setTimeout(() => {
        this.initHeight()
      }, 30)
    },
    initHeight () {
      const container = this.$parent.$refs.container
      const pos = container.getBoundingClientRect()
      const footer = this.$parent.$refs.footer
      const footerPos = footer.getBoundingClientRect()
      this.$refs.box.style.top = pos.top + 'px'
      this.$refs.box.style.bottom = footerPos.height + 'px'
      console.log(this.$refs['scroll-box'].offsetHeight)
      this.originalHeight = (window.innerHeight - pos.top - footerPos.height)
    }
  },
  computed: {
    compuLirycIndex () {
      for (let i = 0; i < this.lirycList.length; i++) {
        let currentTime = this.currentSongTime
        if (i + 1 < this.lirycList.length) {
          if (Math.floor(currentTime) > this.lirycList[i].time && Math.floor(currentTime) <= this.lirycList[i + 1].time) {
            return i
          }
        } else {
          return i
        }
      }
    },
    ...mapGetters({
      currentSongTime: 'currentSongTime',
      playingSong: 'playingSong'
    })
  },
  watch: {
    compuLirycIndex (newIndex) {
      const scrollRef = this.$refs.scroll
      const list = this.$refs['liryc-list'][newIndex]
      if (scrollRef && newIndex > 5) {
        const targetTop = list.getBoundingClientRect().height * (newIndex - 5)
        const alloyTouch = scrollRef.scroll
        alloyTouch.to(-targetTop)
      }
    },
    playingSong (newSong) {
      const newSongId = newSong.id
      this.getLiryc(newSongId)
    }
  },
  created () {
  },
  mounted () {
    this.getLiryc(this.playingSong.id)
  },
  components: {
    scroll
  }
}
</script>
