/* eslint-disable quotes */
<template>
  <div id="gantt"></div>
</template>

<script>
import { gantt } from 'dhtmlx-gantt';
import { onMounted } from 'vue';

export default {
  name: 'GanttChart',
  props: {
    tasks: {
      type: Object,
      default() {
        return { data: [], links: [] };
      },
    },
  },
  setup(props) {
    onMounted(() => {
      gantt.config.xml_date = '%d-%m-%Y';
      gantt.config.scale_height = 50;
      gantt.config.scales = [
        { unit: 'month', step: 1, format: '%F, %Y' },
        { unit: 'day', step: 1, format: '%d, %D' },
      ];
      gantt.config.fit_tasks = true;
      gantt.config.sort = true;
      gantt.config.autoscroll = true;

      // Lightbox configuration
      gantt.locale.labels.section_time = 'Periodo';
      gantt.config.lightbox.sections = [
        {
          name: 'description', height: 45, type: 'textarea', map_to: 'text', focus: true,
        }, {
          name: 'time', height: 35, type: 'duration', map_to: 'auto',
        },
      ];
      gantt.config.lightbox_additional_height = 110;
      gantt.config.buttons_left = ['gantt_cancel_btn'];
      gantt.config.buttons_right = ['gantt_save_btn', 'gantt_delete_btn'];

      // Plugins
      gantt.plugins({
        drag_timeline: true,
        tooltip: true,
        undo: true,
      });
      gantt.templates.tooltip_text = function (start, end) {
        return `<b>Inicio:</b> ${gantt.templates.tooltip_date_format(start)}<br/><b>Fin:</b> ${gantt.templates.tooltip_date_format(end)}`;
      };

      gantt.config.touch_drag = 200;
      gantt.i18n.setLocale('es');

      gantt.init('gantt');
      gantt.parse(props.tasks);
    });
  },
};
</script>

<style>
/* @import "../../node_modules/dhtmlx-gantt/codebase/dhtmlxgantt.css"; */
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
