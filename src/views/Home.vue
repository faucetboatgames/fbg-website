<template>
  <div>
    <HeroSection />
    <div class="section-divider" />
    <WakeWeaverSection @wakeweaver-click="onWakeWeaverClick" />
    <div class="section-divider" />
    <SoulRangerSection />
    <div class="section-divider" />
    <GamesSection />
    <div class="section-divider" />
    <NewsSection />
    <div class="section-divider" />
    <AboutSection />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { usePressReleaseStore } from '@/stores/pressReleaseStore'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { useAchievements } from '@/composables/useAchievements'

import HeroSection from '@/components/HeroSection.vue'
import WakeWeaverSection from '@/components/WakeWeaverSection.vue'
import GamesSection from '@/components/GamesSection.vue'
import SoulRangerSection from '@/components/SoulRangerSection.vue'
import NewsSection from '@/components/NewsSection.vue'
import AboutSection from '@/components/AboutSection.vue'

const pressReleaseStore = usePressReleaseStore()
const { unlock } = useAchievements()

useScrollAnimation()

onMounted(async () => {
  await pressReleaseStore.loadReleases()

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) unlock('explorer')
    },
    { threshold: 0.5 }
  )
  const about = document.getElementById('about')
  if (about) observer.observe(about)
})

function onWakeWeaverClick() {
  unlock('curious')
}
</script>

<style scoped>
.section-divider {
  position: relative;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.section-divider::before {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: min(80%, 500px);
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(0, 240, 255, 0.15) 20%,
    rgba(51, 255, 51, 0.1) 50%,
    rgba(0, 240, 255, 0.15) 80%,
    transparent 100%
  );
}

.section-divider::after {
  content: '';
  position: relative;
  width: 6px;
  height: 6px;
  background: rgba(0, 240, 255, 0.2);
  transform: rotate(45deg);
  z-index: 1;
}
</style>
