<template>
  <div class="grid gap-0 grid-rows-[52px,calc(100vh-52px)] h-screen w-screen
  bg-gray-100 dark:bg-gray-700 lg:grid-cols-[3.5rem,calc(100vw-3.5rem)]">
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
    <div v-for='project in projects' :key='project.id'>
      <button class="navbar_item rounded-lg ml-2 lg:mt-2 lg:ml-0 lg:w-11 lg:h-11
                  flex justify-center items-center w-10 h-10 shadow-lg"
                  @click="showGantt">
                  {{project.project_name}}
      </button>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { TransitionRoot } from '@headlessui/vue';
import AlertDialog from './AlertDialog.vue';
import supabase from '../supabase/supabase';

const session = supabase.auth.session();
const toggleAlert = ref(false);
const alertType = ref();
const alertDescription = ref();

// eslint-disable-next-line no-undef
const emit = defineEmits(['showGantt']);
const projects = ref('');

onBeforeMount(async () => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user', session.user.id);

    if (error) {
      throw error;
    }
    if (data) {
      projects.value = data;
    }
  } catch (error) {
    alert(error);
  }
});

const showGantt = () => {
  emit('showGantt');
};

</script>
