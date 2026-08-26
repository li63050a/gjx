<script setup>
import { matchTools } from '../composables/usePinyin.js';
import ThemeToggle from './ThemeToggle.vue';

const props = defineProps({
  modelValue: String,
  tools: Array,
});

const emit = defineEmits(['update:modelValue', 'toggle-menu']);
</script>

<template>
  <header
    class="sticky top-0 z-30 flex items-center gap-3 bg-card/90 backdrop-blur border-b border-line px-4 py-3"
  >
    <button
      type="button"
      class="md:hidden text-xl px-2"
      @click="emit('toggle-menu')"
      aria-label="Toggle menu"
    >
      ☰
    </button>

    <a href="#" class="font-extrabold text-lg text-ink whitespace-nowrap">🧰 超能工具箱</a>

    <div class="relative flex-1">
      <input
        type="text"
        class="w-full px-4 py-2 rounded-full border border-line bg-bg text-ink outline-none focus:border-primary"
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
        placeholder="搜索工具…"
      />

      <div
        v-if="modelValue"
        class="absolute z-40 mt-1 w-full bg-card border border-line rounded-xl2 shadow-soft max-h-80 overflow-auto"
      >
        <a
          v-for="t in matchTools(modelValue, tools).slice(0, 8)"
          :key="t.href"
          :href="t.href"
          class="flex items-center gap-2 px-3 py-2 hover:bg-bg text-ink"
        >
          {{ t.icon }} {{ t.name }}
        </a>
      </div>
    </div>

    <ThemeToggle />
  </header>
</template>
