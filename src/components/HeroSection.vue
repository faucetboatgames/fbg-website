<template>
  <section id="hero" class="relative min-h-[80vh] md:min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Starfield background -->
    <div class="absolute inset-0">
      <div
        v-for="i in 60"
        :key="`star-${i}`"
        class="absolute rounded-full bg-white"
        :style="{
          width: `${1 + (i % 3)}px`,
          height: `${1 + (i % 3)}px`,
          left: `${(i * 37 + 13) % 100}%`,
          top: `${(i * 53 + 7) % 100}%`,
          opacity: 0.1 + (i % 7) * 0.06,
          animation: `star-twinkle ${2 + (i % 4)}s ease-in-out infinite`,
          animationDelay: `${i * 0.15}s`,
        }"
      />
    </div>

    <!-- Drifting grid floor (perspective) -->
    <div class="absolute inset-0 hero-grid-perspective" />

    <!-- Vertical light streaks -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        v-for="i in 5"
        :key="`streak-${i}`"
        class="absolute w-px h-full opacity-[0.04]"
        :style="{
          left: `${15 + i * 17}%`,
          background: `linear-gradient(to bottom, transparent, ${i % 2 === 0 ? 'var(--color-phosphor)' : 'var(--color-cyan)'}, transparent)`,
          animation: `light-streak ${6 + i * 2}s ease-in-out infinite`,
          animationDelay: `${i * 1.5}s`,
        }"
      />
    </div>

    <!-- CRT vignette edges -->
    <div class="absolute inset-0 pointer-events-none hero-vignette" />

    <!-- Ambient cabinet glow -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[--color-phosphor]/[0.03] rounded-full blur-[150px] pointer-events-none" />
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-[--color-hot-pink]/[0.02] rounded-full blur-[120px] pointer-events-none" />

    <!-- Content -->
    <div class="relative z-10 text-center px-6 max-w-3xl mx-auto">
      <!-- Logo with neon halo -->
      <div class="mb-6 sm:mb-8 relative inline-block">
        <div class="absolute inset-0 scale-150 bg-[--color-phosphor]/[0.06] rounded-full blur-[40px]" />
        <img
          src="@/assets/images/logo.png"
          alt="Faucet Boat Games"
          class="relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 mx-auto rounded-2xl logo-glow"
          onerror="this.style.display='none'"
        >
      </div>

      <!-- Neon sign title -->
      <h1
        class="font-[--font-pixel] text-[--color-phosphor] text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2 leading-[1.8] tracking-wider neon-sign"
      >
        FAUCET BOAT GAMES
      </h1>

      <!-- Decorative underline bar -->
      <div class="flex items-center justify-center gap-2 mb-6 sm:mb-8">
        <span class="block w-8 sm:w-12 h-px bg-[--color-hot-pink]/50" />
        <span class="block w-2 h-2 rotate-45 border border-[--color-hot-pink]/60" />
        <span class="block w-8 sm:w-12 h-px bg-[--color-hot-pink]/50" />
      </div>

      <!-- Tagline with cycling word -->
      <p class="font-[--font-mono] text-[--color-text] text-xl sm:text-2xl md:text-3xl mb-8 sm:mb-10 leading-relaxed tracking-wide">
        Games built by AI.<br class="sm:hidden"> Played by <span class="text-[--color-cyan] inline-block min-w-[2ch]">{{ displayText }}<span class="inline-block w-[2px] h-[1em] bg-[--color-cyan] align-middle ml-[1px]" :class="showCursor ? 'opacity-100' : 'opacity-0'" /></span>
      </p>

      <!-- INSERT COIN prompt -->
      <div class="insert-coin-wrap">
        <button
          class="insert-coin font-[--font-pixel] text-[--color-amber] text-[10px] sm:text-xs tracking-[0.3em] bg-transparent border-none cursor-pointer hover:text-[--color-phosphor] transition-colors"
          @click="pressStart"
        >
          PRESS START
        </button>
      </div>

      <!-- Coin slot decoration -->
      <div class="mt-6 flex items-center justify-center">
        <div class="coin-slot">
          <div class="coin-slot-inner" />
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
      <span class="font-[--font-mono] text-[--color-text-muted] text-[10px] tracking-widest uppercase">scroll</span>
      <svg
        class="w-4 h-4 text-[--color-phosphor]"
        style="animation: scroll-down 2s ease-in-out infinite;"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

