<script setup>
defineProps({
  categories: { type: Array, required: true },
  modelValue: { type: String, required: true },
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex overflow-x-auto gap-2">
    <button
      v-for="cat in categories"
      :key="cat.key"
      type="button"
      @click="emit('update:modelValue', cat.key)"
      :class="[
        'rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap',
        modelValue === cat.key
          ? 'bg-primary text-white'
          : 'bg-card text-muted border border-line',
      ]"
    >
      {{ cat.label }} ({{ cat.count }})
    </button>
  </div>
</template>
