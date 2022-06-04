// main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
// 实例化 Vue
const app = createApp(App)
// 安装 Pinia
// 挂载在真实 DOM
app.use(createPinia())
  .use(Antd)
  .use(router)
  .mount('#app')
