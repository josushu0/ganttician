<template>
  <div class="flex w-full max-w-sm mx-auto overflow-hidden bg-white
  rounded-lg shadow-md dark:bg-gray-800">
        <div class="flex items-center justify-center w-12"
        :class="[bgType ? bg-green-400 : bg-red-400]">
            <slot></slot>
        </div>

        <div class="px-4 py-2 -mx-3">
            <div class="mx-3">
                <span class="font-semibold"
                :class="[bgType ? text-green-400 : text-red-400, ]">{{ type }}</span>
                <p class="text-sm text-gray-600 dark:text-gray-200">{{ description }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onBeforeMount } from 'vue';

export default {
  name: 'AlertDialog',
  props: {
    type: String,
    description: String,
  },
  setup(props) {
    const toggle = ref(false);
    const bgType = ref();

    onBeforeMount(() => {
      if (props.type === 'Error') {
        bgType.value = false;
      } else {
        bgType.value = true;
      }
    });

    return {
      toggle,
      bgType,
    };
  },
};
</script>
