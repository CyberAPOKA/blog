<script setup lang="ts">
import { ref } from 'vue';
import WelcomeCats from '../components/svgs/WelcomeCats.vue';
import PuzzleGame from '../components/PuzzleGame.vue';

const imageNumbers = ref([1, 2, 3, 4, 5, 6, 7, 8, 9]);

</script>

<template>
  <!-- <Sidebar /> -->
  <main class="min-h-screen z-50">

    <div class="flex flex-col justify-center items-center gap-12 mt-20">
      <h1 class="text-accent text-5xl">Work in progress...</h1>

      <WelcomeCats class="h-96 w-96" />
      <PuzzleGame />
      <!-- <div class="grid grid-cols-3">
        <img v-for="number in imageNumbers" :key="number" :src="`/blog/src/components/images/${number}.jpg`" alt="">
      </div> -->
    </div>

  </main>
</template>

<style>
.slide-fwd-center {
  -webkit-animation: slide-fwd-center 0.45s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation: slide-fwd-center 0.45s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@-webkit-keyframes slide-fwd-center {
  0% {
    -webkit-transform: translateZ(0);
    transform: translateZ(0)
  }

  100% {
    -webkit-transform: translateZ(160px);
    transform: translateZ(160px)
  }
}

@keyframes slide-fwd-center {
  0% {
    -webkit-transform: translateZ(0);
    transform: translateZ(0)
  }

  100% {
    -webkit-transform: translateZ(160px);
    transform: translateZ(160px)
  }
}
</style>