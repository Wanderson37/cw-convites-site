<template>
  <q-carousel
    animated
    arrows
    :autoplay="autoplay"
    height="calc(100vh - 190px)"
    infinite
    thumbnails
    transition-prev="slide-right"
    transition-next="slide-left"
    v-model="slide"
    @mouseenter="autoplay = false"
    @mouseleave="autoplay = true"
  >
    <q-carousel-slide :name="1" img-src="/carrousel/1.jpg" />
    <q-carousel-slide :name="2" img-src="/carrousel/2.jpg" />
    <q-carousel-slide :name="3" img-src="/carrousel/3.jpg" />
  </q-carousel>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const slide = ref(1)
const autoplay = ref(true)
</script>
