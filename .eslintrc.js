module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
  },
  overrides: [
    // 这里是添加的代码
    {
      files: ['src/views/index.vue', 'src/views/**/index.vue'], // 匹配views和二级目录中的index.vue
      rules: {
        'vue/multi-word-component-names': 'off'
      } // 给上面匹配的文件指定规则
    }
  ]

}
