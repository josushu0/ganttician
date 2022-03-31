<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="close">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center
        sm:block sm:p-0">
        <TransitionChild as="template" enter="ease-out duration-300"
          enter-from="opacity-0" enter-to="opacity-100"
          leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity
            dark:bg-gray-800/60" />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <TransitionChild as="template" enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
          <div class="relative inline-block align-bottom rounded-lg text-left
            overflow-hidden shadow-xl transform transition-all
            sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-gray-200 dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <slot></slot>
              </div>
            </div>

          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  Dialog, DialogOverlay, TransitionChild, TransitionRoot,
} from '@headlessui/vue';
import { toRef } from 'vue';

// eslint-disable-next-line no-undef
const props = defineProps({ toggle: Boolean });
// eslint-disable-next-line no-undef
const emit = defineEmits(['closeModal']);
const isOpen = toRef(props, 'toggle');

const close = () => {
  emit('closeModal');
};
</script>
