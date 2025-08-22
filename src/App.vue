<!-- src/App.vue -->
<template>
  <div class="app">
    <header>
      <div class="hero">
        <div class="container">
          <div class="logo">
            <img src="@/assets/images/logo.png" alt="Faucet Boat Games" 
                 onerror="this.src='https://placehold.co/200x200/1A237E/ffffff?text=FBG'">
            <h1>Faucet Boat Games</h1>
          </div>
          <p class="tagline">Indie games with a splash of innovation</p>
        </div>
      </div>
    </header>
    
    <main>
      <section class="featured-game">
        <div class="container">
          <div class="featured-content">
            <div class="featured-badge">🎮 Latest Launch</div>
            <h2>Featured Game</h2>
            <h3>{{ gameStore.getFeaturedGame.title }}</h3>
            <p>{{ gameStore.getFeaturedGame.description }}</p>
            <div class="featured-actions">
              <a :href="gameStore.getFeaturedGame.playUrl" class="btn btn-primary" target="_blank">
                🚀 Play Now
              </a>
              <button class="btn btn-secondary">Learn More</button>
            </div>
          </div>
          <div class="featured-image">
            <img :src="gameStore.getFeaturedGame.bannerUrl" :alt="gameStore.getFeaturedGame.title">
          </div>
        </div>
      </section>
      
      <section class="game-sections">
        <div class="container">
          <CollapsibleSection title="🎮 Available to Play" class="launched-section">
            <div class="launched-grid">
              <a v-for="game in gameStore.getLaunchedGames" 
                 :key="game.id" 
                 :href="game.playUrl" 
                 target="_blank" 
                 class="launched-item-link">
                <div class="launched-item">
                  <GameCard :game="game" :showPlayButton="true" />
                </div>
              </a>
            </div>
          </CollapsibleSection>
          
          <CollapsibleSection title="🔧 In Development" class="development-section">
            <div class="development-grid">
              <div v-for="game in gameStore.getDevelopmentGames" :key="game.id" class="development-item">
                <div class="status-badge development">In Development</div>
                <GameCard :game="game" />
              </div>
            </div>
          </CollapsibleSection>
          
          <CollapsibleSection title="🚀 Coming Soon" class="upcoming-section">
            <div class="timeline">
              <div v-for="game in gameStore.getUpcomingGames" :key="game.id" class="timeline-item">
                <div class="timeline-marker">
                  <span class="release-date">{{ game.releaseDate }}</span>
                </div>
                <GameCard :game="game" />
              </div>
            </div>
          </CollapsibleSection>
        </div>
      </section>
      
      <section class="about-studio">
        <div class="container">
          <h2>About Faucet Boat Games</h2>
          <p>We are a passionate indie game studio focused on creating unique gaming experiences that captivate and inspire. Our team combines creativity, technical expertise, and a love for games to craft memorable titles across various genres and platforms.</p>
          <div class="studio-values">
            <div class="value-card">
              <h3>Innovation</h3>
              <p>We strive to bring fresh ideas and mechanics to every game we create.</p>
            </div>
            <div class="value-card">
              <h3>Quality</h3>
              <p>We believe in polished experiences that respect players' time and investment.</p>
            </div>
            <div class="value-card">
              <h3>Community</h3>
              <p>We value player feedback and build games with our community in mind.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
    
    <footer>
      <div class="container">
        <div class="footer-content">
          <div class="footer-logo">
            <img src="@/assets/images/logo.png" alt="Faucet Boat Games" 
                 onerror="this.src='https://placehold.co/100x100/1A237E/ffffff?text=FBG'">
            <p>Faucet Boat Games</p>
          </div>
          <div class="footer-links">
            <h4>Connect With Us</h4>
            <ul>
              <li><a href="#" target="_blank">Twitter</a></li>
              <li><a href="#" target="_blank">Discord</a></li>
              <li><a href="#" target="_blank">Steam</a></li>
              <li><a href="#" target="_blank">Contact</a></li>
            </ul>
          </div>
        </div>
        <div class="copyright">
          <p>&copy; {{ new Date().getFullYear() }} Faucet Boat Games. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore'
import CollapsibleSection from '@/components/CollapsibleSection.vue'
import GameCard from '@/components/GameCard.vue'

const gameStore = useGameStore()
</script>

<style scoped lang="scss">
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.hero {
  padding: 4rem 0;
  text-align: center;
  background: linear-gradient(rgba(26, 35, 126, 0.8), rgba(26, 35, 126, 0.4)), 
              center/cover;
  
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    
    img {
      width: 80px;
      height: 80px;
      margin-right: 1rem;
    }
    
    h1 {
      font-size: 3rem;
      color: var(--color-text);
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    }
  }
  
  .tagline {
    font-size: 1.5rem;
    color: var(--color-secondary);
  }
}

