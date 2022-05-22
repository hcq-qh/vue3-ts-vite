# Vue 3 + TypeScript + Vite

1. 使用vite安装(https://vitejs.cn/)
2. 安装eslint代码检查(https://eslint.org/)
3. vue3使用插件(Vue Language Features (Volar)
4. 使用husky, lint-stage在代码提交时自动格式化  
``` js
// 说明： 这一步会自动安装并配置husky，所有不用单独再安装husky了
npx mrm@2 lint-staged
// in package.json
// 注意，文件扩展名之间不要有空格，否则不生效
 "lint-staged": {
    "*.{js,jsx,ts,tsx,vue}": "eslint --cache --fix"
  } 
// 说明
// eslint --cache --fix
// npx --no-install lint-staged 

// eslint 加 --cache 只针对暂存的文件进行检查
// npx 执行 lint-staged之前会检查是否存在该包，不存在会下载，执行完再删除，这样很耗时，在确保安装的情况下，使用--no-install 命令可以越过安装流程
```
5. 在开发编译构建的时候加入vite官方推荐插件nabla/vite-plugin-eslint(https://github.com/nabla/vite-plugin-eslint)
6. git commit 提交规范(https://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)
7. 限制git提交工具(https://github.com/conventional-changelog/commitlint)

``` js
npm install --save-dev @commitlint/config-conventional @commitlint/cli
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js

```
