<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="scrolled ? 'nav-scrolled' : 'nav-top'"
  >
    <!-- Scanline overlay -->
    <div v-if="scrolled" class="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.03)_0px,rgba(0,0,0,0.03)_1px,transparent_1px,transparent_3px)] pointer-events-none" />

    <div class="max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center h-14 relative">
      <!-- Logo + Brand -->
      <a
        href="#hero"
        class="flex items-center gap-2.5 group shrink-0"
        @click.prevent="scrollTo('hero')"
      >
        <img
          src="@/assets/images/logo.png"
          alt="FBG"
          class="w-8 h-8 rounded-md transition-all duration-300 group-hover:scale-110"
          :class="scrolled ? 'nav-logo-glow' : 'opacity-90'"
        >
        <span class="font-[--font-pixel] text-[--color-phosphor] text-[9px] tracking-[0.2em] transition-colors group-hover:text-[--color-cyan]">
          FBG
        </span>
      </a>

      <!-- Desktop Links — centered -->
      <div class="hidden md:flex items-center gap-6 flex-1 justify-center">
        <a
          v-for="link in navLinks"
          :key="link.id"
          :href="`#${link.id}`"
          class="font-[--font-mono] text-sm tracking-wide py-1 transition-all duration-200 relative"
          :class="activeSection === link.id
            ? 'text-[--color-phosphor]'
            : 'text-[--color-text-muted] hover:text-[--color-text]'"
          @click.prevent="scrollTo(link.id)"
        >
          {{ link.label }}
          <span
            class="absolute -bottom-1 left-0 right-0 h-[2px] transition-all duration-200"
            :class="activeSection === link.id
              ? 'bg-[--color-phosphor] shadow-[0_0_8px_var(--color-phosphor)] opacity-100'
              : 'opacity-0'"
          />
        </a>
        <router-link
          to="/press-releases"
          class="font-[--font-mono] text-sm tracking-wide py-1 text-[--color-text-muted] hover:text-[--color-amber] transition-all duration-200"
        >
          Updates
        </router-link>
      </div>

      <!-- Spacer to balance the logo on the left -->
      <div class="hidden md:block shrink-0" style="width: 70px;" />

      <!-- Mobile Menu -->
      <Sheet v-model:open="mobileMenuOpen">
        <SheetTrigger as-child>
          <button class="md:hidden text-[--color-text] p-2 rounded hover:bg-white/[0.05] transition-colors" aria-label="Open menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="16" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
        </SheetTrigger>
        <SheetContent side="right" class="bg-[--color-bg-deep] border-l border-[--color-border] w-72">
          <SheetHeader>
            <SheetTitle class="flex items-center gap-2">
              <img src="@/assets/images/logo.png" alt="FBG" class="w-6 h-6 rounded">
              <span class="font-[--font-pixel] text-[--color-phosphor] text-[9px] tracking-[0.2em]">NAVIGATE</span>
            </SheetTitle>
          </SheetHeader>
          <div class="flex flex-col gap-1 mt-8">
            <a
              v-for="link in navLinks"
              :key="link.id"
              :href="`#${link.id}`"
              class="font-[--font-mono] text-base tracking-wide px-3 py-3 rounded-lg transition-all duration-200 flex items-center gap-3"
              :class="activeSection === link.id
                ? 'text-[--color-phosphor] bg-[--color-phosphor]/[0.08]'
                : 'text-[--color-text] hover:text-[--color-phosphor] hover:bg-white/[0.03]'"
              @click.prevent="scrollTo(link.id); mobileMenuOpen = false"
            >
              <span
                class="inline-block w-2 h-2 rounded-full"
                :class="activeSection === link.id
                  ? 'bg-[--color-phosphor] shadow-[0_0_6px_var(--color-phosphor)]'
                  : 'bg-[--color-border]'"
              />
              {{ link.label }}
            </a>
            <div class="h-px bg-[--color-border] my-2 mx-3" />
            <router-link
              to="/press-releases"
              class="font-[--font-mono] text-base tracking-wide text-[--color-text] hover:text-[--color-amber] hover:bg-[--color-amber]/[0.06] transition-all duration-200 px-3 py-3 rounded-lg flex items-center gap-3"
              @click="mobileMenuOpen = false"
            >
              <svg class="w-4 h-4 opacity-50" viewBox="0 0 16 16" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h10a1 1 0 011 1v1H2V3zm0 3v7a1 1 0 001 1h10a1 1 0 001-1V6H2zm3 2h6v1H5V8zm0 3h4v1H5v-1z"/>
              </svg>
              Updates
            </router-link>
          </div>
          <!-- Bottom decoration -->
          <div class="absolute bottom-6 left-6 right-6">
            <div class="h-px bg-[--color-border] mb-3" />
            <p class="font-[--font-mono] text-[9px] text-[--color-text-muted] tracking-wider text-center opacity-40">
              BUILT BY AI AGENTS
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </div>

    <!-- Bottom glow line -->
    <div
      class="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-300"
      :class="scrolled ? 'opacity-100' : 'opacity-0'"
      style="background: linear-gradient(90deg, transparent, var(--color-phosphor), var(--color-cyan), var(--color-phosphor), transparent); opacity: 0.3;"
    />
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useActiveSection } from '@/composables/useActiveSection'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

const navLinks = [
  { id: 'wakeweaver', label: 'WakeWeaver' },
  { id: 'games', label: 'Games' },
  { id: 'about', label: 'About' },
]

const { activeSection } = useActiveSection(['hero', ...navLinks.map((l) => l.id)])
const mobileMenuOpen = ref(false)
const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 40
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) {
    const offset = 56
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}
</script>

<style scoped>
.nav-top {
  background: transparent;
}

.nav-scrolled {
  background: rgba(10, 10, 26, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.nav-logo-glow {
  filter: drop-shadow(0 0 8px rgba(51, 255, 51, 0.25));
}

.nav-link {
  position: relative;
}
</style>
