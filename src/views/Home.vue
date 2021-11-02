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
import Navbar from '../components/Navbar.vue';
import supabase from '../supabase';

export default {
  name: 'HomeView',
  components: { Navbar },
  setup() {
    const router = useRouter();

    onBeforeMount(() => {
      if (!supabase.auth.session()) {
        router.replace('/login');
      }
    });

    async function handleSignout() {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
      } catch (error) {
        alert(error.error_description || error.message);
      }
    }

    return {
      handleSignout,
    };
  },
};
</script>
