<template>
  <div class="hero is-fullheight has-background-black-ter">
    <div class="hero-body">
      <UserForm actionType='Iniciar Sesión'>
        <router-link to="/register" class="">No tienes una cuenta?</router-link>
      </UserForm>
    </div>
  </div>
</template>

<script>
import UserForm from '../components/UserForm.vue';

export default {
  name: 'LoginView',
  components: { UserForm },
};
</script>
