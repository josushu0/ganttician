<template>
  <div class="w-full">
    <DialogTitle as="h1" class="text-2xl font-medium text-gray-700 dark:text-gray-200 mb-5">
      Crear proyecto
    </DialogTitle>
    <form @submit.prevent="addProject" class="text-gray-700 dark:text-gray-200 w-full">
      <label for="name" class="font-medium">Nombre del proyecto</label>
      <input type="text" name="name" id="name" class="rounded border-gray-300 w-full
        focus:ring-purple-600 focus:border-transparent text-sm sm:text-base
        dark:bg-gray-700 dark:border-[#515c6d] dark:focus:ring-purple-500 mt-1 mb-4"
        v-model="projectName" required>
      <label for="descripcion" class="font-medium">Descripción</label>
      <textarea name="descripcion" id="descripcion" class="rounded border-gray-300 w-full
        focus:ring-purple-600 focus:border-transparent text-sm sm:text-base
        dark:bg-gray-700 dark:border-[#515c6d] dark:focus:ring-purple-500 mt-1 mb-4"
        v-model="projectDescripcion" />
      <div class="flex gap-6 mb-4">
        <div class="basis-1/2">
          <label for="inicio" class="font-medium">Fecha inicio</label>
          <input type="date" name="inicio" id="inicio" class="rounded border-gray-300 w-full
          focus:ring-purple-600 focus:border-transparent text-sm sm:text-base
          dark:bg-gray-700 dark:border-[#515c6d] dark:focus:ring-purple-500 mt-1"
          v-model="projectInicio" required>
        </div>
        <div class="basis-1/2">
          <label for="final" class="font-medium">Fecha finalización</label>
          <input type="date" name="final" id="final" class="rounded border-gray-300 w-full
          focus:ring-purple-600 focus:border-transparent text-sm sm:text-base
          dark:bg-gray-700 dark:border-[#515c6d] dark:focus:ring-purple-500 mt-1"
          v-model="projectFinal" required>
        </div>
      </div>
      <div class="mb-4">
        <label for="colaborador" class="font-medium">Colaboradores</label>
        <input type="text" name="colaborador" id="colaborador" v-model="projectColaborador"
          class="rounded border-gray-300 w-full focus:ring-purple-600 focus:border-transparent mt-1
          text-sm sm:text-base dark:bg-gray-700 dark:border-[#515c6d] dark:focus:ring-purple-500" />
      </div>
      <button type="submit"
        class="rounded bg-purple-500 text-white py-2 px-6 mt-1 hover:bg-purple-600">
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
const projectDescripcion = ref('');
const projectInicio = ref('');
const projectFinal = ref('');
const projectColaborador = ref([]);
const projectInfo = {
  project_name: projectName,
  descripcion: projectDescripcion,
  inicio: projectInicio,
  final: projectFinal,
};
const addProject = () => {
  emit('addProject', projectInfo);
};
</script>
