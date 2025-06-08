<template>
  <q-input ref="root" v-bind="props" v-model.trim="value" style="min-width: 15rem">
    <template #append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transitionShow="scale" transitionHide="scale">
          <q-date
            v-model="value"
            color="primary"
            mask="DD-MM-YYYY"
            :options="dateOptions"
            todayBtn
          />
        </q-popup-proxy>
      </q-icon>
    </template>
    <template v-for="(_, slot) in slots" :key="slot" #[slot]="scope">
      <slot v-bind="scope" :key="slot" :name="slot" />
    </template>
  </q-input>
</template>

<script lang="ts">
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
import { QInput, type QInputProps, type QInputSlots, date as dateUtils } from 'quasar'
const props = withDefaults(
  defineProps<
    {
      min?: string
      max?: string
      options?: ((date: string) => boolean) | ((date: string) => boolean)[]
    } & QInputProps
  >(),
  {
    bottomSlots: true,
    bgColor: 'grey-3',
    fillMask: true,
    hideBottomSpace: true,
    dense: true,
    hideHint: true,
    hint: 'YYYY-MM-DD',
    lazyRules: true,

    min: '',
    max: '',
    options: undefined,
    outlined: true,
  },
)
const emits = defineEmits(events)
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

function isoToTimestamp(isoDate: string): number {
  if (!isoDate) {
    return NaN
  }
  const reformatted = isoDate.replace(/-/g, '/')
  const dt = dateUtils.extractDate(reformatted, 'YYYY/MM/DD')
  return dt.getTime()
}

const dateOptions = (date: string): boolean => {
  const cellTime = dateUtils.extractDate(date, 'YYYY/MM/DD').getTime()

  const minTime = props.min ? isoToTimestamp(props.min) : NaN
  const maxTime = props.max ? isoToTimestamp(props.max) : NaN

  if (!isNaN(minTime) && !isNaN(maxTime)) {
    return cellTime >= minTime && cellTime <= maxTime
  }
  if (!isNaN(minTime)) {
    return cellTime >= minTime
  }
  if (!isNaN(maxTime)) {
    return cellTime <= maxTime
  }
  return true
}
</script>

<style lang="sass">
input:-webkit-autofill
  -webkit-box-shadow: 0 0 0 1000px #F8F9FE inset !important
  box-shadow: 0 0 0 1000px #F8F9FE inset !important


input:-moz-autofill
  box-shadow: 0 0 0 1000px #F8F9FE inset !important
</style>
