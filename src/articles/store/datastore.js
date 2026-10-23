import { reactive } from "vue";

const store = reactive({
    articles: [],
    loading: false,
    error: null,

    getAllArticles(){
        if (this._fetchPromise) return this._fetchPromise;

        this.loading = true;
        this.error = null;

        this._fetchPromise = fetch("/articles.json")
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(data => {
                this.articles = data;
            })
            .catch(e => {
                this.error = e.message;
                console.error('Ошибка загрузки:', e.message);
            })
            .finally(() => {
                this.loading = false;
                this._fetchPromise = null; 
            });

        return this._fetchPromise;
    },
    postArticle(article) {
        const maxId = this.articles.length > 0 
            ? Math.max(...this.articles.map(a => a.id)) 
            : 0;
            
        const newArticle = { 
            id: maxId + 1,
            ...article 
        };
        this.articles.push(newArticle);
    },
    togglePublish(id) {
        const numericId = Number(id);
        const a = this.articles.find(x => x.id === numericId);
        
        if (a) {
            a.isPublished = !a.isPublished;
        } else {
            console.warn('Статья с ID не найдена:', id);
        }
    }
})

store.getAllArticles()

export default store