<template>
  <q-page>
    <div class="full-width q-pa-lg row">
      <q-drawer
        v-model="drawer"
        class="q-pa-lg"
        show-if-above
        :mini="!drawer || miniState"
        @click.capture="drawerClick"
        :width="200"
        :breakpoint="500"
        bordered
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
      >
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
      </q-drawer>
      <q-separator vertical class="q-mx-lg" />
      <BaseCard :items="conviteStore.convites" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useConvitesStore } from '@/stores/convites'
import BaseOptionGroup from '@/wrappers/BaseOptionGroup.vue'

import { onMounted, ref } from 'vue'
import BaseCard from '@/wrappers/BaseCard.vue'

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
const miniState = ref(false)
const drawer = ref(false)
const drawerClick = () => {
  miniState.value = !miniState.value
}

onMounted(async () => {
  await conviteStore.getConvites()
  console.log('Convites loaded:', conviteStore.convites)
})
</script>
