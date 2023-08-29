<script setup lang="ts">
import { ModalForm } from '../../../components';
import { organizationCollection } from '../../../../api/collections'

const formFields = [{
    type: 'text',
    name: "name",
    placeholder: "Laughing Coffin Corp",
    required: true,
    label: "Name",
    value: "name re hai"
}, {
    type: "email",
    name: "email",
    placeholder: "johndoe@anidonation.com",
    required: true,
    label: "email"
}, {
    type: "number",
    name: "contact",
    placeholder: "98**********",
    required: true,
    label: "Contact Number"
}]

const props = defineProps(['id', 'mode'])
const emit = defineEmits(['close'])

const onSubmitHandler = ({ name, email, contact }: { name: string, email: string, contact: string }) => {
    const createdAt = new Date()
    const createdBy = Meteor.userId()
    organizationCollection.insert({
        name, email, contact, createdAt, createdBy
    }, (error, data) => {
        if (error) {
            console.log(error)
        } else {
            console.log({ data })
        }
    })
}
const onCancelHandler = () => {
    console.log("emitting close")
    emit("close")
}

</script>
<template>
    <ModalForm title="Create a new Organization" :fields="formFields" @submit="onSubmitHandler" @cancel="onCancelHandler" />
</template>