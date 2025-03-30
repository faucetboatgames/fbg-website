<!-- src/components/GameGrid.vue -->
<template>
  <div class="game-grid">
    <GameCard v-for="game in games" :key="game.id" :game="game" />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { Game } from '@/types/Game'
import GameCard from './GameCard.vue'

defineProps<{
  games: Game[]
}>()
</script>

<style scoped lang="scss">
.game-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
</style>
