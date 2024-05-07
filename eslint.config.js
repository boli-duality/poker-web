import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    formatters: true,
    stylistic: true,
    rules: {
      'ts/no-use-before-define': 'off',
      'vue/eqeqeq': 'off',
      'antfu/if-newline': 'off',
      'no-console': 'warn',
      'curly': 'off',
    },
  },
)
