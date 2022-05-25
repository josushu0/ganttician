import { defineStore } from 'pinia';

const useColaboradoresStore = defineStore('colab', {
  state: () => ({
    colaboradores: [],
  }),
});

export default useColaboradoresStore;
