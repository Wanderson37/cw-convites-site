<template>
  <q-page padding>
    <q-card flat bordered class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Carrinho de Compras</div>
      </q-card-section>

      <q-table :rows="cartItems" :columns="columnsResponsive" row-key="id" flat>
        <template #body-cell-image="props">
          <q-td class="text-center">
            <RouterLink :to="`/convites/${props.row.id}`">
              <q-img
                :src="props.row.image"
                style="width: 100px; height: 100px"
                contain
                class="rounded-borders"
              />
            </RouterLink>
          </q-td>
        </template>
        <template #body-cell-product="props">
          <q-td>
            <RouterLink :to="`/convites/${props.row.id}`">
              {{ props.row.title }}
            </RouterLink>
          </q-td>
        </template>
        <template #body-cell-quantity="props">
          <q-td class="text-center">
            <q-btn
              dense
              :disabled="props.row.minimalOrder >= props.row.quantity"
              flat
              round
              icon="remove"
              @click="decrease(props.row)"
            />
            <span class="q-mx-sm">{{ props.row.quantity }}</span>
            <q-btn dense flat round icon="add" @click="increase(props.row)" />
          </q-td>
        </template>

        <template #body-cell-subtotal="props">
          <q-td class="text-center">
            R$ {{ (props.row.price * props.row.quantity).toFixed(2).replace('.', ',') }}</q-td
          >
        </template>

        <template #body-cell-remove="props">
          <q-td>
            <q-btn dense flat color="negative" icon="delete" @click="remove(props.row)"
          /></q-td>
        </template>
      </q-table>

      <q-card-section class="q-pt-lg">
        <BaseInput
          filled
          label="Outras instruções / Observações"
          type="textarea"
          v-model="cart.otherNotes"
          autogrow
          placeholder="Ex: Preciso de envelopes extras, gravar nomes, etc."
        />
      </q-card-section>
      <q-card-section>
        <q-form ref="pedidoForm">
          <div class="text-subtitle2 q-mb-sm">Informações</div>
          <div class="row items-center q-gutter-md">
            <BaseInput
              v-model="form.client"
              dense
              label="Seu nome"
              required
              :rules="[(v) => !!v || 'Nome é obrigatório']"
            />
            <BaseInput
              v-model="form.cpf"
              dense
              label="CPF"
              mask="###.###.###-##"
              :rules="form.cpf ? [cpfRule] : []"
            />
            <BaseInputDate
              v-model="form.eventDate"
              label="Data do evento"
              lazy-rules
              mask="##/##/####"
              :rules="[(v) => !!v || 'Data é obrigatória', dateRule]"
              required
            />
            <BaseInput
              v-model="form.contact"
              dense
              label="Celular"
              lazy-rules
              mask="(##) #####-####"
              :rules="[(v) => !!v || 'Celular é obrigatório', phoneRule]"
              required
            />
            <BaseInput v-model="form.clientMail" dense label="E-mail" :rules="[emailRule]" />
            <BaseInput v-model="form.cerimonial" dense label="Nome do cerimonial" />
          </div>
        </q-form>
      </q-card-section>

      <q-card-section>
        <div class="text-subtitle2 q-mb-sm">Forma de pagamento</div>
        <q-option-group
          v-model="cart.paymentMethod"
          :options="paymentOptions"
          type="radio"
          inline
        />
      </q-card-section>

      <q-card-section v-if="cart.paymentMethod === 'cartao'">
        <div class="text-subtitle2 q-mb-sm">Parcelas</div>
        <q-option-group v-model="parcelas" :options="paymentOptionsCartaoFiltered" type="radio" />
      </q-card-section>

      <q-card-section align="right" class="q-pt-lg">
        <div v-if="cart.paymentMethod === 'pix'" class="text-subtitle2 q-mb-sm">
          5% de desconto no PIX
        </div>
        <div class="text-h5 q-mb-sm">Total: R$ {{ displayTotal }}</div>
        <q-btn label="Enviar pedido" color="primary" @click="onEnviarEmailEFinalizar" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart.ts'
import BaseInput from '@/wrappers/BaseInput.vue'
import emailjs from 'emailjs-com'
import BaseInputDate from '@/wrappers/BaseInputDate.vue'
import { cpfRule, phoneRule, dateRule, emailRule } from '@/utils/validators'
import { QForm, useQuasar } from 'quasar'

emailjs.init('7j7_HNctbNiHuJi39')

const $q = useQuasar()
const cart = useCartStore()
const router = useRouter()

const form = ref({
  client: '',
  cpf: '',
  contact: '',
  eventDate: '',
  cerimonial: '',
  clientMail: '',
})
const pedidoForm = ref<InstanceType<typeof QForm> | null>(null)
const urlSite = ref(window.location.href)

