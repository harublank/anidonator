<script setup lang="ts">
import { ModalForm } from '../index'
import { contactsCollection, tagsCollection } from '../../../api/collections'
import { useRoute } from 'vue-router';
import { Meteor } from 'meteor/meteor';
import { onMounted } from 'vue';
import { Tracker } from 'meteor/tracker';
const fields = [
    {
        type: "text",
        name: "label",
        required: true,
        placeholder: "cs-community",
        label: "Tag"
    },

]
const { params: { orgId } } = useRoute()

onMounted(() => {
    const tagsSub = Meteor.subscribe("tags", orgId)

    Tracker.autorun(() => {
        const isTagsSubReady = tagsSub.ready()

        if (isTagsSubReady) {
        }
    })
})

const onSubmitHandler = (data: { tag: string, email: string }) => {
    const { label } = data;
    const addedBy = Meteor.userId()
    const addedOn = new Date()

    tagsCollection.insert({
        label, orgId, addedBy, addedOn
    }, (error, data) => {
        if (error) {
            console.log({ error })
        } else {
            console.log("new tag added, ", data)
        }
    })
}
</script>
<template>
    <ModalForm title="Add a new tag" :fields="fields" @submit="onSubmitHandler" />
</template>