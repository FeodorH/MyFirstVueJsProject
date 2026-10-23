<script setup>
    import { ref } from 'vue';
    import { formApi } from '@/forms/services/FormApiProvider.js';
    const forms = ref([])

    forms.value = await formApi.getAll()

</script>

<template>
    <ul>
        <li v-for="form in forms" :key="form.id">
            <Card>
                <template #title>
                    ID: {{ form.id }}
                </template>

                <!-- Основное содержимое карточки -->
                <template #content>
                    <div class="flex flex-col gap-2">
                        <div><strong>Имя:</strong> {{ form.name }}</div>
                        <div><strong>Email:</strong> {{ form.email }}</div>
                        <div><strong>Телефон:</strong> {{ form.phone }}</div>
                    </div>
                </template>
            </Card>
        </li>
    </ul>

    <RouterLink to="/">
        <Button>Return back</Button>
    </RouterLink>
</template>