import { ref, onMounted, onUnmounted } from 'vue'

export function useActiveSection(sectionIds: string[]) {
  const activeSection = ref(sectionIds[0] || '')
  const observers: IntersectionObserver[] = []

  onMounted(() => {
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            activeSection.value = id
          }
        },
        { threshold: 0.2, rootMargin: '-80px 0px -40% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })
  })

  onUnmounted(() => {
    observers.forEach((o) => o.disconnect())
  })

  return { activeSection }
}
