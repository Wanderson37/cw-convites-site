import { defineStore } from 'pinia'
import convitesData from '@/data/convites.json'
import type { Convite } from '@/models/convite.ts'

export const useConvitesStore = defineStore('convites', {
  state: () => ({
    _convites: [] as Convite[],
    _isLoading: false,
  }),
  getters: {
    convites: (state) => state._convites,
    isLoading: (state) => state._isLoading,
  },
  actions: {
    async getConvites() {
      this._isLoading = true
      this._convites = convitesData as Convite[]
      this._isLoading = false
    },
  },
})
