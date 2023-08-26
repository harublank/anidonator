<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    to: {
        required: true,
        type: String
    },
    icon: {
        type: String
    }
})

const isMouseOver = ref(false)
const iconSolid = `fa-solid fa-${props.icon}`
const iconRegular = `fa-regular fa-${props.icon}`


const router = useRouter()
const onClickHandler = () => router.push(props.to)

const onMouseOver = () => isMouseOver.value = true
const onMouseLeave = () => isMouseOver.value = false

</script>

<template>
    <div @click="onClickHandler" @mouseover="onMouseOver" @mouseleave="onMouseLeave"
        class="p-2 hover:bg-blue-600 text-gray-600 hover:text-gray-100 cursor-pointer">
        <i :class="isMouseOver ? iconRegular : iconSolid"></i>
        <span class="text-lg pl-2">
            <slot class=""></slot>
        </span>
    </div>
</template>