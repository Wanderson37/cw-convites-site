<template>
  <div class="row wrap q-gutter-md">
    <q-card v-for="item in items" :key="item.id" class="my-card card" bordered>
      <!-- Imagem como carrossel, clicável -->
      <q-card-section class="q-pa-none">
        <template v-if="item.images?.length">
          <router-link :to="`/convites/${item.id}`">
            <q-carousel
              animated
              :autoplay="autoplay"
              height="200px"
              infinite
              transition-prev="slide-right"
              transition-next="slide-left"
              swipeable
              v-model="itemCarouselIndex[item.id]"
              @mouseenter="autoplay = true"
              @mouseleave="autoplay = false"
            >
              <q-carousel-slide
                v-for="(slide, i) in item.images"
                :key="i"
                :name="i"
                :img-src="slide"
              />
            </q-carousel>
          </router-link>
        </template>
        <div v-else class="row items-center justify-center" style="height: 200px">
          <q-spinner color="primary" size="40px" />
        </div>
      </q-card-section>

      <!-- Descrição abaixo da imagem -->
      <q-card-section>
        <router-link :to="`/convites/${item.id}`" class="text-h6 card-title">
          {{ item.title }}
        </router-link>
        <q-btn
          fab
          color="primary"
          icon="add_shopping_cart"
          class="absolute"
          style="top: 0; right: 12px; transform: translateY(-50%)"
        />

        <div class="text-subtitle2 q-mt-sm">
          Preço: R$ {{ item.price.toFixed(2).replace('.', ',') }}
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { Convite } from '@/models/convite'
import { ref } from 'vue'

const props = defineProps<{ items: Convite[] }>()

// Controle de índice do carrossel para cada item

const autoplay = ref(true)
const itemCarouselIndex = reactive<Record<string | number, number>>({})
props.items.forEach((item) => {
  itemCarouselIndex[item.id] = 0
})
</script>

<style scoped lang="sass">
.my-card
  width: 18rem
  cursor: pointer

.card-title
  color: var(--q-primary)
  text-decoration: none

.card-title:hover
  text-decoration: underline

.card
  cursor: pointer
  min-width: 15rem
  transition: all 0.3s

.card:hover
  scale: 1.05
</style>
