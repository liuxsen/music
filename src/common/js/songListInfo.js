export default class SongListInfo {
  constructor (info) {
    this.userId = info.userId
    this.name = info.name
    this.id = info.id
    this.picUrl = info.picUrl
    this.nickname = info.nickname
    this.creator = {
      avatarUrl: info.avatarUrl,
      nickname: info.nickname
    }
    this.playcount = info.playcount
    this.trackCount = info.trackCount
  }
}
