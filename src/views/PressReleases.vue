<template>
  <div class="min-h-screen bg-[--color-bg-deep]">
    <!-- Header -->
    <header class="py-8 border-b border-[--color-border]">
      <div class="max-w-[1000px] mx-auto px-4">
        <router-link
          to="/"
          class="font-[--font-mono] text-[--color-text-muted] text-sm hover:text-[--color-phosphor] transition-colors inline-flex items-center gap-1 mb-6 block"
        >
          <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" />
          </svg>
          Back to Home
        </router-link>
        <div class="flex items-center gap-4">
          <img
            src="@/assets/images/logo.png"
            alt="FBG"
            class="w-12 h-12 opacity-80"
            onerror="this.style.display='none'"
          >
          <div>
            <h1 class="font-[--font-pixel] text-[--color-amber] text-base sm:text-lg leading-relaxed"
                style="text-shadow: 0 0 12px rgba(255, 179, 0, 0.3);">
              UPDATES
            </h1>
            <p class="font-[--font-mono] text-[--color-text-muted] text-sm mt-1">
              News, announcements, and dev logs from Faucet Boat Games
            </p>
          </div>
        </div>
      </div>
    </header>

    <!-- Content -->
    <main class="py-8">
      <div class="max-w-[1000px] mx-auto px-4 space-y-6">
        <div
          v-for="release in pressReleaseStore.getPublishedReleases"
          :key="release.id"
          class="bg-[--color-bg-surface] border rounded-lg overflow-hidden transition-all duration-300"
          :class="expandedReleases.has(release.id)
            ? 'border-[--color-amber]/40 shadow-[0_0_15px_rgba(255,179,0,0.1)]'
            : 'border-[--color-border] hover:border-[--color-border] hover:translate-y-[-2px]'"
        >
          <!-- Release header (clickable) -->
          <div
            class="p-6 cursor-pointer hover:bg-white/[0.02] transition-colors"
            @click="toggleRelease(release.id)"
          >
            <div class="flex items-center gap-3 mb-3">
              <span class="font-[--font-mono] text-[--color-amber] text-sm">
                [{{ formatDate(release.date) }}]
              </span>
              <Badge
                v-if="release.featured"
                class="bg-[--color-amber]/15 text-[--color-amber] border-[--color-amber]/30 font-[--font-mono] text-[10px]"
              >
                FEATURED
              </Badge>
            </div>
            <h2 class="font-[--font-body] text-[--color-text] text-xl font-bold mb-2 leading-snug">
              {{ release.title }}
            </h2>
            <p v-if="release.summary" class="text-[--color-text-muted] text-sm leading-relaxed mb-3">
              {{ release.summary }}
            </p>
            <span class="font-[--font-mono] text-[--color-cyan] text-sm inline-flex items-center gap-1">
              <span v-if="expandedReleases.has(release.id)">&#9660; Collapse</span>
              <span v-else>&#9654; Read Full Release</span>
            </span>
          </div>

          <!-- Expanded content -->
          <div
            v-if="expandedReleases.has(release.id)"
            class="border-t border-[--color-border] p-6 release-content"
            v-html="formatContent(release.content)"
          />
        </div>

        <!-- Empty state -->
        <div v-if="pressReleaseStore.getPublishedReleases.length === 0" class="text-center py-16">
          <h2 class="font-[--font-pixel] text-[--color-text-muted] text-sm mb-3">NO RELEASES YET</h2>
          <p class="font-[--font-mono] text-[--color-text-muted] text-sm">Check back soon for updates.</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePressReleaseStore } from '@/stores/pressReleaseStore'
import { Badge } from '@/components/ui/badge'

const pressReleaseStore = usePressReleaseStore()
const expandedReleases = ref<Set<string>>(new Set())

onMounted(async () => {
  await pressReleaseStore.loadReleases()
  const latestRelease = pressReleaseStore.getLatestRelease
  if (latestRelease) {
    expandedReleases.value.add(latestRelease.id)
  }
})

function toggleRelease(releaseId: string) {
  if (expandedReleases.value.has(releaseId)) {
    expandedReleases.value.delete(releaseId)
  } else {
    expandedReleases.value.add(releaseId)
  }
}

function formatDate(dateString: string) {
  const d = new Date(dateString)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

function formatContent(content: string) {
  return content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="press-link">$1</a>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/👉 (.*$)/gim, '<div class="call-to-action">$1</div>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(.*)$/gim, '<p>$1</p>')
    .replace(/<p><h([1-6])>/g, '<h$1>')
    .replace(/<\/h([1-6])><\/p>/g, '</h$1>')
    .replace(/<p><div/g, '<div')
    .replace(/<\/div><\/p>/g, '</div>')
}
</script>

<style>
.release-content {
  font-family: var(--font-body);
  line-height: 1.7;
  color: var(--color-text-muted);
}

.release-content h1 {
  font-family: var(--font-pixel);
  color: var(--color-amber);
  font-size: 1rem;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.release-content h2 {
  font-family: var(--font-body);
  color: var(--color-cyan);
  font-size: 1.2rem;
  margin: 2rem 0 0.75rem;
  font-weight: 700;
}

.release-content p {
  margin-bottom: 0.75rem;
}

.release-content strong {
  color: var(--color-amber);
}

.release-content em {
  color: var(--color-cyan);
}

.release-content .press-link {
  color: var(--color-cyan);
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: color 0.2s;
}

.release-content .press-link:hover {
  color: var(--color-phosphor);
}

.release-content .call-to-action {
  background: rgba(0, 240, 255, 0.05);
  border-left: 3px solid var(--color-cyan);
  padding: 0.75rem 1rem;
  margin: 1rem 0;
  border-radius: 0 4px 4px 0;
  font-family: var(--font-mono);
}
</style>
