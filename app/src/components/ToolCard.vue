<script setup>
defineProps({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  href: { type: String, required: true },
  desc: { type: String, default: '' },
  py: { type: String, default: '' },
})

defineEmits(['open'])
</script>

<template>
  <a
    :href="href"
    @click="$emit('open', { name, href, icon })"
    class="group block bg-card border border-line rounded-xl2 p-4 shadow-sm hover:shadow-soft hover:-translate-y-1 transition transform duration-150"
  >
    <div class="bg-bg text-2xl w-10 h-10 flex items-center justify-center rounded-xl mb-2">
      {{ icon }}
    </div>
    <div class="font-semibold text-ink">{{ name }}</div>
    <div v-if="desc" class="text-sm text-muted mt-1">{{ desc }}</div>
  </a>
</template>
