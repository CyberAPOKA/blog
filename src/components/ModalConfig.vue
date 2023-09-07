<script setup lang="ts">
import Themes from '../components/Themes.vue';
</script>
<template>
    <label for="themes" class="hover:cursor-pointer">
        <div class="text-primary">
            <lord-icon src="https://cdn.lordicon.com/hwuyodym.json" trigger="loop" delay="2000"
                class="h-20 w-20 current-color">
            </lord-icon>
        </div>
    </label>

    <input type="checkbox" id="themes" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box max-w-5xl">
            <Themes />
        </div>
        <label class="modal-backdrop" for="themes">Close</label>
    </div>
</template>