<template>
  <section
    id="games"
    class="py-16 md:py-24 relative"
    style="background: linear-gradient(180deg, #0a0a1a 0%, #12101f 50%, #0a0a1a 100%);"
  >
    <div style="max-width: 1100px; margin-left: auto; margin-right: auto; padding-left: 1rem; padding-right: 1rem;">
      <!-- Header -->
      <div class="text-center mb-10 animate-on-scroll">
        <span class="inline-block font-[--font-mono] text-[--color-cyan]/60 text-xs tracking-[0.3em] uppercase mb-3">
          // what we've built
        </span>
        <h2
          class="font-[--font-pixel] text-[--color-cyan] text-base sm:text-lg md:text-xl"
          style="text-shadow: 0 0 15px rgba(0, 240, 255, 0.3);"
        >
          OUR GAMES
        </h2>
      </div>

      <!-- Filter tabs -->
      <div class="flex justify-center mb-10 animate-on-scroll">
        <div class="inline-flex bg-[--color-bg-surface] border border-[--color-border] rounded-lg p-1">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            class="font-[--font-mono] text-sm px-4 py-2 rounded-md transition-all duration-200"
            :class="activeTab === tab.value
              ? 'bg-[--color-cyan]/15 text-[--color-cyan] shadow-[0_0_10px_rgba(0,240,255,0.1)]'
              : 'text-[--color-text-muted] hover:text-[--color-text]'"
            @click="activeTab = tab.value"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- Game grid -->
      <div ref="gridRef" class="grid gap-5 sm:gap-6 mb-14" :class="gridClass">
        <div v-for="game in filteredGames" :key="game.id">
          <a
            v-if="game.playUrl"
            :href="game.playUrl"
            target="_blank"
            class="block group"
          >
            <GameCard :game="game" :showPlayButton="game.status === 'launched'" />
          </a>
          <GameCard v-else :game="game" />
        </div>
      </div>

      <!-- On Our Radar -->
      <div v-if="upcomingGames.length > 0" class="animate-on-scroll mx-auto" style="max-width: 48rem;">
        <div class="flex items-center gap-4 mb-6">
          <div class="h-px flex-1 bg-gradient-to-r from-transparent to-[--color-hot-pink]/20" />
          <h3 class="font-[--font-pixel] text-[--color-hot-pink] text-[10px] sm:text-xs whitespace-nowrap tracking-wider">
            ON OUR RADAR
          </h3>
          <div class="h-px flex-1 bg-gradient-to-l from-transparent to-[--color-hot-pink]/20" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div
            v-for="game in upcomingGames"
            :key="game.id"
            class="flex items-center gap-3 p-3.5 bg-[--color-bg-surface]/50 border border-[--color-border] rounded-lg hover:border-[--color-hot-pink]/20 transition-all duration-300 group"
          >
            <div class="flex-1 min-w-0">
              <div class="font-[--font-mono] text-[--color-text] text-sm group-hover:text-[--color-hot-pink] transition-colors truncate">
                {{ game.title }}
              </div>
              <div class="font-[--font-mono] text-[--color-text-muted] text-[11px] mt-0.5">
                {{ game.genre.join(' · ') }}
              </div>
            </div>
            <span class="font-[--font-mono] text-[--color-hot-pink]/60 text-[10px] shrink-0 border border-[--color-hot-pink]/15 px-2 py-0.5 rounded">
              {{ game.releaseDate }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAutoAnimate } from '@formkit/auto-animate/vue'
import { useGameStore } from '@/stores/gameStore'
import GameCard from '@/components/GameCard.vue'

const gameStore = useGameStore()
const [gridRef] = useAutoAnimate()

const tabs = [
  { value: 'all', label: 'All' },
  { value: 'launched', label: 'Live' },
  { value: 'development', label: 'In Dev' },
]

const activeTab = ref('all')

const filteredGames = computed(() => {
  const launched = gameStore.getLaunchedGames
  const dev = gameStore.getDevelopmentGames
  const all = [...launched, ...dev]
  if (activeTab.value === 'all') return all
  return all.filter((g) => g.status === activeTab.value)
})

const upcomingGames = computed(() => gameStore.getUpcomingGames)

const gridClass = computed(() => {
  const count = filteredGames.value.length
  if (count <= 2) return 'grid-cols-1 sm:grid-cols-2 mx-auto" style="max-width: 42rem;'
  return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
})
</script>
