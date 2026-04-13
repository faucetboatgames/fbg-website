<template>
  <div class="game-card group w-full rounded-xl overflow-hidden relative">
    <div class="relative w-full rounded-xl overflow-hidden">
      <!-- Front face only -->
      <div class="relative w-full aspect-[4/3] overflow-hidden rounded-xl">
        <img
          :src="game.thumbnailUrl"
          :alt="game.title"
          class="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
        >
        <!-- Scanline overlay on hover -->
        <div class="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.04)_0px,rgba(0,0,0,0.04)_1px,transparent_1px,transparent_3px)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <!-- Gradient overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <!-- Content -->
        <div class="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
          <h3 class="font-[--font-pixel] text-white text-[10px] sm:text-xs mb-2 leading-[1.8] drop-shadow-lg">
            {{ game.title }}
          </h3>
          <div class="flex gap-1.5 flex-wrap">
            <span
              v-for="platform in game.platforms.slice(0, 3)"
              :key="platform"
              class="text-[9px] font-[--font-mono] px-1.5 py-0.5 bg-white/10 text-white/80 backdrop-blur-sm rounded"
            >
              {{ platform }}
            </span>
          </div>
        </div>

        <!-- Status badge -->
        <div
          class="absolute top-3 right-3 font-[--font-mono] text-[9px] sm:text-[10px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-md border backdrop-blur-sm"
          :class="statusClasses"
        >
          {{ statusLabel }}
        </div>
      </div>
    </div>

    <!-- Hover glow border -->
    <div class="absolute inset-0 rounded-xl pointer-events-none transition-all duration-500 opacity-0 group-hover:opacity-100" :class="glowClass" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Game } from '@/types/Game'

const props = defineProps<{
  game: Game
  showPlayButton?: boolean
}>()

const statusLabel = computed(() => {
  switch (props.game.status) {
    case 'launched': return 'LIVE'
    case 'development': return 'DEV'
    case 'upcoming': return 'SOON'
    default: return ''
  }
})

const statusClasses = computed(() => {
  switch (props.game.status) {
    case 'launched':
      return 'bg-[--color-phosphor]/15 text-[--color-phosphor] border-[--color-phosphor]/30'
    case 'development':
      return 'bg-[--color-amber]/15 text-[--color-amber] border-[--color-amber]/30'
    case 'upcoming':
      return 'bg-[--color-hot-pink]/15 text-[--color-hot-pink] border-[--color-hot-pink]/30'
    default: return ''
  }
})

const glowClass = computed(() => {
  switch (props.game.status) {
    case 'launched':
      return 'shadow-[inset_0_0_0_1px_rgba(51,255,51,0.3),0_0_20px_rgba(51,255,51,0.08)]'
    case 'development':
      return 'shadow-[inset_0_0_0_1px_rgba(255,179,0,0.3),0_0_20px_rgba(255,179,0,0.08)]'
    default:
      return 'shadow-[inset_0_0_0_1px_rgba(0,240,255,0.3),0_0_20px_rgba(0,240,255,0.08)]'
  }
})
</script>
