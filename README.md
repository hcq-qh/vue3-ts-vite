# Vue 3 + TypeScript + Vite

1. 使用vite安装(https://vitejs.cn/)
2. 安装eslint代码检查(https://eslint.org/)
3. vue3使用插件(Vue Language Features (Volar)
4. 使用husky, lint-stage在代码提交时自动格式化  
``` js
npm i -D husky lint-staged
//in package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,vue}": ["eslint --fix", "git add"]
  }
}
```
5. 
