import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import './styles/index.scss'
import './permission'
import App from './App.vue'
import router from './router'
import { errorHandler } from './error'

import { i18n } from "./i18n"

import TitleBar from "./components/common/TitleBar.vue"
const app = createApp(App)
const store = createPinia()
app.use(ElementPlus, { i18n: i18n.global.d })
app.use(router)
app.use(store)
app.use(i18n)
errorHandler(app)

// 全局引入 TitleBar 组件
app.component("TitleBar", TitleBar);

app.mount("#app")

