<script setup>
import { computed, onMounted } from 'vue'
import store from '../store/datastore'
import Article from '../components/Article.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  id: { type: String, required: true }
})

const article = computed(() => 
  store.articles.find(el => el.id === Number(props.id))
)

onMounted(() => {
  if (store.articles.length === 0) store.getAllArticles()
})
</script>

<template>
  <div class="container mt-4">
    <button class="btn btn-secondary mb-3" @click="router.push('/')">← Назад к списку</button>

    <!-- Передаем найденный объект в карточку -->
    <Article 
      v-if="article" 
      :article="article" 
      @toggle-published="(id) => store.togglePublish(id)"
    />
    
    <div v-else class="alert alert-warning">
      Загрузка или статья с ID {{ id }} не найдена...
    </div>
  </div>
</template>