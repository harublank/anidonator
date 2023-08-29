<script setup lang="ts">
import { FormBuilder, Card } from '../index'
import { VueFinalModal } from 'vue-final-modal'


const props = defineProps(['fields', 'title'])
const emit = defineEmits(['submit', 'cancel'])

const onSubmitHandler = (data: any) => {
    emit("submit", data)
}

const onCancelHandler = () => {
    emit('cancel')
}
</script>
<template>
    <VueFinalModal>
        <Card class="max-w-sm mx-auto mt-40">
            <h2 class="text-lg text-slate-600 font-semibold">{{ title }}</h2>
            <FormBuilder :fields="fields" @submit="onSubmitHandler" @cancel="onCancelHandler">
            </FormBuilder>
        </Card>
    </VueFinalModal>
</template>