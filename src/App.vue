<template>
  <router-view />
</template>

<script>
import { onBeforeMount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { supabase } from './supabase';

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    onBeforeMount(() => {
      supabase.auth.onAuthStateChange((user) => {
        if (!user) {
          router.replace('/login');
        } else if (route.path === '/login' || route.path === '/register') {
          router.replace('/');
        }
      });
    });
  },
};
</script>
