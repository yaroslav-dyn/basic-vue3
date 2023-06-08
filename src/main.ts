import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { createI18n } from 'vue-i18n';
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './assets/sass/main.scss';
import 'element-plus/dist/index.css';
import { MessagesLocale as messages } from "./services/MessagesLocale";

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}


const i18n = createI18n({
  locale: 'en', // set locale
  fallbackLocale: 'ua', // set fallback locale,
  messages
})

app.use(router)
   .use(i18n)
   .use(ElementPlus)
   .use(store)
   .mount("#app");