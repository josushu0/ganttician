<template>
  <div class="container">
    <div class="columns is-centered m-0">
      <div class="column is-7-tablet is-6-desktop is-5-widescreen is-4-fullhd">
        <form class="box has-background-light p-5" @submit.prevent="handleType">
          <div class="is-flex is-flex-direction-column is-align-items-center mb-5">
            <img class="image is-96x96" src="../../src/assets/logo.png" alt="Vue logo" />
            <h1 class="title is-3">Bienvenido</h1>
          </div>

          <div class="field mb-3" v-if="!login">
            <label for="username" class="label">Nombre de usuario</label>
            <div class="control has-icons-left">
              <input
                type="text"
                name="username"
                id="username"
                class="input"
                v-model="userName"
                required
              />
              <span class="icon is-small is-left">
                <fa class="fa" icon="user" />
              </span>
            </div>
          </div>

          <div class="field mb-3">
            <label for="email" class="label">Email</label>
            <div class="control has-icons-left">
              <input
                type="email"
                name="email"
                id="email"
                class="input"
                v-model="userEmail"
                required
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
                v-model="userPassword"
                required
              />
              <span class="icon is-small is-left">
                <fa class="fa" icon="lock" />
              </span>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <!-- TODO -->
              <button
                type="submit"
                class="button is-rounded is-primary is-uppercase is-fullwidth">
                {{ buttonText }}
              </button>
            </div>
          </div>
          <slot></slot>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import supabase from '../supabase';

export default {
  name: 'UserForm',
  props: {
    buttonText: String,
    login: Boolean,
  },
  setup(props) {
    const userName = ref('');
    const userEmail = ref('');
    const userPassword = ref('');

    async function createProfile() {
      try {
        const { error } = await supabase
          .from('profile')
          .insert([
            { id: supabase.auth.user().id, user_name: userName.value },
          ]);
        if (error) { throw error; }
      } catch (error) {
        console.log(error.error_description || error.message);
      }
    }

    async function handleLogin() {
      try {
        const { error } = await supabase.auth.signIn({
          email: userEmail.value,
          password: userPassword.value,
        });
        if (error) { throw error; }
      } catch (error) {
        console.log(error.error_description || error.message);
      }
    }

    async function handleSignup() {
      try {
        const { error } = await supabase.auth.signUp({
          email: userEmail.value,
          password: userPassword.value,
        });
        if (error) { throw error; }
        createProfile();
      } catch (error) {
        console.log(error.error_description || error.message);
      }
    }

    function handleType() {
      if (props.login) {
        handleLogin();
      } else handleSignup();
    }

    return {
      handleLogin,
      handleSignup,
      handleType,
      userName,
      userEmail,
      userPassword,
    };
  },
};
</script>
