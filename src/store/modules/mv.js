import * as types from '../mutation-types'

const state = {
  mvList: [],
  playState: false,
  playIndex: 0
}

const mutations = {
  [types.updateMvList] (state, list) {
    state.mvList = state.mvList.concat(list)
  },
  [types.changeMvPlayState] (state) {
    state.playState = !state.playState
  },
  [types.changeMvPlayIndex] (state, index) {
    state.playIndex = index
  }
}

const getters = {
  mvList: state => {
    return state.mvList
  },
  playState: state => state.playState,
  playIndex: state => state.playIndex
}

export default {
  state,
  mutations,
  getters
}
