<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
    <header class="bg-secondary text-dark py-3 py-lg-4">
        <div class="container">
            <div class="row align-items-center">
                <!-- Логотип -->
                <div class="col-auto">
                    <img src="https://colab.ws/storage/images/resized/ZunzPDBGq2IX6KTpUfW3TGLRhxU2NohRlvTfEabZ_large.webp" 
                         alt="logo" 
                         class="logo rounded-circle">
                </div>
                
                <!-- Заголовок и навигация -->
                <div class="col">
                    <div class="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center">
                        <h1 class="site-title h4 mb-2 mb-lg-0">Тестовый сайт о Куб ГУ</h1>
                        <nav class="d-flex flex-column flex-sm-row gap-2">
                            <a href="#home" class="btn btn-outline-dark btn-sm">Главная</a>
                            <a href="#about" class="btn btn-outline-dark btn-sm">О нас</a>
                            <a href="#contact" class="btn btn-outline-dark btn-sm">Другие сайты</a>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </header>
    
    <main>
        <RouterView v-slot="{Component}"> 
            <Suspense>
                <template #default>
                    <component :is="Component"/>
                </template>
                <template #fallback>
                    <div class="text-center p-4">
                    <ProgressSpinner />
                    <p>Loading...</p>
                    </div>
                </template>
            </Suspense>
        </RouterView>
    </main>

    <footer class="footer bg-secondary text-dark py-4 mt-4">
        <div class="container">
            <p class="mb-0 text-center text-lg-start">(с) Холкин Фёдор</p>
        </div>
    </footer>

    Возможно, с вас будут собираться персональные данные(!)
</template>

<style scoped>
    .logo {
        width: 80px;
        height: 80px;
        object-fit: cover;
    }

    @media (min-width: 992px) {
        .logo {
            width: 90px;
            height: 90px;
        }
    }
</style>