<template>
  <div>
    <div id="gantt" class="w-full h-full"></div>
    <SlideOver :toggle="toggleSlideOver" @closeSlideOver="closeSlideOver" class="z-50">
      <TaskForm :edit=edit @addTask="addTask" @editTask="editTask" />
    </SlideOver>
  </div>
</template>

<script setup>
import { gantt } from 'dhtmlx-gantt';
import { v4 as uuid } from 'uuid';
import {
  onUnmounted, ref, reactive, onBeforeMount,
} from 'vue';
import useTaskStore from '../stores/taskStore';
import SlideOver from './SlideOver.vue';
import TaskForm from './TaskForm.vue';
import supabase from '../supabase/supabase';

// eslint-disable-next-line no-undef
const emit = defineEmits(['ganttError']);
const taskEdit = useTaskStore();
const edit = ref();
const session = supabase.auth.session();
const tasks = reactive({
  data: [],
  links: [],
});

async function getTasks() {
  if (session) {
    try {
      const { data: ganttTasks, error: tasksError } = await supabase
        .from('gantt_tasks')
        .select('id,duration,text,description,start_date,progress,parent')
        .eq('user', session.user.id);
      // .eq('project', props.project);
      tasks.data = ganttTasks;
      const { data: ganttLinks, error: linksError } = await supabase
        .from('gantt_links')
        .select('type,source,target');
      // .eq('project', props.project);
      tasks.links = ganttLinks;
      gantt.init('gantt');
      gantt.parse(tasks);
      if (tasksError) throw tasksError;
      else if (linksError) throw linksError;
    } catch (error) {
      emit('ganttError', error);
    }
  }
}

async function addTask(taskInfo) {
  const {
    title, description, start, finish, progress,
  } = taskInfo;
  const duration = (Date.parse(finish.value) - Date.parse(start.value)) / 1000 / 60 / 60 / 24;
  const id = uuid();
  try {
    const { error } = await supabase
      .from('gantt_tasks')
      .insert([
        {
          id,
          user: session.user.id,
          text: title.value,
          description: description.value,
          start_date: start.value,
          duration,
          progress: progress.value / 100,
          // parent,
          // project: props.project
        },
      ]);
    if (error) throw error;
    gantt.addTask({
      id,
      text: title.value,
      description: description.value,
      start_date: start.value,
      duration,
      progress: progress.value / 100,
      // parent,
    });
    gantt.hideLightbox();
  } catch (error) {
    emit('ganttError', error);
  }
}

async function editTask(taskInfo) {
  const {
    id, title, description, start, finish, progress,
  } = taskInfo;
  const duration = (Date.parse(finish.value) - Date.parse(start.value)) / 1000 / 60 / 60 / 24;
  try {
    const { error } = await supabase
      .from('gantt_tasks')
      .update({
        text: title.value,
        description: description.value,
        start_date: start.value,
        duration,
        progress: progress.value / 100,
      })
      .eq('id', id.value);
    if (error) throw error;
  } catch (error) {
    emit('ganttError', error);
  }
  const task = gantt.getTask(id.value);
  task.text = title.value;
  task.description = description.value;
  task.progress = progress.value / 100;
  task.start_date = new Date(start.value);
  task.end_date = new Date(finish.value);
  gantt.updateTask(id.value);
  gantt.hideLightbox();
}

async function handleDrag(task) {
  try {
    const { error } = await supabase
      .from('gantt_tasks')
      .update({
        text: task.title,
        start_date: task.start_date,
        duration: task.duration,
        progress: task.progress,
      })
      .eq('id', task.id);
    if (error) throw error;
  } catch (error) {
    emit('ganttError', error);
  }
}

async function addLink(link) {
  try {
    const id = uuid();
    const { error } = await supabase
      .from('gantt_links')
      .insert({
        id,
        type: link.type,
        source: link.source,
        target: link.target,
        // project: ,
      });
    if (error) throw error;
    gantt.changeLinkId(link.id, id);
  } catch (error) {
    emit('ganttError', error);
  }
}

// Slide Over controls
const toggleSlideOver = ref(false);

function showSlideOver() {
  toggleSlideOver.value = true;
}

function closeSlideOver() {
  toggleSlideOver.value = false;
}

// ------------------ Gantt config ------------------ //
onBeforeMount(() => {
  gantt.i18n.setLocale('es');
  gantt.config.date_format = '%Y-%m-%d';
  gantt.config.cascade_delete = false;

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
    { name: 'text', width: '*', tree: true },
    { name: 'start_date', width: 85, align: 'center' },
    { name: 'duration', width: 85, align: 'center' },
    { name: 'add', label: '', width: 35 },
  ];

  // Time Grid configuration
  gantt.config.fit_tasks = true;
  gantt.config.sort = true;
  gantt.config.autoscroll = true;
  gantt.config.touch_drag = 200;
  gantt.config.touch = 'force';
  gantt.config.wai_aria_attributes = true;
  gantt.config.grid_width = 400;

  gantt.attachEvent('onTaskDblClick', (id) => {
    const {
      text, description, start_date: startDate, end_date: endDate, progress,
    } = gantt.getTask(id);
    taskEdit.task.id = id;
    taskEdit.task.text = text;
    taskEdit.task.description = description;
    let mes = startDate.getMonth() + 1;
    if (mes < 10) {
      mes = `0${mes}`;
    }
    taskEdit.task.start_date = `${startDate.getFullYear()}-${mes}-${startDate.getDate()}`;
    mes = endDate.getMonth() + 1;
    if (mes < 10) {
      mes = `0${mes}`;
    }
    taskEdit.task.end_date = `${endDate.getFullYear()}-${mes}-${endDate.getDate()}`;
    taskEdit.task.progress = progress;
    edit.value = true;
    gantt.showLightbox();
  });

  gantt.attachEvent('onAfterTaskDrag', (id) => {
    const task = gantt.getTask(id);
    handleDrag(task);
  });

  gantt.attachEvent('onAfterLinkAdd', (id) => {
    const link = gantt.getLink(id);
    console.log(link);
    addLink(link);
  });

  gantt.createTask = () => {
    edit.value = false;
    gantt.showLightbox();
  };

  gantt.showLightbox = () => {
    showSlideOver();
  };

  gantt.hideLightbox = () => {
    closeSlideOver();
    gantt.refreshData();
  };

  // Plugins configuration
  gantt.plugins({
    drag_timeline: true,
    tooltip: true,
  });
  gantt.templates.tooltip_text = (start, end) => `<b>Inicio:</b> ${gantt.templates
    .tooltip_date_format(start)}<br/><b>Fin:</b> ${gantt.templates.tooltip_date_format(end)}`;

  getTasks();
});

onUnmounted(() => {
  tasks.data = [];
  tasks.links = [];
  gantt.clearAll();
});
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
.gantt_tree_content {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
