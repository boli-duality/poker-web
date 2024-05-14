declare interface Window {
  // extend the window
  logLabel: (title: string, background?: string) => string[]
}

// with unplugin-vue-markdown, markdown files can be treated as Vue components
declare module '*.md' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

declare module 'postcss-nesting'

interface ImportMetaEnv {
  /** 基础请求地址 */
  readonly VITE_BASE_API: string
  /** websocket地址 */
  readonly VITE_WS_API: string
}
