import { createHead } from '@unhead/vue'
import type { UserModule } from '~/types/modules'

export const install: UserModule = app => app.use(createHead())
