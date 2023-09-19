<script setup lang="ts">
import { Meteor } from 'meteor/meteor';
import { ROLES } from '../../../../data';
import { ModalForm } from '../../../components';
const props = defineProps(['defaultValues', 'test'])
const emit = defineEmits(['close'])

console.log({ tet: props.test })
console.log({ defaultValues: props.defaultValues })
const formFields = [{
    type: 'text',
    name: "name",
    placeholder: "john doe",
    required: true,
    label: "Name",
    defaultValue: props?.defaultValues?.name
}, {
    type: "email",
    name: "email",
    placeholder: "johndoe@anidonation.com",
    required: true,
    label: "email",
    defaultValue: props?.defaultValues?.email
},
]


const onSubmitHandler = ({ name, email }: { name: string, email: string }) => {
    const userId = Meteor.call('createOrgUser', { name, email, password: "test123" })
    emit('close')

}

const onCancelHandler = () => {
    console.log("emitting close")
    emit("close")
}

</script>
<template>
    <ModalForm title="Create a new user" :fields="formFields" @submit="onSubmitHandler" @cancel="onCancelHandler" />
</template>