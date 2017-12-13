<style lang="stylus" scoped>
  @import '~common/stylus/variable.styl'
  .topbar
    display flex
    justify-content space-around
    font-size 14px
    padding .266667rem 0
    li
      position relative
      text-align center
      &:after 
        content ''
        margin-top .266667rem
        display block
        width 1.066667rem
        height 2px
      &.active:after
        background $theme-color
  .banner
    width 100%
  .imglist
    overflow hidden
    img 
      width 100%
  .icon-list-box
    display flex
    justify-content space-around
    align-items center
    text-align center
    padding .373333rem 0 0
    color #000000
    font-size 12px
    p
      margin-top .133333rem
    .icon-list
      width 1.333333rem
      height 1.333333rem
      line-height 1.333333rem
      text-align center
      border1px($theme-color)
      &:after
        border-radius 50%
    .iconfont
      font-size 24px
      color $theme-color
</style>

<template>
  <div>
    <ul class="topbar">
      <li v-for="(item,i) in titleArr" :class="{active: i === activeIndex}" :key="i">
        {{item}}
      </li>
    </ul>
    <slider @animationEnd="setIndex" :showDots="false">
      <div>
        <slider v-if="imgList.length>0">
          <div class="imglist" v-for="(item,i) in imgList" :key="i">
            <img :src="item.picUrl" alt="">
          </div>
        </slider>
        <ul class="icon-list-box">
          <li>
            <div class="icon-list">
              <i class="iconfont icon-calendar"></i>
            </div>
            <p>私人FM</p>
          </li>
          <li>
            <div class="icon-list">
              <i class="iconfont icon-cuxiao-s"></i>
            </div>
            <p>每日推荐</p>
          </li>
          <li @click="$router.push({name: 'recommend'})">
            <div class="icon-list">
              <i class="iconfont icon-gedan"></i>
            </div>
            <p>歌单</p>
          </li>
          <li>
            <div class="icon-list">
              <i class="iconfont icon-paihangbang"></i>
            </div>
            <p>排行榜</p>
          </li>
        </ul>
        <!-- mv -->
        <list :num="2" v-if="mvList">
          <div slot="title">推荐MV</div>
          <div class="list-item" v-for="(item,i) in mvList" :key="i">
            <img v-lazy="item.picUrl" />
            <h1>{{item.name}}</h1>
            <p>{{item.copywriter}}</p>
          </div>
        </list>
        <list :num="3" v-if="recommendList.length>0">
          <div slot="title">推荐歌单</div> 
          <div @click="goRecommend(item)" class="list-item" v-for="(item,i) in recommendList" :key="i">
            <img v-lazy="item.picUrl" />
            <h1>{{item.name}}</h1>
            <p>{{item.creator.nickname}}</p>
          </div>
        </list>  
        <list :num="3" v-if="newSongList.length>0">
          <div slot="title">最新音乐</div>
          <div @click="goNewMusic(item)" class="list-item" v-for="(item,i) in newSongList" :key="i">
            <img v-lazy="item.picUrl" />
            <h1>{{item.name}}</h1>
            <!-- <p>{{item.creator.nickname}}</p> -->
          </div>
        </list>
      </div>
      <div>
        2
      </div>
      <div>
      3
      </div>      
    </slider> 
  </div>
</template>
<script>
import slider from 'base/slider/slider'
import list from 'base/list/list'
import Song from 'common/js/song'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      activeIndex: 0,
      titleArr: ['音乐', '视频', '电台'],
      imgList: [],
      mvList: [],
      recommendList: [],
      newSongList: []
    }
  },
  methods: {
    setIndex (i) {
      this.activeIndex = i
    },
    goNewMusic (item) {
      const id = item.id
      // 改变当前播放歌曲
      this.changePlayingSong(item)
      // 改变播放列表
      this.changeSongList({list: this.newSongList})
      this.$router.push({name: 'play', params: {id: id}})
    },
    goRecommend (item) {
      const id = item.id
      this.changeSongInfo({list: item})
      this.$router.push({name: 'songSheet', params: {id: id}})
    },
    // 独家放送
    getAlbum () {
      this.postHttp.get('/app/personalized/privatecontent')
        .then(({data}) => {
          console.log(data)
          if (data.code === 200) {
            this.imgList = data.result
          }
        })
    },
    getMv () {
      this.postHttp.get('/app/personalized/mv')
        .then(({data}) => {
          console.log(data)
          if (data.code === 200) {
            this.mvList = data.result
          }
        })
    },
    // 推荐歌单
    // /recommend/resource
    recommend () {
      this.postHttp.get('/app/recommend/resource')
        .then(({data}) => {
          console.log(data)
          if (data.code === 200) {
            this.recommendList = data.recommend
          }
        })
    },
    // 新音乐
    // /personalized/newsong
    newSong () {
      this.postHttp.get('/app/personalized/newsong')
        .then(({data}) => {
          console.log(data)
          if (data.code === 200) {
            let ret = data.result.map((item, i) => {
              console.log(item.song)
              let song = new Song({
                id: item.song.id,
                picUrl: item.song.album.blurPicUrl,
                from: item.song.album.name,
                singerName: item.song.artists[0].name,
                singerId: item.song.artists[0].id,
                name: item.name
              })
              return song
            })
            this.newSongList = ret
          }
        })
    },
    ...mapMutations({
      changeSongInfo: 'CHANGE_SONG_INFO',
      changePlayingSong: 'CHANGE_PLAYING_SONG',
      changeSongList: 'CHANGE_SONG_LIST'
    })
  },
  components: {
    slider, list
  },
  created () {
    this.getAlbum()
    this.getMv()
    this.recommend()
    this.newSong()
  },
  mounted () {

  }
}
</script>
