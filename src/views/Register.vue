<template>
  <div>
    <TransitionRoot
      :show="toggleAlert"
      enter="transition-opacity duration-75"
      enter-from="opacity-0"
      enter-to="opacity-100"
      leave="transition-opacity duration-150"
      leave-from="opacity-100"
      leave-to="opacity-0"
    >
      <AlertDialog :type='alertType' :description='alertDescription'
      class="absolute right-2 top-2" />
    </TransitionRoot>
    <div class="grid w-screen min-h-screen place-items-center bg-gray-100 bg-wiggle-light
    dark:bg-gray-700 dark:bg-wiggle-dark">
      <UserForm v-if="!mail" :buttonText="buttonText" :login="login" @email='email'
        @signupError="signupError">
        <p class="mt-4 text-center text-gray-500 dark:text-gray-300">
          Ya tienes una cuenta?
          <router-link to="/login"
          class="dark text-blue-600 hover:underline dark:text-blue-300"> Inicia sesión</router-link>
        </p>
      </UserForm>
      <ConfirmEmail v-else :correo='mail' />
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { TransitionRoot } from '@headlessui/vue';
import UserForm from '../components/UserForm.vue';
import supabase from '../supabase/supabase';
import AlertDialog from '../components/AlertDialog.vue';
import ConfirmEmail from '../components/ConfirmEmail.vue';

const router = useRouter();
const buttonText = 'Registrarse';
const login = false;
const mail = ref('');

onBeforeMount(() => {
  if (supabase.auth.session()) {
    router.replace('/');
  }
});

const alertType = ref('');
const alertDescription = ref('');
const toggleAlert = ref(false);

const email = (correo) => {
  mail.value = correo;
};

function dismissAlert() {
  toggleAlert.value = false;
}

function signupError(error) {
  alertType.value = 'Error';
  alertDescription.value = error;
  toggleAlert.value = true;
  setTimeout(() => dismissAlert(), 5000);
}
</script>
