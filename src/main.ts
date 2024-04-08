import { createApp } from 'vue'
import 'normalize.css'
import App from './App.vue'
import router from './router'
import store from './store'

// import 'element-plus/theme-chalk/el-message.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

createApp(App).use(store).use(router).mount('#app')
