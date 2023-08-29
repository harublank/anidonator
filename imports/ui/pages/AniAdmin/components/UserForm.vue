<script setup lang="ts">
import { Meteor } from 'meteor/meteor';
import { ROLES } from '../../../../data';
import { ModalForm } from '../../../components';

const formFields = [{
    type: 'text',
    name: "name",
    placeholder: "john doe",
    required: true,
    label: "Name",
}, {
    type: "email",
    name: "email",
    placeholder: "johndoe@anidonation.com",
    required: true,
    label: "email"
},
{
    type: "number",
    name: "contact",
    placeholder: "98********",
    required: true,
    label: "contact"
},
]

const emit = defineEmits(['close'])

const onSubmitHandler = ({ name, email, contact }: { name: string, email: string, contact: string }) => {
    const userId = Meteor.call('createOrgUser', { name, email, contact, password: "test123" })
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