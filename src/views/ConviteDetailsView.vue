<template>
  <q-page padding>
    <div v-if="convite" class="row items-center justify-center q-gutter-md q-mb-lg">
      <div style="width: 30rem">
        <q-carousel v-model="slide" arrows height="30rem" thumbnails swipeable animated>
          <q-carousel-slide v-for="(img, i) in convite.images" :key="i" :name="i" :img-src="img" />
        </q-carousel>
      </div>

      <q-card>
        <q-card-section>
          <h1>{{ convite.title }}</h1>
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
              <li v-for="(d, idx) in convite.details" :key="idx">{{ d }}</li>
            </ul>
          </div>
          <div class="row items-center q-mb-lg">
            <div class="text-subtitle2">Preço unitário:</div>
            <div class="text-h6 q-ml-sm">R$ {{ convite.price.toFixed(2) }}</div>
          </div>
          <div class="row">
            <div class="row items-center q-mr-sm">
              <div class="text-subtitle2">Total:</div>
              <div class="text-h6 q-ml-sm">R$ {{ (conviteOrder * convite.price).toFixed(2) }}</div>
            </div>
            <BaseInput
              class="q-mr-sm"
              dense
              label="Quantidade"
              :max="1000"
              :min="convite.minimalOrder"
              type="number"
              v-model="conviteOrder"
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
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useConvitesStore } from '@/stores/convites'
import BaseButton from '@/wrappers/BaseButton.vue'
import BaseInput from '@/wrappers/BaseInput.vue'

const route = useRoute()
const conviteStore = useConvitesStore()
const slide = ref(0)

const conviteOrder = ref(1)

onMounted(async () => {
  if (!conviteStore.convites.length) {
    await conviteStore.getConvites()
  }
})

const convite = computed(() => {
  const id = Number(route.params.id)
  return conviteStore.convites.find((c) => c.id === id)
})

function onConviteOrder() {
  if (convite.value) {
    conviteStore.orderConvite(convite.value.id)
  }
}
</script>
