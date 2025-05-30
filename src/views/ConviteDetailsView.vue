<template>
  <q-page padding>
    <div v-if="convite" class="row items-center justify-center q-gutter-md">
      <div style="width: 30rem">
        <q-carousel v-model="slide" arrows height="30rem" thumbnails swipeable animated>
          <q-carousel-slide v-for="(img, i) in convite.images" :key="i" :name="i" :img-src="img" />
        </q-carousel>
      </div>

      <QCard>
        <q-card-section>
          <div class="text-h5 q-mb-md">{{ convite.title }}</div>
          <div class="row items-center q-mb-sm">
            <div class="text-subtitle2">Preço:</div>
            <div class="text-h6 q-ml-sm">${{ convite.price.toFixed(2) }}</div>
          </div>
          <div class="q-mb-md">
            <div class="text-subtitle2">Detalhes:</div>
            <ul class="q-pl-lg">
              <li v-for="(d, idx) in convite.details" :key="idx">{{ d }}</li>
            </ul>
          </div>
          <div class="row q-gutter-sm">
            <q-btn label="Comprar" color="primary" />
            <q-btn flat label="Voltar" to="/convites" />
          </div>
        </q-card-section>
      </QCard>
    </div>
    <div v-else class="row justify-center">
      <q-spinner color="primary" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useConvitesStore } from '@/stores/convites'
import { QPage, QCard, QCardSection, QCarousel, QCarouselSlide, QBtn, QSpinner } from 'quasar'

const route = useRoute()
const conviteStore = useConvitesStore()
const slide = ref(0)

onMounted(async () => {
  if (!conviteStore.convites.length) {
    await conviteStore.getConvites()
  }
})

const convite = computed(() => {
  const id = Number(route.params.id)
  return conviteStore.convites.find((c) => c.id === id)
})
</script>
