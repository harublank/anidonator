<script setup lang="ts">
import { ModalForm } from '../index'
import { contactsCollection } from '../../../api/collections'
import { useRoute } from 'vue-router';
import { Meteor } from 'meteor/meteor';
import { onMounted } from 'vue';
import { Tracker } from 'meteor/tracker';
const fields = [
    {
        type: "text",
        name: "name",
        required: true,
        placeholder: "jordon whatever",
        label: "Email"
    },
    {
        type: "text",
        name: "email",
        required: true,
        placeholder: "jordon@whatever.com",
        label: "Email"
    }
]
const { params: { orgId } } = useRoute()

onMounted(() => {
    const contactSub = Meteor.subscribe("myContacts", orgId)

    Tracker.autorun(() => {
        const isContactSubReady = contactSub.ready()

        if (isContactSubReady) {

        }
    })
})

const onSubmitHandler = (data: { name: string, email: string }) => {
    const { name, email } = data;
    const addedBy = Meteor.userId()
    const addedOn = new Date()

    contactsCollection.insert({
        name, email, orgId, addedBy, addedOn
    }, (error, data) => {
        if (error) {
            console.log({ error })
        } else {
            console.log("new contact added, ", data)
        }
    })
}
</script>
<template>
    <ModalForm title="Add a new Contact" :fields="fields" @submit="onSubmitHandler" />
</template>