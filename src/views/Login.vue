<template>
  <div class="hero is-fullheight has-background-black-ter">
    <div class="hero-body p-0">
      <UserForm :buttonText="buttonText" :login="login">
        <p>No tienes una cuenta? <router-link to="/register">Regístrate</router-link></p>
      </UserForm>
    </div>
  </div>
</template>

<script>
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import UserForm from '../components/UserForm.vue';
import supabase from '../supabase';

export default {
  name: 'LoginView',
  components: { UserForm },
  setup() {
    const router = useRouter();
    onBeforeMount(() => {
      if (supabase.auth.session()) {
        router.replace('/');
      }
    });

    const buttonText = 'Iniciar sesión';
    const login = true;
    return {
      buttonText,
      login,
    };
  },
};
</script>
