<template>
  <router-view />
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import supabase from './supabase/supabase';

const router = useRouter();
const route = useRoute();

supabase.auth.onAuthStateChange((_event, session) => {
  if (!session) {
    router.replace('/login');
  } else if (route.path === '/login' || route.path === '/register') {
    router.replace('/');
  }
});
</script>
