<script setup>
import { ref } from 'vue'
import store from '../store/datastore'
import router from '../router'

const article = ref({
  title: '',
  author: '',
  body: '',
  isPublished: false,
})

function submit() {
  if (!article.value.title.trim()) {
    return; 
  }
  
  store.postArticle(article.value);

  router.push('/');
}
</script>

<template>
  <div class="form-container">
    <form @submit.prevent="submit">
      <h3 class="mb-4">Добавить статью</h3>

      <div class="flex flex-column gap-2 mb-3">
        <label for="title">Заголовок</label>
        <InputText id="title" v-model="article.title" placeholder="Введите заголовок" />
      </div>

      <div class="flex flex-column gap-2 mb-3">
        <label for="author">Автор</label>
        <InputText id="author" v-model="article.author" placeholder="Имя автора" />
      </div>

      <div class="flex flex-column gap-2 mb-3">
        <label for="body">Текст статьи</label>
        <Textarea id="body" v-model="article.body" rows="5" autoResize placeholder="Текст..." />
      </div>

      <div class="flex align-items-center mb-4">
        <Checkbox id="isPublished" v-model="article.isPublished" :binary="true" />
        <label for="isPublished" class="ml-2 cursor-pointer">Опубликовать сразу</label>
      </div>

      <div>
        <Button label="Добавить статью" type="submit" icon="pi pi-check" />
        <Button label="Отмена" severity="secondary" text class="ml-2" type="button" @click="router.push('/')" />
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid var(--p-content-border-color);
  border-radius: 8px;
  background: var(--p-content-background);
}
.flex-column {
  display: flex;
  flex-direction: column;
}
.gap-2 {
  gap: 0.5rem;
}
.mb-3 {
  margin-bottom: 1rem;
}
.mb-4 {
  margin-bottom: 1.5rem;
}
.ml-2 {
  margin-left: 0.5rem;
}
.cursor-pointer {
  cursor: pointer;
}
</style>