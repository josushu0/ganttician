<template>
  <div class="flex w-80 mx-auto overflow-hidden bg-white
  rounded-lg shadow-md dark:bg-gray-800">
    <div class="flex items-center justify-center w-12"
    :class="[bgType ? 'bg-green-400' : 'bg-red-400']">
      <CheckCircleIcon v-if="bgType" class="h-6 w-6 text-gray-50 fill-current"/>
      <ExclamationCircleIcon v-else class="h-6 w-6 text-gray-50 fill-current"/>
    </div>

    <div class="px-4 py-2 -mx-3">
        <div class="mx-3">
            <span class="font-semibold"
            :class="[bgType ? 'text-green-400' : 'text-red-400' ]">{{ type }}</span>
            <p class="text-sm text-gray-600 dark:text-gray-200">{{ description }}</p>
        </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/vue/solid';

export default {
  name: 'AlertDialog',
  components: { CheckCircleIcon, ExclamationCircleIcon },
  props: {
    type: String,
    description: String,
  },
  setup(props) {
    const bgType = ref();

    if (props.type === 'Error') {
      bgType.value = false;
    } else {
      bgType.value = true;
    }

    return {
      bgType,
    };
  },
};
</script>
