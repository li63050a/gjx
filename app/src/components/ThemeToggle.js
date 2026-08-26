const { defineComponent, ref } = Vue

export default defineComponent({
  name: 'ThemeToggle',
  setup () {
    const isDark = ref(document.documentElement.classList.contains('dark'))
    function toggle () {
      isDark.value = !isDark.value
      document.documentElement.classList.toggle('dark', isDark.value)
      localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    }
    return { isDark, toggle }
  },
  template: `
    <button @click="toggle"
      class="rounded-full w-11 h-11 grid place-items-center bg-card border border-line text-xl shadow-sm hover:shadow-soft transition">{{ isDark ? '☀️' : '🌙' }}</button>
  `
})
