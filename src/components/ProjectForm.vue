<template>
  <div class="w-full text-gray-700 dark:text-gray-200">
    <DialogTitle v-if='projectName != ""' as="h1" class="text-2xl font-medium mb-5">
      Editar proyecto
    </DialogTitle>
    <DialogTitle v-else as="h1" class="text-2xl font-medium mb-5">
      Crear proyecto
    </DialogTitle>
    <form @submit.prevent class="w-full">
      <label for="name" class="font-medium">Nombre del proyecto</label>
      <input type="text" name="name" id="name" class="rounded border-gray-300 w-full
        focus:ring-purple-600 focus:border-transparent text-sm sm:text-base
        dark:bg-gray-700 dark:border-[#515c6d] dark:focus:ring-purple-500 mt-1 mb-4"
        v-model="projectName" required autocomplete='off'>
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
          text-sm sm:text-base dark:bg-gray-700 dark:border-[#515c6d] dark:focus:ring-purple-500"
          autocomplete='off'/>
      </div>
      <button type="submit" @click='addProject'
        class="rounded bg-purple-500 text-white py-2 px-6 mt-1 mb-4 hover:bg-purple-600">
        Guardar
      </button>
    </form>
    <div v-if='projectName != ""'>
      <h2 class="text-xl font-medium mb-2">Estado del proyecto</h2>
      <div class="flex items-center">
        <label for="completado">Proyecto finalizado</label>
        <input :checked='!projectActive' @change='changeFinalized' type="checkbox" name="completado"
        class="form-checkbox
        text-purple-600 dark:text-purple-500 focus:ring-purple-600 focus:dark:ring-purple-500
        rounded dark:bg-gray-700 border-none focus:ring-offset-0 ml-2">
      </div>
    </div>
  </div>
</template>

<script setup>
import { DialogTitle } from '@headlessui/vue';
// import { ChevronDownIcon } from '@heroicons/vue/solid';
import { ref } from 'vue';
import supabase from '../supabase/supabase';
import useProjectStore from '../stores/projectStore';

// eslint-disable-next-line no-undef
const emit = defineEmits(['addProject']);
const projectStore = useProjectStore();
const projectName = ref(projectStore.project.project_name);
const projectDescripcion = ref(projectStore.project.descripcion);
const projectInicio = ref(projectStore.project.inicio);
const projectFinal = ref(projectStore.project.final);
const projectActive = ref(projectStore.project.active);
const projectColaborador = ref(projectStore.project.colaboradores);
const projectInfo = {
  project_name: projectName,
  descripcion: projectDescripcion,
  inicio: projectInicio,
  final: projectFinal,
  active: projectActive,
  colaboradores: projectColaborador,
};

const addProject = () => {
  emit('addProject', projectInfo);
};

const changeFinalized = async () => {
  projectActive.value = !projectActive.value;
  projectStore.project.active = projectActive.value;
  const { error } = await supabase
    .from('projects')
    .update({ status: projectActive.value })
    .eq('id', projectStore.project.id);
  if (error) {
    throw error;
  }
};
</script>
