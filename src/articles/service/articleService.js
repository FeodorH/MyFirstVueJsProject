const BASE_URL = "http://localhost:8080/testVueApi/articles"

export const ArticleService = {
    async fetchArticles({signal}={}) {
        const res = await fetch(BASE_URL, {signal});
        
        if (!res.ok) {
            const err = res.status
            const error = new Error(`HTTP error: ${err}`)
            error.status = err
            throw error
        }
        
        return res.json();
    }
};