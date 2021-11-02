<template>
  <div class="hero is-fullheight has-background-black-ter">
    <div class="hero-body p-0">
      <UserForm :buttonText="buttonText" :login="login">
        <p>
          Ya tienes una cuenta? <router-link to="/login" class="">Inicia sesión</router-link>
        </p>
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
