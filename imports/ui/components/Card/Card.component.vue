<script setup lang="ts">
const props = defineProps(['title'])
</script>

<template>
    <div class="rounded overflow-hidden shadow-lg bg-slate-200">
        <div class="px-6 py-4">
            <p class="text-md text-gray-800 py-2 font-semibold">
                {{ title }}
            </p>
            <slot></slot>
        </div>
    </div>
</template>
  