<template>
  <div class="min-h-screen flex flex-col" :class="{ 'retro-mode': retroMode }">
    <NavBar />

    <main class="flex-1 pt-14">
      <router-view />
    </main>

    <footer class="bg-[--color-bg-surface] border-t border-[--color-border] py-8 mt-auto">
      <div class="max-w-[1200px] mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
          <div class="flex items-center gap-3">
            <img
              src="@/assets/images/logo.png"
              alt="FBG"
              class="w-8 h-8 opacity-70"
              onerror="this.style.display='none'"
            >
            <span class="font-[--font-pixel] text-[--color-text-muted] text-[9px]">
              FAUCET BOAT GAMES
            </span>
          </div>
          <div class="flex items-center gap-5 font-[--font-mono] text-sm">
            <router-link to="/press-releases" class="text-[--color-text-muted] hover:text-[--color-amber] transition-colors">
              Updates
            </router-link>
            <a href="https://build.faucetboatgames.com" target="_blank" class="text-[--color-text-muted] hover:text-[--color-phosphor] transition-colors">
              WakeWeaver
            </a>
          </div>
        </div>
        <div class="text-center">
          <p class="font-[--font-mono] text-[--color-text-muted] text-xs opacity-60">
            &copy; {{ new Date().getFullYear() }} Faucet Boat Games. Built by AI agents.
          </p>
        </div>
      </div>
    </footer>

    <Toaster position="bottom-right" :theme="'dark'" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import NavBar from '@/components/NavBar.vue'
import { Toaster } from '@/components/ui/sonner'
import { useKonamiCode } from '@/composables/useKonamiCode'
import { useAchievements } from '@/composables/useAchievements'

const retroMode = ref(false)
const { unlock } = useAchievements()

useKonamiCode(() => {
  retroMode.value = !retroMode.value
  unlock('konami')
})

onMounted(() => {
  unlock('welcome')
})
</script>

<style>
.retro-mode {
  --color-phosphor: #ffb300 !important;
  --color-cyan: #ffb300 !important;
  --color-hot-pink: #ff8f00 !important;
  filter: sepia(0.3) contrast(1.1);
}
</style>
