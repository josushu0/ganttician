<template>
  <div>
  <div v-if='project'>
    <div class="grid gap-0 grid-rows-[52px,calc(100vh-52px)] h-screen w-screen
    bg-gray-100 dark:bg-gray-700 lg:grid-cols-[3.5rem,calc(100vw-3.5rem)]"
    v-if="session">
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
      <Navbar @hideDrawer="hideDrawer" @showProjects="showSlideOver" @signoutError="signoutError"
      class="row-start-1 col-start-1 w-screen h-[52px]
      lg:col-start-1 lg:row-start-1 lg:w-14 lg:h-screen" />
      <GanttChart
      class="row-start-2 col-start-1 w-screen h-full overflow-hidden
      lg:col-start-2 lg:row-start-1 lg:w-full lg:h-screen"
      @ganttError="ganttError" />
      <SlideOver :toggle="toggleSlideOver" @closeSlideOver="closeSlideOver" class="z-50"/>
    </div>
  </div>
  <div v-else>
    <Project />
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
import SlideOver from '../components/SlideOver.vue';
import AlertDialog from '../components/AlertDialog.vue';
import Project from '../components/Proyect.vue';
import supabase from '../supabase/supabase';

const project = ref(false);

const router = useRouter();
const session = supabase.auth.session();
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

const toggleSlideOver = ref(false);
const showSlideOver = () => {
  toggleSlideOver.value = true;
};
const closeSlideOver = () => {
  toggleSlideOver.value = false;
};

const toggleAlert = ref(false);
const alertType = ref();
const alertDescription = ref();
function dismissAlert() {
  toggleAlert.value = false;
}
function signoutError(error) {
  alertType.value = 'Error';
  alertDescription.value = error;
  toggleAlert.value = true;
  setTimeout(() => dismissAlert(), 4000);
}

function ganttError(error) {
  alertType.value = 'Error';
  alertDescription.value = error;
  toggleAlert.value = true;
  setTimeout(() => dismissAlert(), 4000);
}
</script>
