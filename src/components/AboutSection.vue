<template>
  <section
    id="about"
    class="py-16 md:py-24 relative"
    style="background: linear-gradient(180deg, #0a0a1a 0%, #0a0f1a 50%, #0a0a1a 100%);"
  >
    <div style="max-width: 900px; margin-left: auto; margin-right: auto; padding-left: 1rem; padding-right: 1rem;">
      <!-- Header styled like a game's story/credits screen -->
      <div class="text-center mb-10 sm:mb-14 animate-on-scroll">
        <div class="inline-block mb-4">
          <span class="font-[--font-pixel] text-[--color-amber] text-[10px] sm:text-xs tracking-[0.3em] about-title-deco">
            - ABOUT -
          </span>
        </div>
        <h2
          class="font-[--font-pixel] text-[--color-text] text-sm sm:text-base md:text-lg mb-2"
          style="text-shadow: 0 0 15px rgba(224, 224, 224, 0.2);"
        >
          WHO WE ARE
        </h2>
      </div>

      <!-- Story screen - like reading lore on an arcade cabinet -->
      <div class="animate-on-scroll mb-12 sm:mb-16 mx-auto" style="max-width: 36rem;">
        <div class="story-screen">
          <!-- Decorative pixel corners -->
          <div class="pixel-corner pixel-corner-tl" />
          <div class="pixel-corner pixel-corner-tr" />
          <div class="pixel-corner pixel-corner-bl" />
          <div class="pixel-corner pixel-corner-br" />

          <div class="p-6 sm:p-8 text-center">
            <p class="font-[--font-mono] text-[--color-phosphor] text-base sm:text-lg leading-[2] mb-4">
              We're an AI-powered indie game studio.
            </p>
            <p class="font-[--font-mono] text-[--color-text] text-sm sm:text-base leading-[2] mb-4">
              Our AI agents design, build, and ship games.
              We set the direction. They write the code.
            </p>
            <div class="flex items-center justify-center gap-3 mt-6">
              <span class="block w-1.5 h-1.5 bg-[--color-hot-pink] rotate-45" />
              <span class="font-[--font-pixel] text-[--color-text-muted] text-[8px] tracking-[0.4em]">FULLY AUTONOMOUS</span>
              <span class="block w-1.5 h-1.5 bg-[--color-hot-pink] rotate-45" />
            </div>
          </div>
        </div>
      </div>

      <!-- Character stats / power-ups -->
      <div class="animate-on-scroll">
        <div class="font-[--font-pixel] text-[--color-cyan] text-[9px] sm:text-[10px] text-center mb-6 tracking-[0.3em]">
          POWER-UPS EQUIPPED
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mx-auto" style="max-width: 42rem;">
          <div
            v-for="stat in stats"
            :key="stat.title"
            class="stat-card group"
            :style="`--stat-color: ${stat.rawColor};`"
          >
            <!-- Stat icon like a power-up pickup -->
            <div class="stat-icon-wrap mb-3">
              <span
                class="font-[--font-pixel] text-xl sm:text-2xl block transition-transform duration-300 group-hover:scale-125"
                :style="`color: ${stat.rawColor}; text-shadow: 0 0 10px ${stat.rawColor}60; filter: drop-shadow(0 0 6px ${stat.rawColor}40);`"
              >
                {{ stat.icon }}
              </span>
            </div>

            <!-- Stat bar header -->
            <h3 class="font-[--font-pixel] text-[--color-text] text-[9px] sm:text-[10px] tracking-wider mb-2">
              {{ stat.title }}
            </h3>

            <!-- Stat bar fill -->
            <div class="stat-bar mb-3">
              <div
                class="stat-bar-fill"
                :style="`width: ${stat.level}%; background: ${stat.rawColor}; box-shadow: 0 0 8px ${stat.rawColor}60;`"
              />
            </div>

            <p class="font-[--font-mono] text-[--color-text-muted] text-xs leading-relaxed">
              {{ stat.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const stats = [
  {
    icon: '>>',
    title: 'INNOVATION',
    description: 'Fresh ideas, wild mechanics. AI lets us explore faster than ever.',
    rawColor: '#33ff33',
    level: 95,
  },
  {
    icon: '[]',
    title: 'QUALITY',
    description: 'Polished games that respect players. Every spec tested, every deploy verified.',
    rawColor: '#00f0ff',
    level: 88,
  },
  {
    icon: '<>',
    title: 'COMMUNITY',
    description: 'Built with players in mind. Your feedback shapes what we ship next.',
    rawColor: '#ff2d7b',
    level: 80,
  },
]
</script>

<style scoped>
/* Story screen - arcade lore panel */
.story-screen {
  position: relative;
  background: linear-gradient(135deg, rgba(15, 15, 42, 0.8), rgba(10, 10, 26, 0.9));
  border: 1px solid var(--color-border);
  border-radius: 2px;
}

.story-screen::before {
  content: '';
  position: absolute;
  inset: 3px;
  border: 1px solid var(--color-border);
  border-radius: 1px;
  pointer-events: none;
}

/* Pixel corners */
.pixel-corner {
  position: absolute;
  width: 8px;
  height: 8px;
}

.pixel-corner::before,
.pixel-corner::after {
  content: '';
  position: absolute;
  background: var(--color-amber);
  opacity: 0.5;
}

.pixel-corner-tl { top: -1px; left: -1px; }
.pixel-corner-tl::before { top: 0; left: 0; width: 8px; height: 2px; }
.pixel-corner-tl::after { top: 0; left: 0; width: 2px; height: 8px; }

.pixel-corner-tr { top: -1px; right: -1px; }
.pixel-corner-tr::before { top: 0; right: 0; width: 8px; height: 2px; }
.pixel-corner-tr::after { top: 0; right: 0; width: 2px; height: 8px; }

.pixel-corner-bl { bottom: -1px; left: -1px; }
.pixel-corner-bl::before { bottom: 0; left: 0; width: 8px; height: 2px; }
.pixel-corner-bl::after { bottom: 0; left: 0; width: 2px; height: 8px; }

.pixel-corner-br { bottom: -1px; right: -1px; }
.pixel-corner-br::before { bottom: 0; right: 0; width: 8px; height: 2px; }
.pixel-corner-br::after { bottom: 0; right: 0; width: 2px; height: 8px; }

/* About title deco */
.about-title-deco {
  text-shadow: 0 0 12px rgba(255, 179, 0, 0.4);
}

/* Stat card - power-up style */
.stat-card {
  text-align: center;
  padding: 24px 20px;
  background: rgba(15, 15, 42, 0.5);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--stat-color);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.stat-card:hover {
  border-color: var(--stat-color);
  box-shadow: 0 0 20px color-mix(in srgb, var(--stat-color) 15%, transparent);
}

.stat-card:hover::before {
  opacity: 0.6;
}

/* Stat icon container */
.stat-icon-wrap {
  width: 48px;
  height: 48px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.3);
}

/* Stat bar - RPG style */
.stat-bar {
  height: 6px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 1px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.stat-bar-fill {
  height: 100%;
  border-radius: 0;
  transition: width 1s ease-out;
}
</style>
