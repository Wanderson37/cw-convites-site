import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export interface CartItem {
  id: number | string
  cod: string
  title: string
  price: number
  quantity: number
  image: string
  minimalOrder: number
}

export interface OrderPayload {
  items: CartItem[]
  otherNotes: string
  paymentMethod: string
  total: number
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const otherNotes = ref<string>('')
  const paymentMethod = ref<string>('')

  const STORAGE_KEY = 'my-app-cart'

  function loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const obj = JSON.parse(raw) as {
          items: CartItem[]
          otherNotes: string
          paymentMethod: string
        }

        items.value = obj.items || []
        otherNotes.value = obj.otherNotes || ''
        paymentMethod.value = obj.paymentMethod || ''
      }
    } catch (e) {
      console.warn('Não foi possível ler carrinho do localStorage:', e)
    }
  }
  loadFromStorage()

  watch(
    [items, otherNotes, paymentMethod],
    () => {
      const payloadToSave = {
        items: items.value,
        otherNotes: otherNotes.value,
        paymentMethod: paymentMethod.value,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payloadToSave))
    },
    { deep: true },
  )

  const total = computed(() => items.value.reduce((acc, i) => acc + i.price * i.quantity, 0))

  function addToCart(newItem: Omit<CartItem, 'quantity'>) {
    const existing = items.value.find((i) => i.id === newItem.id)
    if (existing) {
      existing.quantity += 1
    } else {
      items.value.push({ ...newItem, quantity: 1 })
    }
  }

  function removeFromCart(itemId: number | string) {
    items.value = items.value.filter((i) => i.id !== itemId)
  }

  function updateQuantity(itemId: number | string, qty: number) {
    const i = items.value.find((x) => x.id === itemId)
    if (i) {
      i.quantity = qty < 1 ? 1 : qty
    }
  }

  function clearCart() {
    items.value = []
    otherNotes.value = ''
    paymentMethod.value = ''
  }

  function generatePayload(): string {
    const orderPayload: OrderPayload = {
      items: items.value,
      otherNotes: otherNotes.value,
      paymentMethod: paymentMethod.value,
      total: total.value,
    }

    const json = JSON.stringify(orderPayload)
    return encodeURIComponent(json)
  }

  return {
    items,
    otherNotes,
    paymentMethod,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    generatePayload,
  }
})
