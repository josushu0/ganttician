<template>
  <div class="flex flex-col last:justify-end text-gray-700 dark:text-gray-200 h-full">
    <form @submit.prevent class="h-full flex flex-col">
      <div class="mb-4">
        <label for="title" class="text-lg font-medium">Título</label>
        <input type="text" name="title" id="title" v-model="title"
        class="rounded border-gray-300 w-full
          focus:ring-purple-600 focus:border-transparent text-sm sm:text-base
          dark:bg-gray-700 dark:border-[#515c6d] dark:focus:ring-purple-500 mt-1" />
      </div>
      <div class="mb-4">
        <label for="description" class="text-lg font-medium">Descripción</label>
        <textarea name="description" id="description" cols="30" rows="5" v-model="description"
        class="rounded border-gray-300 w-full
          focus:ring-purple-600 focus:border-transparent text-sm sm:text-base
          dark:bg-gray-700 dark:border-[#515c6d] dark:focus:ring-purple-500 mt-1"></textarea>
      </div>
      <div class="mb-4">
        <label class="text-lg font-medium">Periodo</label>
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
      <div class="mt-auto flex justify-end">
        <button @click="deleteTask"
        class="rounded text-red-700 py-2 px-6 mr-4 hover:bg-red-300
        dark:text-red-400 dark:hover:bg-red-500 dark:hover:text-gray-50">
          Eliminar
        </button>
        <button @click="saveTask"
        class="rounded bg-purple-500 text-white py-2 px-6
      hover:bg-purple-600">
          Guardar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';

export default {
  name: 'TaskForm',
  emits: ['saveTask'],
  setup(_, { emit }) {
    const taskName = 'Prueba';
    const taskInfo = reactive({
      title: '',
      description: '',
      start: Date,
      finish: Date,
    });

    const saveTask = () => {
      emit('saveTask', taskInfo);
    };

    return {
      taskName,
      saveTask,
      ...toRefs(taskInfo),
    };
  },
};
</script>
