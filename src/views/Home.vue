<template>
  <div class="grid">
    <Navbar id="navbar" @hideDrawer="hideDrawer" />
    <main id="main">
      <GanttChart class="gantt" :tasks="tasks" />
    </main>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { gantt } from 'dhtmlx-gantt';
import Navbar from '../components/Navbar.vue';
import GanttChart from '../components/GanttChart.vue';
import supabase from '../supabase';

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
.grid {
  display: grid;
}
#navbar {
  grid-area: navbar;
}
#main {
  grid-area: main;
}

.gantt-hidden {
  display: none;
}

@media only screen and (min-width: 1024px) {
  .grid {
    grid-template-columns: 60px calc(100vw - 60px);
    grid-template-rows: 100vh;
    grid-template-areas: "navbar main";
  }
  #signOut {
    width: 100%;
    padding: 1.7rem 0rem;
  }
  .gantt {
    overflow: hidden;
    position: relative;
    height: 100%;
  }
}

@media only screen and (max-width: 1023px) {
  .grid {
    grid-template-rows: 60px calc(100vh - 60px);
    grid-template-columns: 100vw;
    grid-template-areas:
      "navbar"
      "main";
  }
  #signOut {
    width: auto;
    height: 100%;
    padding: 0rem 1.5rem;
  }
  .gantt {
    overflow: hidden;
    height: calc(100vh - 60px);
    width: 100vw;
  }
}
</style>
