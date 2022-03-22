<template>
  <div class="flex flex-col last:justify-end text-gray-700 dark:text-gray-200 h-full">
    <form @submit.prevent class="h-full flex flex-col">
      <div class="mb-4">
        <label for="title" class="font-medium">Título</label>
        <input type="text" name="title" id="title" v-model="title"
        class="rounded border-gray-300 w-full
          focus:ring-purple-600 focus:border-transparent text-sm sm:text-base
          dark:bg-gray-700 dark:border-[#515c6d] dark:focus:ring-purple-500 mt-1" />
      </div>
      <div class="mb-4">
        <label for="description" class="font-medium">Descripción</label>
        <textarea name="description" id="description" rows="3" v-model="description"
        class="rounded border-gray-300 w-full
          focus:ring-purple-600 focus:border-transparent text-sm sm:text-base
          dark:bg-gray-700 dark:border-[#515c6d] dark:focus:ring-purple-500 mt-1"></textarea>
      </div>
      <div class="mb-4">
        <label class="font-medium">Periodo</label>
        <div class="flex justify-between items-center">
          <input type="date" name="start" id="start" v-model="start"
          class="rounded border-gray-300
          focus:ring-purple-600 focus:border-transparent text-sm sm:text-base
          dark:bg-gray-700 dark:border-[#515c6d] dark:focus:ring-purple-500 mt-1">
          <span>a</span>
          <input type="date" name="finish" id="finish" v-model="finish"
          class="rounded border-gray-300
          focus:ring-purple-600 focus:border-transparent text-sm sm:text-base
          dark:bg-gray-700 dark:border-[#515c6d] dark:focus:ring-purple-500 mt-1">
        </div>
      </div>
      <div class="mb-4">
        <label for="progress" class="font-medium">Progreso</label>
        <div class="flex content-center">
          <input type="range" name="progress" id="progress" min="0" max="100" step="1"
          v-model="progress" class="w-full accent-purple-600 dark:accent-purple-500 mt-1" />
          <span class="w-16 text-right">{{ progress }}%</span>
        </div>
      </div>
      <div class="mt-auto flex justify-end">
        <button @click="deleteTask" v-if="props.edit"
        class="rounded text-red-700 py-2 px-6 mr-4 hover:bg-red-300
        dark:text-red-400 dark:hover:bg-red-500 dark:hover:text-gray-50">
          Eliminar
        </button>
        <button @click="addTask"
        class="rounded bg-purple-500 text-white py-2 px-6
      hover:bg-purple-600">
          Guardar
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import useTaskStore from '../stores/taskStore';

const taskEdit = useTaskStore();
console.log(taskEdit);

// eslint-disable-next-line no-undef
const emit = defineEmits(['addTask', 'deleteTask']);
// eslint-disable-next-line no-undef
const props = defineProps({
  edit: Boolean,
});
const title = ref(taskEdit.task.text);
const description = ref(taskEdit.task.description);
const start = ref(taskEdit.task.start_date);
const finish = ref(taskEdit.task.end_date);
const progress = ref(taskEdit.task.progress * 100);

const taskInfo = {
  title,
  description,
  start,
  finish,
  progress,
};
taskEdit.$reset();

const addTask = () => {
  emit('addTask', taskInfo);
};

const deleteTask = () => {
  emit('deleteTask');
};
</script>
