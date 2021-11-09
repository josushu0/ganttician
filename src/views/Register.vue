<template>
  <div class="grid w-screen h-screen place-items-center bg-gray-100 bg-wiggle-light
  dark:bg-gray-700 dark:bg-wiggle-dark">
    <UserForm :buttonText="buttonText" :login="login">
      <p class="mt-4 text-center">
        Ya tienes una cuenta?
        <router-link to="/login"
        class="text-blue-700 hover:underline dark:text-blue-400"> Inicia sesión</router-link>
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
  name: 'RegisterView',
  components: { UserForm },
  setup() {
    const router = useRouter();
    onBeforeMount(() => {
      if (supabase.auth.session()) {
        router.replace('/');
      }
    });

    const buttonText = 'Registrarse';
    const login = false;

    return {
      buttonText,
      login,
    };
  },
};
</script>
