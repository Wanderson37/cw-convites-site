<template>
  <q-page padding>
    <q-card flat bordered class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Carrinho de Compras</div>
      </q-card-section>

      <q-table
        :rows="cartItems"
        :columns="columns"
        row-key="id"
        flat
        table-style="min-width: 600px"
      >
        <template v-slot:body-cell-quantity="{ row }">
          <q-btn dense flat round icon="remove" @click="decrease(row)" />
          <span class="q-mx-sm">{{ row.quantity }}</span>
          <q-btn dense flat round icon="add" @click="increase(row)" />
        </template>

        <template v-slot:body-cell-subtotal="{ row }">
          R$ {{ (row.price * row.quantity).toFixed(2).replace('.', ',') }}
        </template>

        <template v-slot:body-cell-remove="{ row }">
          <q-btn dense flat color="negative" icon="delete" @click="remove(row)" />
        </template>
      </q-table>

      <q-card-section align="right" class="q-pt-lg">
        <div class="text-h5 q-mb-sm">Total: R$ {{ total.toFixed(2).replace('.', ',') }}</div>
        <q-btn label="Finalizar Compra" color="primary" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import { QPage, QCard, QCardSection, QTable, QBtn } from 'quasar'

const cartStore = useCartStore()
const cartItems = computed(() => cartStore.items)
const total = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
)

function increase(row: { id: number; quantity: number }) {
  cartStore.updateQuantity(row.id, row.quantity + 1)
}
function decrease(row: { id: number; quantity: number }) {
  if (row.quantity > 1) {
    cartStore.updateQuantity(row.id, row.quantity - 1)
  }
}
function remove(row: { id: number }) {
  cartStore.remove(row.id)
}

const columns = [
  { name: 'product', label: 'Produto', field: 'title' },
  {
    name: 'price',
    label: 'Preço',
    field: 'price',
    format: (val: number) => `R$ ${val.toFixed(2).replace('.', ',')}`,
  },
  { name: 'quantity', label: 'Qtd', field: 'quantity' },
  { name: 'subtotal', label: 'Subtotal', field: (row: any) => row.price * row.quantity },
  { name: 'remove', label: '', field: 'remove' },
]
</script>

<style scoped>
/* ajuste responsivo, espaçamentos, etc. */
</style>
