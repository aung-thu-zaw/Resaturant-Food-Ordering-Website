<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  options: {
    type: Object,
    required: true
  },
  selected: {
    type: [String, Boolean],
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Filter By Position'
  }
})

const route = useRoute()
const router = useRouter()
const currentPosition = ref(route.query.position ?? '')

watch(
  () => currentPosition.value,
  (newPosition) => {
    router.push({ query: { ...route.query, position: newPosition } })
  }
)

defineEmits(['update:modelValue'])

const optionLabel = (option) => {
  return option.name || option.label
}

const optionValue = (option) => {
  return option.slug || option.value
}

const isSelected = (option) => {
  return props.selected === optionValue(option)
}

watch(
  () => route.query,
  () => {
    if (!route.query.position) currentPosition.value = ''
  }
)
</script>

<template>
  <select
    id="filter-by-status"
    class="p-3 py-3.5 font-medium text-xs text-gray-700 rounded-md bg-gray-50 outline-none focus:ring-2 focus:ring-slate-300 border border-gray-300 focus:border-slate-400"
    v-model="currentPosition"
  >
    <option value="" :selected="modelValue === ''" disabled>{{ placeholder }}</option>
    <option
      v-for="(option, index) in options"
      :key="index"
      :value="optionValue(option)"
      :selected="isSelected(option)"
      @input="$emit('update:modelValue', $event.target.value)"
    >
      {{ optionLabel(option) }}
    </option>
  </select>
</template>
