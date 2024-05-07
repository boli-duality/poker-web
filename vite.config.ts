import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postcssNesting from 'postcss-nesting'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
// import Markdown from 'unplugin-vue-markdown/vite'
import { unheadVueComposablesImports } from '@unhead/vue'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
// import LinkAttributes from 'markdown-it-link-attributes'
import Unocss from 'unocss/vite'
// import Shiki from 'markdown-it-shiki'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    vue(),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ['vue', 'md'],
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        unheadVueComposablesImports,
        'vue',
        'vue-router',
        'vue-i18n',
        '@vueuse/core',
      ],
      dts: 'src/types/auto-imports.d.ts',
      dirs: [
        'src/hooks',
        'src/stores',
      ],
      vueTemplate: true,
      resolvers: [
        ElementPlusResolver(),
        // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/types/components.d.ts',
      resolvers: [
        // Auto register icon components
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'],
        }),
        ElementPlusResolver(),
      ],
    }),

    Icons({
      autoInstall: true,
    }),

    // https://github.com/antfu/unocss
    // see uno.config.ts for config
    Unocss(),

    // https://github.com/unplugin/unplugin-vue-markdown
    // Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite
    // Markdown({
    //   wrapperClasses: 'prose prose-sm m-auto text-left',
    //   headEnabled: true,
    //   markdownItSetup(md) {
    //     // https://prismjs.com/
    //     md.use(Shiki, {
    //       theme: {
    //         light: 'vitesse-light',
    //         dark: 'vitesse-dark',
    //       },
    //     })
    //     md.use(LinkAttributes, {
    //       matcher: (link: string) => /^https?:\/\//.test(link),
    //       attrs: {
    //         target: '_blank',
    //         rel: 'noopener',
    //       },
    //     })
    //   },
    // }),

    // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      fullInstall: true,
      include: [path.resolve(__dirname, 'locales/**')],
    }),
  ],

  css: {
    postcss: {
      plugins: [postcssNesting],
    },
  },
})
