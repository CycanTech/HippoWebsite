import { App } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import routes from "../router/index";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default (app: App) => {
  app.use(router);
};
