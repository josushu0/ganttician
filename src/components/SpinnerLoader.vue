<template>
  <div class="h-screen w-screen grid place-content-center">
    <div class="spinner"></div>
  </div>
</template>

<style scoped>
.spinner {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.spinner:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 8px solid;
  border-color: #9CA3AF transparent #9CA3AF transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
