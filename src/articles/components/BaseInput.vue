<script setup>
defineProps({
  modelValue: { type: String, default: '' },
  label:      { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="mb-2">
    <label v-if="label" class="form-label">{{ label }}</label>
    <input
      type="text"
      class="form-control"
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
    >
  </div>
</template>