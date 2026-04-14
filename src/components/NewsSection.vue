<template>
  <section id="news" class="py-16 md:py-24" v-if="latestRelease">
    <div style="max-width: 700px; margin-left: auto; margin-right: auto; padding-left: 1rem; padding-right: 1rem;">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8 animate-on-scroll">
        <div>
          <span class="font-[--font-mono] text-[--color-amber]/60 text-xs tracking-[0.3em] uppercase block mb-2">
            // latest
          </span>
          <h2
            class="font-[--font-pixel] text-[--color-amber] text-base sm:text-lg"
            style="text-shadow: 0 0 12px rgba(255, 179, 0, 0.3);"
          >
            UPDATES
          </h2>
        </div>
        <router-link
          to="/press-releases"
          class="font-[--font-mono] text-[--color-text-muted] text-sm hover:text-[--color-amber] transition-colors flex items-center gap-1.5"
        >
          View All
          <svg class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
          </svg>
        </router-link>
      </div>

      <!-- News card -->
      <div class="animate-on-scroll p-6 sm:p-7 bg-[--color-bg-surface] border border-[--color-border] rounded-xl hover:border-[--color-amber]/25 transition-all duration-300 group">
        <div class="font-[--font-mono] text-[--color-amber]/70 text-sm mb-3">
          [{{ formatDate(latestRelease.date) }}]
        </div>
        <h3 class="font-[--font-body] text-[--color-text] text-lg sm:text-xl font-bold mb-3 leading-snug group-hover:text-[--color-amber] transition-colors">
          {{ latestRelease.title }}
        </h3>
        <p v-if="latestRelease.summary" class="text-[--color-text-muted] text-sm sm:text-base mb-5 leading-relaxed">
          {{ latestRelease.summary }}
        </p>
        <router-link
          to="/press-releases"
          class="font-[--font-mono] text-[--color-amber] text-sm hover:text-[--color-phosphor] transition-colors inline-flex items-center gap-1.5"
        >
          Read Full Release
          <svg class="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
          </svg>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePressReleaseStore } from '@/stores/pressReleaseStore'

const pressReleaseStore = usePressReleaseStore()
const latestRelease = computed(() => pressReleaseStore.getLatestRelease)

function formatDate(dateString: string) {
  const d = new Date(dateString)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}
</script>
