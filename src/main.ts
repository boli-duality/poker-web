// 时间格式化
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

// css normalize
import '@unocss/reset/tailwind.css'
import '~/styles/main.css'
import 'uno.css'

// element plus 暗黑样式
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/es/components/message/style/css'

// vue
import type { Plugin } from 'vue'
import { createApp } from 'vue'
import App from './App.vue'

// 工具函数
import { logLabel } from './libs/functions'

dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

window.logLabel = logLabel

const modules = import.meta.glob<Plugin>('./modules/*.ts', {
  import: 'install',
  eager: true,
})

const app = createApp(App)

Object.values(modules).forEach(install => app.use(install))

app.mount('#app')
