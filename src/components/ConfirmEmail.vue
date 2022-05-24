<template>
  <div class="bg-gray-50 dark:bg-gray-800
      px-7 py-6 w-full h-full shadow-xl
      text-gray-700 dark:text-gray-200
      sm:max-w-xl sm:h-auto sm:rounded-lg">
      <h1 class="text-2xl font-bold mb-4">Confirma tu dirección de correo electrónico</h1>
      <p class='mb-4'>
        Hemos enviado un mensaje de confirmación a
        <span class='font-bold'> {{ props.correo }}.</span>
      </p>
      <p class='mb-4'>
        Por favor dirígete a tu correo y haz clic en el enlace para completar tu registro.
      </p>
      <button class="rounded bg-purple-500 text-white py-2 px-6 uppercase mt-2
      hover:bg-purple-600">Iniciar sesión</button>
    </div>
</template>

<script setup>
// eslint-disable-next-line no-undef
const props = defineProps({
  correo: String,
});
</script>
