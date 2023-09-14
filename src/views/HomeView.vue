<script setup lang="ts">
import { ref } from 'vue';
import WelcomeCats from '../components/svgs/WelcomeCats.vue';
import PuzzleGame from '../components/PuzzleGame.vue';
import Success from '../components/toast/Success.vue';

const imageNumbers = ref([1, 2, 3, 4, 5, 6, 7, 8, 9]);

const showSuccess = ref(false);

function toggleSuccess() {
  showSuccess.value = !showSuccess.value;
}

const ChristianSteffens = ref({
  // Programming lover and enthusiast
  user: {
    name: 'Christian Steffens',
    birth_date: '1998-09-21', // age 25
    email: 'oficialsteffens@hotmail.com'
  },
  work_experience: [
    { period: '2020-2022', role: 'Full-stack Trainee' },
    { period: '2022-2024', role: 'Full-stack Jr. Developer' }
  ],
  skills: [
    'HTML/CSS/JS', 'PHP', 'Laravel', 'Vue', 'React', 'TypeScript', 'Tailwind/Boostrap', 'Wordpress', 'Payment Integration',
    'API', 'SCSS', 'npm/yarn', 'Web Sockets', 'UX/UI', 'MySQL/PostgreSQL', 'Quasar', 'Docker', 'Vite/Webpack',
    'Photoshop'
  ],
  education: [
    { period: '2020-2022', course: 'Analysis and systems development', university: 'Unisinos' },
  ],
});
</script>
<template>
  <main class="min-h-screen z-50">
    <div class="flex flex-col justify-center items-center gap-12 mt-20">
      <h1 class="text-accent text-5xl">Work in progress...</h1>
      <!-- <button @click="toggleSuccess">Toggle Success</button> -->
      <Success v-if="showSuccess" class="absolute top-10 md:right-10 max-w-sm" />
      <WelcomeCats class="h-96 w-96" />
    </div>
  </main>
  <div class="bg-[#1f1f1f] lg:min-h-screen">
    <div class="container mx-auto px-40">
      <div class="mt-12 counter">
        <div class="line">
          <p class="text-[#569cd6]">const <span class="text-[#4fc1ff]">Christian Steffens</span> <span
              class="text-[#d4d4d4]">= </span>
            <span class="text-[#dcdc9d]">ref</span><span class=" text-[#ffd700]">(</span><span
              class="text-[#da70d6]">{</span>
          </p>
        </div>
        <div class="line">
          <p class="text-[#6a9955] ml-3">// Programming lover and enthusiast</p>
        </div>
        <!-- user -->
        <div class="line">
          <p class="text-[#9cdcfe] ml-3">user: <span class="text-[#179fff]">{</span></p>
        </div>
        <div class="line">
          <p class="text-[#9cdcfe] ml-6">name: <span class="text-[#ce9178]">'Christian Steffens'</span><span
              class="text-[#cccccc]">,</span></p>
        </div>
        <div class="line">
          <p class="text-[#9cdcfe] ml-6">birth_date: <span class="text-[#ce9178]">'1998-09-21'</span><span
              class="text-[#cccccc]">, </span><span class="text-[#6a9955]">// age 25</span></p>
        </div>
        <div class="line">
          <p class="text-[#9cdcfe] ml-6">email: <span class="text-[#ce9178]">'oficialsteffens@hotmail.com'</span><span
              class="text-[#cccccc]">,</span></p>
        </div>
        <div class="line">
          <p class="ml-3"><span class="text-[#179fff]">}</span><span class="text-[#cccccc]">,</span></p>
        </div>
        <!-- work_experience -->
        <div class="line">
          <p class="text-[#9cdcfe] ml-3">work_experience: <span class="text-[#179fff]">[</span></p>
        </div>
        <div class="line">
          <p class="text-[#9cdcfe] ml-6"><span class="text-[#ffd703]">{</span> period: <span
              class="text-[#ce9178]">'2020-2022'</span><span class="text-[#cccccc]">,</span> role: <span
              class="text-[#ce9178]">'Full-stack Trainee' </span><span class="text-[#ffd703]">}</span><span
              class="text-[#cccccc]">,</span></p>
        </div>
        <div class="line">
          <p class="text-[#9cdcfe] ml-6"><span class="text-[#ffd703]">{</span> period: <span
              class="text-[#ce9178]">'2022-2024'</span><span class="text-[#cccccc]">,</span> role: <span
              class="text-[#ce9178]">'Full-stack Jr. Developer' </span><span class="text-[#ffd703]">}</span></p>
        </div>
        <div class="line">
          <p class="ml-3"><span class="text-[#179fff]">]</span><span class="text-[#cccccc]">,</span></p>
        </div>
        <!-- skills -->
        <div class="line">
          <p class="text-[#9cdcfe] ml-3">skills: <span class="text-[#179fff]">[</span></p>
        </div>
        <div class="line">
          <div class="ml-6 flex flex-wrap gap-x-2">
            <p class="text-[#ce9178]">'HTML/CSS/JS'<span class="text-[#cccccc]">,</span></p>
            <p class="text-[#ce9178]">'PHP'<span class="text-[#cccccc]">,</span></p>
            <p class="text-[#ce9178]">'Laravel'<span class="text-[#cccccc]">,</span></p>
            <p class="text-[#ce9178]">'Vue'<span class="text-[#cccccc]">,</span></p>
            <p class="text-[#ce9178]">'React'<span class="text-[#cccccc]">,</span></p>
            <p class="text-[#ce9178]">'TypeScript'<span class="text-[#cccccc]">,</span></p>
            <p class="text-[#ce9178]">'Tailwind/Boostrap'<span class="text-[#cccccc]">,</span></p>
            <p class="text-[#ce9178]">'Wordpress'<span class="text-[#cccccc]">,</span></p>
            <p class="text-[#ce9178]">'Payment Integration'<span class="text-[#cccccc]">,</span></p>
            <p class="text-[#ce9178]">'API'<span class="text-[#cccccc]">,</span></p>
            <p class="text-[#ce9178]">'SCSS'<span class="text-[#cccccc]">,</span></p>
            <p class="text-[#ce9178]">'npm/yarn'<span class="text-[#cccccc]">,</span></p>
            <p class="text-[#ce9178]">'Web Sockets'<span class="text-[#cccccc]">,</span></p>
            <p class="text-[#ce9178]">'UX/UI'<span class="text-[#cccccc]">,</span></p>
            <p class="text-[#ce9178]">'MySQL/PostgreSQL'<span class="text-[#cccccc]">,</span></p>
            <p class="text-[#ce9178]">'Quasar'<span class="text-[#cccccc]">,</span></p>
            <p class="text-[#ce9178]">'Docker'<span class="text-[#cccccc]">,</span></p>
            <p class="text-[#ce9178]">'Vite/Webpack'<span class="text-[#cccccc]">,</span></p>
            <p class="text-[#ce9178]">'Photoshop'</p>
          </div>
        </div>

      </div>
    </div>
  </div>
  <section class="flex justify-center bg-hexagons">
    <PuzzleGame />
  </section>
  <section class="bg-red-600">
    maugila
  </section>
</template>

<style>
.slide-fwd-center {
  -webkit-animation: slide-fwd-center 0.45s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation: slide-fwd-center 0.45s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

.counter {
  counter-reset: line-number;
}

.line {
  position: relative;
  counter-increment: line-number;
}

.line::after {
  content: counter(line-number);
  position: absolute;
  left: -60px;
  top: 0;
  color: white;
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

.bg-hexagons {
  background-color: #DFDBE5;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%23732fe0' fill-opacity='0.4' fill-rule='nonzero'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
</style>