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
    <div class="fixed flex z-40" :class="[right ? 'right-0 ' : 'left-0']">
        <div class="flex top-0 h-screen z-20" :class="[right ? ' flex-row' : ' flex-row-reverse']">
            <button @click.prevent="toggle()"
                class="p-1 my-auto rounded text-white bg-base-300 bg-opacity-75 text-center focus:outline-none hover:bg-base-200 transition-color duration-300 flex items-center justify-center">
                <span :class="[right ? 'rotate-90' : '-rotate-90']"
                    class="block transform origin-center font-bold text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0,0,256,256" class="h-20 w-20">
                        <g class="fill-secondary" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
                            stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                            font-family="none" font-weight="none" font-size="none" text-anchor="none"
                            style="mix-blend-mode: normal">
                            <g transform="scale(8,8)">
                                <path
                                    d="M9.91211,2l6.08789,13.39063v0.10938l6,-13.5h-6zM13.01953,4h2.98047v6.49805l-0.01367,0.03125zM4,6l12,25l12,-25h-6l-6,13l-6,-13zM23.2793,8h1.54297l-8.82227,18.37891v-2.60547l1.81641,-3.93359z">
                                </path>
                            </g>
                        </g>
                    </svg>
                </span>
            </button>

            <div ref="content"
                class="transition-all duration-500 bg-base-100 bg-opacity-50 overflow-hidden flex flex-col items-center justify-center relative"
                :class="[open ? 'max-w-lg' : 'max-w-0']">
                <lottie-player src="https://lottie.host/30fc24f3-cd6a-423b-bd7e-fdf13df8fbc4/ME1jNDG5J2.json" speed="1" loop
                    autoplay direction="1" mode="normal" class="absolute top-0 h-64 w-64" :class="[right ? 'scale-x-[-1]' : '']"></lottie-player>
                <div class="w-48 text-center font-bold text-xl text-primary">Sidebar</div>
                <button @click="sidebarTogglePosition" class="text-secondary">Alterar sidebar</button>
                <slot></slot>
            </div>
        </div>

        <transition name="fade">
            <div v-if="dimmer && open" @click="toggle()"
                class="flex-1 bg-gray-400 bg-opacity-75 active:outline-none z-10" />
        </transition>
    </div>
</template>