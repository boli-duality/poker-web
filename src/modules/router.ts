import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import type { UserModule } from '~/types/modules'

const routes = setupLayouts(generatedRoutes)

export const install: UserModule = (app) => {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  })

  router.beforeEach((to, from) => {
    if (to.path !== from.path)
      NProgress.start()
  })
  router.afterEach(() => NProgress.done())

  app.use(router)
}
