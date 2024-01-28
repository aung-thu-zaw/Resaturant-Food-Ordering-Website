<script setup>
import PreviewImage from '@/Components/Forms/PreviewImage.vue'
import { useProductStore } from '@/stores/dashboard/product'

 defineProps({
  previewImage: {
    type: String,
    required: true
  },

  previewImages: {
    type: [Array, String],
    required: true
  },

  existingAdditionalImages: {
    type: Object,
    required: false,
    default: () => ({})
  }
})

const emit = defineEmits(['removeImage', 'removeExistingAdditionalImage'])
const store = useProductStore()

const removeAdditionalPreviewImages = (index) => emit('removeImage', index)

const deleteExistingAdditionalImageInBackend = async (id, index) => {
  await store.deleteAdditionalImage(id)

  emit('removeExistingAdditionalImage', index)
}
</script>

<template>
  <div class="space-y-5">
    <div>
      <h3 class="font-semibold text-sm text-slate-700 mb-3">Cover Image</h3>
      <PreviewImage :src="previewImage" />
    </div>

    <div v-if="existingAdditionalImages.length">
      <h3 class="font-semibold text-sm text-slate-700 mb-3">Existing Additional Images</h3>
      <div
        v-for="(additionalImage, index) in existingAdditionalImages"
        :key="index"
        class="relative inline-block m-2"
      >
        <img
          :src="additionalImage.image"
          :alt="'existing-additional-images' + index"
          class="w-32 h-32 object-cover rounded-md ring-2 ring-gray-200"
        />
        <button
          type="button"
          @click="deleteExistingAdditionalImageInBackend(additionalImage.id, index)"
          class="absolute top-2 right-2 bg-black bg-opacity-40 text-white text-xs p-2 rounded-md hover:bg-opacity-60 cursor-pointer"
        >
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>

    <div v-if="previewImages.length">
      <h3 class="font-semibold text-sm text-slate-700 mb-3">Additional Images</h3>

      <div
        v-for="(previewImage, index) in previewImages"
        :key="index"
        class="relative inline-block m-2"
      >
        <img
          :src="previewImage"
          :alt="'additional-images' + index"
          class="w-32 h-32 object-cover rounded-md ring-2 ring-gray-200"
        />
        <button
          type="button"
          @click="removeAdditionalPreviewImages(index)"
          class="absolute top-2 right-2 bg-black bg-opacity-40 text-white text-xs p-2 rounded-md hover:bg-opacity-60 cursor-pointer"
        >
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>
  </div>
</template>