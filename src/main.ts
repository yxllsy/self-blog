import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import service from "./utils/https";
import urls from "./utils/urls";
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate) // 注册持久化插件

const app = createApp(App)
app.config.globalProperties.$https = service;
app.config.globalProperties.$urls = urls;
app.use(pinia)
app.use(router)
app.mount('#app');
