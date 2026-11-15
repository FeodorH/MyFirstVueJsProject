import { defineStore } from "pinia";
import { ArticleService } from "../service/articleService";

let currentFetchPromise = null;
let currentAbortController = null; 

export const useArticleStore = defineStore('articles', {
    state: () => ({
        articles: [],
        isLoading: false,
        errorMessage: null,
        errorStatus: null,
        wasCancelled: false
    }),

    getters: {
        getArticles: (state) => state.articles,
        publishedCount: (state) => state.articles.filter(a => a.isPublished).length,
        getArticleById(state){
            return (id) => {
                return state.articles.find(article => article.id === Number(id))
            }
        }
    },

    actions: {
        postArticle(article){
            const maxId = this.articles.length > 0 
                ? Math.max(...this.articles.map(a => a.id)) 
                : 0;
                
            const newArticle = { 
                id: maxId + 1,
                ...article 
            };
            this.articles.push(newArticle);
        },
        loadArticles(){
            if (currentFetchPromise) return currentFetchPromise;

            this.isLoading = true
            this.clearErrors()
            this.wasCancelled = false;

            currentAbortController = new AbortController();

            currentFetchPromise = ArticleService.fetchArticles(
                {signal: currentAbortController.signal}
            )
            .then((res)=>{
                const allArticles = [...this.articles, ...res]

                const newArticles = allArticles.reduce((acc,article)=>{
                    acc[article.id] = {...acc[article.id], ...article}
                    return acc
                },{})

                this.articles = Object.values(newArticles)
            })
            .catch(error=>{
                if (error.name === 'AbortError') {
                    return
                }
                this.errorMessage = error.message
                this.errorStatus = error.status ?? null
            })
            .finally(()=>{
                this.isLoading = false
                currentFetchPromise = null
                currentAbortController = null
            })

            return currentFetchPromise;
        },
        clearErrors(){
            this.errorMessage = null
            this.errorStatus = null
        },
        togglePublish(id) {            
            const article = this.articles.find(a => a.id === Number(id));
            if (article) {
                article.isPublished = !article.isPublished;
            }
        },
        cancelLoadArticles(){
            if(currentAbortController){
                currentAbortController.abort();
            }
            this.wasCancelled = true
        }
    }
})