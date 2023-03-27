import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '@/assets/css/reset.css'
import "./assets/fonts/iconfont.css"

// 引入ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(ElementPlus)
app.use(router).mount('#app')
