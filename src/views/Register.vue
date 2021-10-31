<template>
  <div class="hero is-fullheight has-background-black-ter">
    <div class="hero-body">
      <UserForm actionType='Registrar'>
        <router-link to="/login" class="">Ya tienes una cuenta?</router-link>
      </UserForm>
    </div>
  </div>
</template>

<script>
import UserForm from '../components/UserForm.vue';

export default {
  name: 'RegisterView',
  components: { UserForm },
};
</script>
