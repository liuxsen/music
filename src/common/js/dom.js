export function addClass (dom, className) {
  if (hasClass(dom, className)) {
    return
  }
  let newClass = dom.className.split(' ')
  newClass.push(className)
  dom.className = newClass.join(' ')
}
// 空格+classname+空格
// classname+空格
// 空格+classname
export function hasClass (dom, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(dom.className)
}
