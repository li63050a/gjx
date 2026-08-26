<script setup>
defineProps({
  categories: { type: Array, required: true },
  active: { type: String, required: true },
  collapsed: { type: Boolean, default: false },
})

const emit = defineEmits(['update:active', 'update:collapsed'])
</script>

<template>
  <nav>
    <div class="flex items-center justify-between mb-2">
      <span v-if="!collapsed" class="font-semibold text-ink">常用工具</span>
      <button
        type="button"
        @click="emit('update:collapsed', !collapsed)"
        class="text-muted hover:text-ink px-2 py-1"
      >
        {{ collapsed ? '⟩' : '⟨' }}
      </button>
    </div>

    <div>
      <button
        v-for="cat in categories"
        :key="cat.key"
        type="button"
        @click="emit('update:active', cat.key)"
        :class="[
          'w-full text-left rounded-xl px-3 py-2 my-1 flex items-center gap-2',
          active === cat.key
            ? 'bg-primary/10 text-primary font-semibold'
            : 'text-muted hover:bg-card',
        ]"
      >
        <span>{{ cat.icon }}</span>
        <span v-if="!collapsed">{{ cat.label }}</span>
      </button>
    </div>
  </nav>
</template>
