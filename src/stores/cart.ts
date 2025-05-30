import { defineStore } from 'pinia'
import type { Convite } from '@/models/convite'

export interface CartItem extends Convite {
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
  }),
  getters: {
    // total de itens no carrinho
    totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    // valor total do carrinho
    totalPrice: (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  },
  actions: {
    // adiciona um Convite ao carrinho (ou incrementa quantidade)
    add(item: Convite, quantity = 1) {
      const existing = this.items.find((i) => i.id === item.id)
      if (existing) {
        existing.quantity += quantity
      } else {
        this.items.push({ ...item, quantity })
      }
    },
    // atualiza a quantidade de um item
    updateQuantity(id: number, quantity: number) {
      const existing = this.items.find((i) => i.id === id)
      if (existing && quantity > 0) {
        existing.quantity = quantity
      } else if (existing && quantity <= 0) {
        this.remove(id)
      }
    },
    // remove item do carrinho
    remove(id: number) {
      this.items = this.items.filter((i) => i.id !== id)
    },
    // esvazia o carrinho
    clear() {
      this.items = []
    },
  },
})
