<template>
  <div class="w-full">
    <DialogTitle as="h1" class="text-2xl font-medium text-gray-700 dark:text-gray-200 mb-5">
      Crear proyecto
    </DialogTitle>
    <form @submit.prevent class="text-gray-700 dark:text-gray-200 w-full">
      <label for="name" class="font-medium">Nombre del proyecto</label>
      <input type="text" name="name" id="name" class="rounded border-gray-300 w-full
        focus:ring-purple-600 focus:border-transparent text-sm sm:text-base
        dark:bg-gray-700 dark:border-[#515c6d] dark:focus:ring-purple-500 mt-1"
        v-model="projectName">
      <button @click="addProject"
              class="rounded bg-purple-500 text-white py-2 px-6 mt-4
      hover:bg-purple-600">
        Guardar
      </button>
    </form>
  </div>
</template>

<script setup>
import { DialogTitle } from '@headlessui/vue';
import { ref } from 'vue';

// eslint-disable-next-line no-undef
const emit = defineEmits(['addProject']);
const projectName = ref('');
const projectInfo = {
  project_name: projectName,
};

const addProject = () => {
  emit('addProject', projectInfo);
};
</script>
