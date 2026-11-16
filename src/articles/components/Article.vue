<script setup>
import { computed, onMounted } from "vue";
import Article from "@/articles/components/ArticleView.vue";
import { useRouter } from "vue-router";
import { useArticleStore } from "../stores/articleStore.js";
import ArticleView from "@/articles/components/ArticleView.vue";

const router = useRouter();

const store = useArticleStore();

const props = defineProps({
  id: { type: String, required: true },
});

const article = computed(() => store.getArticleById(props.id));
</script>

<template>
  <div class="max-w-7xl mx-auto p-3">
    <Button
      aria-label="← Назад к списку"
      severity="secondary"
      icon="pi pi-arrow-left"
      class="mb-3"
      @click="router.push('/')"
    />

    <ArticleView
      v-if="article"
      :article="article"
      @toggle-published="(id) => store.togglePublish(id)"
    />

    <Message v-else severity="warn" :closable="false">
      Загрузка или статья с ID {{ id }} не найдена...
    </Message>
  </div>
</template>
