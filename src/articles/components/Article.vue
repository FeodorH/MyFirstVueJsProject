<script setup>
import { computed } from 'vue'

const props = defineProps({
  article: { type: Object, required: true },
})

const emit = defineEmits(['toggle-published'])

const authorStyle = computed(() => {
  if (!props.article) return {}
  return {
    fontStyle:  props.article.isPublished ? 'normal' : 'italic',
    fontWeight: props.article.isPublished ? '600'    : '400',
  }
}) //TODO: пофиксить работу кнопки по одиночному отображению и заменить элементы на новые

</script>

<template>
  <div v-if="props.article">
    <Card class="mb-3" :class="{ 'unpublished-card': !props.article.isPublished }">
      <template #title>
        ID: {{ props.article.id }}
      </template>

      <template #content>
          <div class="flex flex-col gap-2">
              <div><strong>Title:</strong> {{ props.article.title }}</div>
              <div><strong>Author:</strong> <span :style="authorStyle">{{ props.article.author }}</span></div>
              <div><strong>Body:</strong> {{ props.article.body }}</div>
          </div>

          <button class="btn btn-sm btn-outline-secondary" @click="emit('toggle-published', props.article.id)">
            {{ props.article.isPublished ? 'Снять с публикации' : 'Опубликовать' }}
          </button>
      </template>
    </Card>
  </div>
  <div v-else class="alert alert-warning">
    Загрузка или статья не найдена...
  </div>
</template>

<style scoped>
.unpublished-card {
  color: gray !important; 
}

</style>