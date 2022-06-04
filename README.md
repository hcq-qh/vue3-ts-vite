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
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
//遇到的问题
//commitlint.config.js:1 报错 SyntaxError: Invalid or unexpected token
// commitlint.config.js:1
// ��m
// SyntaxError: Invalid or unexpected token
//     at wrapSafe (internal/modules/cjs/loader.js:1001:16)
//     at Module._compile (internal/modules/cjs/loader.js:1049:27)
//     at Object.Module._extensions..js (internal/modules/cjs/loader.js:1114:10)
//     at Module.load (internal/modules/cjs/loader.js:950:32)
//     at Function.Module._load (internal/modules/cjs/loader.js:790:14)
//     at Module.require (internal/modules/cjs/loader.js:974:19)
//     at module.exports (E:\nancalProject\sass-match-web\node_modules\@commitlint\load\node_modules\import-fresh\index.js:32:59)
//     at loadJs (E:\nancalProject\sass-match-web\node_modules\@commitlint\load\node_modules\cosmiconfig\dist\loaders.js:16:18)
//     at Explorer.loadFileContent (E:\nancalProject\sass-match-web\node_modules\@commitlint\load\node_modules\cosmiconfig\dist\Explorer.js:84:32)
//     at Explorer.createCosmiconfigResult (E:\nancalProject\sass-match-web\node_modules\@commitlint\load\node_modules\cosmiconfig\dist\Explorer.js:89:36)
// husky - commit-msg hook exited with code 1 (error)
//解决
// vscode 底下的 UTF-16 LE 点击选择通过编码保存，然后选UTF-8
```
8. 安装插件(@vitejs/plugin-vue-jsx)以支持jsx，tsx写法
``` js
// vite.config.js
import vueJsx from '@vitejs/plugin-vue-jsx'

export default {
  plugins: [
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    })
  ]
}
```
9. 全新的 Vue3 状态管理工具：Pinia 安装(https://blog.csdn.net/u012384510/article/details/122007683)
``` js
yarn add pinia@next

// main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
 
// 实例化 Vue
const app = createApp(App)
// 安装 Pinia
app.use(createPinia())
// 挂载在真实 DOM
app.mount('#app')


import { defineStore } from "pinia"
 
// 对外部暴露一个 use 方法，该方法会导出我们定义的 state
const useCounterStore = defineStore({
  // 每个 store 的 id 必须唯一
  id: 'counter',
  // state 表示数据源
  state: () => ({
    count: 0
  }),
  // getters 类似于 computed，可对 state 的值进行二次计算
  getters: {
    double () {
     // getter 中的 this 指向👉 state
     return this.count * 2
   },
   // 如果使用箭头函数会导致 this 指向有问题
   // 可以在函数的第一个参数中拿到 state
    double: (state) => {
     return state.count * 2
   }
  },
  // actions 用来修改 state
  actions: {
    increment() {
      // action 中的 this 指向👉 state
      this.count++
    },
  }
})
 
export default useCounterStore


//除了使用上述类似 vuex 的方式来构建 state，还可以使用 function 的形式来创建 store，有点类似于 Vue3 中的 setup()。
import { ref, computed } from "vue"
import { defineStore } from "pinia"
 
// 对外部暴露一个 use 方法，该方法会导出我们定义的 state
const useCounterStore = defineStore('counter', function () {
  const count = ref(0)
  const double = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  return {
   count, double, increment
  }
})
 
export default useCounterStore



//Options Api

import { mapActions, mapState } from 'pinia'
import { useCounterStore } from '../model/counter'
 
export default {
  name: 'HelloWorld',
  computed: {
    ...mapState(useCounterStore, ['count', 'double'])
  },
  methods: {
    ...mapActions(useCounterStore, ['increment'])
  }
}


