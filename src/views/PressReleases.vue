<template>
  <div class="press-releases">
    <header class="press-header">
      <div class="container">
        <div class="header-content">
          <router-link to="/" class="back-link">← Back to Home</router-link>
          <div class="logo-section">
            <img src="@/assets/images/logo.png" alt="Faucet Boat Games" 
                 onerror="this.src='https://placehold.co/60x60/1A237E/ffffff?text=FBG'">
            <div>
              <h1>📰 Press Releases</h1>
              <p class="subtitle">Latest news and announcements from Faucet Boat Games</p>
            </div>
          </div>
        </div>
      </div>
    </header>
    
    <main class="press-content">
      <div class="container">
        <div class="releases-list">
          <div 
            v-for="(release, index) in pressReleaseStore.getPublishedReleases" 
            :key="release.id" 
            class="release-item"
            :class="{ 'expanded': expandedReleases.has(release.id) }"
          >
            <div class="release-header" @click="toggleRelease(release.id)">
              <div class="release-meta">
                <div class="release-date">📅 {{ formatDate(release.date) }}</div>
                <div v-if="release.featured" class="featured-badge">⭐ Featured</div>
              </div>
              <h2 class="release-title">{{ release.title }}</h2>
              <p v-if="release.summary" class="release-summary">{{ release.summary }}</p>
              <div class="expand-indicator">
                <span v-if="expandedReleases.has(release.id)">▼ Collapse</span>
                <span v-else>▶ Read Full Release</span>
              </div>
            </div>
            
            <div v-if="expandedReleases.has(release.id)" class="release-content">
              <div class="content-wrapper" v-html="formatContent(release.content)"></div>
            </div>
          </div>
        </div>
        
        <div v-if="pressReleaseStore.getPublishedReleases.length === 0" class="no-releases">
          <h2>🔄 More news coming soon!</h2>
          <p>We're working on exciting updates. Check back later for the latest announcements.</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePressReleaseStore } from '@/stores/pressReleaseStore'

const pressReleaseStore = usePressReleaseStore()
const expandedReleases = ref<Set<string>>(new Set())

onMounted(() => {
  // Auto-expand the first (latest) release
  const latestRelease = pressReleaseStore.getLatestRelease
  if (latestRelease) {
    expandedReleases.value.add(latestRelease.id)
  }
})

const toggleRelease = (releaseId: string) => {
  if (expandedReleases.value.has(releaseId)) {
    expandedReleases.value.delete(releaseId)
  } else {
    expandedReleases.value.add(releaseId)
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatContent = (content: string) => {
  // Convert markdown-style formatting to HTML
  return content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="press-link">$1</a>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/👉 (.*$)/gim, '<div class="call-to-action">👉 $1</div>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(.*)$/gim, '<p>$1</p>')
    .replace(/<p><h([1-6])>/g, '<h$1>')
    .replace(/<\/h([1-6])><\/p>/g, '</h$1>')
    .replace(/<p><div/g, '<div')
    .replace(/<\/div><\/p>/g, '</div>')
}
</script>

<style scoped lang="scss">
.press-releases {
  min-height: 100vh;
  background: linear-gradient(135deg, #1A237E 0%, #3949AB 50%, #5E35B1 100%);
  color: var(--color-text, white);
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1rem;
}

.press-header {
  padding: 2rem 0;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
  
  .header-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .back-link {
    color: var(--color-secondary, #B39DDB);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    transition: color 0.3s ease;
    
    &:hover {
      color: var(--color-accent, #7C4DFF);
    }
  }
  
  .logo-section {
    display: flex;
    align-items: center;
    gap: 1rem;
    
    img {
      width: 60px;
      height: 60px;
      border-radius: 8px;
    }
    
    h1 {
      margin: 0;
      font-size: 2.5rem;
      background: linear-gradient(45deg, #FFD700, #FFA500);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .subtitle {
      margin: 0.5rem 0 0 0;
      opacity: 0.8;
      font-size: 1.1rem;
    }
  }
}

.press-content {
  padding: 3rem 0;
}

.releases-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.release-item {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  }
  
  &.expanded {
    background: rgba(255, 255, 255, 0.15);
    border-color: var(--color-accent, #7C4DFF);
  }
}

.release-header {
  padding: 2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  
  .release-meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    
    .release-date {
      color: var(--color-secondary, #B39DDB);
      font-size: 0.9rem;
      font-weight: 500;
    }
    
    .featured-badge {
      background: linear-gradient(45deg, #FFD700, #FFA500);
      color: #1A237E;
      padding: 0.25rem 0.75rem;
      border-radius: 15px;
      font-size: 0.8rem;
      font-weight: bold;
      animation: pulse 2s infinite;
    }
  }
  
  .release-title {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
    line-height: 1.3;
  }
  
  .release-summary {
    margin: 0 0 1rem 0;
    opacity: 0.8;
    line-height: 1.5;
  }
  
  .expand-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--color-accent, #7C4DFF);
    font-weight: 500;
    font-size: 0.9rem;
  }
}

.release-content {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  .content-wrapper {
    padding: 2rem;
    line-height: 1.7;
    
    :deep(h1) {
      color: #FFD700;
      margin-bottom: 1rem;
      font-size: 2rem;
    }
    
    :deep(h2) {
      color: var(--color-secondary, #B39DDB);
      margin: 2rem 0 1rem 0;
      font-size: 1.4rem;
    }
    
    :deep(p) {
      margin-bottom: 1rem;
    }
    
    :deep(.call-to-action) {
      background: rgba(124, 77, 255, 0.2);
      border-left: 4px solid var(--color-accent, #7C4DFF);
      padding: 1rem;
      margin: 1.5rem 0;
      border-radius: 4px;
      font-weight: 500;
    }
    
    :deep(strong) {
      color: #FFD700;
    }
    
    :deep(em) {
      color: var(--color-secondary, #B39DDB);
    }
    
    :deep(.press-link) {
      color: var(--color-accent, #7C4DFF);
      text-decoration: underline;
      cursor: pointer;
      transition: color 0.3s ease;
      
      &:hover {
        color: #FFD700;
      }
    }
  }
}

.no-releases {
  text-align: center;
  padding: 4rem 2rem;
  
  h2 {
    color: var(--color-secondary, #B39DDB);
    margin-bottom: 1rem;
  }
  
  p {
    opacity: 0.8;
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

@media (max-width: 768px) {
  .press-header .logo-section {
    flex-direction: column;
    text-align: center;
    
    h1 {
      font-size: 2rem;
    }
  }
  
  .release-header {
    padding: 1.5rem;
    
    .release-title {
      font-size: 1.3rem;
    }
  }
  
  .release-content .content-wrapper {
    padding: 1.5rem;
  }
}
</style>