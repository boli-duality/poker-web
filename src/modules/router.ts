import { createRouter, createWebHistory } from 'vue-router/auto'
import NProgress from 'nprogress'
import { setupLayouts } from 'virtual:generated-layouts'
import type { UserModule } from '~/types/modules'

export const install: UserModule = (app) => {
  const router = createRouter({
    history: createWebHistory(),
    extendRoutes: routes => setupLayouts(routes),
  })

  router.beforeEach((to, from) => {
    if (to.path !== from.path)
      NProgress.start()
  })
  router.afterEach(() => NProgress.done())

  app.use(router)
}
