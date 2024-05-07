import type { Plugin } from 'vue'
import { createApp } from 'vue'
import App from './App.vue'
import '~/styles/main.css'
import 'uno.css'

const modules = import.meta.glob<Plugin>('./modules/*.ts', {
  import: 'install',
  eager: true,
})

const app = createApp(App)

Object.values(modules).forEach(install => app.use(install))

app.mount('#app')
