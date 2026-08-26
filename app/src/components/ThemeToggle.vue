<script setup>
import { ref } from 'vue';

const isDark = ref(document.documentElement.classList.contains('dark'));

function toggle() {
  document.documentElement.classList.toggle('dark');
  isDark.value = document.documentElement.classList.contains('dark');
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
}
</script>

<template>
  <button
    type="button"
    class="rounded-full w-11 h-11 grid place-items-center bg-card border border-line text-xl shadow-sm hover:shadow-soft transition"
    @click="toggle"
    :aria-label="isDark ? 'Switch to light' : 'Switch to dark'"
  >
    {{ isDark ? '☀️' : '🌙' }}
  </button>
</template>
