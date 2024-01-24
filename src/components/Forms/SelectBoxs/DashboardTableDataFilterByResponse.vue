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
    default: 'Filter By Status'
  }
})

const route = useRoute()
const router = useRouter()
const currentResponseStatus = ref(route.query.response ?? '')

watch(
  () => currentResponseStatus.value,
  (newStatus) => {
    router.push({ query: { ...route.query, response: newStatus } })
  }
)

defineEmits(['update:modelValue'])

const optionLabel = (option) => {
  return option.name || option.label
}

const optionValue = (option) => {
  return option.id || option.value
}

const isSelected = (option) => {
  return props.selected === optionValue(option)
}

watch(
  () => route.query,
  () => {
    if (!route.query.response) currentResponseStatus.value = ''
  }
)
</script>

<template>
  <select
    id="filter-by-status"
    class="p-3 py-3.5 font-medium text-xs text-gray-700 rounded-md bg-gray-50 outline-none focus:ring-2 focus:ring-slate-300 border border-gray-300 focus:border-slate-400"
    v-model="currentResponseStatus"
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
