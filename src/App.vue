<template>
  <router-view />
</template>

<script>
import { onBeforeMount } from "vue";
import { useRouter, useRoute } from "vue-router";
import { supabase } from "../src/supabase";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();

    onBeforeMount(() => {
      if (!supabase.auth.user()) {
        router.replace("/login");
      }
      supabase.auth.onAuthStateChange(() => {
        if (!supabase.auth.user()) {
          router.replace("/login");
        } else if (route.path == "/login") {
          router.replace("/");
        }
      });
    });
  },
};
</script>
