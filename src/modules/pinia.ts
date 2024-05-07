import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import type { UserModule } from '~/types/modules'

// Setup Pinia
// https://pinia.vuejs.org/
export const install: UserModule = (app) => {
  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)
  app.use(pinia)
}
