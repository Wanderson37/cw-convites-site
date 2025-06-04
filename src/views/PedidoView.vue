<template>
  <q-page padding>
    <h1 class="text-center text-primary">Parabéns! Seu pedido foi enviado!</h1>
    <p class="text-center">Aguarde nosso time de vendas entrar em contato em até 1 dia útil!</p>
    <q-card flat bordered class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Detalhes do Pedido</div>
      </q-card-section>

      <q-separator />

      <div v-if="order">
        <q-card-section class="q-pt-none q-pa-md">
          <div v-for="item in order.items" :key="item.id" class="row items-center q-mb-md">
            <div class="col-6">
              <div class="text-subtitle1">{{ item.title }}</div>
              <div class="text-caption">
                R$ {{ item.price.toFixed(2).replace('.', ',') }} × {{ item.quantity }}
                {{ item.quantity > 1 ? 'un.' : 'un.' }}
              </div>
            </div>
            <div class="col-3">
              <div>
                Subtotal:
                <strong>
                  R$
                  {{ (item.price * item.quantity).toFixed(2).replace('.', ',') }}
                </strong>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-separator class="q-mb-md" />

        <q-card-section class="q-pt-none q-pb-md">
          <div class="text-subtitle2 q-mb-sm">Outras instruções / Observações:</div>
          <div>{{ order.otherNotes || 'Nenhuma' }}</div>
        </q-card-section>

        <q-separator />

        <q-card-section class="q-pt-md q-pb-md">
          <div class="text-subtitle2 q-mb-sm">Forma de pagamento:</div>
          <div>{{ formatPaymentMethod(order.paymentMethod) }}</div>
        </q-card-section>

        <q-separator class="q-my-md" />

        <q-card-section align="right" class="q-pt-none">
          <div class="text-h5">Total Geral: R$ {{ order.total.toFixed(2).replace('.', ',') }}</div>
        </q-card-section>
      </div>

      <div v-else class="row items-center justify-center q-pa-xl">
        <span class="text-subtitle2">Pedido inválido ou não encontrado.</span>
      </div>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { QPage, QCard, QCardSection, QSeparator } from 'quasar'

interface CartItem {
  id: number | string
  title: string
  price: number
  quantity: number
}

interface OrderPayload {
  items: CartItem[]
  otherNotes: string
  paymentMethod: string
  total: number
  parcelamento?: number
}

const route = useRoute()
const order = ref<OrderPayload | null>(null)

onMounted(() => {
  const raw = (route.query.payload as string) || ''
  if (raw) {
    try {
      const json = atob(decodeURIComponent(raw))
      order.value = JSON.parse(json) as OrderPayload
    } catch (e) {
      console.warn('Falha ao decodificar payload:', e)
      order.value = null
    }
  }
})

function formatPaymentMethod(method: string): string {
  switch (method) {
    case 'pix':
      return 'PIX (5% de desconto aplicado)'
    case 'cartao':
      return `Cartão de Crédito ${order.value?.parcelamento ?? 1}x parcelas`
    default:
      return method || 'Não especificada'
  }
}
</script>
