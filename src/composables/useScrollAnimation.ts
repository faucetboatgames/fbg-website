import { onMounted, onUnmounted, nextTick } from 'vue'

export function useScrollAnimation() {
  let observer: IntersectionObserver | null = null
  let mutationObserver: MutationObserver | null = null

  function observeElements() {
    if (!observer) return
    document.querySelectorAll('.animate-on-scroll:not(.is-visible)').forEach((el) => {
      observer!.observe(el)
    })
  }

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer?.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0,
        rootMargin: '0px 0px -10% 0px',
      }
    )

    // Observe existing elements after next tick (children mounted)
    nextTick(() => {
      observeElements()
    })

    // Watch for new elements added to DOM
    mutationObserver = new MutationObserver(() => {
      observeElements()
    })
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    })
  })

  onUnmounted(() => {
    observer?.disconnect()
    mutationObserver?.disconnect()
  })
}
