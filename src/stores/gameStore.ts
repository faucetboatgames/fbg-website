// src/stores/gameStore.ts
import { defineStore } from 'pinia'
import type { Game } from '@/types/Game'

export const useGameStore = defineStore('games', {
  state: () => ({
    launchedGames: [
      {
        id: '1',
        title: 'Snooze',
        description: 'Can you keep a sleepy bear dreaming for a full minute? Master the art of noise management in this thrilling arcade challenge where every sound matters and silence is your greatest weapon.',
        status: 'launched',
        playUrl: 'https://snooze.faucetboatgames.com',
        thumbnailUrl: 'https://placehold.co/600x400/6B46C1/ffffff?text=Snooze',
        bannerUrl: 'https://placehold.co/1200x400/6B46C1/ffffff?text=Snooze',
        features: ['Noise Management', 'Time Pressure', 'Relaxing Theme'],
        platforms: ['Web', 'PC', 'Mobile'],
        genre: ['Arcade', 'Casual']
      },
      {
        id: '2',
        title: 'Rhythm Raiders',
        description: 'A music-based dungeon crawler where your attacks and movements sync with the beat. Explore procedurally generated dungeons with a soundtrack that adapts to your play style.',
        status: 'launched',
        playUrl: 'https://rhythm-raiders.faucetboatgames.com',
        thumbnailUrl: 'https://placehold.co/600x400/9C27B0/ffffff?text=Rhythm+Raiders',
        bannerUrl: 'https://placehold.co/1200x400/9C27B0/ffffff?text=Rhythm+Raiders',
        features: ['Rhythm-Based Combat', 'Dynamic Soundtrack', 'Procedural Dungeons'],
        platforms: ['Web', 'PC', 'Console', 'Mobile'],
        genre: ['Rhythm', 'Roguelike']
      }
    ] as Game[],
    developmentGames: [
      {
        id: '3',
        title: 'Neon Shadows',
        description: 'A cyberpunk platformer game where you play as a Phosphor Stalker, battling against the Neon Shadows in a digital world. Navigate through challenging platforming levels, collect data fragments and upgrade cores, and unlock powerful abilities to defeat your enemies.',
        status: 'development',
        releaseDate: 'Late Fall 2025',
        thumbnailUrl: 'https://placehold.co/600x400/FF5252/ffffff?text=Neon+Shadows',
        bannerUrl: 'https://placehold.co/1200x400/FF5252/ffffff?text=Neon+Shadows',
        features: ['Platforming Action', 'Digital Combat', 'Upgrade System', 'Data Collection'],
        platforms: ['PC', 'Console'],
        genre: ['Cyberpunk', 'Platformer']
      }
    ] as Game[],
    upcomingGames: [
      {
        id: '4',
        title: 'Cosmic Voyager',
        description: 'An interstellar adventure through unexplored galaxies. Pilot your ship through asteroid fields, engage in space combat, and discover new civilizations.',
        status: 'upcoming',
        releaseDate: '2025 Q4',
        thumbnailUrl: 'https://placehold.co/600x400/1A237E/ffffff?text=Cosmic+Voyager',
        bannerUrl: 'https://placehold.co/1200x400/1A237E/ffffff?text=Cosmic+Voyager',
        features: ['Procedural Generation', 'Space Combat', 'Resource Management'],
        platforms: ['PC', 'Mac'],
        genre: ['Space Sim', 'Adventure']
      },
      {
        id: '5',
        title: 'Forest Keepers',
        description: 'A relaxing management sim where you nurture and protect a magical forest. Plant trees, care for creatures, and defend against threats.',
        status: 'upcoming',
        releaseDate: '2026 Q1',
        thumbnailUrl: 'https://placehold.co/600x400/4CAF50/ffffff?text=Forest+Keepers',
        bannerUrl: 'https://placehold.co/1200x400/4CAF50/ffffff?text=Forest+Keepers',
        features: ['Ecosystem Simulation', 'Creature Taming', 'Seasonal Changes'],
        platforms: ['PC', 'Mobile'],
        genre: ['Simulation', 'Management']
      },
      {
        id: '6',
        title: 'Quantum Dreams',
        description: 'A mind-bending puzzle game set in a quantum realm where reality shifts with your decisions. Manipulate time and space to solve increasingly complex challenges.',
        status: 'upcoming',
        releaseDate: '2026 Q2',
        thumbnailUrl: 'https://placehold.co/600x400/00BCD4/ffffff?text=Quantum+Dreams',
        bannerUrl: 'https://placehold.co/1200x400/00BCD4/ffffff?text=Quantum+Dreams',
        features: ['Reality Manipulation', 'Time Control', 'Physics Puzzles'],
        platforms: ['PC', 'Console'],
        genre: ['Puzzle', 'Sci-Fi']
      },
      {
        id: '7',
        title: 'Mythic Legends',
        description: 'An epic RPG inspired by world mythologies. Recruit legendary heroes, battle mythical creatures, and forge your own legend across multiple realms.',
        status: 'upcoming',
        releaseDate: '2026 Q3',
        thumbnailUrl: 'https://placehold.co/600x400/FFC107/ffffff?text=Mythic+Legends',
        bannerUrl: 'https://placehold.co/1200x400/FFC107/ffffff?text=Mythic+Legends',
        features: ['Turn-Based Combat', 'Hero Collection', 'Multiple Mythologies'],
        platforms: ['PC', 'Console', 'Mobile'],
        genre: ['RPG', 'Strategy']
      },
      {
        id: '8',
        title: 'Velocity Drift',
        description: 'A high-octane racing game with futuristic vehicles and gravity-defying tracks. Master the drift mechanics to achieve impossible speeds.',
        status: 'upcoming',
        releaseDate: '2026 Q4',
        thumbnailUrl: 'https://placehold.co/600x400/F44336/ffffff?text=Velocity+Drift',
        bannerUrl: 'https://placehold.co/1200x400/F44336/ffffff?text=Velocity+Drift',
        features: ['Anti-Gravity Racing', 'Vehicle Customization', 'Online Multiplayer'],
        platforms: ['PC', 'Console'],
        genre: ['Racing', 'Arcade']
      },
      {
        id: '9',
        title: 'Tiny Titans',
        description: 'A charming colony simulator where you guide a civilization of miniature beings. Build, research, and expand while facing challenges at a microscopic scale.',
        status: 'upcoming',
        releaseDate: '2027 Q1',
        thumbnailUrl: 'https://placehold.co/600x400/8BC34A/ffffff?text=Tiny+Titans',
        bannerUrl: 'https://placehold.co/1200x400/8BC34A/ffffff?text=Tiny+Titans',
        features: ['Colony Management', 'Tech Tree', 'Environmental Challenges'],
        platforms: ['PC', 'Mobile'],
        genre: ['Simulation', 'Strategy']
      }
    ] as Game[]
  }),
  getters: {
    getLaunchedGames: (state) => state.launchedGames,
    getDevelopmentGames: (state) => state.developmentGames,
    getUpcomingGames: (state) => state.upcomingGames,
    getFeaturedGame: (state) => state.launchedGames[0]
  }
})
