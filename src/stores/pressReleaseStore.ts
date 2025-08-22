import { defineStore } from 'pinia'
import type { PressRelease } from '@/types/PressRelease'
import { pressReleasesData } from '@/data/press-releases'

export const usePressReleaseStore = defineStore('pressRelease', {
  state: () => ({
    releases: pressReleasesData as PressRelease[],
    isLoaded: true
  }),

  actions: {
    async loadReleases() {
      // Data is already loaded at build time, no need to do anything
      return Promise.resolve()
    }
  },

  getters: {
    getPublishedReleases(): PressRelease[] {
      return this.releases
        .filter(release => release.published)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    },

    getFeaturedRelease(): PressRelease | null {
      return this.releases.find(release => release.featured && release.published) || null
    },

    getLatestRelease(): PressRelease | null {
      const published = this.getPublishedReleases
      return published.length > 0 ? published[0] : null
    }
  }
})