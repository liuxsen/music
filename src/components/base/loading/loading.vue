<style lang="stylus" scoped>
  .box
    text-align center
    padding 1.333333rem 0
    img
      width .8rem
  .slideup-enter-active
    animation slideup 0s
  .slideup-leave-active
    animation slideup .5s
  @keyframes slideup
    0%
      padding 1.333333rem 0
    100%
      padding 0
</style>

<template>
<transition name="slideup"> 
  <div class="box">
    <img src="./loading.gif" alt="">
  </div>
</transition>
</template>
<script>
export default {
}
</script>
