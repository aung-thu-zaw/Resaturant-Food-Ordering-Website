<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import Breadcrumb from '@/components/Breadcrumbs/MainBreadcrumb.vue'
import BreadcrumbItem from '@/components/Breadcrumbs/BreadcrumbItem.vue'
import InputLabel from '@/components/Forms/Fields/InputLabel.vue'
import InputError from '@/components/Forms/Fields/InputError.vue'
import InputField from '@/components/Forms/Fields/InputField.vue'
import SelectBox from '@/components/Forms/Fields/SelectBox.vue'
import FileInput from '@/components/Forms/Fields/FileInput.vue'
import PreviewImage from '@/Components/Forms/PreviewImage.vue'
import FormButton from '@/components/Buttons/FormButton.vue'
import GoBackButton from '@/components/Buttons/GoBackButton.vue'
import { useTitle } from '@vueuse/core'
import { computed, onMounted, reactive, ref } from 'vue'
import { useBlogContentStore } from '@/stores/dashboard/blogContent'
import { useImagePreview } from '@/composables/useImagePreview'
import Editor from '@tinymce/tinymce-vue'
import { storeToRefs } from 'pinia'

useTitle('Edit Blog Content - Restaurant Food Ordering')

const props = defineProps({
  slug: {
    type: String,
    required: true
  }
})

const store = useBlogContentStore()
const tag = ref('')
const existingImage = ref('')
const { blogCategories } = storeToRefs(store)
const form = reactive({
  blog_category_id: '',
  title: '',
  content: '',
  status: 'draft',
  thumbnail: '',
  tags: []
})

const tags = computed(() => store.blogContent.blog_tags.map((tag) => tag.name))

const createTag = (e) => {
  if (e.key === ',') {
    tag.value = tag.value.split(',').join('').toLowerCase()
    tag.value !== '' ? form.tags.push(tag.value) : null
    tag.value = ''
  }
  form.tags = [...new Set(form.tags)]
}

const removeTag = (index) => {
  form.tags.splice(index, 1)
}

onMounted(async () => {
  await store.getBlogContent(props.slug)

  await store.getResources()

  form.blog_category_id = store.blogContent?.blog_category_id
  form.title = store.blogContent?.title
  form.content = store.blogContent?.content
  form.status = store.blogContent?.status
  form.thumbnail = store.blogContent?.thumbnail
  form.tags = [...tags.value]

  existingImage.value = store.blogContent?.thumbnail
})

const { previewImage, setImagePreview } = useImagePreview(existingImage)

const handleUpdateBlogContent = async () => await store.updateBlogContent({ ...form }, props.slug)
</script>

<template>
  <DashboardLayout>
    <div class="min-h-screen py-10">
      <div
        class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-4 md:mb-8"
      >
        <Breadcrumb to="admin.blog-contents.index" icon="fa-pen-nib" label="Blog Contents">
          <BreadcrumbItem :label="store.blogContent ? store.blogContent?.title : ''" />
          <BreadcrumbItem label="Edit" />
        </Breadcrumb>

        <div class="w-full flex items-center justify-end">
          <GoBackButton />
        </div>
      </div>

      <!-- Form Start -->
      <div class="border p-10 bg-white rounded-md">
        <form
          ref="createForm"
          @submit.prevent="handleUpdateBlogContent"
          class="space-y-4 md:space-y-6"
        >
          <PreviewImage :src="previewImage" />

          <div>
            <InputLabel label="Title" required />

            <InputField
              type="text"
              name="blog-title"
              v-model="form.title"
              placeholder="Enter Blog Title"
              required
            />

            <InputError :message="store.errors?.title" />
          </div>

          <div>
            <InputLabel label="Content" required />

            <Editor
              api-key="8989xh54aozrv1xkgo7je7p1ec6fv5gh34frv9uhf2b61jku"
              :init="{
                toolbar_mode: 'sliding',
                toolbar:
                  'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',

                tinycomments_mode: 'embedded'
              }"
              v-model="form.content"
            />

            <InputError :message="store.errors?.content" />
          </div>

          <div>
            <InputLabel label="Blog Category" required />

            <SelectBox
              name="blog-category-id"
              :options="blogCategories ?? {}"
              v-model="form.blog_category_id"
              required
              :selected="form.blog_category_id"
            />

            <InputError :message="store.errors?.blog_category_id" />
          </div>

          <div>
            <InputLabel label="Blog Tags" />

            <div class="relative">
              <InputField
                @keyup="createTag"
                type="text"
                name="blog-tag"
                v-model="tag"
                placeholder="Enter Blog Tags ( Eg. Pizza,  Burgers, etc... )"
              />

              <div class="flex items-center space-x-2 mt-2">
                <div
                  v-for="(tag, index) in form.tags"
                  :key="index"
                  class="bg-slate-500 text-white text-xs px-3 py-3 rounded-md font-semibold space-x-2"
                >
                  <span> {{ tag }} </span>
                  <button type="button" @click="removeTag(index)">
                    <i class="fa-solid fa-circle-xmark"></i>
                  </button>
                </div>
              </div>
            </div>

            <InputError :message="store.errors?.tags" />
          </div>

          <div>
            <InputLabel label="Thumbnail" required />

            <FileInput
              name="blog-content-thumbnail"
              text="PNG, JPG or JPEG ( Max File Size : 1.5 MB )"
              v-model="form.thumbnail"
              @update:modelValue="setImagePreview"
            />

            <InputError :message="store.errors?.thumbnail" />
          </div>

          <div class="flex items-center justify-end w-full space-x-5">
            <FormButton class="w-[150px] text-white bg-blue-600 hover:bg-blue-700 rounded-md">
              <i class="fa-solid fa-save"></i>
              Save Changes
            </FormButton>
          </div>
        </form>
      </div>
      <!-- Form End -->
    </div>
  </DashboardLayout>
</template>

<style>
.tox-tinymce {
  border: 1px solid rgb(209, 213, 219) !important;
}

.tox .tox-edit-area iframe {
  background: rgb(249, 250, 251) !important;
}
</style>