//Composition Api
// Composition Api
import { computed } from 'vue'
import { useCounterStore } from '../stores/counter'
export default {
  name: 'HelloWorld',
  setup() {
    const counter = useCounterStore()
    return {
      // state 和 getter 都需要在使用 computed，这和 Options Api 一样
      count: computed(() => counter.count),
      double: computed(() => counter.double),
      increment: () => { counter.count++ }, // 可以直接修改 state 的值
      increment: counter.increment, // 可以引用 store 中定义的 action
    }
  }
}



//具体使用
//in stores
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
// 1. 定义容器、导出容器
// 参数1：容器的ID，必须是唯一的，后面Pinia会把所有的容器挂载到根容器
// 参数2：一些选项对象，也就是state、getter和action
// 返回值：一个函数，调用即可得到容器实例
// 对外部暴露一个 use 方法，该方法会导出我们定义的 state
const useCounterStore = defineStore('counter', function () {
  const count = ref(0)
  const double = computed(() => count.value * 2)
  function increment () {
    count.value++
  }
  return {
    count, double, increment
  }
})

export default useCounterStore

//in .vue
// <script setup lang="ts">
import { storeToRefs } from 'pinia'
import useCounterStore from '../stores/counter'
defineProps<{ msg: string }>()
const mainStore = useCounterStore()
// 解构数据，但是得到的数据是不具有响应式的，只是一次性的
// 通过pinia中提供的storeToRefs方法来解决，推荐使用
const { count, double } = storeToRefs(mainStore)
// 更改数据的方法改action和在组件通过$patch
function aa () {
  //调用方法直接点出来
  mainStore.increment()
}
//方式三：更好的批量更新方法，通过$patch传递一个函数来实现，这里的state就是useMainStore容器中的state
  mainStore.$patch(state => {
    state.count += 10
  })
// </script>

// <template>
//   <h1>{{ msg }}</h1>
//   <h1>{{ count }}</h1>
//   <h1>{{ double }}</h1>
//   <button @click="aa"></button>
// </template>
```
10. 安装vue router(https://router.vuejs.org/zh/installation.html)
``` js
yarn add vue-router@4
// in router
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/index.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
//in main.ts
// main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
// 实例化 Vue
const app = createApp(App)
// 安装 Pinia
// 挂载在真实 DOM
app.use(createPinia())
  .use(router)
  .mount('#app')
// in app.vue
<router-view></router-view>
```
11. 设置别名(https://blog.csdn.net/young_sam/article/details/122287782)
``` js
//用于ts识别ts引入
npm i -D @types/node
// in vite.config.ts
const path = require('path');
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

//tsconfig.json
//paths 和 baseUrl
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "node",
    "strict": true,
    "jsx": "preserve",
    "sourceMap": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "lib": ["esnext", "dom"],
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
}

//遇到问题The package “esbuild-windows-64“ could not be found, and is needed by esbuild
npm i esbuild-windows-64
```
12. css
``` js
npm install -D less
```
13. axios二次封装
``` js
yarn add axios
```
14. 引入reset.css文件重置样式
15. 引入ant-design-vue 按需引入

# 遇到的问题

## 【vue eslint】报错Component name “xxxxx“ should always be multi-word.eslintvue(https://blog.csdn.net/u013078755/article/details/123581070)
``` js
// 原因
// 新手在组件命名的时候不够规范，根据官方风格指南，除了根组件（App.vue）外，自定义组件名称应该由多单词组成，防止和html标签冲突。
// 而最新的vue-cli创建的项目使用了最新的vue/cli-plugin-eslint插件，在vue/cli-plugin-eslint v7.20.0版本之后就引用了vue/multi-word-component-names规则，所以在编译的时候判定此次错误。
// in .eslintrc.js
overrides: [
    // 这里是添加的代码
    {
      files: ['src/views/index.vue', 'src/views/**/index.vue'], // 匹配views和二级目录中的index.vue
      rules: {
        'vue/multi-word-component-names': 'off'
      } // 给上面匹配的文件指定规则
    }
  ]
```

## Vue3安装依赖报错The engine “node“ is incompatible with this module
``` js
//这时候运行运行一个命令就会正常，这个命令会自动补充兼容所报的错误。
yarn config set ignore-engines true
```