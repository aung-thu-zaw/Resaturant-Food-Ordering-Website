<script setup></script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 font-roboto background">
    <slot />
  </div>
</template>

<style scoped>
.background {
  background-image: url('https://img.freepik.com/premium-photo/dark-creative-kitchen-background-top-view_187166-4009.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: rgba(0, 0, 0, 0.25);
  background-blend-mode: overlay;
}
</style>