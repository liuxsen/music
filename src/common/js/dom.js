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

// 删除 元素下面所有的text类型节点
export function delspace (elem) {
  let elemChild = elem.childNodes
  for (var i = 0; i < elemChild.length; i++) {
    if (elemChild[i].nodeName === '#text' && !/\s/.test(elemChild.nodeValue)) {
      elem.removeChild(elemChild[i])
    }
  }
}
