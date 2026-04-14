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
        <div style="display: inline-flex; gap: 4px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 4px;">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            style="border: none; cursor: pointer; border-radius: 6px;"
            class="font-[--font-mono] text-sm transition-all duration-200"
            :style="{
              padding: '8px 20px',
              background: activeTab === tab.value ? 'rgba(0, 240, 255, 0.12)' : 'transparent',
              color: activeTab === tab.value ? 'var(--color-cyan)' : 'var(--color-text-muted)',
              boxShadow: activeTab === tab.value ? '0 0 10px rgba(0,240,255,0.1)' : 'none',
            }"
            @click="activeTab = tab.value"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- Game grid -->
      <div ref="gridRef" class="grid gap-5 sm:gap-6" :class="gridClass" :style="gridStyle">
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
      <div v-if="upcomingGames.length > 0" class="animate-on-scroll mt-24" style="max-width: 900px; margin-left: auto; margin-right: auto;">
        <!-- Section header with radar vibe -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center gap-3 mb-3">
            <span class="block w-10 h-px bg-[--color-hot-pink]/30" />
            <span class="radar-dot" />
            <span class="block w-10 h-px bg-[--color-hot-pink]/30" />
          </div>
          <h3 class="font-[--font-pixel] text-[--color-hot-pink] text-[10px] sm:text-xs tracking-[0.25em]">
            ON OUR RADAR
          </h3>
          <p class="font-[--font-mono] text-[--color-text-muted] text-[11px] mt-2 tracking-wide">
            What's cooking in the lab
          </p>
        </div>

        <!-- Radar-style list -->
        <div class="radar-grid">
          <div
            v-for="(game, i) in upcomingGames"
            :key="game.id"
            class="radar-item group"
            :style="{ animationDelay: `${i * 0.1}s` }"
          >
            <!-- Signal strength indicator -->
            <div class="signal-bars">
              <span class="bar" :class="{ active: i < 5 }" />
              <span class="bar" :class="{ active: i < 3 }" />
              <span class="bar" :class="{ active: i < 1 }" />
            </div>

            <!-- Game info -->
            <div class="flex-1 min-w-0">
              <div class="font-[--font-mono] text-[--color-text] text-sm group-hover:text-[--color-hot-pink] transition-colors">
                {{ game.title }}
              </div>
              <div class="font-[--font-mono] text-[--color-text-muted] text-[11px] mt-0.5">
                {{ game.genre.join(' · ') }}
              </div>
            </div>

            <!-- Release date badge -->
            <span class="font-[--font-mono] text-[--color-hot-pink]/70 text-[10px] shrink-0">
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
  if (count <= 2) return 'grid-cols-1 sm:grid-cols-2'
  return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
})

const gridStyle = computed(() => {
  const count = filteredGames.value.length
  if (count <= 2) return 'max-width: 42rem; margin-left: auto; margin-right: auto;'
  return ''
})
</script>

<style scoped>
/* Radar ping dot */
.radar-dot {
  display: block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-hot-pink);
  box-shadow: 0 0 8px var(--color-hot-pink);
  animation: radar-ping 2s ease-in-out infinite;
}

@keyframes radar-ping {
  0%, 100% { opacity: 1; box-shadow: 0 0 8px var(--color-hot-pink); }
  50% { opacity: 0.5; box-shadow: 0 0 16px var(--color-hot-pink), 0 0 30px rgba(255, 45, 123, 0.2); }
}

/* Radar grid */
.radar-grid {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.radar-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  border-left: 2px solid transparent;
  transition: all 0.2s;
  border-radius: 0 6px 6px 0;
}

.radar-item:hover {
  background: rgba(255, 45, 123, 0.04);
  border-left-color: var(--color-hot-pink);
}

/* Signal bars */
.signal-bars {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  width: 16px;
  height: 14px;
  flex-shrink: 0;
}

.signal-bars .bar {
  width: 3px;
  border-radius: 1px;
  background: var(--color-border);
  transition: background 0.2s;
}

.signal-bars .bar:nth-child(1) { height: 5px; }
.signal-bars .bar:nth-child(2) { height: 9px; }
.signal-bars .bar:nth-child(3) { height: 14px; }

.signal-bars .bar.active {
  background: var(--color-hot-pink);
  opacity: 0.6;
}

.radar-item:hover .signal-bars .bar.active {
  opacity: 1;
}
</style>
