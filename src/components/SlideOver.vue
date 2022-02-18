<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog as="div" class="fixed inset-0 overflow-hidden" @close="close">
      <div class="absolute inset-0 overflow-hidden">
        <TransitionChild as="template"
        enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
          <DialogOverlay class="absolute inset-0 bg-gray-500/75 dark:bg-gray-800/60
          transition-opacity" />
        </TransitionChild>
        <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <TransitionChild as="template"
          enter="transform transition ease-in-out duration-500 sm:duration-700"
          enter-from="translate-x-full" enter-to="translate-x-0"
          leave="transform transition ease-in-out duration-500 sm:duration-700"
          leave-from="translate-x-0" leave-to="translate-x-full">
            <div class="relative w-screen max-w-md">
              <TransitionChild as="template"
              enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100"
              leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
                <div class="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                  <button type="button"
                  class="rounded-md text-gray-300 hover:text-white
                  focus:outline-none focus:ring-2 focus:ring-white"
                  @click="close">
                    <span class="sr-only">Cerrar panel</span>
                    <XIcon class="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <div class="h-full flex flex-col py-6 bg-gray-50 shadow-xl overflow-y-scroll
              dark:bg-gray-800 ">
                <div class="px-4 sm:px-6">
                  <DialogTitle class="text-xl font-medium text-gray-700 dark:text-gray-200
                  border-b-2 border-gray-700 dark:border-gray-200 pb-2">
                    Editar tarea
                  </DialogTitle>
                </div>
                <div class="mt-6 relative flex-1 px-4 sm:px-6">
                  <!-- Replace with your content -->
                  <div class="absolute inset-0 px-4 sm:px-6">
                    <div class="h-full" aria-hidden="true">
                      <slot></slot>
                    </div>
                  </div>
                  <!-- /End replace -->
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { toRef } from 'vue';
import {
  Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot,
} from '@headlessui/vue';
import { XIcon } from '@heroicons/vue/outline';

export default {
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    XIcon,
  },
  props: { toggle: Boolean },
  emits: ['closeSlideOver'],
  setup(props, { emit }) {
    const isOpen = toRef(props, 'toggle');

    const close = () => {
      emit('closeSlideOver');
    };

    return {
      isOpen,
      close,
    };
  },
};
</script>
