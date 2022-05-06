<template>
  <div class="bg-gray-50 dark:bg-gray-700 min-h-screen w-screen pb-4">
    <div class="w-screen">
      <h1 class="flex justify-center mb-10 text-4xl text-gray-900 underline pt-10
        dark:text-gray-50 sm:text-5xl">
        Proyectos
      </h1>
      <TabGroup :defaultIndex="0">
      <nav class="w-full max-w-md px-2 sm:px-0 mx-auto mb-6">
        <TabList class="flex space-x-1 rounded-xl p-1.5 bg-gray-200
          dark:bg-gray-900">
          <Tab v-slot="{ selected }" as="template">
            <button :class="[
              'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
              'focus:outline-none ring-purple-600/60 dark:ring-purple-300/60',
              'focus:ring-2',
              selected
                ? 'bg-gray-100 dark:bg-gray-700 shadow text-purple-600 dark:text-purple-300'
                // eslint-disable-next-line max-len
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800 hover:dark:bg-gray-800 hover:dark:text-gray-100'
            ]" >
              Activos
            </button>
          </Tab>
          <Tab v-slot="{ selected }" as="template">
           <button :class="[
              'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
              'focus:outline-none ring-purple-600/60 dark:ring-purple-300/60',
              'focus:ring-2',
              selected
                ? 'bg-gray-100 dark:bg-gray-700 shadow text-purple-600 dark:text-purple-300'
                // eslint-disable-next-line max-len
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800 hover:dark:bg-gray-800 hover:dark:text-gray-100'
            ]" >
              Inactivos
            </button>
          </Tab>
        </TabList>
      </nav>
        <TabPanels class="w-screen grid place-content-center">
          <TabPanel tabindex="-1">
            <div class="flex justify-center flex-wrap gap-3 max-w-3xl m-auto 2xl:max-w-6xl px-4">
              <button v-for='projectItem in active' :key='projectItem.id'
                class="bg-gray-300 text-gray-900 rounded-lg h-40 w-40 shadow-lg focus:outline
                  dark:bg-gray-800 dark:text-gray-50 hover:bg-gray-400 hover:dark:bg-gray-900
                  dark:outline-purple-500 outline-purple-600 outline-2 sm:h-32 sm:w-32"
                  @click="getProject(projectItem)">
                  {{projectItem.project_name}}
              </button>
            </div>
            <button class="bg-gray-300 text-gray-900 rounded-lg h-40 w-40 shadow-lg
                dark:bg-gray-800 dark:text-gray-50 flex justify-center items-center
                hover:bg-gray-400 hover:dark:bg-gray-900 mx-auto mt-3 focus:outline
                dark:outline-purple-500 outline-purple-600 outline-2 sm:h-32 sm:w-32"
                @click="showModal" >
                <PlusSmIcon class="h-12 w-12" />
            </button>
          </TabPanel>
          <TabPanel tabindex="-1">
            <div class="flex justify-center flex-wrap gap-3 max-w-3xl m-auto 2xl:max-w-6xl">
              <button v-for='projectItem in inactive' :key='projectItem.id'
                class="bg-gray-300 text-gray-900 rounded-lg h-40 w-40 shadow-lg focus:outline
                  dark:bg-gray-800 dark:text-gray-50 hover:bg-gray-400 hover:dark:bg-gray-900
                  dark:outline-purple-500 outline-purple-600 outline-2 sm:h-32 sm:w-32"
                  @click="getProject(projectItem)">
                  {{projectItem.project_name}}
              </button>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
    <Modal :toggle="toggleModal" @closeModal="closeModal">
      <ProjectForm @addProject="addProject"/>
    </Modal>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { PlusSmIcon } from '@heroicons/vue/outline';
import {
  TabGroup, TabList, Tab, TabPanels, TabPanel,
} from '@headlessui/vue';
import { v4 as uuid } from 'uuid';
import Modal from './Modal.vue';
import ProjectForm from './ProjectForm.vue';
import useProjectStore from '../stores/projectStore';
import supabase from '../supabase/supabase';

const session = supabase.auth.session();
const projectStore = useProjectStore();

// eslint-disable-next-line no-undef
const emit = defineEmits(['projectError', 'showGantt']);
const active = ref();
const inactive = ref();

onBeforeMount(async () => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('owner', session.user.id);

    if (error) throw error;
    if (data) {
      active.value = data.filter((item) => item.status === true);
      inactive.value = data.filter((item) => item.status === false);
    }
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
  localStorage.setItem('projectId', projectItem.id);
  localStorage.setItem('projectName', projectItem.project_name);
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
        descripcion: projectInfo.descripcion.value,
        inicio: projectInfo.inicio.value,
        final: projectInfo.final.value,
        owner: session.user.id,
      });
    const newProject = {
      id,
      status: true,
      ...projectInfo,
    };
    active.value.push(newProject);
    closeModal();
    if (error) throw error;
  } catch (error) {
    emit('projectError', error);
  }
};

</script>
