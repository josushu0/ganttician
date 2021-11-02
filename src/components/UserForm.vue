<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-8-tablet is-6-desktop is-5-widescreen is-4-fullhd">
        <form class="box has-background-light p-5" @submit.prevent="handleType">
          <div class="is-flex is-flex-direction-column is-align-items-center mb-6">
            <img class="image is-96x96" src="../../src/assets/logo.png" alt="Vue logo" />
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
                {{ actionType }}
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
import { supabase } from '../supabase';

export default {
  name: 'UserForm',
  props: {
    actionType: String,
    login: Boolean,
  },
  data() {
    return {
      userEmail: '',
      userPassword: '',
    };
  },
  methods: {
    async handleLogin() {
      try {
        const { error } = await supabase.auth.signIn({
          email: this.userEmail,
          password: this.userPassword,
        });
        if (error) { throw error; }
      } catch (error) {
        console.log(error.error_description || error.message);
      }
    },

    async handleSignup() {
      try {
        const { error } = await supabase.auth.signUp({
          email: this.userEmail,
          password: this.userPassword,
        });
        if (error) { throw error; }
      } catch (error) {
        console.log(error.error_description || error.message);
      }
    },

    handleType() {
      if (this.login) {
        this.handleLogin();
      } else this.handleSignup();
    },
  },
};
</script>
