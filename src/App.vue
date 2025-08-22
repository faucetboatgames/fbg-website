<!-- src/App.vue -->
<template>
  <div class="app">
    <router-view />
    
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
              <li><router-link to="/press-releases">📰 Press Releases</router-link></li>
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
        flex-wrap: wrap;
      }
      
      a, router-link {
        color: inherit;
        text-decoration: none;
        transition: color 0.3s ease;
        
        &:hover {
          color: var(--color-accent);
        }
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
