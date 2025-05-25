<template>
  <div class="flex items-center">
    <q-option-group v-bind="props" v-model.trim="model">
      <template v-for="(_, slot) in slots" :key="slot" v-slot:[slot]="scope">
        <slot :name="slot" v-bind="scope" :key="slot" />
      </template>
    </q-option-group>
    <div v-if="props.otherOption" class="flex items-center q-gutter-x-sm">
      <q-checkbox :color="props.color" label="Other" v-model="customOption.checkbox" />
      <BaseInput
        v-if="customOption.checkbox"
        debounce="500"
        dense
        hide-bottom-space
        v-model.trim="customOption.input"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  QOptionGroup,
  type QOptionGroupProps as OriginalQOptionGroupProps,
  type QOptionGroupSlots,
} from 'quasar'
import BaseInput from './BaseInput.vue'

interface QOptionGroupProps extends OriginalQOptionGroupProps {
  otherOption?: boolean
}

const events: ['update:modelValue'] = QOptionGroup.emits
</script>

<script setup lang="ts">
import { ref, useSlots, watch } from 'vue'

defineEmits(events)
const props = withDefaults(defineProps<QOptionGroupProps>(), {
  color: 'secondary',
  inline: false,
  otherOption: false,
  type: 'checkbox',
})

const model = defineModel()

const slots = useSlots() as never as QOptionGroupSlots

const customOption = ref({ checkbox: false, input: '', index: -1 })

watch(
  () => [customOption.value.checkbox, customOption.value.input],
  ([checkbox, input]) => {
    const arrayValue = Array.isArray(model.value) ? model.value : []

    if (!checkbox) {
      if (customOption.value.index !== -1) {
        arrayValue.splice(customOption.value.index, 1)
        customOption.value.index = -1
      }
      customOption.value.input = ''
      model.value = arrayValue
      return
    }

    if (customOption.value.index !== -1) {
      arrayValue[customOption.value.index] = input
    } else {
      arrayValue.push(input)
      customOption.value.index = arrayValue.length - 1
    }

    model.value = arrayValue
  },
)
</script>
