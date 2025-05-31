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
    async orderConvite(conviteId: number) {
      this._isLoading = true
      // Simula uma chamada de API para ordenar o convite
      const convite = this._convites.find((c) => c.id === conviteId)
      if (convite) {
        // Aqui você poderia fazer uma chamada real para um backend
        console.log(`Convite ${conviteId} ordenado!`)
      } else {
        console.error(`Convite ${conviteId} não encontrado!`)
      }
      this._isLoading = false
    },
  },
})
