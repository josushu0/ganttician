import { defineStore } from 'pinia';

const useTaskStore = defineStore('task', {
  state: () => ({
    task: {
      text: '',
      description: '',
      start_date: '',
      end_date: '',
      progress: 0,
    },
  }),
});

export default useTaskStore;
