import { createRouter, createWebHistory } from 'vue-router'
import Article from '../components/Article.vue'
import ArticleForm from '../components/ArticleForm.vue'
import Home from '../components/Home.vue'
import ArticleView from '../components/ArticleView.vue'

const routes = [
    { 
        path: '/', 
        name: 'home', 
        component: Home
    },
    { 
        path: '/new', 
        name: 'new-article', 
        component: ArticleForm 
    },
    { 
        path: '/about', 
        component: () => import("@/articles/components/About.vue") 
    },
    { 
        path: '/article/:id', 
        name: 'articleView', 
        component: ArticleView,
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router