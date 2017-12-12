<style lang="stylus" scoped>
  @import '~common/stylus/variable.styl'
  .top
    color #fff
    background-color #aaaaaa
    padding 0 .346667rem
    position relative
    z-index 3
    padding-bottom 60%
    .filter
      content: ""; /* important */
      z-index: 0; /* important */
      position: absolute;  
      left: 0;
      top: 0;
      bottom 0
      right 0
      background-position center center
      background-size cover
      filter blur(5px)
    .filter-top
      position absolute
      left 0
      top 0
      right 0
      bottom 0
      z-index 2
    .top-bar
      display flex
      justify-content space-between
      align-items center
      font-size 18px
      padding-left .16rem
      padding-right .16rem
  .main
    display flex
    justify-content space-around
    margin-top .48rem
    align-items center
    .avatar
      width 3.88rem
      height 3.4rem
      background red
      overflow hidden
      img 
        width 100%
    .avatar-right
      p
        width 4.546667rem
      .creater-avatar
        width .4rem
        border-radius 50%
        vertical-align middle
    .title
      font-size 16px
      margin-bottom .853333rem
    .singer
      font-size 14px
    .time
      font-size 12px
  .tab
    margin-top .453333rem
    display flex
    justify-content space-around
    text-align center
    .icon-font
      font-size 20px
    .font
      margin-top 4px
      font-size 9px
  .container
    .top-nav
      font-size 18px
      display flex
      justify-content space-between
      color #000
      border1px($bcolor,'bottom')
      padding-top .16rem
      padding-bottom .16rem
      padding-left .16rem
      padding-right .16rem
      .total
        color $bcolor
        font-size 14px
      .iconfont 
        font-size 18px
    .list
      color $bcolor
      li
        display flex
        justify-content flex-start
        align-items center
        padding-top .36rem
        .ph
          font-size 12px
          margin-right .426667rem
          margin-left .4rem
          color $theme-color
          margin-bottom .4rem
        &:last-child
          .con
            &:after
              border 0
              width 0
      h1
        font-size 15px
        color #000
      .con
        border1px($bcolor,'bottom')
        flex-grow 1
        padding-bottom .36rem
      .sq
        color $theme-color
        margin-right 4px
      .singer
        display flex
        align-items center
  .slide-enter-active
    animation slide-in .5s
  .slide-leave-active
    animation slide-in .5s
  @keyframes slide-in
    0%
      transform translate3d(100%, 0, 0)
    50%
      transform translate3d(-10%, 0, 0)
    100%
      transform translate3d(0, 0, 0)
</style>
<template>
  <transition name="slide">
    <div>
      <div ref="top" class="top">
        <div class="filter" :style="{backgroundImage: `url(${songListInfo.picUrl})`}"></div>
        <div class="filter-top">
          <p class="top-bar">
            <i @click="$router.back()" class="iconfont icon-fanhui1-copy"></i>
            <span>专辑</span>
            <span>
              <i class="iconfont icon-sangedian"></i>
            </span>
          </p>
          <div class="main">
            <div class="avatar">
              <img :src="songListInfo.picUrl" alt="">
            </div>
            <div class="avatar-right">
              <p class="title">{{songListInfo.name}}</p>
              <p class="singer">
                <img class="creater-avatar" :src="songListInfo.creator.avatarUrl" alt="">
                {{songListInfo.creator.nickname}} > 
                </p>
              <!-- <p class="time">发行时间：2017-11-28 </p> -->
            </div>
          </div>
          <div class="tab">
            <div>
              <p><i class="iconfont icon-shoucang2"></i></p>
              <p class="font">73333</p>
            </div>
            <div>
              <p><i class="iconfont icon-xinxi"></i></p>
              <p class="font">73333</p>
            </div>
            <div>
              <p><i class="iconfont icon-fenxiang"></i></p>
              <p class="font">73333</p>
            </div>
            <div>
              <p><i class="iconfont icon-xiazai"></i></p>
              <p class="font">73333</p>
            </div>
          </div>
        </div>
      </div>
      <loading v-show="!playList"></loading>
      <scroll :originalHeight="originalHeight" v-if="playList">
        <div ref="container" class="container">
          <div class="top-nav">
            <div>
              <i class="iconfont icon-bofang2"></i>
              <span v-if="playList">播放全部 <span class="total">(共{{playList.length}}首)</span></span>
            </div>
            <div>
              <i class="iconfont icon-icon208"></i>
              <span>多选</span>
            </div>
          </div>
          <ul class="list">
            <li @click="select(item)" v-for="(item,i) in playList" :key="i">
              <p class="ph">{{i+1}}</p>
              <div class="con">
                <h1>{{item.name}}</h1>
                <p class="singer">
                  <i class="iconfont icon-sq sq"></i>
                  <span>{{item.singerName}}</span>
                </p>
              </div>
            </li> 
          </ul>
        </div>
      </scroll>
    </div>
  </transition>
</template>

<script>
import scroll from 'base/scroll/scroll'
import loading from 'base/loading/loading'
import Song from 'common/js/song'
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      playList: '',
      originalHeight: 0
    }
  },
  methods: {
    select (item) {
      this.playingSong(item)
      this.$router.push({name: 'play'})
    },
    getPlayList () {
      const id = this.$route.params.id
      const timestamp = new Date().getTime()
      this.postHttp(`/app/playlist/detail?id=${id}&timestamp=${timestamp}`)
        .then(({ data }) => {
          let list = []
          data.playlist.tracks.forEach((s, i) => {
            let song = new Song({
              name: s.al.name,
              id: s.id,
              picUrl: s.al.picUrl,
              from: s.al.name,
              singerId: s.ar[0].id,
              singerName: s.ar[0].name
            })
            list.push(song)
          })
          this.playList = list
          this.changeSongList({list: list})
          setTimeout(() => {
            this.initHeight()
          }, 20)
        })
    },
    initHeight () {
      const windowHeight = window.innerHeight
      const topHeight = this.$refs.top.offsetHeight
      this.originalHeight = windowHeight - topHeight
    },
    ...mapMutations({
      changeSongList: 'CHANGE_SONG_LIST',
      playingSong: 'CHANGE_PLAYING_SONG',
      playSong: 'TOGGLE_PLAYING_STATE'
    })
  },
  computed: {
    ...mapGetters({
      songListInfo: 'songListInfo',
      currentSongList: 'currentSongList'
    })
  },
  created () {
    this.getPlayList()
  },
  mounted () {
  },
  components: {
    scroll, loading
  }
}
</script>


