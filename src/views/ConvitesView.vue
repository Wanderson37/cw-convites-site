<template>
  <q-page>
    <div class="full-width q-pa-lg row">
      <div>
        <h3>Filtros</h3>
        <b>Tamanhos</b>
        <BaseOptionGroup v-model="filterOptions" :options="convitesOptionsSize" color="primary" />
        <b>Papel Convite</b>
        <BaseOptionGroup
          v-model="filterOptions"
          :options="convitesOptionsPaperInvite"
          color="primary"
        />
        <b>Papel Envelope</b>
        <BaseOptionGroup
          v-model="filterOptions"
          :options="convitesOptionsPaperEnvelope"
          color="primary"
        />
        <b>Acabamentos</b>
        <BaseOptionGroup
          v-model="filterOptions"
          :options="convitesOptionsFinishing"
          color="primary"
        />
        <b>Tipo de Convite</b>
        <BaseOptionGroup v-model="filterOptions" :options="convitesOptionsTypes" color="primary" />
      </div>
      <q-separator vertical class="q-mx-lg" />
      <div><ExpandableCarrousel :items="conviteStore.convites" /></div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useConvitesStore } from '@/stores/convites'
import BaseOptionGroup from '@/wrappers/BaseOptionGroup.vue'
import ExpandableCarrousel from '@/wrappers/ExpandableCarrousel.vue'
import { onMounted } from 'vue'

const conviteStore = useConvitesStore()

const convitesOptionsSize = [
  { label: '14x20cm', value: '14x20' },
  { label: '20x25cm', value: '10x15' },
]
const convitesOptionsPaperInvite = [
  { label: 'Papel Perolado Aspen 250g', value: 'aspen250' },
  { label: 'Papel Offset 240g', value: 'offset240' },
]
const convitesOptionsPaperEnvelope = [
  { label: 'Papel ColorPlus 250g', value: 'colorplus250' },
  { label: 'Papel ColorPlus 180g', value: 'colorplus180' },
  { label: 'Papel Alaska 180g', value: 'alaska180' },
]
const convitesOptionsFinishing = [
  { label: 'Fita de cetim', value: 'fitaDeCetim' },
  { label: 'Lacre de cera', value: 'lacreDeCera' },
]
const convitesOptionsTypes = [
  { label: 'Rústico', value: 'rustico' },
  { label: 'Tradicional', value: 'tradicional' },
]
const filterOptions = [{}]

onMounted(async () => {
  await conviteStore.getConvites()
})
</script>
