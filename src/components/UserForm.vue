<template>
  <div class="grid place-content-stretch
      bg-gray-50 dark:bg-gray-800
      px-7 py-6 w-full h-full shadow-xl
      text-gray-700 dark:text-gray-200
      sm:max-w-sm sm:h-auto sm:rounded-lg">
    <div class="flex flex-col items-center justify-end mb-4">
      <img src="../assets/logo.png" alt="Logo" width="96" height="96">
      <h1 class="text-2xl font-bold">Bienvenido</h1>
    </div>
    <form @submit.prevent="handleType">
      <div class="mb-4" v-if="!login">
        <label for="username" class="font-bold text-sm">Usuario</label>
        <div class="relative w-full mt-1 text-gray-300 dark:text-gray-500
        focus-within:text-gray-700 dark:focus-within:text-gray-200">
          <input type="text" name="username" id="username" v-model="userName" required
          class="rounded border-gray-300 w-full text-gray-700 dark:text-gray-200
          focus:ring-purple-600 focus:border-transparent text-sm sm:text-base pl-10
          dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-purple-500">
          <span class="absolute h-full w-10 left-0 top-0 z-10
          flex justify-center items-center pointer-events-none">
            <UserIcon class="h-5 w-5 mb-[2px] sm:h-6 sm:w-6" />
          </span>
        </div>
      </div>

      <div class="mb-4">
        <label for="email" class="font-bold text-sm">Email</label>
        <div class="relative w-full mt-1 text-gray-300 dark:text-gray-500
        focus-within:text-gray-700 dark:focus-within:text-gray-200">
          <input type="email" name="email" id="email" v-model="userEmail" required
          class="rounded border-gray-300 w-full text-gray-700 dark:text-gray-200
          focus:ring-purple-600 focus:border-transparent text-sm sm:text-base pl-10
          dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-purple-500">
          <span class="absolute h-full w-10 left-0 top-0 z-10
          flex justify-center items-center pointer-events-none">
            <MailIcon class="h-5 w-5 sm:h-6 sm:w-6" />
          </span>
        </div>
      </div>

      <div class="mb-4">
        <label for="password" class="font-bold text-sm">Contraseña</label>
        <div class="relative w-full mt-1 text-gray-300 dark:text-gray-500
        focus-within:text-gray-700 dark:focus-within:text-gray-200">
          <input type="password" name="password" id="password" v-model="userPassword" required
          class="rounded border-gray-300 w-full text-gray-700 dark:text-gray-200
          focus:ring-purple-600 focus:border-transparent text-sm sm:text-base pl-10
          dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-purple-500">
          <span class="absolute h-full w-10 left-0 top-0 z-10
          flex justify-center items-center pointer-events-none">
            <LockClosedIcon class="h-5 w-5 sm:h-6 sm:w-6" />
          </span>
        </div>
      </div>

      <button type="submit"
      class="rounded bg-purple-500 text-white py-2 px-6 uppercase w-full mt-2
      hover:bg-purple-600">
        {{ buttonText }}
      </button>

      <slot></slot>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { MailIcon, LockClosedIcon, UserIcon } from '@heroicons/vue/solid';
import supabase from '../supabase/supabase';

export default {
  name: 'UserForm',
  components: { MailIcon, LockClosedIcon, UserIcon },
  props: {
    buttonText: String,
    login: Boolean,
  },
  setup(props, { emit }) {
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
        emit('signupError');
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
        emit('loginError');
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
        emit('signupError');
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

<style>
/* body {
  color: #d1d5db,
} */
</style>
