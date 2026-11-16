<script setup>
import ArticleView from "@/articles/components/ArticleView.vue";
import { useArticleStore } from "../stores/articleStore.js";
import router from "../router/index.js";

defineProps({
  msg: { type: String, default: "Все статьи" },
});

const store = useArticleStore();
const emits = defineEmits();

await store.loadArticles();
</script>

<template>
  <div class="max-w-7xl mx-auto px-3">
    <div class="flex justify-content-between align-items-center mb-4">
      <h1 class="m-0">{{ msg }}</h1>
      <RouterLink to="/new">
        <Button label="Добавить статью" icon="pi pi-plus" />
      </RouterLink>
    </div>

    <Message
      v-if="store.wasCancelled"
      severity="warn"
      :closable="false"
      class="mb-3"
    >
      <div class="flex align-items-center gap-3">
        <span>Загрузка отменена.</span>
        <Button
          label="Загрузить снова"
          size="small"
          text
          @click="emits('retry')"
        />
      </div>
    </Message>

    <Message
      v-else-if="store.errorMessage"
      severity="error"
      :closable="false"
      class="mb-3"
    >
      <div>
        <h4 class="m-0 mb-2">Не удалось загрузить статьи</h4>
        <p class="m-0 mb-2">
          Код ошибки:
          <strong>{{ store.errorStatus ?? "нет соединения" }}</strong>
        </p>
        <p class="m-0 mb-3">{{ store.errorMessage }}</p>
        <Button
          label="Повторить загрузку"
          size="small"
          @click="emits('retry')"
        />
      </div>
    </Message>

    <div v-else-if="store.articles.length" class="flex flex-column gap-3">
      <ArticleView
        v-for="article in store.articles"
        :key="article.id"
        :article="article"
        @toggle-published="(id) => store.togglePublish(id)"
      />
    </div>
  </div>
</template>
