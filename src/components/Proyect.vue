<template>
  <div class="bg-gray-100 dark:bg-gray-700 h-screen w-screen grid place-content-center">
    <div class="flex justify-center items-center flex-wrap gap-3 max-w-3xl m-auto">
      <button v-for='projectItem in projects' :key='projectItem.id'
        class="bg-gray-300 text-gray-900 rounded-lg h-32 w-32 shadow-lg
          dark:bg-gray-800 dark:text-gray-50 hover:bg-gray-400 hover:dark:bg-gray-900"
          @click="getProject(projectItem)">
          {{projectItem.project_name}}
      </button>
      <button class="bg-gray-300 text-gray-900 rounded-lg h-32 w-32 shadow-lg
        dark:bg-gray-800 dark:text-gray-50 flex justify-center items-center
        hover:bg-gray-400 hover:dark:bg-gray-900">
        <PlusSmIcon class="h-12 w-12" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { PlusSmIcon } from '@heroicons/vue/outline';
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
      .select('id,project_name')
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

const getProject = (projectItem) => {
  projectStore.project = projectItem;
  if (localStorage.getItem('projectId') === null && localStorage.getItem('projectName') === null) {
    localStorage.setItem('projectId', projectItem.id);
    localStorage.setItem('projectName', projectItem.project_name);
  }
  showGantt();
};

</script>
