<template>
  <div class="hero is-fullheight has-background-grey-dark">
    <div class="hero-body">
      <UserForm supa="Iniciar sesión" />
    </div>
  </div>
</template>

<script>
import supabase from '../supabase';
import UserForm from '../components/UserForm.vue';

export default {
  name: 'LoginView',
  components: { UserForm },
  setup() {
    const { email } = UserForm;
    const { password } = UserForm;

    const handleLogin = async () => {
      try {
        const { error } = await supabase.auth.signIn({
          email: email.value,
          password: password.value,
        });
        if (error) throw error;
      } catch (error) {
        alert(error.error_description || error.message);
      }
    };

    return {
      email,
      password,
      handleLogin,
    };
  },
};
</script>
