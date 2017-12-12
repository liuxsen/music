<style lang="stylus" scoped>
 @import '~common/stylus/variable.styl'
  .box
    background $theme-color
    color #ffffff
    .top-bar
      display flex
      justify-content space-between
      align-items center
      font-size 18px
      padding-left .16rem
      padding-right .16rem
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
      padding-bottom 50%
      background #eeeeee
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
    </div>
    <div class="container">
      <div class="top-nav">
        <div>
          <i class="iconfont icon-bofang2"></i>
          <span>播放全部 <span class="total">(共3首)</span></span>
        </div>
        <div>
          <i class="iconfont icon-icon208"></i>
          <span>多选</span>
        </div>
      </div>
      <ul class="list">
        <li>
          
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    getRecommend () {
      this.postHttp.get('/app/top/playlist/highquality?limit=30')
        .then(({ data }) => {
          console.log(data)
        })
    }
  },
  created () {
    // this.getRecommend()
  }
}
</script>
