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
import VueMarkdownEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";
//@ts-ignore css/js
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import "@kangc/v-md-editor/lib/theme/style/github.css";

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// highlightjs
import hljs from 'highlight.js';
//@ts-ignore css/js
import enUS from "@kangc/v-md-editor/lib/lang/en-US";

VueMarkdownEditor.lang.use("en-US", enUS);

const i18n = createI18n({
  locale: 'en', // set locale
  fallbackLocale: 'ua', // set fallback locale,
  messages
})

VueMarkdownEditor.use(githubTheme, {
  Hljs: hljs,
  "en-US":enUS
});


app
  .use(router)
  .use(i18n)
  .use(ElementPlus)
  .use(store)
  .use(VueMarkdownEditor)
  .mount("#app");