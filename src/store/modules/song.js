import * as types from '../mutation-types'
/*
random: 0,
  loop: 1,
  sequence: 2
*/

const state = {
  playMode: 'sequence', // random loop sequence
  playState: false, // 歌曲播放状态
  sequeList: [], // 顺序歌单
  randomList: [], // 随机歌单
  songListInfo: '', // 歌单详情
  playingSong: '',
  currentSongUrl: '', // 当前播放的url
  currentSongTotalTime: 0, // 当前播放歌曲总时长
  currentSongTime: 0 // 当前播放时间
}

const mutations = {
  [types.CHANGE_SONG_LIST] (state, { list }) {
    if (state.playMode === 'sequence' || state.playMode === 'loop') {
      state.sequeList = list
    } else if (state.playMode === 'random') {
      state.randomList = list
    }
  },
  // 改变歌单信息
  [types.CHANGE_SONG_INFO] (state, {list}) {
    state.songListInfo = list
  },
  // 改变当前播放歌曲
  [types.CHANGE_PLAYING_SONG] (state, song) {
    state.playingSong = song
  },
  // 改变当前播放歌曲
  [types.CHANGE_CUREENT_SONG_USE_INDEX] (state, index) {
    if (index < 0) {
      index = 0
    }
    if (index > state.sequeList.length - 1) {
      index = state.sequeList.length - 1
    }
    if (state.playMode === 'sequence' || state.playMode === 'loop') {
      state.playingSong = state.sequeList[index]
    } else {
      state.playingSong = state.randomList[index]
    }
  },
  // 切换歌曲播放
  [types.TOGGLE_PLAYING_STATE] (state, flag) {
    state.playState = flag
  },
  [types.CHANGE_CURRNET_SONG_URL] (state, url) {
    state.currentSongUrl = url
  },
  [types.CHANGE_CURRENT_SONG_TOTALTIME] (state, totalTime) {
    state.currentSongTotalTime = totalTime
  },
  [types.CHANGE_CUREENT_SONG_TIME] (state, time) {
    state.currentSongTime = time
  }
}

const getters = {
  // 获得当前歌曲播放列表
  currentSongList: state => {
    if (state.playMode === 'sequence' || state.playMode === 'loop') {
      return state.sequeList
    } else if (state.playMode === 'random') {
      return state.randomList
    }
  },
  songListInfo: state => {
    return state.songListInfo
  },
  // 获得当前播放歌曲
  playingSong: state => {
    return state.playingSong
  },
  playState: state => state.playState,
  currentSongUrl: state => state.currentSongUrl,
  currentSongTime: state => state.currentSongTime,
  currentSongTotalTime: state => state.currentSongTotalTime,
  // 获取当前播放的歌曲的index
  getCurrentSongIndex: state => {
    if (!state.playState) return ''
    if (!state.sequeList.length && !state.randomList.length) return ''
    if (state.playMode === 'sequence' || state.playMode === 'loop') {
      let index = getIndex(state.sequeList, state.playingSong)
      return index
    } else {
      let index = getIndex(state.randomList, state.playingSong)
      return index
    }
  }
}

function getIndex (list, song) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === song.id) {
      return i
    }
  }
}

export default {
  state,
  mutations,
  getters
}
