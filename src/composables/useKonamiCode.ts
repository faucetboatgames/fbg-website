import { onMounted, onUnmounted } from 'vue'

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

export function useKonamiCode(callback: () => void) {
  let position = 0

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === KONAMI[position]) {
      position++
      if (position === KONAMI.length) {
        callback()
        position = 0
      }
    } else {
      position = 0
    }
  }

  onMounted(() => window.addEventListener('keydown', onKeyDown))
  onUnmounted(() => window.removeEventListener('keydown', onKeyDown))
}
