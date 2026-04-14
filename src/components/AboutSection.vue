<template>
  <section
    id="about"
    class="py-16 md:py-24 relative"
    style="background: linear-gradient(180deg, #0a0a1a 0%, #0a0f1a 50%, #0a0a1a 100%);"
  >
    <div style="max-width: 640px; margin-left: auto; margin-right: auto; padding-left: 1rem; padding-right: 1rem;">
      <!-- Header -->
      <div class="text-center mb-10 animate-on-scroll">
        <span class="font-[--font-pixel] text-[--color-amber] text-[10px] sm:text-xs tracking-[0.3em]" style="text-shadow: 0 0 12px rgba(255, 179, 0, 0.4);">
          - ABOUT -
        </span>
        <h2
          class="font-[--font-pixel] text-[--color-text] text-sm sm:text-base md:text-lg mt-3"
          style="text-shadow: 0 0 15px rgba(224, 224, 224, 0.2);"
        >
          WHO WE ARE
        </h2>
      </div>

      <!-- Arcade screen card -->
      <div class="animate-on-scroll arcade-screen">
        <!-- Scanlines -->
        <div class="scanlines" />

        <!-- Score bar -->
        <div class="score-bar">
          <span class="font-[--font-pixel] text-[--color-amber] text-[8px] sm:text-[9px] tracking-widest">HI-SCORE</span>
          <span class="font-[--font-pixel] text-[--color-amber] text-[8px] sm:text-[9px] tracking-widest">{{ score.toLocaleString() }}</span>
        </div>

        <!-- Space scene -->
        <div class="space-scene">
          <!-- Stars -->
          <div
            v-for="i in 25"
            :key="`s-${i}`"
            class="abs-star"
            :style="{
              left: `${(i * 37 + 11) % 100}%`,
              top: `${(i * 53 + 7) % 100}%`,
              width: `${1 + i % 2}px`,
              height: `${1 + i % 2}px`,
              animationDelay: `${i * 0.2}s`,
            }"
          />

          <!-- Invader rows -->
          <div class="invader-row invader-row-1">
            <div v-for="n in 5" :key="n" class="invader inv-a" :style="{ animationDelay: `${n * 0.15}s` }">
              <div class="inv-pixel" style="grid-column: 2; grid-row: 1;" />
              <div class="inv-pixel" style="grid-column: 4; grid-row: 1;" />
              <div class="inv-pixel" style="grid-column: 1; grid-row: 2;" />
              <div class="inv-pixel" style="grid-column: 3; grid-row: 2;" />
              <div class="inv-pixel" style="grid-column: 5; grid-row: 2;" />
              <div class="inv-pixel" style="grid-column: 1; grid-row: 3;" />
              <div class="inv-pixel" style="grid-column: 2; grid-row: 3;" />
              <div class="inv-pixel" style="grid-column: 3; grid-row: 3;" />
              <div class="inv-pixel" style="grid-column: 4; grid-row: 3;" />
              <div class="inv-pixel" style="grid-column: 5; grid-row: 3;" />
              <div class="inv-pixel" style="grid-column: 2; grid-row: 4;" />
              <div class="inv-pixel" style="grid-column: 4; grid-row: 4;" />
            </div>
          </div>

          <div class="invader-row invader-row-2">
            <div v-for="n in 6" :key="n" class="invader inv-b" :style="{ animationDelay: `${n * 0.12}s` }">
              <div class="inv-pixel" style="grid-column: 1; grid-row: 1;" />
              <div class="inv-pixel" style="grid-column: 3; grid-row: 1;" />
              <div class="inv-pixel" style="grid-column: 1; grid-row: 2;" />
              <div class="inv-pixel" style="grid-column: 2; grid-row: 2;" />
              <div class="inv-pixel" style="grid-column: 3; grid-row: 2;" />
              <div class="inv-pixel" style="grid-column: 1; grid-row: 3;" />
              <div class="inv-pixel" style="grid-column: 3; grid-row: 3;" />
            </div>
          </div>

          <!-- Player ship -->
          <div class="player-ship">
            <div class="ship-body" />
            <div class="ship-cannon" />
            <div class="ship-wing-l" />
            <div class="ship-wing-r" />
          </div>

          <!-- Laser -->
          <div class="laser" />
        </div>

        <!-- Message area -->
        <div class="message-area">
          <p class="font-[--font-pixel] text-[--color-phosphor] text-[9px] sm:text-[10px] tracking-wider leading-[2.2] sm:leading-[2.5]">
            WE'RE AN AI-POWERED INDIE GAME STUDIO
          </p>
          <p class="font-[--font-mono] text-[--color-text]/70 text-xs sm:text-sm leading-relaxed mt-2">
            Our AI agents design, build, and ship games.<br>
            We set the direction. They write the code.
          </p>
        </div>

        <!-- Insert coin footer -->
        <div class="coin-footer">
          <span class="font-[--font-pixel] text-[--color-amber] text-[7px] sm:text-[8px] tracking-[0.3em] coin-blink">
            INSERT COIN TO CONTINUE
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const score = ref(0)
const targetScore = 99850
let scoreInterval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  // Count up the score like an arcade game
  scoreInterval = setInterval(() => {
    if (score.value < targetScore) {
      score.value += Math.min(1337, targetScore - score.value)
    } else {
      if (scoreInterval) clearInterval(scoreInterval)
    }
  }, 50)
})

