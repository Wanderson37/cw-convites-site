<template>
  <q-input ref="root" style="min-width: 15rem" v-bind="props" v-model.trim="value">
    <template v-for="(_, slot) in slots" :key="slot" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope" :key="slot" />
    </template>
  </q-input>
</template>

<script lang="ts">
import { QInput, type QInputProps, type QInputSlots } from 'quasar'

const events: [
  'update:modelValue',
  'clear',
  'focus',
  'blur',
  'popupShow',
  'popupHide',
  'paste',
  'change',
  'keydown',
  'click',
  'animationend',
] = QInput.emits
</script>

<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'

const emits = defineEmits(events)
const props = withDefaults(defineProps<QInputProps>(), {
  bottomSlots: true,
  bgColor: 'grey-4',
  hideHint: true,
  lazyRules: true,
  outlined: true,
})

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  },
})

const slots = useSlots() as never as QInputSlots

const root = ref<QInput>()
defineExpose({
  resetValidation: () => root.value?.resetValidation(),
  validate: (value: unknown) => root.value?.validate(value),
  focus: () => root.value?.focus(),
  blur: () => root.value?.blur(),
  select: () => root.value?.select(),
  getNativeElement: () => root.value?.getNativeElement(),
  hasError: computed(() => root.value?.hasError),
  nativeEl: computed(() => root.value?.nativeEl),
})
</script>

<style lang="sass">
input:-webkit-autofill
  -webkit-box-shadow: 0 0 0 1000px var(--q-grey-4) inset !important
  box-shadow: 0 0 0 1000px var(--q-grey-4) inset !important


input:-moz-autofill
  box-shadow: 0 0 0 1000px var(--q-grey-4) inset !important
</style>
