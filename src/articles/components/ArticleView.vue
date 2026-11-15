<script setup>
import { computed } from "vue";

const props = defineProps({
  article: { type: Object, required: true },
});

const emit = defineEmits(["toggle-published"]);

const authorStyle = computed(() => {
  if (!props.article) return {};
  return {
    fontStyle: props.article.isPublished ? "normal" : "italic",
    fontWeight: props.article.isPublished ? "600" : "400",
  };
});
</script>

<template>
  <div v-if="props.article">
    <Card
      class="article-card"
      :class="{ unpublished: !props.article.isPublished }"
    >
      <template #title>
        ID: {{ props.article.id }}
        <Tag
          :value="article.isPublished ? 'Опубликована' : 'Черновик'"
          :severity="article.isPublished ? 'success' : 'warn'"
        />
      </template>

      <template #content>
        <div class="card-body">
          <div><strong>Title:</strong> {{ props.article.title }}</div>
          <div>
            <strong>Author:</strong>
            <span :style="authorStyle">{{ props.article.author }}</span>
          </div>
          <div><strong>Body:</strong> {{ props.article.body }}</div>
        </div>

        <Button
          :severity="article.isPublished ? 'danger' : 'success'"
          class="toggle-btn"
          @click="emit('toggle-published', props.article.id)"
        >
          {{
            props.article.isPublished ? "Снять с публикации" : "Опубликовать"
          }}
        </Button>
      </template>
    </Card>
  </div>
  <div v-else class="alert alert-warning">
    Загрузка или статья не найдена...
  </div>
</template>

<style scoped>
.article-card {
  margin-bottom: 1rem;
}
.unpublished {
  opacity: 0.75;
}
.card-body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.toggle-btn {
  margin-top: 1rem;
}
</style>
