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
