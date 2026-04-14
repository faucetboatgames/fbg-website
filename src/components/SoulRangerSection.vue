<template>
  <section
    id="community"
    class="py-16 md:py-24 relative overflow-hidden"
    style="background: linear-gradient(180deg, #0a0a1a 0%, #1a0a15 50%, #0a0a1a 100%);"
  >
    <!-- Subtle accent glow -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[--color-hot-pink]/[0.03] rounded-full blur-[100px] pointer-events-none" />

    <div class="relative" style="max-width: 700px; margin-left: auto; margin-right: auto; padding-left: 1rem; padding-right: 1rem;">
      <div class="text-center mb-8 sm:mb-10 animate-on-scroll">
        <span class="inline-block font-[--font-mono] text-[--color-hot-pink]/60 text-xs tracking-[0.3em] uppercase mb-3">
          // on our radar
        </span>
        <h2
          class="font-[--font-pixel] text-[--color-hot-pink] text-base sm:text-lg md:text-xl"
          style="text-shadow: 0 0 15px rgba(255, 45, 123, 0.3);"
        >
          NOW PLAYING
        </h2>
      </div>

      <!-- Game showcase card -->
      <div class="animate-on-scroll">
        <div class="relative p-[1px] rounded-2xl bg-gradient-to-br from-[#8b0000]/60 via-[--color-hot-pink]/40 to-[#8b0000]/60 shadow-[0_0_40px_rgba(139,0,0,0.12)]">
          <div class="bg-[#12081a] rounded-2xl overflow-hidden">

            <!-- Game banner area -->
            <div class="relative h-40 sm:h-48 overflow-hidden" style="background: linear-gradient(135deg, #1a0505, #2a0a0a, #1a0510);">
              <!-- Decorative blood splatter effects -->
              <div class="absolute inset-0 opacity-20">
                <div class="absolute top-[20%] left-[15%] w-20 h-20 bg-[#8b0000] rounded-full blur-[30px]" />
                <div class="absolute bottom-[10%] right-[20%] w-16 h-16 bg-[#cc0000] rounded-full blur-[25px]" />
                <div class="absolute top-[40%] right-[35%] w-12 h-12 bg-[#8b0000] rounded-full blur-[20px]" />
              </div>

              <!-- Game title overlay -->
              <div class="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <span class="font-[--font-pixel] text-[#cc3333] text-lg sm:text-xl md:text-2xl tracking-wider mb-3" style="text-shadow: 0 0 20px rgba(204, 0, 0, 0.5), 0 0 40px rgba(139, 0, 0, 0.3);">
                  SOUL RANGER
                </span>
                <span class="font-[--font-pixel] text-[8px] sm:text-[9px] text-[--color-text-muted] tracking-[0.25em] uppercase">
                  The Abyss Awaits
                </span>
              </div>
            </div>

            <!-- Game info -->
            <div class="p-6 sm:p-8 text-center">
              <a
                href="https://donatesouls.com"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center gap-2.5 font-[--font-mono] px-6 py-2.5 border border-[#8b0000]/50 text-[#cc3333] rounded-lg text-sm hover:bg-[#8b0000]/15 hover:border-[#cc3333]/50 hover:shadow-[0_0_20px_rgba(139,0,0,0.2)] transition-all duration-300"
              >
                Check it out
                <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>
