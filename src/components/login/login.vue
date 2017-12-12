<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
  .box
    padding .56rem
  .iconfont 
    font-size 24px
    color rgb(144,143,148)
  .border-bottom
    border1px($bcolor,'bottom')
  .list
    li
      padding .44rem 0
      display flex
      align-items center
      input
        width 100%
        height .64rem
        border 0
        padding-left .426667rem
      button
        display block
        color #ffffff
        width 100%
        height 1.066667rem
        border 0
        background $theme-color
        font-size 18px
        border-radius 30px
      &.btn
        margin-top 1.093333rem
</style>
<template>
  <div class="box">
    <ul class="list">
      <li class="border-bottom">
        <i class="iconfont icon-phone"></i>
        <input v-model="user.phone" type="text" placeholder="手机号">
      </li>
      <li class="border-bottom">
        <i class="iconfont icon-mima"></i>
        <input v-model="user.password" type="text" placeholder="密码">
      </li>
      <li class="btn">
        <button @click="login">登录</button>
      </li>
    </ul>
  </div>
</template>
<script>
// import axios from 'axios'
export default {
  data () {
    return {
      user: {
        phone: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      const phone = this.user.phone
      const password = this.user.password
      const url = '/app/login/cellphone'
      this.postHttp.get(`${url}?phone=${phone}&password=${password}`)
        .then(({ data }) => {
          console.log(data)
        })
    }
  }
}
</script>


