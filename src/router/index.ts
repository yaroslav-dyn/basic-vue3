
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";


const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    components: {
      default: Home
    },
    meta: {
      projectName: 'TrueStory'
    }
  },
  {
    path: "/editor",
    name: "Editor",
    component: () =>
      import("../components/EditorView.vue"),
  },
  {
    path: "/files",
    name: "FilesList",
    component: () =>
      import("../views/FilesView.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import("../views/AboutView.vue"),
  },
  {
    path: "/help",
    name: "Help",
    component: () =>
      import("../views/HelpView.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
