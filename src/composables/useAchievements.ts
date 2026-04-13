import { useLocalStorage } from '@vueuse/core'
import { toast } from 'vue-sonner'

interface Achievement {
  id: string
  title: string
  description: string
}

const ACHIEVEMENTS: Record<string, Achievement> = {
  welcome: {
    id: 'welcome',
    title: 'Welcome, Player 1!',
    description: 'You found Faucet Boat Games.',
  },
  explorer: {
    id: 'explorer',
    title: 'Explorer',
    description: 'You scrolled to the bottom of the page.',
  },
  curious: {
    id: 'curious',
    title: 'Curious Mind',
    description: 'You checked out WakeWeaver.',
  },
  konami: {
    id: 'konami',
    title: 'Cheat Code Master',
    description: 'You entered the Konami Code.',
  },
}

export function useAchievements() {
  const unlocked = useLocalStorage<string[]>('fbg-achievements', [])

  function unlock(id: string) {
    if (unlocked.value.includes(id)) return
    const achievement = ACHIEVEMENTS[id]
    if (!achievement) return

    unlocked.value = [...unlocked.value, id]

    toast(achievement.title, {
      description: achievement.description,
      duration: 4000,
    })
  }

  return { unlocked, unlock }
}
