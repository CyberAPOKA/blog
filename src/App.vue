<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue';

import SoundDisabled from './components/svgs/SoundDisabled.vue';
import SoundEnabled from './components/svgs/SoundEnabled.vue';

const soundEnabled = ref(false);
const audioElement = ref<HTMLAudioElement | null>(null);

const toggleSound = () => {
  if (soundEnabled.value) {
    audioElement.value?.pause();
  } else {
    audioElement.value?.play();
  }
  soundEnabled.value = !soundEnabled.value;
}

</script>

<template>
  <header>
    <div class="container mx-auto text-center">
      <nav class="flex justify-center gap-8">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <button type="button" v-if="!soundEnabled" @click="toggleSound">
          <SoundDisabled />
        </button>
        <button type="button" v-if="soundEnabled" @click="toggleSound">
          <SoundEnabled />
        </button>
      </nav>
    </div>



    <audio ref="audioElement" loop>
      <source src="./components/sound/music.mp3" type="audio/mpeg">
    </audio>
  </header>
  <RouterView />
</template>