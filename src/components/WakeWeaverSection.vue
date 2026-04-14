<template>
  <section
    id="wakeweaver"
    ref="sectionRef"
    class="py-10 md:py-16 relative overflow-hidden"
  >
    <div class="relative z-10" style="max-width: 800px; margin-left: auto; margin-right: auto; padding-left: 1rem; padding-right: 1rem;">

      <!-- Title -->
      <div class="text-center mb-6 sm:mb-8 animate-on-scroll">
        <h2
          class="font-[--font-pixel] text-[--color-cyan] text-base sm:text-lg md:text-xl tracking-wider glitch-text-hover"
          style="text-shadow: 0 0 25px rgba(0, 240, 255, 0.5), 0 0 60px rgba(0, 240, 255, 0.15);"
        >
          WAKEWEAVER
        </h2>
        <div class="mt-3">
          <span class="inline-block font-[--font-pixel] text-[8px] sm:text-[9px] tracking-[0.3em] text-[--color-amber] border border-[--color-amber]/30 px-3 py-1 rounded" style="animation: coin-blink 1.5s step-end infinite;">
            COMING SOON
          </span>
        </div>
      </div>

      <!-- Game viewport -->
      <div class="animate-on-scroll">
        <div class="game-viewport">
          <!-- Sky -->
          <div class="scene-sky">
            <!-- Stars -->
            <div v-for="i in 15" :key="i" class="star" :style="{
              left: `${(i * 41 + 7) % 100}%`,
              top: `${(i * 29 + 3) % 50}%`,
              width: `${1 + i % 2}px`,
              height: `${1 + i % 2}px`,
              animationDelay: `${i * 0.3}s`,
            }" />
            <!-- Moon -->
            <div class="moon" />
          </div>

          <!-- Water -->
          <div class="scene-water">
            <!-- Wave crests -->
            <svg class="wave-crest wave-crest-1" viewBox="0 0 800 20" preserveAspectRatio="none">
              <path d="M0,10 Q50,0 100,10 Q150,20 200,10 Q250,0 300,10 Q350,20 400,10 Q450,0 500,10 Q550,20 600,10 Q650,0 700,10 Q750,20 800,10 L800,20 L0,20 Z" fill="rgba(0,240,255,0.06)" />
            </svg>
            <svg class="wave-crest wave-crest-2" viewBox="0 0 800 20" preserveAspectRatio="none">
              <path d="M0,10 Q50,0 100,10 Q150,20 200,10 Q250,0 300,10 Q350,20 400,10 Q450,0 500,10 Q550,20 600,10 Q650,0 700,10 Q750,20 800,10 L800,20 L0,20 Z" fill="rgba(0,240,255,0.04)" />
            </svg>

            <!-- Character on jetski -->
            <div class="character-group" :class="{ 'riding': isVisible }">
              <!-- Spray -->
              <div class="spray spray-1" />
              <div class="spray spray-2" />
              <div class="spray spray-3" />

              <!-- Jetski body -->
              <div class="jetski-body">
                <div class="jetski-hull" />
                <div class="jetski-seat" />
                <div class="jetski-handlebar" />
              </div>

              <!-- Character (pixel person) -->
              <div class="pixel-char">
                <div class="char-head" />
                <div class="char-shades" />
                <div class="char-body" />
                <div class="char-arm" />
              </div>

              <!-- Wake trail -->
              <div class="wake-trail" />
            </div>
          </div>

          <!-- RPG Dialog box -->
          <div class="dialog-box">
            <!-- Character portrait -->
            <div class="dialog-portrait">
              <div class="portrait-char">
                <div class="port-head" />
                <div class="port-shades" />
                <div class="port-body" />
              </div>
            </div>

            <!-- Dialog text -->
            <div class="dialog-content">
              <div class="dialog-name font-[--font-pixel] text-[--color-cyan] text-[8px] sm:text-[9px] tracking-wider mb-1.5">
                CAPTAIN WAKE
              </div>
              <p class="dialog-text font-[--font-mono] text-[--color-text] text-sm sm:text-base leading-[1.8]">
                {{ currentDialog }}
              </p>
              <!-- Controls -->
              <div class="dialog-controls">
                <button
                  class="dialog-btn"
                  :title="paused ? 'Auto-advance' : 'Pause'"
                  @click="togglePause"
                >
                  <span class="font-[--font-pixel] text-[--color-text-muted] text-[7px] sm:text-[8px] tracking-wider hover:text-[--color-cyan] transition-colors">
                    {{ paused ? '▶ PLAY' : '❚❚ PAUSE' }}
                  </span>
                </button>
                <button class="dialog-btn" @click="nextDialog">
                  <span class="font-[--font-pixel] text-[--color-amber] text-[7px] sm:text-[8px] tracking-wider hover:text-[--color-phosphor] transition-colors" :class="{ 'dialog-blink': !paused }">
                    {{ dialogIndex < dialogs.length - 1 ? '▼ NEXT' : '▼ START' }}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA below viewport -->
      <div class="text-center mt-6 sm:mt-8 animate-on-scroll">
        <a
          href="https://build.faucetboatgames.com"
          target="_blank"
          rel="noopener"
          class="inline-block group"
          @click="$emit('wakeweaver-click')"
        >
          <span class="inline-block px-8 sm:px-10 py-3 sm:py-3.5 bg-[--color-cyan] text-[--color-bg-deep] font-[--font-pixel] text-[9px] sm:text-[10px] tracking-[0.15em] rounded border-b-4 border-[#0099aa] group-hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] group-active:border-b-[1px] group-active:translate-y-[3px] transition-all duration-100">
            EARLY ACCESS
          </span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useElementVisibility } from '@vueuse/core'

