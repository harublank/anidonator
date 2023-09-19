<script setup lang="ts">
import { watch, ref } from 'vue';


const emit = defineEmits(['onChange'])

const props = defineProps({
    type: {
        required: true,
        default: 'text',
        type: String,
        validator: (value: string) => {
            const inputTypes = ["text", "password", "email", 'number']
            const isTypeAllowed = inputTypes.includes(value)
            return isTypeAllowed
        }

    },
    label: {
        type: String
    },
    placeholder: {
        required: true,
        type: String,
    },
    name: {
        required: true,
        type: String
    },
    required: {
        type: Boolean,
        default: false
    },
    defaultValue: {
        type: String,
        default: ""
    }

})

const value = ref(props.defaultValue)

watch(value, (newValue) => {
    emit("onChange", props.name, newValue)
})


</script>

<template>
    <div class="mb-4">
        <label :for="props.name" class="block mb-1 text-sm font-medium text-gray-700">
            {{ label }}
        </label>

        <div class="relative">
            <input :id="props.name" v-model="value"
                class="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                :type="props.type" :placeholder="props.placeholder" :required="props.required" :name="props.name" />
            <div class="absolute right-0 top-0 translate-y-2 flex items-center mr-3 pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 6v2m0 8v2m-6-6h2m8 0h2M6 12h2m8 0h2m-6-6v2m0 8v2" />
                </svg>
            </div>
        </div>
    </div>
</template>