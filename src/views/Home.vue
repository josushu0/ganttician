<template>
  <div class="grid gap-0 h-screen w-screen bg-gray-100 dark:bg-gray-700">
    <Navbar @hideDrawer="hideDrawer" class="row-start-1 col-start-1 w-screen h-16
                                            lg:col-start-1 lg:row-start-1 lg:w-16 lg:h-screen" />
    <GanttChart :tasks="tasks" class="row-start-2 col-start-1 w-screen h-full overflow-hidden
                                      lg:col-start-2 lg:row-start-1 lg:w-full lg:h-screen" />
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { gantt } from 'dhtmlx-gantt';
import Navbar from '../components/Navbar.vue';
import GanttChart from '../components/GanttChart.vue';
import supabase from '../supabase/supabase';

export default {
  name: 'HomeView',
  components: {
    Navbar,
    GanttChart,
  },
  setup() {
    const router = useRouter();

    if (!supabase.auth.session()) {
      router.replace('/login');
    }

    const tasks = {
      data: [
        {
          id: 1, text: 'Task #1', start_date: '17-01-2020', duration: 3, progress: 0.6,
        },
        {
          id: 2, text: 'Task #2', start_date: '20-01-2020', duration: 3, progress: 0.4,
        },
      ],
      links: [
        {
          id: 1, source: 1, target: 2, type: '0',
        },
      ],
    };

    function hideDrawer(hiddenDrawer) {
      if (hiddenDrawer) {
        gantt.config.layout = {
          css: 'gantt_container',
          rows: [
            {
              cols: [
                {
                  view: 'timeline', id: 'timeline', scrollX: 'scrollHor', scrollY: 'scrollVer',
                },
                { view: 'scrollbar', scroll: 'y', id: 'scrollVer' },
              ],
            },
            {
              view: 'scrollbar', scroll: 'x', id: 'scrollHor', height: 20,
            },
          ],
        };
        gantt.resetLayout();
      } else {
        gantt.config.layout = {
          css: 'gantt_container',
          rows: [
            {
              cols: [
                {
                  view: 'grid', id: 'grid', scrollX: 'scrollHor', scrollY: 'scrollVer',
                },
                {
                  view: 'timeline', id: 'timeline', scrollX: 'scrollHor', scrollY: 'scrollVer',
                },
                { view: 'scrollbar', scroll: 'y', id: 'scrollVer' },
              ],
            },
            {
              view: 'scrollbar', scroll: 'x', id: 'scrollHor', height: 20,
            },
          ],
        };
        gantt.resetLayout();
      }
    }

    return {
      tasks,
      hideDrawer,
    };
  },

};
</script>

<style scoped>
@media only screen and (min-width: 1024px) {
  .grid {
    grid-template-columns: 64px calc(100vw - 64px);
  }
}

@media only screen and (max-width: 1023px) {
  .grid {
    grid-template-rows: 64px calc(100vh - 64px);
  }
}
</style>
