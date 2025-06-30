<template>
  <div class="row items-center justify-center q-gutter-md wrap">
    <q-card v-for="item in items" :key="item.id" class="my-card card" bordered>
      <q-card-section class="q-pa-none">
        <template v-if="item.images?.length">
          <router-link :to="`/convites/${item.id}`">
            <q-img
              :src="item.images[0]"
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
              </template> </q-img
          ></router-link>
        </template>

        <div v-else class="row items-center justify-center" style="height: 200px">
          <q-spinner color="primary" size="40px" />
        </div>
      </q-card-section>

      <q-card-section>
        <router-link :to="`/convites/${item.id}`" class="text-h6 card-title">
          {{ item.title }}
        </router-link>
        <div>
          <p class="text-subtitle2 q-ma-none">Cod: {{ item.cod }}</p>
          <p class="text-subtitle2 q-ma-none">
            Preço: R$ {{ item.price.toFixed(2).replace('.', ',') }}
          </p>
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
import { reactive, watch } from 'vue'
import type { Convite } from '@/models/convite'

defineEmits<{
  (emit: 'add-to-cart', item: Convite): void
}>()

const props = defineProps<{ items: Convite[] }>()

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
  width: 12rem
  cursor: pointer

.card-title
  color: var(--q-primary)
  text-decoration: none

.card-title:hover
  text-decoration: underline

.card
  cursor: pointer
  min-width: 12rem
  transition: all 0.3s

.card:hover
  scale: 1.05
</style>
