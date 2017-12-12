export default class Liryc {
  constructor (liryc) {
    this.liryc = liryc.split('\n')
    console.log(liryc)
    this.lines = []
  }
  parseLiryc () {
    let timeReg = /\[\d*:\d*((\.|:)\d*)*\]/g
    let ret = []
    let liryc = this.liryc
    console.log(liryc)
    for (let i = 0; i < liryc.length; i++) {
      if (liryc[i].match(timeReg)) {
        let time = liryc[i].match(timeReg)[0]
        console.log(time)
        // console.log(time.match(/:\d*/i))
        let min = Number(String(time.match(/\[\d*/i)).slice(1))
        let sec = Number(String(time.match(/:\d*/i)).slice(1))
        time = min * 60 + sec
        let text = liryc[i].replace(timeReg, '')
        ret.push({time: time, text: text})
      }
    }
    return ret
  }
}
