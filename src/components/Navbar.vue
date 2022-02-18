<template>
  <nav class="fixed top-0 left-0 h-16 w-screen flex flex-row items-center bg-gray-100 text-gray-700
              lg:flex-col lg:h-screen lg:w-16
              dark:bg-gray-800 dark:text-white">
    <img src="../assets/logo.png" alt="Logo" height="34" width="34" class="ml-2 lg:mt-2 lg:ml-0">

    <hr class="bg-gray-300 dark:bg-gray-900 border border-gray-300 ml-2 h-3/4 w-0
                lg:mt-2 lg:ml-0 lg:w-9/12 lg:h-0 dark:border-gray-900" />

    <button class="navbar_item rounded-lg ml-2 lg:mt-2 lg:ml-0 lg:w-11 lg:h-11
                  flex justify-center items-center w-10 h-10 shadow-lg"
                  @click="hideDrawer">
      <MenuIcon class="h-5 w-5 lg:h-6 lg:w-6" />
    </button>

    <button class="navbar_item rounded-lg ml-2 lg:mt-2 lg:ml-0 lg:w-11 lg:h-11
                  flex justify-center items-center w-10 h-10 shadow-lg"
                  @click="showProjects">
      <CollectionIcon class="h-5 w-5 lg:h-6 lg:w-6" />
    </button>

    <button class="navbar_item rounded-lg ml-2 lg:mt-2 lg:ml-0 lg:w-11 lg:h-11
                  flex justify-center items-center w-10 h-10 shadow-lg">
      <PlusIcon class="h-5 w-5 lg:h-6 lg:w-6" />
    </button>

    <hr class="bg-gray-300 dark:bg-gray-900 border border-gray-300 ml-auto h-3/4 w-0
                lg:mt-auto lg:ml-0 lg:w-9/12 lg:h-0 dark:border-gray-900" />

    <button class="logout_button rounded-lg ml-2 mr-2 lg:mt-2 lg:ml-0 lg:mr-0 lg:mb-2
                  flex justify-center items-center w-10 h-10 shadow-lg
                  lg:w-11 lg:h-11"
                  @click="handleSignout">
      <LogoutIcon class="h-5 w-5 lg:h-6 lg:w-6" />
    </button>
  </nav>
</template>

<script setup>
import {
  CollectionIcon, MenuIcon, PlusIcon, LogoutIcon,
} from '@heroicons/vue/solid';
import supabase from '../supabase/supabase';

// eslint-disable-next-line no-undef
const emit = defineEmits(['hideDrawer', 'showProjects', 'signoutError']);

let hiddenDrawer = false;

async function handleSignout() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    emit('signoutError', error.message);
  }
}

const hideDrawer = () => {
  hiddenDrawer = !hiddenDrawer;
  emit('hideDrawer', hiddenDrawer);
};

const showProjects = () => {
  emit('showProjects');
};
</script>
