<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <RouterLink to="/" class="navbar-brand">Мой Сайт</RouterLink>
        
        <div class="navbar-nav ms-auto">
          <RouterLink to="/" class="nav-link">Главная</RouterLink>
          <RouterLink to="/new" class="nav-link">Добавить статью</RouterLink>
          <RouterLink to="/about" class="nav-link">О нас</RouterLink>
        </div>
      </div>
    </nav>
  </header>

  <main class="container my-4" style="min-height: 80vh;">
    <RouterView />
  </main>

  <footer class="bg-secondary text-dark py-4 mt-4">
    <div class="container text-center text-lg-start">
      <p class="text-muted small mb-0">Возможно, с вас будут собираться персональные данные(!)</p>
    </div>
  </footer>
</template>
