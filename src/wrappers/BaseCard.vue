<template>
  <div class="row wrap q-gutter-md">
    <q-card v-for="item in items" :key="item.id" class="my-card card" bordered>
      <q-card-section class="q-pa-none">
        <template v-if="item.images?.length">
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
            <q-carousel-slide v-for="(slide, i) in item.images" :key="i" :name="i">
              <q-img
                :src="slide"
                style="height: 100%; width: 100%; object-fit: cover"
                :ratio="16 / 9"
              >
                <template #loading>
                  <div class="row items-center justify-center" style="height: 100%">
                    <q-spinner color="primary" size="40px" />
                  </div>
                </template>
                <template #error>
                  <div class="row items-center justify-center" style="height: 100%">
                    <q-icon name="error" size="40px" color="negative" />
                  </div>
                </template>
              </q-img>
            </q-carousel-slide>
          </q-carousel>
        </template>

        <div v-else class="row items-center justify-center" style="height: 200px">
          <q-spinner color="primary" size="40px" />
        </div>
      </q-card-section>

      <q-card-section>
        <router-link :to="`/convites/${item.id}`" class="text-h6 card-title">
          {{ item.title }}
        </router-link>
        <div class="row justify-between text-subtitle2 q-mb-sm">
          <p>Cod: {{ item.cod }}</p>
          <p>Preço: R$ {{ item.price.toFixed(2).replace('.', ',') }}</p>
        </div>
        <q-btn
          fab
          color="primary"
          icon="add_shopping_cart"
          class="absolute"
          style="top: 0; right: 12px; transform: translateY(-50%)"
          @click="$emit('add-to-cart', item)"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, ref } from 'vue'
import type { Convite } from '@/models/convite'

defineEmits<{
  (emit: 'add-to-cart', item: Convite): void
}>()

const props = defineProps<{ items: Convite[] }>()

const autoplay = ref(true)
const itemCarouselIndex = reactive<Record<string | number, number>>({})

watch(
  () => props.items,
  (newItems) => {
    newItems.forEach((item) => {
      if (itemCarouselIndex[item.id] === undefined) {
        itemCarouselIndex[item.id] = 0
      }
    })
  },
  { immediate: true },
)
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
