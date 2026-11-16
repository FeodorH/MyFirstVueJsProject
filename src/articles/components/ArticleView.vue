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
  <div v-if="props.article" class="mb-3">
    <Card :class="{ 'opacity-70': !props.article.isPublished }">
      <template #title>
        ID: {{ props.article.id }}
        <Tag
          :value="article.isPublished ? 'Опубликована' : 'Черновик'"
          :severity="article.isPublished ? 'success' : 'warn'"
          class="ml-2"
        />
      </template>

      <template #content>
        <div class="flex flex-column gap-2 px-3">
          <div><strong>Title:</strong> {{ props.article.title }}</div>
          <div>
            <strong>Author:</strong>
            <span :style="authorStyle">{{ props.article.author }}</span>
          </div>
          <div><strong>Body:</strong> {{ props.article.body }}</div>
        </div>

        <Button
          :severity="article.isPublished ? 'danger' : 'success'"
          class="mt-3"
          outlined
          size="small"
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
