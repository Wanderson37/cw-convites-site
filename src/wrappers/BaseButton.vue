<template>
  <q-btn v-bind="props" v-ripple>
    <template v-for="(_, slot) in slots" :key="slot" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope" :key="slot" />
    </template>
  </q-btn>
</template>

<script setup lang="ts">
import type { QBtnProps } from 'quasar'
import { useSlots } from 'vue'

const slots = useSlots() as never

const props = withDefaults(defineProps<QBtnProps>(), {
  color: 'secondary',
  noCaps: true,
  unelevated: true
})
</script>