defineEmits<{ 'wakeweaver-click': [] }>()

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = useElementVisibility(sectionRef)

const dialogs = [
  "Yo! Welcome to the open waters! I'm Captain Wake — I build games out here on the waves.",
  "You got a game idea? Sick. Tell WakeWeaver what you want and our AI crew handles the rest.",
  "Architecture, code, testing, deployment — all done before the tide comes in.",
  "Your game goes live instantly. Playable in the browser. No downloads, no waiting.",
  "So what do you say — ready to ride the wakes and build something legendary?",
]

const dialogIndex = ref(0)
const paused = ref(false)
const currentDialog = computed(() => dialogs[dialogIndex.value])
let autoAdvance: ReturnType<typeof setInterval> | null = null

function startAutoAdvance() {
  stopAutoAdvance()
  autoAdvance = setInterval(nextDialog, 5000)
}

function stopAutoAdvance() {
  if (autoAdvance) {
    clearInterval(autoAdvance)
    autoAdvance = null
  }
}

function nextDialog() {
  dialogIndex.value = (dialogIndex.value + 1) % dialogs.length
  // Reset timer when manually clicking next so it doesn't jump right after
  if (!paused.value) startAutoAdvance()
}

function togglePause() {
  paused.value = !paused.value
  if (paused.value) {
    stopAutoAdvance()
  } else {
    startAutoAdvance()
  }
}

onMounted(() => {
  startAutoAdvance()
})

onUnmounted(() => {
  stopAutoAdvance()
})
</script>

<style scoped>
@keyframes coin-blink {
  0%, 70% { opacity: 1; }
  71%, 100% { opacity: 0; }
}

/* Game viewport - like looking at a game screen */
.game-viewport {
  border: 3px solid #1a1a2e;
  border-radius: 8px;
  overflow: hidden;
  background: #030810;
  box-shadow:
    0 0 30px rgba(0, 240, 255, 0.04),
    inset 0 0 40px rgba(0, 0, 0, 0.5);
  position: relative;
  width: 100%;
}

/* Scanlines on viewport */
.game-viewport::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent 0px,
    transparent 2px,
    rgba(0, 240, 255, 0.008) 2px,
    rgba(0, 240, 255, 0.008) 4px
  );
  pointer-events: none;
  z-index: 10;
}

/* Sky */
.scene-sky {
  height: 120px;
  background: linear-gradient(180deg, #030818 0%, #081428 60%, #0c1e35 100%);
  position: relative;
  overflow: hidden;
}

@media (min-width: 640px) {
  .scene-sky {
    height: 140px;
  }
}

.star {
  position: absolute;
  background: white;
  border-radius: 50%;
  animation: star-twinkle 2s ease-in-out infinite;
}

@keyframes star-twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.8; }
}

.moon {
  position: absolute;
  top: 20px;
  right: 15%;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #fffde8, #e8d888);
  box-shadow: 0 0 20px rgba(255, 253, 200, 0.3);
  opacity: 0.7;
}

/* Water */
.scene-water {
  height: 140px;
  background: linear-gradient(180deg, #0c1e35 0%, #0a1828 30%, #081420 100%);
  position: relative;
  overflow: hidden;
}

@media (min-width: 640px) {
  .scene-water {
    height: 160px;
  }
}

.wave-crest {
  position: absolute;
  width: 200%;
  height: 20px;
  left: -50%;
}

.wave-crest-1 {
  top: 10%;
  animation: wave-scroll 6s linear infinite;
}

.wave-crest-2 {
  top: 35%;
  animation: wave-scroll 9s linear infinite reverse;
}

@keyframes wave-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(25%); }
}

/* Character group */
.character-group {
  position: absolute;
  bottom: 25%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
}

.character-group.riding {
  animation: bob 2s ease-in-out infinite;
}

@keyframes bob {
  0%, 100% { transform: translateX(-50%) translateY(0) rotate(0deg); }
  25% { transform: translateX(-50%) translateY(-4px) rotate(-1deg); }
  75% { transform: translateX(-50%) translateY(2px) rotate(1deg); }
}

/* Jetski - CSS pixel art */
.jetski-body {
  position: relative;
  width: 60px;
  height: 20px;
}

@media (min-width: 640px) {
  .jetski-body {
    width: 80px;
    height: 26px;
  }
}

