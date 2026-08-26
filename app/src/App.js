const { defineComponent, ref, computed } = Vue
import { tools, categories } from './data/tools.js'
import ToolCard from './components/ToolCard.js'
import ChipTabs from './components/ChipTabs.js'
import SideBar from './components/SideBar.js'
import TopBar from './components/TopBar.js'
import RecentUsed from './components/RecentUsed.js'
import { getRecent, addRecent } from './composables/useRecent.js'
import { matchTools } from './composables/usePinyin.js'

export default defineComponent({
  name: 'App',
  components: { ToolCard, ChipTabs, SideBar, TopBar, RecentUsed },
  setup () {
    const search = ref('')
    const activeCategory = ref('common')
    const collapsed = ref(false)
    const mobileOpen = ref(false)

    const recent = ref(getRecent(tools))

    function onOpen (tool) {
      addRecent(tool)
      recent.value = getRecent(tools)
    }

    function selectCat (k) {
      activeCategory.value = k
      mobileOpen.value = false
    }

    const categoriesWithCount = computed(() =>
      categories.map((c) => ({
        ...c,
        count:
          c.key === 'common'
            ? tools.filter((t) => t.common).length
            : c.key === 'all'
            ? tools.length
            : tools.filter((t) => t.category === c.key).length
      }))
    )

    const visibleTools = computed(() => {
      const matched = matchTools(search.value, tools)
      const cat = activeCategory.value
      return matched.filter((t) =>
        cat === 'common' ? t.common === true : cat === 'all' ? true : t.category === cat
      )
    })

    return { search, activeCategory, collapsed, mobileOpen, recent, onOpen, selectCat, categories, categoriesWithCount, visibleTools }
  },
  template: `
    <div class="min-h-screen bg-bg text-ink">
      <TopBar
        :model-value="search"
        :tools="tools"
        @update:model-value="search = $event"
        @toggle-menu="mobileOpen = !mobileOpen"
      />

      <div class="flex">
        <aside class="hidden md:block w-64 shrink-0 p-3">
          <SideBar
            :categories="categories"
            :active="activeCategory"
            :collapsed="collapsed"
            @update:active="selectCat"
            @update:collapsed="collapsed = !collapsed"
          />
        </aside>

        <div v-if="mobileOpen" class="fixed inset-0 z-40 bg-black/40 md:hidden" @click="mobileOpen = false"></div>

        <div v-if="mobileOpen" class="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-line p-3 overflow-y-auto">
          <div class="flex justify-end mb-2">
            <button class="text-muted hover:text-ink px-2 py-1 rounded-lg" @click="mobileOpen = false">✕</button>
          </div>
          <SideBar
            :categories="categories"
            :active="activeCategory"
            :collapsed="false"
            @update:active="selectCat"
            @update:collapsed="collapsed = !collapsed"
          />
        </div>

        <main class="flex-1 p-4 md:p-6 min-w-0">
          <RecentUsed :items="recent" />

          <ChipTabs
            :categories="categoriesWithCount"
            :model-value="activeCategory"
            @update:model-value="selectCat"
          />

          <div class="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-4">
            <ToolCard
              v-for="tool in visibleTools"
              :key="tool.href"
              :name="tool.name"
              :icon="tool.icon"
              :href="tool.href"
              :desc="tool.category"
              @open="onOpen"
            />
          </div>
        </main>
      </div>
    </div>
  `
})
