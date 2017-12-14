<style lang="stylus" scoped>
.item
  .text
    padding .36rem .16rem 0
    display flex
    justify-content space-between
    font-size 14px
    text-align center
    .iconfont
      font-size 14px
  .list
    height 5.653333rem
    margin-top .506667rem
    position relative
    background-position center
    background-size cover
    background-repeat no-repeat
    &[lazy=loading]
      background-size .4rem
    &[lazy=error]
      background-size .4rem
    .video
      position absolute
      width 100%
      height 100%
    .icon-bofang1
      position absolute
      left 50%
      top 50%
      transform translate3d(-50%,-50%,0)
      font-size 40px
      z-index 20
      color #ffffff
    .bottom
      position absolute
      width 100%
      color #ffffff
      font-size 12px
      bottom 0
      left 0
      padding .173333rem
    .author
      position absolute
      left .226667rem
      top .266667rem
      img
        width .666667rem
        height .666667rem
        vertical-align middle
        margin-top -2px
        margin-right .133333rem
        border-radius 50%
        overflow hidden
    .top
      position absolute
      right .226667rem
      top .266667rem
      color #ffffff
      padding .133333rem .266667rem
      border 1px solid #eeeeee
      border-radius 17px
</style>
<template>
  <div v-if="mvList.length > 0">
    <div class="item" v-for="(item,i) in mvList" :key="i">
      <div class="list">
        <div class="top">
          電影
        </div>
        <div class="bottom">
          21萬
        </div>
        <div class="author">
          <img src="" />
          sdfsdf
        </div>
        <i @click="playMv" :data-id="item.id" class="iconfont icon-bofang1"></i>
        <video class="video" :poster="item.cover"></video>
      </div>
      <div class="text">
        <p>
          {{item.name}}
        </p>
        <div>
          <i class="iconfont"></i>
        </div>
        <div>
          <i class="iconfont icon-ding1"></i>
          <p>{{item.playCount}}</p>
        </div>
        <div>
          <i class="iconfont icon-xinxi"></i>
          <p>990</p>
        </div>
        <i class="iconfont icon-sangeyuandian"></i>
      </div>
    </div>
  </div>
</template>
<script>
import Mv from 'common/js/mv'
import {mapGetters, mapMutations} from 'vuex'
import {delspace} from 'common/js/dom'
export default {
  methods: {
    playMv (e) {
      delspace(e.target.parentNode)
      console.log(e)
      console.log()
      const mvId = e.target.getAttribute('data-id')
      const video = e.target.nextSibling
      let src = ''
      this.postHttp.get(`/app/mv?mvid=${mvId}`)
        .then(({data}) => {
          src = data.data.brs[480]
          video.src = '/play_mv?url=' + src
        })
    },
    getMvList () {
      this.postHttp.get('/app/mv/first?limit=10')
        .then(({data}) => {
          console.log(data)
          if (data.code === 200) {
            const list = data.data.map((item, i) => {
              let mv = new Mv({
                name: item.name,
                id: item.id,
                playCount: item.playCount,
                authorName: item.artists[0].name,
                authorId: item.artists[0].id,
                desc: item.briefDesc,
                cover: item.cover
              })
              return mv
            })
            this.updateMvList(list)
          }
        })
    },
    ...mapMutations({
      updateMvList: 'updateMvList'
    })
  },
  computed: {
    ...mapGetters({
      mvList: 'mvList',
      playState: 'playState',
      playIndex: 'playIndex'
    })
  },
  created () {
    this.getMvList()
  }
}
</script>
