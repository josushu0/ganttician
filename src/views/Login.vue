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
      <UserForm :buttonText="buttonText" :login="login" @loginError='loginError' >
        <p class="mt-4 text-center text-gray-500 dark:text-gray-300">No tienes una cuenta?
          <router-link to="/register"
          class="dark text-blue-600 hover:underline dark:text-blue-300"> Regístrate</router-link>
        </p>
      </UserForm>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { TransitionRoot } from '@headlessui/vue';
import UserForm from '../components/UserForm.vue';
import supabase from '../supabase/supabase';
import AlertDialog from '../components/AlertDialog.vue';

export default {
  name: 'LoginView',
  components: { UserForm, AlertDialog, TransitionRoot },
  setup() {
    const router = useRouter();
    const buttonText = 'Iniciar sesión';
    const login = true;

    onBeforeMount(() => {
      if (supabase.auth.session()) {
        router.replace('/');
      }
    });

    const alertType = ref();
    const alertDescription = ref();
    const toggleAlert = ref(false);

    function dismissAlert() {
      toggleAlert.value = false;
    }

    function loginError(error) {
      alertType.value = 'Error';
      alertDescription.value = error;
      toggleAlert.value = true;
      setTimeout(() => dismissAlert(), 4000);
    }

    return {
      buttonText,
      login,
      alertType,
      alertDescription,
      loginError,
      toggleAlert,
      dismissAlert,
    };
  },
};
</script>
