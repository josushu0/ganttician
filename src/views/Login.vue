<template>
  <div class="hero is-fullheight has-background-grey-dark">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div
            class="column is-8-tablet is-6-desktop is-5-widescreen is-4-fullhd"
          >
            <div class="box p-5">
              <div
                class="
                  is-flex is-flex-direction-column is-align-items-center
                  mb-6
                "
              >
                <img
                  class="image is-96x96"
                  src="../../src/assets/logo.png"
                  alt="Vue logo"
                />
                <h1 class="title is-3">Bienvenido</h1>
              </div>

              <div class="field mb-5">
                <label for="email" class="label">Email</label>
                <div class="control has-icons-left">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="input"
                    v-model="email"
                  />
                  <span class="icon is-small is-left">
                    <fa class="fa" icon="envelope" />
                  </span>
                </div>
              </div>

              <div class="field mb-6">
                <label for="password" class="label">Contraseña</label>
                <div class="control has-icons-left">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    class="input"
                    v-model="password"
                  />
                  <span class="icon is-small is-left">
                    <fa class="fa" icon="lock" />
                  </span>
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <button
                    class="
                      button
                      is-rounded is-primary is-uppercase is-fullwidth
                    "
                    @click="handleLogin"
                  >
                    Iniciar sesión
                  </button>
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <button
                    class="
                      button
                      is-rounded is-primary is-uppercase is-fullwidth
                    "
                    @click="handleSignup"
                  >
                    Crear usuario
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { supabase } from "../supabase";

export default {
  name: "Login",
  setup() {
    const email = ref("");
    const password = ref("");

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
      handleLogin,
      handleSignup,
    };
  },
};
</script>