.featured-game {
  padding: 4rem 0;
  background: linear-gradient(135deg, rgba(26, 35, 126, 0.3), rgba(107, 70, 193, 0.2));
  
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: center;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
  
  .featured-content {
    .featured-badge {
      display: inline-block;
      background: linear-gradient(45deg, var(--color-accent), #FF6B6B);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: bold;
      margin-bottom: 1rem;
      animation: pulse 2s infinite;
    }
    
    h2 {
      color: var(--color-secondary);
      margin-bottom: 1rem;
    }
    
    h3 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    
    p {
      margin-bottom: 2rem;
    }
    
    .featured-actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }
  }
  
  .featured-image {
    img {
      width: 100%;
      border-radius: 8px;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
      transition: transform 0.3s ease;
      
      &:hover {
        transform: scale(1.02);
      }
    }
  }
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &.btn-primary {
    background: linear-gradient(45deg, var(--color-accent), #FF6B6B);
    color: white;
    box-shadow: 0 4px 15px rgba(var(--color-accent), 0.4);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(var(--color-accent), 0.6);
    }
  }
  
  &.btn-secondary {
    background: rgba(255, 255, 255, 0.1);
    color: var(--color-text);
    border: 2px solid var(--color-secondary);
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: var(--color-accent);
    }
  }
}

.game-sections {
  padding: 4rem 0;
}

.launched-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
}

.launched-item-link {
  text-decoration: none;
  color: inherit;
  display: block;
  
  .launched-item {
    position: relative;
    transition: transform 0.3s ease;
    cursor: pointer;
    
    &:hover {
      transform: translateY(-5px);
    }
    
    &::before {
      content: '🎮 CLICK TO PLAY';
      position: absolute;
      top: -10px;
      right: -10px;
      background: linear-gradient(45deg, #4CAF50, #8BC34A);
      color: white;
      padding: 0.25rem 0.5rem;
      border-radius: 12px;
      font-size: 0.7rem;
      font-weight: bold;
      z-index: 2;
      animation: bounce 2s infinite;
    }
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, rgba(76, 175, 80, 0.1), rgba(139, 195, 74, 0.1));
      border-radius: 12px;
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }
    
    &:hover::after {
      opacity: 1;
    }
  }
}

.development-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
  
  .development-item {
    position: relative;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
    }
  }
}

.status-badge {
  position: absolute;
  top: -10px;
  right: -10px;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: bold;
  z-index: 2;
  
  &.development {
    background: linear-gradient(45deg, #FF9800, #FFC107);
    color: white;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-5px);
  }
  60% {
    transform: translateY(-3px);
  }
}

.hexagon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
  
  .hexagon-item {
    position: relative;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: translateY(-10px);
    }
    
    &:nth-child(even) {
      margin-top: 2rem;
    }
  }
}

.timeline {
  position: relative;
  padding: 2rem 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 4px;
    background: var(--color-secondary);
    transform: translateX(-50%);
  }
  
  .timeline-item {
    position: relative;
    margin-bottom: 4rem;
    display: flex;
    align-items: center;
    
    &:nth-child(odd) {
      flex-direction: row-reverse;
      
      .timeline-marker {
        left: auto;
        right: -20px;
      }
    }
    
    .timeline-marker {
      position: absolute;
      left: -20px;
      width: 40px;
      height: 40px;
      background: var(--color-accent);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
      
      .release-date {
        font-size: 0.8rem;
        font-weight: bold;
        color: var(--color-text);
      }
    }
  }
}

.about-studio {
  padding: 4rem 0;
  background: rgba(0, 0, 0, 0.2);
  text-align: center;
  
  h2 {
    margin-bottom: 2rem;
    color: var(--color-secondary);
  }
  
  p {
    max-width: 800px;
    margin: 0 auto 3rem;
  }
  
  .studio-values {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    
    .value-card {
      background: rgba(26, 35, 126, 0.2);
      padding: 2rem;
      border-radius: 8px;
      transition: transform 0.3s ease;
      
      &:hover {
        transform: translateY(-5px);
        background: rgba(26, 35, 126, 0.3);
      }
      
      h3 {
        color: var(--color-secondary);
        margin-bottom: 1rem;
      }
    }
  }
}

footer {
  background: rgba(0, 0, 0, 0.4);
  padding: 3rem 0 1rem;
  margin-top: auto;
  
  .footer-content {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
  }
  
  .footer-logo {
    display: flex;
    align-items: center;
    
    img {
      width: 50px;
      height: 50px;
      margin-right: 1rem;
    }
    
    p {
      font-size: 1.2rem;
      font-weight: bold;
    }
  }
  
  .footer-links {
    h4 {
      margin-bottom: 1rem;
      color: var(--color-secondary);
    }
    
    ul {
      list-style: none;
      display: flex;
      gap: 1.5rem;
      
      @media (max-width: 768px) {
        justify-content: center;
      }
    }
  }
  
  .copyright {
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 0.9rem;
    opacity: 0.7;
  }
}
</style>
