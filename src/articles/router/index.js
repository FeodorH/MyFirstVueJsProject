import { createRouter, createWebHistory } from "vue-router";
import ArticleForm from "../components/ArticleForm.vue";
import Home from "../components/Home.vue";
import Article from "../components/Article.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/new",
    name: "new-article",
    component: ArticleForm,
  },
  {
    path: "/about",
    component: () => import("@/articles/components/About.vue"),
  },
  {
    path: "/article/:id",
    name: "article",
    component: Article,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
