import { defineStore } from 'pinia';

const useTaskStore = defineStore('task', {
  state: () => ({
    task: {
      id: '',
      text: '',
      description: '',
      start_date: '',
      end_date: '',
      progress: 0,
      encargado: '',
    },
  }),
});

export default useTaskStore;
