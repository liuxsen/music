<style lang="stylus" scoped>
 @import '~common/stylus/variable.styl'
  .box
    // background $theme-color
    color #ffffff
    .top-bar
      display flex
      justify-content space-between
      align-items center
      font-size 18px
      padding-left .16rem
      padding-right .16rem
      background $theme-color
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
    .banner
      height 3.893333rem
      background #eeeeee
      position relative
      .filter
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        filter blur(12px)
        background-size cover
      .wraper
        box-sizing border-box
        position absolute
        left 0
        top 0
        bottom 0
        right 0
        height 3.893333rem
        padding-top 1.106667rem
        display flex
        justify-content flex-start
      .banner-img
        width 2.4rem
        height 2.4rem
        background red
        margin-right .533333rem
        margin-left .3rem
        background-size cover
    .tab
      padding .466667rem
      font-size 14px
      color #000000
      display flex
      justify-content space-between
      align-items center
      .current-tag
        border1px($bcolor)
        padding .186667rem .333333rem
        &:after
          border-radius 50px
    .container
      .list
        .album
          width 100%
          padding-top 100%
          background #eeeeee
          position relative
          background-position center
          background-repeat no-repeat
          background-size cover
          &[lazy=loading]
            background-size .4rem
          .listen
            position absolute
            right .066667rem
            top .066667rem
            display flex
            align-items center
          .author
            position absolute
            left .066667rem
            bottom .066667rem
        h2
          color #333
</style>
<template>
  <div class="box">
    <div ref="top" class="top">
      <p class="top-bar">
        <i @click="$router.back()" class="iconfont icon-fanhui1-copy"></i>
        <span>歌单</span>
        <span>
          <i class="iconfont icon-sangedian"></i>
        </span>
      </p>
    </div>
    <div class="banner">
      <div class="filter" v-lazy:background-image="list[0].coverImgUrl"></div>
      <div class="wraper">
        <div class="banner-img" v-lazy:background-image="list[0].coverImgUrl"></div>
        <div class="text">
          <h1>精品歌单 > </h1>
          <p>{{list[0].name}}</p>
          <p>{{list[0].copywriter}}</p>
        </div>
      </div>
    </div>
    <div class="tab">
      <div class="current-tag">
        {{currentTag}} >
      </div>
      <div>
        <span @click="switchTag('欧美')">欧美</span>
        <span @click="switchTag('民谣')">民谣</span>
        <span @click="switchTag('摇滚')">摇滚</span>
      </div>
    </div>
    <div class="container">
      <list :showTitle="false" :num="2">
        <div @click="goSheet(item)" v-for="(item,i) in list" :key="i" class="list-item">
          <div class="album" v-lazy:background-image="item.coverImgUrl">
            <span class="listen"><i class="iconfont icon-erji"></i>{{item.subscribedCount | formatNum}}</span>
            <span class="author"><i class="iconfont icon-geren"></i>{{item.creator.nickname}}</span>
          </div>
          <h2>{{item.name}}</h2>
        </div>
      </list>
    </div>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
import list from 'base/list/list'
import SongListInfo from 'common/js/songListInfo'
export default {
  data () {
    return {
      list: [{}],
      currentTag: '欧美'
    }
  },
  methods: {
    goSheet (songlist) {
      let songListInfo = new SongListInfo({
        name: songlist.name,
        picUrl: songlist.coverImgUrl,
        id: songlist.id,
        userId: songlist.creator.userId,
        nickname: songlist.copywriter,
        avatarUrl: songlist.creator.avatarUrl
      })
      this.changeSongListInfo({list: songListInfo})
      this.$router.push({name: 'songSheet', params: {id: songlist.id}})
    },
    switchTag (tag) {
      this.currentTag = tag
      this.getRecommend()
    },
    getRecommend () {
      let tag = this.currentTag
      this.postHttp.get(`/app/top/playlist/highquality?cat=${tag}&limit=20`)
        .then(({ data }) => {
          if (data.code === 200) {
            this.list = data.playlists
          }
        })
    },
    ...mapMutations({
      changeSongListInfo: 'CHANGE_SONG_INFO'
    })
  },
  filters: {
    formatNum (num) {
      if (num > 10000) {
        let ret = num % 10000 + '万'
        return ret
      } else {
        return num
      }
    }
  },
  created () {
    this.getRecommend()
  },
  components: {
    list
  }
}
</script>
