<template>
  <Navbar>
    <button class="button is-primary" @click="handleSignout">
      <strong>Cerrar sesión</strong>
    </button>
  </Navbar>
</template>

<script>
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../supabase';
import Navbar from '../components/Navbar.vue';

export default {
  name: 'HomeView',
  components: { Navbar },
  setup() {
    const router = useRouter();

    const handleSignout = async () => {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
      } catch (error) {
        alert(error.error_description || error.message);
      }
    };

    onBeforeMount(() => {
      if (!supabase.auth.user()) {
        router.replace('/login');
      }
    });

    return {
      handleSignout,
    };
  },
};
</script>
