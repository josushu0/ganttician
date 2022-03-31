<template>
  <div class="bg-gray-100 dark:bg-gray-700 h-screen w-screen
    grid place-content-center">
    <div v-if="projects" class="w-screen">
      <h1 class="flex justify-center mb-10 text-4xl text-gray-900 dark:text-gray-50 underline">
        Proyectos
      </h1>
      <div class="flex justify-center items-center flex-wrap gap-3 max-w-3xl m-auto">
        <button v-for='projectItem in projects' :key='projectItem.id'
          class="bg-gray-300 text-gray-900 rounded-lg h-32 w-32 shadow-lg
            dark:bg-gray-800 dark:text-gray-50 hover:bg-gray-400 hover:dark:bg-gray-900"
            @click="getProject(projectItem)">
            {{projectItem.project_name}}
        </button>
        <button class="bg-gray-300 text-gray-900 rounded-lg h-32 w-32 shadow-lg
          dark:bg-gray-800 dark:text-gray-50 flex justify-center items-center
          hover:bg-gray-400 hover:dark:bg-gray-900" @click="showModal" >
          <PlusSmIcon class="h-12 w-12" />
        </button>
      </div>
    </div>
    <Modal :toggle="toggleModal" @closeModal="closeModal">
      <ProjectForm @addProject="addProject"/>
    </Modal>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { PlusSmIcon } from '@heroicons/vue/outline';
import { v4 as uuid } from 'uuid';
import Modal from './Modal.vue';
import ProjectForm from './ProjectForm.vue';
import useProjectStore from '../stores/projectStore';
import supabase from '../supabase/supabase';

const session = supabase.auth.session();
const projectStore = useProjectStore();

// eslint-disable-next-line no-undef
const emit = defineEmits(['projectError', 'showGantt']);
const projects = ref();

onBeforeMount(async () => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user', session.user.id);

    if (error) throw error;
    if (data) projects.value = data;
  } catch (error) {
    emit('projectError', error);
  }
});

const showGantt = () => {
  emit('showGantt');
};

const toggleModal = ref(false);

function showModal() {
  toggleModal.value = true;
}

function closeModal() {
  toggleModal.value = false;
}

const getProject = (projectItem) => {
  projectStore.project = projectItem;
  if (localStorage.getItem('projectId') === null && localStorage.getItem('projectName') === null) {
    localStorage.setItem('projectId', projectItem.id);
    localStorage.setItem('projectName', projectItem.project_name);
  }
  showGantt();
};

const addProject = async (projectInfo) => {
  const id = uuid();
  try {
    const { error } = await supabase
      .from('projects')
      .insert({
        id,
        project_name: projectInfo.project_name.value,
        user: session.user.id,
      });
    projects.value.push(projectInfo);
    closeModal();
    if (error) throw error;
  } catch (error) {
    emit('projectError', error);
  }
};

</script>
