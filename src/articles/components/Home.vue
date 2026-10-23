<script setup>
import { onMounted } from 'vue'
import store from '@/articles/store/datastore.js'
import Article from '../components/Article.vue'

defineProps({
  msg: { type: String, default: 'Все статьи' },
})

onMounted(() => {
  if (store.articles.length === 0 && store.loading === false) {
    store.getAllArticles()
  }
})

</script>

<template>
  <div class="hello container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>{{ msg }}</h1>
      <RouterLink to="/new" class="btn btn-primary">Добавить статью</RouterLink>
    </div>

    <p v-if="store.loading">Загрузка статей...</p>
    <p v-else-if="store.error" class="error">Ошибка: {{ store.error }}</p>

    <div v-else-if="store.articles.length">
      <Article v-for="article in store.articles"
        :article="article"
        @toggle-published="(id) => store.togglePublish(id)"
      />
    </div>
    <p v-else>No articles in the list.</p>

    
  </div>
</template>

<style scoped>
.error { color: red; }
</style>