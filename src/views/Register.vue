<template>
  <div class="hero is-fullheight has-background-grey-dark">
    <div class="hero-body">
      <UserForm supa="Registrarse" />
    </div>
  </div>
</template>

<script>
import { supabase } from "../supabase.js";
import UserForm from "../components/UserForm.vue";

export default {
  name: "Register",
  components: { UserForm },
  setup() {
    const email = UserForm.email;
    const password = UserForm.password;

    const handleSignup = async () => {
      try {
        const { error } = await supabase.auth.signUp({
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
      handleSignup,
    };
  },
};
</script>
