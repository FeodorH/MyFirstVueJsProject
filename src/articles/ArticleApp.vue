<script setup>
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useArticleStore } from "./stores/articleStore";
import ProgressSpinner from "primevue/progressspinner";
import Button from "primevue/button";

const retryKey = ref(0);
const store = useArticleStore();
const showInfoDialog = ref(false);

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
  <!-- Глобальные сервисы -->
  <ConfirmDialog />
  <Dialog
    v-model:visible="showInfoDialog"
    header="О приложении"
    :modal="true"
    class="w-full max-w-30rem"
  >
    <p class="m-0">
      Этот сайт создан для лабораторной работы по Vue 3 + PrimeVue.
    </p>
  </Dialog>

  <div class="layout">
    <!-- Десктопное меню (слева) -->
    <aside class="sidebar hidden md:flex flex-column">
      <div class="brand p-3 font-bold text-xl text-primary">Мой Сайт</div>
      <Menu :model="menuItems" class="w-full border-none" />
      <div class="mt-auto p-3">
        <Button
          label="О приложении"
          icon="pi pi-info-circle"
          text
          severity="secondary"
          @click="showInfoDialog = true"
          class="w-full"
        />
      </div>
    </aside>

    <!-- Мобильное меню (сверху) -->
    <header class="md:hidden">
      <Menubar :model="menuItems">
        <template #start>
          <span class="font-bold text-primary mr-4">Мой Сайт</span>
        </template>
        <template #end>
          <Button
            icon="pi pi-info-circle"
            text
            rounded
            aria-label="Информация"
            @click="showInfoDialog = true"
          />
        </template>
      </Menubar>
    </header>

    <!-- Основной контент -->
    <main class="content p-3 md:p-4 flex-1">
      <RouterView v-slot="{ Component }">
        <Suspense :key="retryKey">
          <template #default>
            <component :is="Component" @retry="retryLoading" />
          </template>
          <template #fallback>
            <div
              class="flex flex-column align-items-center justify-content-center h-full gap-3"
            >
              <ProgressSpinner />
              <p class="m-0 text-color-secondary">Загрузка…</p>
              <Button label="Отмена" severity="danger" @click="cancelLoading" />
            </div>
          </template>
        </Suspense>
      </RouterView>
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
@media (min-width: 768px) {
  .layout {
    flex-direction: row;
  }
  .sidebar {
    width: 260px;
    border-right: 1px solid var(--p-content-border-color);
    background: var(--p-content-background);
    min-height: 100vh;
  }
}
.content {
  background: var(--p-surface-50);
  overflow-y: auto;
}
</style>
