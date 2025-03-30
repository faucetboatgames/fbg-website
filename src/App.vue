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
            <h2>Featured Game</h2>
            <h3>{{ gameStore.getCurrentGames[0].title }}</h3>
            <p>{{ gameStore.getCurrentGames[0].description }}</p>
            <button class="btn">Learn More</button>
          </div>
          <div class="featured-image">
            <img :src="gameStore.getCurrentGames[0].bannerUrl" :alt="gameStore.getCurrentGames[0].title">
          </div>
        </div>
      </section>
      
      <section class="game-sections">
        <div class="container">
          <CollapsibleSection title="Current Games">
            <div class="hexagon-grid">
              <div v-for="game in gameStore.getCurrentGames" :key="game.id" class="hexagon-item">
                <GameCard :game="game" />
              </div>
            </div>
          </CollapsibleSection>
          
          <CollapsibleSection title="Upcoming Games">
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
              url('https://placehold.co/1920x1080/1A237E/ffffff?text=Faucet+Boat+Games') center/cover;
  
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
  background: rgba(0, 0, 0, 0.2);
  
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
  }
  
  .featured-image {
    img {
      width: 100%;
      border-radius: 8px;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    }
  }
}

.game-sections {
  padding: 4rem 0;
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
