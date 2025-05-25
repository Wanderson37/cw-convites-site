<template>
  <div>
    <!-- Thumbnail Row -->
    <div class="row items-center q-mb-md q-gutter-md">
      <div
        v-for="(item, idx) in items"
        :key="item.id"
        class="cursor-pointer"
        @click="toggleExpand(idx)"
      >
        <q-img
          :src="item.thumbnail"
          :alt="item.title"
          :class="['thumbnail', expandedIndex === idx ? 'border-primary' : '']"
          style="width: 10rem; height: 10rem"
        />
      </div>
    </div>

    <!-- Expanded Section -->
    <q-expansion-item
      v-if="expandedIndex !== null"
      v-model="isOpen"
      :header-class="['hidden']"
      expand-separator
      dense
      switch-toggle-side
    >
      <template v-slot:header>
        <!-- Header hidden: controlled by thumbnails -->
      </template>

      <div class="row q-pa-md items-start">
        <!-- Carousel -->
        <q-carousel
          v-model="carouselIndex"
          navigation
          arrows
          animated
          swipeable
          class="rounded-borders shadow-1"
          style="width: 400px"
        >
          <q-carousel-slide
            v-for="(slide, i) in items[expandedIndex].images"
            :name="i"
            :key="i"
            :img-src="slide"
          />
        </q-carousel>

        <!-- Details -->
        <div class="column q-pl-md" style="flex: 1">
          <h3>{{ props.items[expandedIndex]?.title }}</h3>
          <ul class="q-pl-md">
            <li v-for="(line, i) in props.items[expandedIndex]?.details" :key="i">
              <b>Descrição: </b>{{ line }}
            </li>
            <li>
              <b>Preço: </b>
              <span class="text-primary">
                R$ {{ props.items[expandedIndex]?.price.toFixed(2).replace('.', ',') }}
              </span>
            </li>
          </ul>
          <BaseInput dense v-model="inputValue"></BaseInput>
        </div>
      </div>
    </q-expansion-item>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { QImg, QExpansionItem, QCarousel, QCarouselSlide } from 'quasar'

// Props
interface ExpandableCarrouselItem {
  id: string | number
  thumbnail: string
  title: string
  images: string[]
  details: string[]
}

const props = defineProps<{
  items: ExpandableCarrouselItem[]
}>()

// State
import type { Ref } from 'vue'
import BaseInput from '@/wrappers/BaseInput.vue'
const expandedIndex: Ref<number | null> = ref(null)
const isOpen = ref(false)
const carouselIndex = ref(0)
const inputValue = ref('')

// Methods
function toggleExpand(idx: number) {
  if (expandedIndex.value === idx) {
    // Close if clicking same
    isOpen.value = !isOpen.value
  } else {
    expandedIndex.value = idx
    carouselIndex.value = 0
    isOpen.value = true
  }
}

// Close expansion when toggled off
watch(isOpen, (val) => {
  if (!val) {
    expandedIndex.value = null
  }
})
</script>

<style scoped>
.thumbnail {
  width: 80px;
  height: 80px;
  border-radius: 8px;
}
.border-primary {
  border: 2px solid var(--q-primary);
}
</style>
