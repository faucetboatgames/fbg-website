<!-- src/components/GameCard.vue -->
<template>
  <div class="game-card" @click="toggleDetails" :class="{ 'is-flipped': showDetails }">
    <div class="card-inner">
      <div class="card-front">
        <div class="card-image">
          <img :src="game.thumbnailUrl" :alt="game.title">
          <div class="card-overlay">
            <h3>{{ game.title }}</h3>
            <div class="card-platforms">
              <span v-for="platform in game.platforms" :key="platform">{{ platform }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="card-back">
        <h3>{{ game.title }}</h3>
        <p>{{ game.description }}</p>
        <div class="game-features">
          <h4>Features</h4>
          <ul>
            <li v-for="feature in game.features" :key="feature">{{ feature }}</li>
          </ul>
        </div>
        <div class="game-meta">
          <div class="game-genres">
            <span v-for="genre in game.genre" :key="genre">{{ genre }}</span>
          </div>
          <div v-if="game.releaseDate" class="release-date">
            Expected: {{ game.releaseDate }}
          </div>
        </div>
        <button class="btn-details">Learn More</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Game } from '@/types/Game'

defineProps<{
  game: Game
}>()

const showDetails = ref(false)

const toggleDetails = () => {
  showDetails.value = !showDetails.value
}
</script>

<style scoped lang="scss">
.game-card {
  perspective: 1000px;
  width: 100%;
  height: 400px;
  cursor: pointer;
  
  &.is-flipped .card-inner {
    transform: rotateY(180deg);
  }
  
  .card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.8s;
    transform-style: preserve-3d;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    border-radius: 12px;
    overflow: hidden;
  }
  
  .card-front,
  .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    overflow: hidden;
  }
  
  .card-front {
    .card-image {
      position: relative;
      width: 100%;
      height: 100%;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }
      
      .card-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 1.5rem;
        background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
        
        h3 {
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
          color: var(--color-text);
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }
        
        .card-platforms {
          display: flex;
          gap: 0.5rem;
          
          span {
            padding: 0.25rem 0.5rem;
            background: rgba(0, 188, 212, 0.7);
            border-radius: 4px;
            font-size: 0.8rem;
          }
        }
      }
    }
    
    &:hover img {
      transform: scale(1.05);
    }
  }
  
  .card-back {
    transform: rotateY(180deg);
    background: linear-gradient(135deg, var(--color-primary), #0D1642);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    
    h3 {
      font-size: 1.8rem;
      margin-bottom: 1rem;
      color: var(--color-secondary);
    }
    
    p {
      margin-bottom: 1.5rem;
      flex-grow: 1;
    }
    
    .game-features {
      margin-bottom: 1.5rem;
      
      h4 {
        color: var(--color-secondary);
        margin-bottom: 0.5rem;
      }
      
      ul {
        list-style: none;
        
        li {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 0.25rem;
          
          &::before {
            content: '•';
            position: absolute;
            left: 0;
            color: var(--color-accent);
          }
        }
      }
    }
    
    .game-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      
      .game-genres {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        
        span {
          padding: 0.25rem 0.5rem;
          background: rgba(255, 82, 82, 0.2);
          border-radius: 4px;
          font-size: 0.8rem;
        }
      }
      
      .release-date {
        font-size: 0.9rem;
        color: var(--color-secondary);
      }
    }
    
    .btn-details {
      align-self: center;
      padding: 0.75rem 1.5rem;
      background-color: var(--color-secondary);
      color: var(--color-text);
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        background-color: var(--color-accent);
        transform: translateY(-2px);
      }
    }
  }
}
</style>
