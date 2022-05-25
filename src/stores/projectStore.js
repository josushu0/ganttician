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
      colaboradores: [],
    },
  }),
});

export default useProjectStore;
