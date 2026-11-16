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
  <div class="px-3">
    <Panel header="Добавить статью">
      <form class="flex flex-column gap-4" @submit.prevent="submit">
        <Fluid>
          <FloatLabel>
            <InputText id="title" v-model="article.title" />
            <label for="title">Заголовок</label>
          </FloatLabel>
        </Fluid>

        <Fluid>
          <FloatLabel>
            <InputText id="author" v-model="article.author" />
            <label for="author">Автор</label>
          </FloatLabel>
        </Fluid>

        <Fluid>
          <FloatLabel>
            <Textarea id="body" v-model="article.body" rows="5" autoResize />
            <label for="body">Текст статьи</label>
          </FloatLabel>
        </Fluid>

        <div class="flex align-items-center gap-2">
          <Checkbox
            id="isPublished"
            v-model="article.isPublished"
            :binary="true"
          />
          <label for="isPublished" class="cursor-pointer"
            >Опубликовать сразу</label
          >
        </div>

        <div class="flex gap-2">
          <Button label="Добавить статью" type="submit" icon="pi pi-check" />
          <Button
            label="Отмена"
            severity="secondary"
            text
            type="button"
            @click="router.push('/')"
          />
        </div>
      </form>
    </Panel>
  </div>
</template>
