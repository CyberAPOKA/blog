<script setup lang="ts">
import type { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

const particlesInit = async (engine: Engine) => {
  await loadSlim(engine);
};

const particlesLoaded = async (container: any) => {
  // console.log("Particles container loaded", container);
};
</script>

<template>
  <div>
    <vue-particles id="tsparticles" :particlesInit="particlesInit" :particlesLoaded="particlesLoaded"
      url="http://foo.bar/particles.json" />

    <vue-particles id="tsparticles" :particlesInit="particlesInit" :particlesLoaded="particlesLoaded" :options="{
      background: {
        color: {
          value: '#ffffff'
        }
      },
      fullScreen:{
        enable: true,
        zIndex: -1
      },
      fpsLimit: 240,
      interactivity: {
        events: {
          onClick: {
            enable: false,
            mode: 'push'
          },
          onHover: {
            enable: true,
            mode: 'repulse'
          },
          resize: true
        },
        modes: {
          bubble: {
            distance: 400,
            duration: 2,
            opacity: 0.8,
            size: 40
          },
          push: {
            quantity: 4
          },
          repulse: {
            distance: 100,
            duration: 0.1
          }
        }
      },
      particles: {
        color: {
          value: '#4b30a6'
        },
        links: {
          color: '#4b30a6',
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1
        },
        move: {
          direction: 'none',
          enable: true,
          outMode: 'bounce',
          random: false,
          speed: 1,
          straight: false
        },
        number: {
          density: {
            enable: true,
            area: 600
          },
          value: 120
        },
        opacity: {
          value: 0.5
        },
        shape: {
          type: 'circle'
        },
        size: {
          random: true,
          value: 5
        }
      },
      detectRetina: true
    }" />
  </div>
</template>