const allInstallments = [1, 2, 3, 4, 5, 6]
const cartItems = computed(() => cart.items)
const currentDate = computed(() => {
  const d = new Date()
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
})
const displayTotal = computed(() => {
  let total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  if (cart.paymentMethod === 'pix') {
    total *= 0.95
  }
  return total.toFixed(2).replace('.', ',')
})
const itemsForEmail = computed(() => {
  return cart.items.map((item) => {
    const priceUnit = item.price.toFixed(2).replace('.', ',')
    const priceTotal = (item.price * item.quantity).toFixed(2).replace('.', ',')
    return {
      cod: item.cod,
      product: item.title,
      units: item.quantity,
      priceUnit,
      priceTotal,
    }
  })
})
const otherNotes = computed(() => cart.otherNotes || '—')
const paymentMethod = computed(() => cart.paymentMethod || '—')
const paymentOptionsCartao = computed(() =>
  allInstallments.map((n) => {
    const parcelaValor = totalNumber.value / n
    const formatted = `R$ ${parcelaValor.toFixed(2).replace('.', ',')}`
    return {
      label: n === 1 ? `À vista (${formatted})` : `${n}x de ${formatted} sem juros`,
      value: n.toString(),
    }
  }),
)
const totalFormatted = computed(() => {
  const soma = cart.items.reduce((acc, i) => acc + i.price * i.quantity, 0)
  return soma.toFixed(2).replace('.', ',')
})
const totalNumber = computed(
  () =>
    cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0) *
    (cart.paymentMethod === 'pix' ? 0.95 : 1),
)
const paymentOptionsCartaoFiltered = computed(() =>
  paymentOptionsCartao.value
    .filter((opt) => {
      const n = parseInt(opt.value, 10)
      return totalNumber.value / n >= 150
    })
    .slice(0, 5),
)
const parcelas = ref(paymentOptionsCartaoFiltered.value[0]?.value || '1')

function increase(row: { id: string | number; quantity: number }) {
  cart.updateQuantity(row.id, row.quantity + 1)
}
function decrease(row: { id: string | number; quantity: number }) {
  if (row.quantity > 1) {
    cart.updateQuantity(row.id, row.quantity - 1)
  }
}
async function onEnviarEmailEFinalizar() {
  const valid = await pedidoForm.value?.validate()
  if (!valid) {
    console.error('Formulário inválido')
    return
  }

  const templateParams = {
    currentDate: currentDate.value,
    cerimonial: form.value.cerimonial,
    client: form.value.client,
    cpf: form.value.cpf,
    clientMail: form.value.clientMail,
    contact: form.value.contact,
    contactF: form.value.contact.replace(/\D/g, ''),
    eventDate: form.value.eventDate,
    items: itemsForEmail.value,
    total: totalFormatted.value,
    otherNotes: otherNotes.value,
    paymentMethod: paymentMethod.value,
    parcelas: parcelas.value,
    urlSite: urlSite.value,
    vendor_email: 'vendascwconvites@gmail.com',
  }

  try {
    await emailjs.send('service_uu16g3b', 'template_3dvb2zn', templateParams, '7j7_HNctbNiHuJi39')
    console.log('E-mail enviado com sucesso!')

    const payload = {
      items: cart.items,
      otherNotes: cart.otherNotes,
      paymentMethod: cart.paymentMethod,
      total: Number(cart.items.reduce((s, i) => s + i.price * i.quantity, 0)),
      parcelamento: Number(parcelas.value),
    }
    const encoded = encodeURIComponent(btoa(JSON.stringify(payload)))
    router.push({ name: 'PedidoView', query: { payload: encoded } })
  } catch (err) {
    console.error('Falha ao enviar e-mail:', err)
    alert('Erro ao enviar e-mail. Tente novamente depois.')
  }
}
function remove(row: { id: string | number }) {
  cart.removeFromCart(row.id)
}

const paymentOptions = [
  { label: 'Pix', value: 'pix' },
  { label: 'Cartão de Crédito', value: 'cartao' },
]
const columns = [
  {
    name: 'image',
    label: 'Imagem',
    field: 'image',
    align: 'center' as const,
    style: 'width: 100px',
  },
  { name: 'cod', label: 'Cod', field: 'cod', align: 'left' as const },
  { name: 'product', label: 'Produto', field: 'title', align: 'left' as const },
  {
    name: 'price',
    label: 'Preço',
    field: 'price',
    align: 'left' as const,
    format: (val: number) => `R$ ${val.toFixed(2).replace('.', ',')}`,
  },
  { name: 'quantity', label: 'Qtd', field: 'quantity', align: 'center' as const },
  {
    name: 'subtotal',
    label: 'Subtotal',
    field: (row: { price: number; quantity: number }) => row.price * row.quantity,
    align: 'center' as const,
  },
  { name: 'remove', label: '', field: 'remove', align: 'center' as const },
]
const columnsResponsive = computed(() => {
  return $q.screen.lt.sm
    ? columns.filter((col) => col.name !== 'image' && col.name !== 'cod' && col.name !== 'price')
    : columns
})
</script>
