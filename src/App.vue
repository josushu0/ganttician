<template>
  <router-view />
</template>

<script>
import { onBeforeMount } from "vue";
import { useRouter, useRoute } from "vue-router";
import { supabase } from "./supabase.js";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    onBeforeMount(() => {
      supabase.auth.onAuthStateChange(() => {
        if (supabase.auth.user() == null && route.path == "/") {
          router.replace("/login");
        } else if (route.path == "/login" || route.path == "/register") {
          router.replace("/");
        }
      });
    });
  },
};
</script>
