const { defineComponent } = Vue

export default defineComponent({
  name: 'SideBar',
  props: {
    categories: Array,
    active: String,
    collapsed: Boolean
  },
  emits: ['update:active', 'update:collapsed'],
  template: `
    <nav>
      <div class="flex items-center justify-between mb-2">
        <span v-if="!collapsed" class="font-bold text-ink">分类</span>
        <button @click="$emit('update:collapsed', !collapsed)" class="text-muted px-2">{{ collapsed ? '⟩' : '⟨' }}</button>
      </div>
      <button v-for="c in categories" :key="c.key" @click="$emit('update:active', c.key)"
        class="w-full text-left rounded-xl px-3 py-2 my-1 flex items-center gap-2"
        :class="active === c.key ? 'bg-primary/10 text-primary font-semibold' : 'text-muted hover:bg-card'">
        <span>{{ c.icon }}</span><span v-if="!collapsed">{{ c.label }}</span>
      </button>
    </nav>
  `
})
