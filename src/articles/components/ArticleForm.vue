<script setup>
import { ref } from "vue";
import router from "../router";
import { useArticleStore } from "../stores/articleStore";

const store = useArticleStore();

const article = ref({
  title: "",
  author: "",
  body: "",
  isPublished: false,
});

function submit() {
  if (!article.value.title.trim()) {
    return;
  }

  store.postArticle(article.value);

  router.push("/");
}
</script>

<template>
  <div class="form-container">
    <Panel>
      <Label
        style="
          font-size: large;
          font-weight: bold;
          size: 20ch; /*TODO*/
          margin-bottom: 5%;
        "
        >Добавить статью</Label
      >

      <div class="field" style="margin-bottom: 2%">
        <label for="title">Заголовок</label>
        <InputText
          id="title"
          v-model="article.title"
          placeholder="Введите заголовок"
        />
      </div>

      <div class="field" style="margin-bottom: 2%">
        <label for="author">Автор</label>
        <InputText
          id="author"
          v-model="article.author"
          placeholder="Имя автора"
        />
      </div>

      <div class="field" style="margin-bottom: 2%">
        <label for="body">Текст статьи</label>
        <Textarea
          id="body"
          v-model="article.body"
          rows="5"
          autoResize
          placeholder="Текст..."
        />
      </div>

      <div class="field" style="margin-bottom: 2%">
        <Checkbox
          id="isPublished"
          v-model="article.isPublished"
          :binary="true"
        />
        <label for="isPublished">Опубликовать сразу</label>
      </div>

      <div>
        <Button
          style="margin-bottom: 2%"
          label="Добавить статью"
          type="submit"
          icon="pi pi-check"
          v-on:click="submit()"
        />
        <Button
          label="Отмена"
          severity="secondary"
          text
          type="button"
          @click="router.push('/')"
        />
      </div>
    </Panel>
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

.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
