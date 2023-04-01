import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
// 重置样式Or字体图标
import '@/assets/css/reset.css'
import "./assets/fonts/iconfont.css"

// 引入ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import BreadCrumb from '@/components/BreadCrumb'
const pinia = createPinia()
const app = createApp(App)
app.use(ElementPlus)
app.use(pinia)
app.component("BreadCrumb", BreadCrumb)
app.use(router).mount('#app')