.jetski-hull {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 14px;
  background: linear-gradient(135deg, #ff2d7b, #cc1155);
  border-radius: 4px 12px 6px 4px;
  box-shadow: 0 2px 6px rgba(255, 45, 123, 0.3);
}

@media (min-width: 640px) {
  .jetski-hull {
    height: 18px;
  }
}

.jetski-seat {
  position: absolute;
  bottom: 10px;
  left: 30%;
  width: 30%;
  height: 8px;
  background: #222;
  border-radius: 3px 3px 0 0;
}

@media (min-width: 640px) {
  .jetski-seat {
    bottom: 14px;
    height: 10px;
  }
}

.jetski-handlebar {
  position: absolute;
  bottom: 12px;
  right: 15%;
  width: 3px;
  height: 12px;
  background: #888;
  border-radius: 1px;
  transform: rotate(-15deg);
}

@media (min-width: 640px) {
  .jetski-handlebar {
    bottom: 16px;
    height: 14px;
  }
}

/* Pixel character sitting on jetski */
.pixel-char {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
}

@media (min-width: 640px) {
  .pixel-char {
    bottom: 22px;
  }
}

.char-head {
  width: 10px;
  height: 10px;
  background: #ffcc88;
  border-radius: 3px;
  margin: 0 auto;
  position: relative;
}

@media (min-width: 640px) {
  .char-head {
    width: 12px;
    height: 12px;
  }
}

.char-shades {
  position: absolute;
  top: 3px;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 3px;
  background: #111;
  border-radius: 1px;
}

@media (min-width: 640px) {
  .char-shades {
    width: 14px;
    height: 4px;
    top: 4px;
  }
}

.char-body {
  width: 12px;
  height: 10px;
  background: var(--color-cyan);
  border-radius: 2px;
  margin: 1px auto 0;
}

@media (min-width: 640px) {
  .char-body {
    width: 14px;
    height: 12px;
  }
}

.char-arm {
  position: absolute;
  top: 12px;
  right: -6px;
  width: 8px;
  height: 3px;
  background: #ffcc88;
  border-radius: 1px;
  transform: rotate(-20deg);
}

@media (min-width: 640px) {
  .char-arm {
    top: 14px;
    right: -7px;
    width: 10px;
  }
}

/* Spray particles */
.spray {
  position: absolute;
  bottom: 2px;
  border-radius: 50%;
  background: rgba(0, 240, 255, 0.4);
  animation: spray-up 1.5s ease-out infinite;
}

.spray-1 {
  left: -8px;
  width: 4px;
  height: 4px;
  animation-delay: 0s;
}

.spray-2 {
  left: -14px;
  width: 3px;
  height: 3px;
  animation-delay: 0.3s;
}

.spray-3 {
  left: -5px;
  width: 2px;
  height: 2px;
  animation-delay: 0.7s;
}

@keyframes spray-up {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 0.5;
  }
  100% {
    transform: translate(-12px, -18px) scale(0);
    opacity: 0;
  }
}

/* Wake trail behind jetski */
.wake-trail {
  position: absolute;
  bottom: -2px;
  left: -40px;
  width: 40px;
  height: 3px;
  background: linear-gradient(to left, rgba(0, 240, 255, 0.2), transparent);
  border-radius: 2px;
}

@media (min-width: 640px) {
  .wake-trail {
    left: -50px;
    width: 50px;
  }
}

/* RPG Dialog box */
.dialog-box {
  display: flex;
  gap: 12px;
  padding: 14px 16px;
  background: rgba(5, 5, 20, 0.95);
  border-top: 2px solid rgba(0, 240, 255, 0.15);
  position: relative;
  z-index: 6;
  min-height: 100px;
}

@media (min-width: 640px) {
  .dialog-box {
    gap: 16px;
    padding: 18px 24px;
    min-height: 110px;
  }
}

/* Portrait box */
.dialog-portrait {
  width: 48px;
  height: 48px;
  border: 2px solid rgba(0, 240, 255, 0.2);
  border-radius: 4px;
  background: rgba(0, 240, 255, 0.03);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

@media (min-width: 640px) {
  .dialog-portrait {
    width: 56px;
    height: 56px;
  }
}

/* Portrait character (smaller version) */
.portrait-char {
  transform: scale(1.8);
}

@media (min-width: 640px) {
  .portrait-char {
    transform: scale(2);
  }
}

.port-head {
  width: 8px;
  height: 8px;
  background: #ffcc88;
  border-radius: 2px;
  margin: 0 auto;
  position: relative;
}

.port-shades {
  position: absolute;
  top: 3px;
  left: 50%;
  transform: translateX(-50%);
  width: 10px;
  height: 2px;
  background: #111;
  border-radius: 1px;
}

.port-body {
  width: 10px;
  height: 6px;
  background: var(--color-cyan);
  border-radius: 1px;
  margin: 1px auto 0;
}

/* Dialog content */
.dialog-content {
  flex: 1;
  min-width: 0;
  position: relative;
}

/* Controls row */
.dialog-controls {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 6px;
}

.dialog-btn {
  cursor: pointer;
  background: none;
  border: none;
  padding: 2px 4px;
}

.dialog-blink {
  animation: dialog-blink 1.2s step-end infinite;
}

@keyframes dialog-blink {
  0%, 60% { opacity: 1; }
  61%, 100% { opacity: 0; }
}
</style>
