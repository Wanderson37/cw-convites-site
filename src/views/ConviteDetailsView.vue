<template>
  <q-page padding>
    <div v-if="convite" class="row items-center justify-center q-gutter-md q-mb-lg">
      <div style="width: 30rem">
        <q-carousel v-model="slide" arrows height="30rem" thumbnails swipeable animated>
          <q-carousel-slide
            v-for="(img, i) in convite.images"
            :key="i"
            :name="i"
            :img-src="img"
            class="cursor-pointer"
            @click="openLightbox(i)"
          />
        </q-carousel>
        <vue-easy-lightbox
          :visible="lightboxVisible"
          :imgs="convite.images"
          :index="lightboxIndex"
          @hide="lightboxVisible = false"
        />
      </div>

      <q-card>
        <q-card-section>
          <h1>{{ convite.title }}</h1>
          <div class="text-subtitle2 q-mb-lg">{{ convite.cod }}</div>

          <div class="row items-center q-mb-sm">
            <div class="text-subtitle2">Medida:</div>
            <div class="text-h6 q-ml-sm">{{ convite.size }}</div>
          </div>

          <div class="row items-center q-mb-sm">
            <div class="text-subtitle2">Papel convite:</div>
            <div class="text-h6 q-ml-sm">{{ convite.invitePaper }}</div>
          </div>

          <div class="row items-center q-mb-sm">
            <div class="text-subtitle2">Papel envelope:</div>
            <div class="text-h6 q-ml-sm">{{ convite.envelopePaper }}</div>
          </div>

          <div class="q-mb-md">
            <div class="text-subtitle2">Incluso:</div>
            <ul class="q-pl-lg">
              <li v-for="(d, idx) in convite.details" :key="idx">
                {{ d }}
              </li>
            </ul>
          </div>

          <div class="row items-center q-mb-lg">
            <div class="text-subtitle2">Preço unitário:</div>
            <div class="text-h6 q-ml-sm">R$ {{ formatoPreco(convite.price) }}</div>
          </div>

          <div class="row items-center">
            <div class="row items-center q-mr-sm">
              <div class="text-subtitle2">Total:</div>
              <div class="text-h6 q-ml-sm">R$ {{ formatoPreco(conviteOrder * convite.price) }}</div>
            </div>

            <BaseInput
              class="q-mr-sm"
              dense
              label="Quantidade"
              :min="convite.minimalOrder"
              :max="1000"
              type="number"
              v-model.number="conviteOrder"
            />

            <BaseButton
              color="primary"
              :disable="conviteOrder < convite.minimalOrder"
              dense
              label="Comprar"
              @click="onConviteOrder"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div v-else class="row justify-center">
      <q-spinner color="primary" />
    </div>

    <div>
      <h1 class="text-center">Passos após compra</h1>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useConvitesStore } from '@/stores/convites'
import { useCartStore } from '@/stores/cart.ts'
import BaseButton from '@/wrappers/BaseButton.vue'
import BaseInput from '@/wrappers/BaseInput.vue'
import { useQuasar } from 'quasar'
import VueEasyLightbox from 'vue-easy-lightbox'

const $q = useQuasar()
const route = useRoute()
const router = useRouter()

const conviteStore = useConvitesStore()
const cartStore = useCartStore()

const lightboxVisible = ref(false)
const lightboxIndex = ref(0)
const slide = ref(0)

const conviteOrder = ref<number>(1)

onMounted(async () => {
  if (!conviteStore.convites.length) {
    await conviteStore.getConvites()
  }
})

const convite = computed(() => {
  const id = Number(route.params.id)
  return conviteStore.convites.find((c) => c.id === id) || null
})

watch(
  convite,
  (newVal) => {
    if (newVal) {
      conviteOrder.value = newVal.minimalOrder
    }
  },
  { immediate: true },
)

function formatoPreco(valor: number): string {
  return valor.toFixed(2).replace('.', ',')
}

function onConviteOrder() {
  if (!convite.value) return

  const item = convite.value

  cartStore.addToCart({
    id: item.id,
    cod: item.cod,
    title: item.title,
    price: item.price,
    image: item.images[0],
    minimalOrder: item.minimalOrder,
  })

  cartStore.updateQuantity(item.id, conviteOrder.value)
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
function openLightbox(i: number) {
  lightboxIndex.value = i
  lightboxVisible.value = true
}
</script>
