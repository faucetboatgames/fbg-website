// src/stores/gameStore.ts
import { defineStore } from 'pinia'
import type { Game } from '@/types/Game'

export const useGameStore = defineStore('games', {
  state: () => ({
    currentGames: [
      {
        id: '1',
        title: 'Cosmic Voyager',
        description: 'An interstellar adventure through unexplored galaxies. Pilot your ship through asteroid fields, engage in space combat, and discover new civilizations.',
        status: 'current',
        thumbnailUrl: 'https://placehold.co/600x400/1A237E/ffffff?text=Cosmic+Voyager',
        bannerUrl: 'https://placehold.co/1200x400/1A237E/ffffff?text=Cosmic+Voyager',
        features: ['Procedural Generation', 'Space Combat', 'Resource Management'],
        platforms: ['PC', 'Mac'],
        genre: ['Space Sim', 'Adventure']
      },
      {
        id: '2',
        title: 'Neon Shadows',
        description: 'A cyberpunk stealth game set in a dystopian future. Hack systems, avoid detection, and uncover corporate conspiracies.',
        status: 'current',
        thumbnailUrl: 'https://placehold.co/600x400/FF5252/ffffff?text=Neon+Shadows',
        bannerUrl: 'https://placehold.co/1200x400/FF5252/ffffff?text=Neon+Shadows',
        features: ['Stealth Mechanics', 'Hacking Minigames', 'Branching Narrative'],
        platforms: ['PC', 'Console'],
        genre: ['Cyberpunk', 'Stealth']
      },
      {
        id: '3',
        title: 'Forest Keepers',
        description: 'A relaxing management sim where you nurture and protect a magical forest. Plant trees, care for creatures, and defend against threats.',
        status: 'current',
        thumbnailUrl: 'https://placehold.co/600x400/4CAF50/ffffff?text=Forest+Keepers',
        bannerUrl: 'https://placehold.co/1200x400/4CAF50/ffffff?text=Forest+Keepers',
        features: ['Ecosystem Simulation', 'Creature Taming', 'Seasonal Changes'],
        platforms: ['PC', 'Mobile'],
        genre: ['Simulation', 'Management']
      },
      {
        id: '4',
        title: 'Rhythm Raiders',
        description: 'A music-based dungeon crawler where your attacks and movements sync with the beat. Explore procedurally generated dungeons with a soundtrack that adapts to your play style.',
        status: 'current',
        thumbnailUrl: 'https://placehold.co/600x400/9C27B0/ffffff?text=Rhythm+Raiders',
        bannerUrl: 'https://placehold.co/1200x400/9C27B0/ffffff?text=Rhythm+Raiders',
        features: ['Rhythm-Based Combat', 'Dynamic Soundtrack', 'Procedural Dungeons'],
        platforms: ['PC', 'Console', 'Mobile'],
        genre: ['Rhythm', 'Roguelike']
      }
    ] as Game[],
    upcomingGames: [
      {
        id: '5',
        title: 'Quantum Dreams',
        description: 'A mind-bending puzzle game set in a quantum realm where reality shifts with your decisions. Manipulate time and space to solve increasingly complex challenges.',
        status: 'upcoming',
        releaseDate: '2024 Q4',
        thumbnailUrl: 'https://placehold.co/600x400/00BCD4/ffffff?text=Quantum+Dreams',
        bannerUrl: 'https://placehold.co/1200x400/00BCD4/ffffff?text=Quantum+Dreams',
        features: ['Reality Manipulation', 'Time Control', 'Physics Puzzles'],
        platforms: ['PC', 'Console'],
        genre: ['Puzzle', 'Sci-Fi']
      },
      {
        id: '6',
        title: 'Mythic Legends',
        description: 'An epic RPG inspired by world mythologies. Recruit legendary heroes, battle mythical creatures, and forge your own legend across multiple realms.',
        status: 'upcoming',
        releaseDate: '2025 Q1',
        thumbnailUrl: 'https://placehold.co/600x400/FFC107/ffffff?text=Mythic+Legends',
        bannerUrl: 'https://placehold.co/1200x400/FFC107/ffffff?text=Mythic+Legends',
        features: ['Turn-Based Combat', 'Hero Collection', 'Multiple Mythologies'],
        platforms: ['PC', 'Console', 'Mobile'],
        genre: ['RPG', 'Strategy']
      },
      {
        id: '7',
        title: 'Velocity Drift',
        description: 'A high-octane racing game with futuristic vehicles and gravity-defying tracks. Master the drift mechanics to achieve impossible speeds.',
        status: 'upcoming',
        releaseDate: '2025 Q2',
        thumbnailUrl: 'https://placehold.co/600x400/F44336/ffffff?text=Velocity+Drift',
        bannerUrl: 'https://placehold.co/1200x400/F44336/ffffff?text=Velocity+Drift',
        features: ['Anti-Gravity Racing', 'Vehicle Customization', 'Online Multiplayer'],
        platforms: ['PC', 'Console'],
        genre: ['Racing', 'Arcade']
      },
      {
        id: '8',
        title: 'Tiny Titans',
        description: 'A charming colony simulator where you guide a civilization of miniature beings. Build, research, and expand while facing challenges at a microscopic scale.',
        status: 'upcoming',
        releaseDate: '2025 Q3',
        thumbnailUrl: 'https://placehold.co/600x400/8BC34A/ffffff?text=Tiny+Titans',
        bannerUrl: 'https://placehold.co/1200x400/8BC34A/ffffff?text=Tiny+Titans',
        features: ['Colony Management', 'Tech Tree', 'Environmental Challenges'],
        platforms: ['PC', 'Mobile'],
        genre: ['Simulation', 'Strategy']
      }
    ] as Game[]
  }),
  getters: {
    getCurrentGames: (state) => state.currentGames,
    getUpcomingGames: (state) => state.upcomingGames
  }
})
