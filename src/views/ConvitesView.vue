<template>
  <template v-if="!isDetail">
    <q-page>
      <div class="full-width q-pa-lg row">
        <q-drawer
          v-model="drawer"
          class="q-pa-lg"
          show-if-above
          :mini="!drawer || miniState"
          @click.capture="drawerClick"
          :width="200"
          :breakpoint="500"
          bordered
          :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
        >
          <h3>Filtros</h3>
          <b>Tamanhos</b>
          <BaseOptionGroup v-model="filterOptions" :options="convitesOptionsSize" color="primary" />
          <b>Papel Convite</b>
          <BaseOptionGroup
            v-model="filterOptions"
            :options="convitesOptionsPaperInvite"
            color="primary"
          />
          <b>Papel Envelope</b>
          <BaseOptionGroup
            v-model="filterOptions"
            :options="convitesOptionsPaperEnvelope"
            color="primary"
          />
          <b>Acabamentos</b>
          <BaseOptionGroup
            v-model="filterOptions"
            :options="convitesOptionsFinishing"
            color="primary"
          />
          <b>Tipo de Convite</b>
          <BaseOptionGroup
            v-model="filterOptions"
            :options="convitesOptionsTypes"
            color="primary"
          />
        </q-drawer>
        <q-separator vertical class="q-mx-lg" />
        <!-- seus cards -->
        <BaseCard :items="conviteStore.convites" @add-to-cart="onConviteOrder" />
      </div>
    </q-page>
  </template>

  <template v-if="isDetail">
    <router-view />
  </template>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useConvitesStore } from '@/stores/convites'
import BaseOptionGroup from '@/wrappers/BaseOptionGroup.vue'
import BaseCard from '@/wrappers/BaseCard.vue'
import { useCartStore } from '@/stores/cart'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const conviteStore = useConvitesStore()
const cartStore = useCartStore()
const router = useRouter()
const route = useRoute()

const convitesOptionsSize = [
  { label: '14x20cm', value: '14x20' },
  { label: '20x25cm', value: '10x15' },
]
const convitesOptionsPaperInvite = [
  { label: 'Papel Perolado Aspen 250g', value: 'aspen250' },
  { label: 'Papel Offset 240g', value: 'offset240' },
]
const convitesOptionsPaperEnvelope = [
  { label: 'Papel ColorPlus 250g', value: 'colorplus250' },
  { label: 'Papel ColorPlus 180g', value: 'colorplus180' },
  { label: 'Papel Alaska 180g', value: 'alaska180' },
]
const convitesOptionsFinishing = [
  { label: 'Fita de cetim', value: 'fitaDeCetim' },
  { label: 'Lacre de cera', value: 'lacreDeCera' },
]
const convitesOptionsTypes = [
  { label: 'Rústico', value: 'rustico' },
  { label: 'Tradicional', value: 'tradicional' },
]
const filterOptions = [{}]
const miniState = ref(false)
const drawer = ref(false)
const drawerClick = () => {
  miniState.value = !miniState.value
}

onMounted(async () => {
  await conviteStore.getConvites()
})

const isDetail = computed(() => route.name === 'convite-details')

interface ConviteOrder {
  id: number | string
  cod: string
  title: string
  price: number
  images: string[]
  minimalOrder: number
}

function onConviteOrder(item: ConviteOrder) {
  if (!item) return

  cartStore.addToCart({
    id: item.id,
    cod: item.cod,
    title: item.title,
    price: item.price,
    image: item.images[0],
    minimalOrder: item.minimalOrder,
  })

  cartStore.updateQuantity(item.id, item.minimalOrder)

  $q.dialog({
    title: 'Convite adicionado ao carrinho',
    message: `Você quer ir para o carrinho?`,
    ok: {
      label: 'Sim',
      color: 'primary',
      flat: true,
      push: true,
    },
    cancel: {
      label: 'Continuar comprando',
      color: 'primary',
    },
  })
    .onOk(() => {
      router.push({ name: 'CarrinhoView' })
    })
    .onCancel(() => {})
}
</script>
