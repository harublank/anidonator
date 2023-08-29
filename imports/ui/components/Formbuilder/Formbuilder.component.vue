<script setup lang="ts">
import { Input, Button, ButtonGroup } from '../index'

import { onMounted, ref } from 'vue';

const props = defineProps<{
    fields: { name: string, type: string, label: string, placeholder: string, required: boolean, options?: { label: string, value: string }[] }[]
}>()

const emit = defineEmits(['submit', 'cancel'])

const formValues = ref({})

const onChangeHandler = (name: string, value: string) => {
    formValues.value[name] = value
}

const onSelectHandler = (name, e) => {
    const value = e.target.value
    formValues.value = {
        ...formValues.value,
        [name]: value
    }
}

const onSubmitHandler = () => {
    console.log(formValues.value)
    emit('submit', formValues.value)
}

const onCancelHandler = () => {
    emit("cancel")
}

// onMounted(() => {
//     const allFieldNames = props.fields.map(field => {
//         const name = field.name
//         return { name }
//     })

//     const formValue = allFieldNames.reduce((acc, curr) => {
//         const newAcc = {
//             ...acc,
//             [curr.name]: ""
//         }
//         return newAcc
//     }, {})

//     formValues.value = formValue
// })

</script>
<template>
    <form @submit.prevent="onSubmitHandler">
        <template v-for="field in props.fields" :key="field.name">
            <Input :type="field.type" :name="field.name" :placeholder="field.placeholder" @on-change="onChangeHandler"
                v-if="field.type !== 'select'" :label="field.label" />


            <div v-else>
                <label for="select" class="block text-sm font-medium text-gray-700">Select an option:</label>
                <div class="relative mt-1">
                    <select @input="event => onSelectHandler(field.name, event)" id="select" :name="field.name"
                        class="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                        <option>---- SELECT ----</option>
                        <option v-for="option in field.options" :value="option.value">{{ option.label }}</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 12l4-4h-8l4 4z" />
                        </svg>
                    </div>
                </div>
            </div>
        </template>

        <ButtonGroup class="mt-2">
            <Button class="w-full" type="submit">
                Create :)
            </Button>

            <Button class="w-full" type="button" @click="onCancelHandler">
                Cancel
            </Button>
        </ButtonGroup>
    </form>
</template>