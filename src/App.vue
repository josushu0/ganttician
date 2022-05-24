<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import supabase from './supabase/supabase';

const router = useRouter();

onMounted(() => {
  router.replace('/');
});

supabase.auth.onAuthStateChange((event) => {
  if (event === 'SIGNED_IN') {
    router.replace('/');
  } else if (event === 'SIGNED_OUT') {
    router.replace('/login');
  }
});
</script>
