<template>
  <div v-if="session">
    <TransitionRoot
        :show="toggleAlert"
        enter="transition-opacity duration-75"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity duration-150"
        leave-from="opacity-100"
        leave-to="opacity-0"
    >
      <AlertDialog :type='alertType' :description='alertDescription'
        class="absolute right-2 top-2" />
    </TransitionRoot>
  <div v-if='projectSelected'>
    <div class="grid gap-0 grid-rows-[52px,calc(100vh-52px)] h-screen w-screen
    bg-gray-100 dark:bg-gray-750 lg:grid-cols-[3.5rem,calc(100vw-3.5rem)]"
    v-if="session">
      <Navbar @hideDrawer="hideDrawer" @showProjects="showProjects" @signoutError="signoutError"
      @showProjectModal="showProjectModal"
      class="row-start-1 col-start-1 w-screen h-[52px]
      lg:col-start-1 lg:row-start-1 lg:w-14 lg:h-screen" />
      <GanttChart
      class="row-start-2 col-start-1 w-screen h-full overflow-hidden
      lg:col-start-2 lg:row-start-1 lg:w-full lg:h-screen"
      @ganttError="ganttError" />
      <Modal :toggle="toggleModal" @closeModal="closeModal">
        <ProjectForm @addProject="editProject"/>
      </Modal>
    </div>
  </div>
  <div v-else>
    <Project @showGantt="showGantt" @projectError="projectError" />
  </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { gantt } from 'dhtmlx-gantt';
import { onBeforeMount, ref } from 'vue';
import { TransitionRoot } from '@headlessui/vue';
import Navbar from '../components/Navbar.vue';
import GanttChart from '../components/GanttChart.vue';
import AlertDialog from '../components/AlertDialog.vue';
import Project from '../components/Project.vue';
import Modal from '../components/Modal.vue';
import ProjectForm from '../components/ProjectForm.vue';
import useProjectStore from '../stores/projectStore';
import supabase from '../supabase/supabase';

const router = useRouter();
const session = supabase.auth.session();
const projectSelected = ref(localStorage.getItem('projectSelected') === 'true');

onBeforeMount(() => {
  if (!session) {
    router.replace('/login');
  }
});

function hideDrawer(hiddenDrawer) {
  if (hiddenDrawer) {
    gantt.config.show_grid = false;
    gantt.render();
  } else {
    gantt.config.show_grid = true;
    gantt.render();
  }
}

const projectStore = useProjectStore();
const showProjects = () => {
  localStorage.setItem('projectSelected', 'false');
  projectSelected.value = (localStorage.getItem('projectSelected') === 'true');
  projectStore.$reset();
};

const toggleModal = ref(false);

function showProjectModal() {
  toggleModal.value = true;
}

const editProject = async (projectInfo) => {
  const { error } = await supabase
    .from('projects')
    .update({
      project_name: projectInfo.project_name.value,
      descripcion: projectInfo.descripcion.value,
      inicio: projectInfo.inicio.value,
      final: projectInfo.final.value,
      active: projectInfo.active.value,
    })
    .eq('id', projectStore.project.id);
  if (error) {
    throw error;
  } else {
    toggleModal.value = false;
    projectStore.project.project_name = projectInfo.project_name.value;
    projectStore.project.descripcion = projectInfo.descripcion.value;
    projectStore.project.inicio = projectInfo.inicio.value;
    projectStore.project.final = projectInfo.final.value;
    projectStore.project.active = projectInfo.active.value;
  }
};

function closeModal() {
  toggleModal.value = false;
}

const showGantt = () => {
  localStorage.setItem('projectSelected', 'true');
  projectSelected.value = (localStorage.getItem('projectSelected') === 'true');
};

const toggleAlert = ref(false);
const alertType = ref('');
const alertDescription = ref('');
function dismissAlert() {
  toggleAlert.value = false;
}
function signoutError(error) {
  alertType.value = 'Error';
  alertDescription.value = error;
  toggleAlert.value = true;
  setTimeout(() => dismissAlert(), 5000);
}

function ganttError(error) {
  alertType.value = 'Error';
  alertDescription.value = error;
  toggleAlert.value = true;
  setTimeout(() => dismissAlert(), 5000);
}

function projectError(error) {
  alertType.value = 'Error';
  alertDescription.value = error;
  toggleAlert.value = true;
  setTimeout(() => dismissAlert(), 5000);
}
</script>
