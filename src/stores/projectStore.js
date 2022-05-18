import { defineStore } from 'pinia';

const useProjectStore = defineStore('project', {
  state: () => ({
    project: {
      id: '',
      project_name: '',
      descripcion: '',
      inicio: '',
      final: '',
      owner: '',
      active: Boolean,
    },
  }),
});

export default useProjectStore;
