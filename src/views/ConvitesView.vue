<template>
  <div class="full-width justify-center q-pa-lg row">
    <div>
      <h3>Filtros</h3>
    </div>
    <q-separator vertical class="q-mx-md" />
    <div><ExpandableCarrousel :items="conviteStore.convites" /></div>
  </div>
</template>

<script setup lang="ts">
import { useConvitesStore } from '@/stores/convites'
import ExpandableCarrousel from '@/wrappers/ExpandableCarrousel.vue'
import { onMounted } from 'vue'

const conviteStore = useConvitesStore()
onMounted(async () => {
  await conviteStore.getConvites()
})
</script>
