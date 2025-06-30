<template>
  <q-page v-if="!isDetail">
    <div class="full-width q-pa-lg row">
      <BaseButton
        v-if="$q.screen.lt.sm"
        color="primary"
        flat
        dense
        label="Filtros"
        icon="filter_list"
        @click="drawer = !drawer"
      />
      <q-drawer
        v-model="drawer"
        class="q-pa-lg"
        show-if-above
        :width="200"
        :breakpoint="500"
        bordered
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
      >
        <h3>Filtros</h3>
        <div v-for="filter in filters" :key="filter.title" class="q-mb-md">
          <b>{{ filter.title }}</b>
          <BaseOptionGroup
            v-model="filterOptions[filter.title]"
            :options="filter.filter"
            color="primary"
          />
        </div>
      </q-drawer>

      <BaseCard :items="convitesFiltrados" @add-to-cart="onConviteOrder" />
    </div>
  </q-page>

  <router-view v-if="isDetail" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useConvitesStore } from '@/stores/convites'
import { useCartStore } from '@/stores/cart'
import BaseOptionGroup from '@/wrappers/BaseOptionGroup.vue'
import BaseCard from '@/wrappers/BaseCard.vue'
import type { Convite } from '@/models/convite'
import BaseButton from '@/wrappers/BaseButton.vue'

const $q = useQuasar()
const conviteStore = useConvitesStore()
const cartStore = useCartStore()
const router = useRouter()
const route = useRoute()

const drawer = ref(false)
const isDetail = computed(() => route.name === 'convite-details')

const filterFieldMap: Record<string, keyof Convite> = {
  Tamanho: 'size',
  Tipo: 'type',
}

const filters = [
  {
    title: 'Tamanho',
    filter: [
      { label: '10x20cm', value: '10x20' },
      { label: '14x20cm', value: '14x20' },
      { label: '20x25cm', value: '20x25' },
    ],
  },
  {
    title: 'Tipo',
    filter: [
      { label: 'Convite', value: 'convite' },
      { label: 'Lembrancinha', value: 'lembrancinha' },
      { label: 'Personalizado', value: 'personalizado' },
    ],
  },
]

const filterOptions = reactive(
  filters.reduce(
    (acc, { title }) => {
      acc[title] = []
      return acc
    },
    {} as Record<string, string[]>,
  ),
)

const convitesFiltrados = computed(() =>
  conviteStore.convites.filter((convite) =>
    filters.every(({ title }) => {
      const selected = filterOptions[title]
      if (!selected || !selected.length) return true

      const field = filterFieldMap[title]
      const fieldValue = convite[field]?.toString().toLowerCase() || ''

      return selected.some((val) => fieldValue.includes(val.toString().toLowerCase()))
    }),
  ),
)

onMounted(async () => {
  await conviteStore.getConvites()
})

function onConviteOrder(item: Convite) {
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
    ok: { label: 'Sim', color: 'primary', flat: true, push: true },
    cancel: { label: 'Continuar comprando', color: 'primary' },
  }).onOk(() => router.push({ name: 'CarrinhoView' }))
}
</script>