onUnmounted(() => {
  if (scoreInterval) clearInterval(scoreInterval)
})
</script>

<style scoped>
.arcade-screen {
  border: 3px solid #1a1a2e;
  border-radius: 8px;
  background: #020408;
  overflow: hidden;
  position: relative;
  box-shadow:
    0 0 40px rgba(0, 240, 255, 0.03),
    inset 0 0 60px rgba(0, 0, 0, 0.6);
}

.scanlines {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent 0px,
    transparent 2px,
    rgba(0, 240, 255, 0.01) 2px,
    rgba(0, 240, 255, 0.01) 4px
  );
  pointer-events: none;
  z-index: 10;
}

/* Score bar */
.score-bar {
  display: flex;
  justify-content: space-between;
  padding: 10px 16px 6px;
}

/* Space scene */
.space-scene {
  position: relative;
  height: 180px;
  overflow: hidden;
}

@media (min-width: 640px) {
  .space-scene {
    height: 220px;
  }
}

.abs-star {
  position: absolute;
  background: white;
  border-radius: 50%;
  animation: twink 2s ease-in-out infinite;
}

@keyframes twink {
  0%, 100% { opacity: 0.15; }
  50% { opacity: 0.6; }
}

/* Invader rows */
.invader-row {
  display: flex;
  justify-content: center;
  gap: 14px;
  animation: invader-drift 4s ease-in-out infinite;
}

@media (min-width: 640px) {
  .invader-row {
    gap: 20px;
  }
}

.invader-row-1 {
  padding-top: 20px;
}

.invader-row-2 {
  padding-top: 12px;
  animation-delay: 0.5s;
  animation-direction: reverse;
}

@keyframes invader-drift {
  0%, 100% { transform: translateX(-12px); }
  50% { transform: translateX(12px); }
}

/* Pixel invaders using CSS grid */
.invader {
  display: grid;
  gap: 1px;
  animation: invader-bob 0.8s step-end infinite;
}

.inv-a {
  grid-template-columns: repeat(5, 3px);
  grid-template-rows: repeat(4, 3px);
}

.inv-b {
  grid-template-columns: repeat(3, 3px);
  grid-template-rows: repeat(3, 3px);
}

@media (min-width: 640px) {
  .inv-a {
    grid-template-columns: repeat(5, 4px);
    grid-template-rows: repeat(4, 4px);
  }
  .inv-b {
    grid-template-columns: repeat(3, 4px);
    grid-template-rows: repeat(3, 4px);
  }
}

.inv-a .inv-pixel {
  background: #ff2d7b;
  box-shadow: 0 0 4px rgba(255, 45, 123, 0.4);
}

.inv-b .inv-pixel {
  background: #00f0ff;
  box-shadow: 0 0 4px rgba(0, 240, 255, 0.4);
}

@keyframes invader-bob {
  0%, 49% { transform: translateY(0); }
  50%, 100% { transform: translateY(1px); }
}

/* Player ship */
.player-ship {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
}

.ship-body {
  width: 12px;
  height: 8px;
  background: #33ff33;
  margin: 0 auto;
  border-radius: 2px 2px 0 0;
  box-shadow: 0 0 8px rgba(51, 255, 51, 0.4);
}

.ship-cannon {
  width: 4px;
  height: 6px;
  background: #33ff33;
  margin: 0 auto;
  position: relative;
  top: -14px;
  border-radius: 1px 1px 0 0;
}

.ship-wing-l,
.ship-wing-r {
  position: absolute;
  bottom: 0;
  width: 6px;
  height: 4px;
  background: #33ff33;
  opacity: 0.7;
}

.ship-wing-l {
  left: -4px;
  border-radius: 1px 0 0 1px;
}

.ship-wing-r {
  right: -4px;
  border-radius: 0 1px 1px 0;
}

@media (min-width: 640px) {
  .ship-body {
    width: 16px;
    height: 10px;
  }
  .ship-cannon {
    width: 4px;
    height: 8px;
    top: -18px;
  }
  .ship-wing-l, .ship-wing-r {
    width: 8px;
    height: 5px;
  }
  .ship-wing-l { left: -6px; }
  .ship-wing-r { right: -6px; }
}

/* Laser beam */
.laser {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 0;
  background: #33ff33;
  box-shadow: 0 0 6px #33ff33;
  animation: laser-fire 2s ease-out infinite;
}

@media (min-width: 640px) {
  .laser {
    bottom: 36px;
  }
}

@keyframes laser-fire {
  0% { height: 0; opacity: 1; bottom: 30px; }
  30% { height: 60px; opacity: 1; }
  50% { height: 60px; opacity: 0; }
  100% { height: 0; opacity: 0; }
}

@media (min-width: 640px) {
  @keyframes laser-fire {
    0% { height: 0; opacity: 1; bottom: 36px; }
    30% { height: 80px; opacity: 1; }
    50% { height: 80px; opacity: 0; }
    100% { height: 0; opacity: 0; }
  }
}

/* Message area */
.message-area {
  text-align: center;
  padding: 20px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

@media (min-width: 640px) {
  .message-area {
    padding: 24px 36px;
  }
}

/* Coin footer */
.coin-footer {
  text-align: center;
  padding: 8px 16px 14px;
}

.coin-blink {
  animation: blink 1.5s step-end infinite;
}

@keyframes blink {
  0%, 70% { opacity: 1; }
  71%, 100% { opacity: 0; }
}
</style>
