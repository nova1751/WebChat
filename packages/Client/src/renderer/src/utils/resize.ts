/**
 *
 * @param e mousedown事件对象
 * @param target 需要更改高度或者宽度的 dom 元素
 * @param option 更改 width 或者 height 的选项
 */
const handleResize = (e: MouseEvent, target: HTMLDivElement, option: boolean) => {
  document.body.style.cursor = option ? 'ew-resize' : 'ns-resize'
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
const throttle = (func, delay, option = { leading: true, trailing: true }) => {
  let timer: any = null
  let lastArgs: Array<any> = []
  const step = () => {
    timer = null
    if (lastArgs.length) {
      func.apply(this, lastArgs)
      lastArgs.length = 0
      timer = setTimeout(step, delay)
    }
  }
  return function (this: any, ...params) {
    if (!timer) {
      if (option.leading) {
        func.apply(this, params)
      }
      timer = setTimeout(step, delay)
    } else if (option.trailing) {
      lastArgs = params
    }
  }
}
export default throttle(handleResize, 300)
