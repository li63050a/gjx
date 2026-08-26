const { defineComponent } = Vue

export default defineComponent({
  name: 'ChipTabs',
  props: {
    categories: Array,
    modelValue: String
  },
  emits: ['update:modelValue'],
  template: `
    <div class="flex gap-2 overflow-x-auto pb-1">
      <button v-for="c in categories" :key="c.key" @click="$emit('update:modelValue', c.key)"
        class="rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap"
        :class="modelValue === c.key ? 'bg-primary text-white' : 'bg-card text-muted border border-line'">
        {{ c.label }} ({{ c.count }})
      </button>
    </div>
  `
})
