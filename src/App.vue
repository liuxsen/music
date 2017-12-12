<template>
  <div id="app">
    <audio 
    id="audio"
    @loadedmetadata="updateTime" 
    preload="auto" 
    @error="error" 
    ref="audio" 
    class="audio" 
    :src="currentSongUrl"></audio>
    <router-view/>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
  name: 'app',
  data () {
    return {
      canplay: false
    }
  },
  methods: {
    error (e) {
      console.log(e)
    },
    updateTime () {
      const audio = this.$refs.audio
      const duration = audio.duration
      console.log(duration)
      this.updateTotalTime(duration)
    },
    updateCurrentTime () {
      clearInterval(this.timer)
      const audio = this.$refs.audio
      this.timer = setInterval(() => {
        const currenTime = audio.currentTime
        this.changeCurrentTime(currenTime)
      }, 1000)
      // this.updateTotalTime(duration)
    },
    ...mapMutations({
      updateTotalTime: 'CHANGE_CURRENT_SONG_TOTALTIME',
      changeCurrentTime: 'CHANGE_CUREENT_SONG_TIME'
    })
  },
  computed: {
    ...mapGetters({
      playState: 'playState',
      currentSongUrl: 'currentSongUrl',
      playSong: 'playingSong'
    })
  },
  watch: {
    currentSongUrl () {
      this.$nextTick(() => {
        const audio = this.$refs.audio
        this.updateTotalTime()
        if (this.playState) {
          console.log('play')
          audio.play()
          this.updateCurrentTime()
        } else {
          audio.pause()
        }
      })
    },
    playState () {
      this.$nextTick(() => {
        if (this.playState) {
          console.log('play')
          this.$refs.audio.play()
          this.updateCurrentTime()
        } else {
          this.$refs.audio.pause()
          clearInterval(this.timer)
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  #app
    overflow-x hidden
  .audio
    display none
    width 0
    height 0
</style>
