<template>
  <div class="hero is-fullheight has-background-black-ter">
    <div class="hero-body">
      <UserForm :actionType="actionType" :login="login">
        <router-link to="/register">No tienes una cuenta?</router-link>
      </UserForm>
    </div>
  </div>
</template>

<script>
import UserForm from '../components/UserForm.vue';

export default {
  name: 'LoginView',
  components: { UserForm },
  data() {
    return {
      actionType: 'Iniciar sesión',
      login: true,
    };
  },
};
</script>
