<template>
  <div class="hero is-fullheight has-background-grey-dark">
    <div class="hero-body">
      <UserForm supa="Iniciar sesión" />
    </div>
  </div>
</template>

<script>
import { supabase } from "../supabase.js";
import UserForm from "../components/UserForm.vue";

export default {
  name: "Login",
  components: { UserForm },
  setup() {
    const email = UserForm.email;
    const password = UserForm.password;

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
