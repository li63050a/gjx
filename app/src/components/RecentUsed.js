const { defineComponent } = Vue

export default defineComponent({
  name: 'RecentUsed',
  props: {
    items: Array
  },
  template: `
    <div v-if="items.length">
      <div class="text-sm text-muted mb-2">最近使用</div>
      <div class="flex gap-2 overflow-x-auto">
        <a v-for="item in items" :key="item.href" :href="item.href"
          class="inline-flex items-center gap-2 bg-card border border-line rounded-full px-3 py-1.5 text-sm text-ink hover:border-primary whitespace-nowrap">
          {{ item.icon }} {{ item.name }}
        </a>
      </div>
    </div>
  `
})
