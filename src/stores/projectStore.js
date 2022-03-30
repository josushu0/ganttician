import { defineStore } from 'pinia';

const useProjectStore = defineStore('project', {
  state: () => ({
    project: {
      id: '',
      project_name: '',
    },
  }),
});

export default useProjectStore;
