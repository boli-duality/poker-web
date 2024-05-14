// 在尽可能保持js特性的情况下使用ts
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    formatters: true,
    stylistic: true,
    rules: {
      'ts/no-use-before-define': 'off',
      'vue/eqeqeq': 'off',
      'eqeqeq': 'off',
      'no-console': 'warn',
    },
  },
)
