/**
 *
 * @param e mousedown事件对象
 * @param target 需要更改高度或者宽度的 dom 元素
 * @param option 更改 width 或者 height 的选项
 */
const handleResize = (e: MouseEvent, target: HTMLDivElement, option: boolean) => {
  document.body.style.cursor = 'ew-resize'
  e.preventDefault()
  // 记录鼠标初始坐标与元素初始宽度
  const startX = e.clientX
  const startY = e.clientY
  const startWidth = target.offsetWidth
  const startHeight = target.offsetHeight
  const mouseMoveX = (e: MouseEvent) => {
    e.preventDefault()
    const moveX = e.clientX - startX
    target.style.width = startWidth + moveX + 'px'
  }

  const mouseMoveY = (e: MouseEvent) => {
    e.preventDefault()
    const moveY = e.clientY - startY
    target.style.height = startHeight - moveY + 'px'
  }

  const mouseUp = (e: MouseEvent) => {
    e.preventDefault()
    document.body.style.cursor = 'auto'
    if (option) {
      document.removeEventListener('mousemove', mouseMoveX)
    } else {
      document.removeEventListener('mousemove', mouseMoveY)
    }
    document.removeEventListener('mouseup', mouseUp)
  }
  // 给文档添加事件
  if (option) {
    document.addEventListener('mousemove', mouseMoveX)
  } else {
    document.addEventListener('mousemove', mouseMoveY)
  }
  document.addEventListener('mouseup', mouseUp)
}
const throttle = (func, delay) => {
  let startTime = Date.now()
  let timer
  return function (this: any, ...params) {
    const endTime = Date.now()
    const remain = delay - (endTime - startTime)
    clearTimeout(timer)
    if (remain <= 0) {
      func.apply(this, params)
      startTime = Date.now()
    } else {
      timer = setTimeout(func, remain)
    }
  }
}
export default throttle(handleResize, 300)
