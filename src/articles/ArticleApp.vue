<script setup>
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useArticleStore } from "./stores/articleStore";
import ProgressSpinner from "primevue/progressspinner";
import Button from "primevue/button";

const retryKey = ref(0);
const store = useArticleStore();

const menuItems = [
  { label: "Главная", icon: "pi pi-home", to: "/" },
  { label: "Добавить статью", icon: "pi pi-plus", to: "/new" },
  { label: "О нас", icon: "pi pi-info-circle", to: "/about" },
];

function retryLoading() {
  retryKey.value++;
}

function cancelLoading() {
  store.cancelLoadArticles();
}
</script>

<template>
  <header>
    <Menubar :model="menuItems">
      <template #start>
        <RouterLink to="/" class="brand">Мой Сайт</RouterLink>
      </template>
    </Menubar>
  </header>

  <main>
    <RouterView v-slot="{ Component }">
      <Suspense :key="retryKey">
        <template #default>
          <component :is="Component" @retry="retryLoading" />
        </template>

        <template #fallback>
          <div>
            <ProgressSpinner />
            <p>Загрузка…</p>
            <Button label="Отмена" severity="danger" @click="cancelLoading" />
          </div>
        </template>
      </Suspense>
    </RouterView>
  </main>

  <footer>
    <p>Возможно, с вас будут собираться персональные данные(!)</p>
  </footer>
</template>
