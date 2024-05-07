import tinycolor from 'tinycolor2'

/** 一维数组转二维数组 */
export function array2Matrix(arr: any[], n: number) {
  const matrix: any[][] = []
  const len = arr.length
  let i = 0
  while (i < len)
    matrix.push(arr.slice(i, (i += n)))

  return matrix
}

/** 生成v4版本uuid */
export function uuidV4(length: number = 36) {
  const format = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
  return format.slice(0, length).replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/** 扩展console.log, 设置打印的标签和附带行号 */
export function logLabel(title: string, background: string = 'green') {
  if (background === 'error') background = '#ff4d4f'
  const color = tinycolor(background).isLight() ? 'black' : 'white'
  const style = `color:${color};background:${background};padding:2px 5px;border-radius:4px;`
  const label = [`%c${title}`, style]
  return label
}

/** interval管理器 */
export function useInterval(handler: () => void, { unload = true } = {}) {
  const manager = {
    /** 定时器id */
    id: 0,
    /** 是否正在运行 */
    active: false,
    /** 开始定时器 */
    start(timeout?: number | undefined, { immediate = true } = {}) {
      this.stop()
      if (immediate) handler()
      this.id = window.setInterval(handler, timeout)
      this.active = !!this.id
    },
    /** 清除定时器 */
    stop() {
      if (!this.active) return
      clearInterval(this.id)
      this.id = 0
      this.active = false
    },
  }

  if (unload) onUnmounted(() => manager.stop())

  return manager
}

/** timeout管理器 */
export function useTimeout(handler: () => void, { unload = true } = {}) {
  const manager = {
    id: 0,
    /** 是否正在运行 */
    active: false,
    start(timeout?: number | undefined, { immediate = false } = {}) {
      this.stop()
      if (immediate) handler()
      this.id = window.setTimeout(handler, timeout)
      this.active = !!this.id
    },
    stop() {
      if (!this.active) return
      clearTimeout(this.id)
      this.id = 0
      this.active = false
    },
  }

  if (unload) onUnmounted(() => manager.stop())

  return manager
}

/** 倒计时管理器 */
export function useCountDown(handler: (countdown: number) => void, { unload = true } = {}) {
  const manager = reactive({
    id: 0,
    /** 是否正在运行 */
    active: false,
    countdown: 0,
    start(countdown: number, { immediate = true } = {}) {
      this.stop()
      this.countdown = countdown
      if (immediate) handler(this.countdown)
      this.id = window.setInterval(() => {
        if (this.countdown > 0) handler(--this.countdown)
        else this.stop()
      }, 1000)
      this.active = !!this.id
    },
    stop() {
      if (!this.active) return
      clearInterval(this.id)
      this.id = 0
      this.active = false
      this.countdown = 0
    },
  })

  if (unload) onUnmounted(() => manager.stop())

  return manager
}
