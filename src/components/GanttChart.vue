<template>
  <div id="gantt"></div>
</template>

<script>
import { gantt } from 'dhtmlx-gantt';
import { onMounted, onUnmounted, ref } from 'vue';
import supabase from '../supabase/supabase';

export default {
  name: 'GanttChart',
  setup() {
    const tasks = ref();
    const session = supabase.auth.session();
    const user = supabase.auth.user().id;

    async function getTasks() {
      if (session) {
        const { data: ganttTasks } = await supabase
          .from('gantt_tasks')
          .select('id,duration,text,start_date,progress,parent')
          .eq('user', user);
        tasks.value = {
          data: ganttTasks,
          links: [],
        };
        gantt.init('gantt');
        gantt.parse(tasks.value);
      }
    }

    onMounted(() => {
      gantt.i18n.setLocale('es');
      gantt.config.xml_date = '%Y-%m-%d';

      // Scales configuration
      gantt.config.scale_height = 50;
      gantt.config.scales = [
        { unit: 'month', step: 1, format: '%F, %Y' },
        { unit: 'day', step: 1, format: '%d, %D' },
      ];

      gantt.config.layout = {
        css: 'gantt_container',
        rows: [
          {
            cols: [
              {
                // the default grid view
                view: 'grid',
                scrollX: 'scrollHor',
                scrollY: 'scrollVer',
              },
              { resizer: true, width: 1 },
              {
                // the default timeline view
                view: 'timeline',
                scrollX: 'scrollHor',
                scrollY: 'scrollVer',
              },
              {
                view: 'scrollbar',
                id: 'scrollVer',
              },
            ],
          },
          {
            view: 'scrollbar',
            id: 'scrollHor',
          },
        ],
      };

      gantt.config.columns = [
        {
          name: 'text',
          width: '120',
          tree: true,
        },
        { name: 'start_date', align: 'center' },
        { name: 'duration', align: 'center' },
        { name: 'add', label: '', width: 44 },
      ];

      // Time Grid configuration
      gantt.config.fit_tasks = true;
      gantt.config.sort = true;
      gantt.config.autoscroll = true;
      gantt.config.touch_drag = 200;
      gantt.config.touch = 'force';

      // Lightbox configuration
      gantt.locale.labels.section_time = 'Periodo';
      gantt.config.lightbox.sections = [
        {
          name: 'description',
          height: 45,
          type: 'textarea',
          map_to: 'text',
          focus: true,
        },
        {
          name: 'time',
          height: 35,
          type: 'duration',
          map_to: 'auto',
        },
      ];
      gantt.config.lightbox_additional_height = 110;
      gantt.config.buttons_left = ['gantt_cancel_btn'];
      gantt.config.buttons_right = ['gantt_save_btn', 'gantt_delete_btn'];

      // Plugins configuration
      gantt.plugins({
        drag_timeline: true,
        tooltip: true,
        undo: true,
      });
      gantt.templates.tooltip_text = (start, end) => `<b>Inicio:</b> ${gantt.templates
        .tooltip_date_format(start)}<br/><b>Fin:</b> ${gantt.templates.tooltip_date_format(end)}`;
      getTasks();
    });

    onUnmounted(() => {
      tasks.value = null;
      gantt.clearAll();
    });
  },
};
</script>

<style>
@import "../../node_modules/dhtmlx-gantt/codebase/skins/dhtmlxgantt_material.css";
@media (prefers-color-scheme: dark) {
  .gantt_grid_scale, .gantt_task_scale, .gantt_task_vscroll, .gantt_grid_data, .grid_cell,
  .gantt_layout_cell, .gantt_task_scale * {
      background-color: rgb(43, 53, 68);
      border-color: rgb(31, 41, 55 ) !important;
  }
  .gantt_grid_scale, .gantt_task_scale,
  .gantt_task .gantt_task_scale .gantt_scale_cell,
  .gantt_grid_scale .gantt_grid_head_cell {
      color: white !important;
      border-color: rgb(31, 41, 55) !important;
  }
  .gantt_row, .gantt_task_row, .gantt_row.odd, .gantt_task_row.odd {
      background-color: rgb(43, 53, 68);
      border-color: rgb(31, 41, 55) !important;
  }
  .gantt_task_row.odd.gantt_selected {
    background-color: rgba(0,199,181,.2);
  }
  .gantt_row *, .gantt_task_cell {
    color: white !important;
    border-color: rgb(31, 41, 55) !important;
  }
  .gantt_grid_data {
    border-right: 1px solid rgb(31, 41, 55) !important;
  }
}
.gantt_grid_data {
  border-right: 1px solid #d7d7d7;
}
</style>
