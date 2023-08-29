<script setup>
import { computed } from 'vue';
import { Button, ButtonGroup, } from '../index'

defineEmits(["delete", "edit", "view"])

const props = defineProps({
    title: {
        type: String,
        default: "Table for fodder ^_^",
    },
    data: {
        type: Array,
        required: true
    }
})

const tableHeads = computed(() => {
    const heads = !!props.data?.[0] && Object.keys(props.data[0])
    heads && heads.push("Action")
    return heads
})

const rows = computed(() => {
    return props.data.map(item => Object.values(item || {}))
})

const isEmpty = computed(() => {
    return props.data.length === 0
})
</script>

<template>
    <div class="mt-4 overflow-x-auto">
        <h1>{{ title }}</h1>
        <div v-if="isEmpty">
            <div class="flex flex-col items-center justify-center p-6 bg-gray-100 border border-gray-300 rounded">
                <div class="mb-4">
                    <i class="fa-light fa-file-exclamation text-gray-900"></i>
                </div>
                <p class="text-gray-500">No data found.</p>
            </div>
        </div>
        <div v-else class="table-container" style="height: 300px; overflow-y: auto;">
            <table class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <th scope="col" class="px-6 py-3" v-for="tableHead in tableHeads">
                        {{ tableHead }}
                    </th>
                </thead>

                <tbody>
                    <tr v-for="row in rows" class="bg-white border-b dark:bg-gray-900 dark:border-gray-700" :key="row._id">
                        <td v-for="cell in row" class="px-6 py-4">
                            {{ cell }}
                        </td>

                        <td class="px-6 py-4">
                            <ButtonGroup>
                                <Button @click="$emit('edit', row)">Edit</Button>
                                <Button @click="$emit('delete', row)">Delete</Button>
                                <Button @click="$emit('view', row)">View</Button>
                            </ButtonGroup>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>