<template>
  <div class="grid gap-0 grid-rows-[52px,calc(100vh-52px)] h-screen w-screen
  bg-gray-100 dark:bg-gray-700 lg:grid-cols-[3.5rem,calc(100vw-3.5rem)]"
  v-if="session">
    <Navbar @hideDrawer="hideDrawer" @showProjects="showSlideOver"
    class="row-start-1 col-start-1 w-screen h-[52px]
    lg:col-start-1 lg:row-start-1 lg:w-14 lg:h-screen" />
    <GanttChart
    class="row-start-2 col-start-1 w-screen h-full overflow-hidden
    lg:col-start-2 lg:row-start-1 lg:w-full lg:h-screen" />
    <SlideOver :toggle="toggle" @closeSlideOver="closeSlideOver" />
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { gantt } from 'dhtmlx-gantt';
import { onBeforeMount, ref } from 'vue';
import Navbar from '../components/Navbar.vue';
import GanttChart from '../components/GanttChart.vue';
import SlideOver from '../components/SlideOver.vue';
import supabase from '../supabase/supabase';

export default {
  name: 'AppView',
  components: {
    Navbar,
    GanttChart,
    SlideOver,
  },
  setup() {
    const router = useRouter();
    const session = supabase.auth.session();
    const toggle = ref(false);

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

    const showSlideOver = () => {
      toggle.value = true;
    };

    const closeSlideOver = () => {
      toggle.value = false;
    };

    return {
      hideDrawer,
      showSlideOver,
      closeSlideOver,
      session,
      toggle,
    };
  },

};
</script>
