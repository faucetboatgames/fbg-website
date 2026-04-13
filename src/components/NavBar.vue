<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-[#0a0a1a]/90 backdrop-blur-md border-b border-[--color-border]">
    <div class="max-w-[1200px] mx-auto px-4 flex items-center justify-between h-14">
      <!-- Logo -->
      <a
        href="#hero"
        class="font-[--font-pixel] text-[--color-phosphor] text-[10px] tracking-wider hover:text-[--color-cyan] transition-colors"
        @click.prevent="scrollTo('hero')"
      >
        FBG
      </a>

      <!-- Desktop Links -->
      <div class="hidden md:flex items-center gap-7">
        <a
          v-for="link in navLinks"
          :key="link.id"
          :href="`#${link.id}`"
          class="font-[--font-mono] text-lg transition-all duration-200 relative"
          :class="activeSection === link.id
            ? 'text-[--color-phosphor]'
            : 'text-[--color-text-muted] hover:text-[--color-text]'"
          @click.prevent="scrollTo(link.id)"
        >
          {{ link.label }}
          <span
            v-if="activeSection === link.id"
            class="absolute -bottom-1 left-0 right-0 h-[2px] bg-[--color-phosphor] shadow-[0_0_8px_var(--color-phosphor)]"
          />
        </a>
        <router-link
          to="/press-releases"
          class="font-[--font-mono] text-lg text-[--color-text-muted] hover:text-[--color-amber] transition-colors"
        >
          Updates
        </router-link>
      </div>

      <!-- Mobile Menu -->
      <Sheet v-model:open="mobileMenuOpen">
        <SheetTrigger as-child>
          <button class="md:hidden text-[--color-text] p-2" aria-label="Open menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </SheetTrigger>
        <SheetContent side="right" class="bg-[--color-bg-deep] border-l border-[--color-border] w-64">
          <SheetHeader>
            <SheetTitle class="font-[--font-pixel] text-[--color-phosphor] text-xs">MENU</SheetTitle>
          </SheetHeader>
          <div class="flex flex-col gap-4 mt-8">
            <a
              v-for="link in navLinks"
              :key="link.id"
              :href="`#${link.id}`"
              class="font-[--font-mono] text-xl text-[--color-text] hover:text-[--color-phosphor] transition-colors py-2 border-b border-[--color-border]"
              @click.prevent="scrollTo(link.id); mobileMenuOpen = false"
            >
              {{ link.label }}
            </a>
            <router-link
              to="/press-releases"
              class="font-[--font-mono] text-xl text-[--color-text] hover:text-[--color-amber] transition-colors py-2"
              @click="mobileMenuOpen = false"
            >
              Updates
            </router-link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
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

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) {
    const offset = 56
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}
</script>
