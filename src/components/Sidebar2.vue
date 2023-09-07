<script setup lang="ts">
import { ref } from 'vue';

const open = ref(false);
const dimmer = ref(true);
const right = ref(false);

function toggle() {
    open.value = !open.value;
}

function sidebarTogglePosition() {
    right.value = !right.value;
}
</script>
<template>
    <div class="flex-initial flex z-40">
        <div class="absolute flex top-0 h-screen z-20" :class="[right ? 'right-0 flex-row' : 'left-0 flex-row-reverse']">
            <button @click.prevent="toggle()"
                class="w-12 h-48 p-1 my-auto rounded text-white bg-gray-600 text-center focus:outline-none hover:bg-gray-500 transition-color duration-300">
                <span :class="[right ? '-rotate-90' : 'rotate-90']" class="block transform origin-center font-bold">
                    Drawer
                </span>
            </button>

            <div ref="content"
                class="transition-all duration-500 bg-base-100 opacity-50 overflow-hidden flex flex-col items-center justify-center relative"
                :class="[open ? 'max-w-lg' : 'max-w-0']">
                <lottie-player src="https://lottie.host/30fc24f3-cd6a-423b-bd7e-fdf13df8fbc4/ME1jNDG5J2.json" speed="1" loop
                    autoplay direction="1" mode="normal" class="absolute top-0 h-64 w-64"></lottie-player>
                <div class="w-48 text-center font-bold text-xl">Sidebar</div>
                <button @click="sidebarTogglePosition">Alterar sidebar</button>
                <slot></slot>
            </div>
        </div>

        <transition name="fade">
            <div v-if="dimmer && open" @click="toggle()"
                class="flex-1 bg-gray-400 bg-opacity-75 active:outline-none z-10" />
        </transition>
    </div>
</template>