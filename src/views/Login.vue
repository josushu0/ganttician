<template>
  <div class="grid w-screen h-screen place-items-center bg-gray-100 bg-wiggle-light
  dark:bg-gray-700 dark:bg-wiggle-dark">
    <UserForm :buttonText="buttonText" :login="login">
      <p class="mt-4 text-center">No tienes una cuenta?
        <router-link to="/register"
        class="dark text-blue-700 hover:underline dark:text-blue-400"> Regístrate</router-link>
      </p>
    </UserForm>
  </div>
</template>

<script>
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import UserForm from '../components/UserForm.vue';
import supabase from '../supabase/supabase';

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
