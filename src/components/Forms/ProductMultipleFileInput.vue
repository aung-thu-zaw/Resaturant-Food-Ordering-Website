<script setup>
defineProps({
  text: {
    type: String,
    default: ''
  },

  name: {
    type: String,
    default: ''
  },

  disabled: {
    type: Boolean,
    default: false
  },

  modelValue: {
    type: [String, Array, FileList],
    default: ''
  },

  rounded: {
    type: Boolean,
    default: false
  },

  required: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const onFileChange = (event) => {
  const selectedFiles = event.target.files
  emit('update:modelValue', selectedFiles)
}
</script>

<template>
  <div class="flex items-center justify-center w-full">
    <label
      for="dropzone-file"
      class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
    >
      <div class="flex flex-col items-center justify-center pt-5 pb-6">
        <svg
          class="w-8 h-8 mb-4 text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 16"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
          />
        </svg>
        <div class="mb-2 text-sm text-gray-600 text-center font-semibold">
          <p>Click to upload</p>
          <p>Upload additional images for your product.</p>
        </div>
        <p class="text-xs font-medium text-gray-500">PNG, JPG or JPEG ( Max File Size : 1.5 MB )</p>
      </div>
      <input
        id="dropzone-file"
        :name="name"
        type="file"
        multiple
        class="hidden"
        @change="onFileChange"
        :disabled="disabled"
        :required="required"
      />
    </label>
  </div>
</template>
