<template>
  <div class="column items-center justify-center q-mt-xl">
    <h2 class="text-primary q-mb-md">Entre em contato conosco</h2>
    <div class="row items-center justify-center q-mb-lg" style="gap: 1rem">
      <div class="column items-center justify-center q-mr-md">
        <h4>Siga-nos no Instagram</h4>
        <BaseButton
          flat
          rounded
          dense
          to="https://www.instagram.com/cwconvites/"
          target="_blank"
          class="q-mt-md q-mb-xl"
        >
          <q-img src="/instagram.png" style="width: 100px; height: 100px" />
        </BaseButton>

        <h4>Nos envie um WhatsApp</h4>
        <BaseButton
          flat
          rounded
          dense
          to="https://wa.me/5592993969568"
          target="_blank"
          class="q-mt-md"
        >
          <q-img src="whatsapp.png" style="width: 100px; height: 100px" />
        </BaseButton>
      </div>

      <blockquote
        v-for="permalink in permalinks"
        :key="permalink"
        class="instagram-media"
        :data-instgrm-permalink="permalink"
        data-instgrm-version="14"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/wrappers/BaseButton.vue'
import { onMounted, computed } from 'vue'

const rawLinks = [
  'https://www.instagram.com/p/DLhqIxiAx-D',
  'https://www.instagram.com/p/DKfrdgZPxwJ',
]

const permalinks = computed(() => rawLinks.map((link) => link.split('?')[0]))

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void
      }
    }
  }
}

onMounted(() => {
  // dispara o parser de embeds do Instagram
  window.instgrm?.Embeds.process()
})
</script>
