<template>
  <div class="column q-mt-xl justify-center">
    <h1 class="text-center text-primary q-mt-md">Em Construção</h1>
    <p class="fs20 text-center q-mt-md">Em breve, você poderá encontrar mais informações aqui.</p>
    <p class="fs20 text-center q-mt-md">
      Para mais informações ou dúvidas, entre em contato conosco pelo WhatsApp.
    </p>
    <div class="q-mt-md flex justify-center">
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
  </div>
</template>
<script setup lang="ts">
import BaseButton from '@/wrappers/BaseButton.vue'
</script>
