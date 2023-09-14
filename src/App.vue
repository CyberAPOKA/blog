<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted } from 'vue';

import Sidebar from './components/Sidebar.vue';
import BottomNavigation from './components/BottomNavigation.vue';
import BackgroundParticles from './components/BackgroundParticles.vue';
import ModalConfig from './components/ModalConfig.vue';
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
  <BottomNavigation class="md:hidden" />
  <Sidebar class="hidden md:block" />
  <BackgroundParticles class="max-h-screen" />
  <header>
    <div class="container mx-auto text-center">
      <nav class="flex items-center justify-center gap-8 bg-base-100 bg-opacity-50 ">
        <RouterLink to="/" class="text-primary text-2xl">Home</RouterLink>
        <RouterLink to="/about" class="text-primary text-2xl">About</RouterLink>
        <button type="button" v-if="!soundEnabled" @click="toggleSound">
          <SoundDisabled />
        </button>
        <button type="button" v-if="soundEnabled" @click="toggleSound">
          <SoundEnabled />
        </button>
        <ModalConfig />
      </nav>
    </div>
    <audio ref="audioElement" loop>
      <source src="./assets/sound/music.mp3" type="audio/mpeg">
    </audio>
  </header>
  <RouterView />
</template>