function pressStart() {
  const el = document.getElementById('wakeweaver')
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 56
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

const words = ['humans.', 'you.', 'robots.', 'legends.', 'insomniacs.', 'AI... wait.']
const displayText = ref('')
const showCursor = ref(true)
let wordIndex = 0
let charIndex = 0
let isDeleting = false
let timeout: ReturnType<typeof setTimeout> | null = null
let cursorInterval: ReturnType<typeof setInterval> | null = null

function tick() {
  const currentWord = words[wordIndex]

  if (!isDeleting) {
    displayText.value = currentWord.slice(0, charIndex + 1)
    charIndex++

    if (charIndex >= currentWord.length) {
      // Pause at full word
      timeout = setTimeout(() => {
        isDeleting = true
        tick()
      }, 2000)
      return
    }
    timeout = setTimeout(tick, 80 + Math.random() * 60)
  } else {
    displayText.value = currentWord.slice(0, charIndex)
    charIndex--

    if (charIndex <= 0) {
      isDeleting = false
      let next = Math.floor(Math.random() * words.length)
      while (next === wordIndex && words.length > 1) next = Math.floor(Math.random() * words.length)
      wordIndex = next
      charIndex = 0
      timeout = setTimeout(tick, 400)
      return
    }
    timeout = setTimeout(tick, 40 + Math.random() * 30)
  }
}

onMounted(() => {
  // Start typing after a short delay
  timeout = setTimeout(tick, 1500)
  // Cursor blink
  cursorInterval = setInterval(() => {
    showCursor.value = !showCursor.value
  }, 530)
})

onUnmounted(() => {
  if (timeout) clearTimeout(timeout)
  if (cursorInterval) clearInterval(cursorInterval)
})
</script>

<style scoped>
/* Perspective grid floor - like looking down at an arcade floor */
.hero-grid-perspective {
  background-image:
    linear-gradient(rgba(51, 255, 51, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(51, 255, 51, 0.04) 1px, transparent 1px);
  background-size: 40px 40px;
  transform: perspective(400px) rotateX(45deg) scale(2.5);
  transform-origin: center bottom;
  mask-image: linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%);
  -webkit-mask-image: linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%);
  animation: grid-scroll 20s linear infinite;
}

@keyframes grid-scroll {
  from { background-position: 0 0; }
  to { background-position: 0 40px; }
}

/* Neon sign effect on title */
.neon-sign {
  text-shadow:
    0 0 7px rgba(51, 255, 51, 0.6),
    0 0 20px rgba(51, 255, 51, 0.3),
    0 0 42px rgba(51, 255, 51, 0.15),
    0 0 80px rgba(51, 255, 51, 0.07);
  animation: neon-flicker 4s ease-in-out infinite;
}

@keyframes neon-flicker {
  0%, 100% {
    text-shadow:
      0 0 7px rgba(51, 255, 51, 0.6),
      0 0 20px rgba(51, 255, 51, 0.3),
      0 0 42px rgba(51, 255, 51, 0.15),
      0 0 80px rgba(51, 255, 51, 0.07);
  }
  5% {
    text-shadow:
      0 0 4px rgba(51, 255, 51, 0.3),
      0 0 10px rgba(51, 255, 51, 0.15);
  }
  6% {
    text-shadow:
      0 0 7px rgba(51, 255, 51, 0.6),
      0 0 20px rgba(51, 255, 51, 0.3),
      0 0 42px rgba(51, 255, 51, 0.15),
      0 0 80px rgba(51, 255, 51, 0.07);
  }
  50% {
    text-shadow:
      0 0 10px rgba(51, 255, 51, 0.7),
      0 0 30px rgba(51, 255, 51, 0.4),
      0 0 60px rgba(51, 255, 51, 0.2),
      0 0 100px rgba(51, 255, 51, 0.1);
  }
  92% {
    text-shadow:
      0 0 7px rgba(51, 255, 51, 0.6),
      0 0 20px rgba(51, 255, 51, 0.3),
      0 0 42px rgba(51, 255, 51, 0.15);
  }
  93% {
    text-shadow:
      0 0 3px rgba(51, 255, 51, 0.2),
      0 0 8px rgba(51, 255, 51, 0.1);
  }
  94% {
    text-shadow:
      0 0 7px rgba(51, 255, 51, 0.6),
      0 0 20px rgba(51, 255, 51, 0.3),
      0 0 42px rgba(51, 255, 51, 0.15),
      0 0 80px rgba(51, 255, 51, 0.07);
  }
}

/* Logo glow */
.logo-glow {
  filter: drop-shadow(0 0 20px rgba(51, 255, 51, 0.2));
  animation: logo-pulse 3s ease-in-out infinite;
}

@keyframes logo-pulse {
  0%, 100% { filter: drop-shadow(0 0 20px rgba(51, 255, 51, 0.2)); }
  50% { filter: drop-shadow(0 0 35px rgba(51, 255, 51, 0.35)); }
}

/* INSERT COIN blink */
.insert-coin-wrap {
  perspective: 200px;
}

.insert-coin {
  display: inline-block;
  animation: coin-blink 1.5s step-end infinite;
}

@keyframes coin-blink {
  0%, 70% { opacity: 1; }
  71%, 100% { opacity: 0; }
}

/* Coin slot decoration */
.coin-slot {
  width: 40px;
  height: 16px;
  border: 1px solid var(--color-text-muted);
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.2;
}

.coin-slot-inner {
  width: 24px;
  height: 4px;
  background: var(--color-text-muted);
  border-radius: 2px;
  opacity: 0.6;
}

/* Vignette for CRT feel */
.hero-vignette {
  background: radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%);
}

/* Star twinkling */
@keyframes star-twinkle {
  0%, 100% { opacity: 0.1; }
  50% { opacity: 0.5; }
}

/* Light streaks */
@keyframes light-streak {
  0%, 100% { opacity: 0.02; transform: scaleY(0.8); }
  50% { opacity: 0.06; transform: scaleY(1); }
}
</style>
