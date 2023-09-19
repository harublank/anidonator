<script setup lang="ts">
import { ModalForm } from '../index'
import { contactsCollection, tagsCollection, tagsContactCollection } from '../../../api/collections'
import { useRoute } from 'vue-router';
import { Meteor } from 'meteor/meteor';
import { computed, onMounted, reactive } from 'vue';
import { Tracker } from 'meteor/tracker';
[
    {
        type: "select",
        name: "label",
        required: true,
        placeholder: "cs-community",
        label: "Tag"
    },
    {
        type: "select",
        name: "contact",
        required: true,
        placeholder: "Select contact",
        label: "Contact"
    }

]
const contactsRef = reactive({
    data: [],
    isLoading: false
})
const tagsRef = reactive({
    data: [],
    isLoading: false
})

const { params: { orgId } } = useRoute()

const fields = computed(() => {
    return [
        {
            name: "tagId",
            type: "select",
            options: tagsRef.data,
            required: true,
            label: "Tag"
        },
        {
            name: "contactId",
            type: "select",
            options: contactsRef.data,
            required: true,
            label: "Contact"

        }
    ]
})

onMounted(() => {
    const tagsSub = Meteor.subscribe("tags", orgId)

    Tracker.autorun(() => {
        const isTagsSubReady = tagsSub.ready()

        if (isTagsSubReady) {
            tagsRef.isLoading = true;
            tagsRef.data = tagsCollection.find({ orgId }, {
                transform: (doc) => {
                    const { _id, label } = doc
                    return { label, value: _id }
                }
            }).fetch()
        }
    })

    const contactSub = Meteor.subscribe("myContacts", orgId)
    Tracker.autorun(() => {
        const isContactSubReady = contactSub.ready()
        if (isContactSubReady) {
            contactsRef.isLoading = true
            contactsRef.data = contactsCollection.find({ orgId }, {
                transform: (doc) => {
                    const { _id, name } = doc
                    return { label: name, value: _id }
                }
            }).fetch()
        }
    })

})

const onSubmitHandler = (data) => {
    const addedBy = Meteor.userId()
    const addedOn = new Date()
    console.log({ data })
    const { tagId, contactId } = data


    const updateContact = contactsCollection.update({
        _id: contactId
    }, {
        $push: {
            tags: tagId
        }
    })
    // tagsContactCollection.insert({
    //     addedBy,
    //     addedOn,
    //     tagId,
    //     contactId,
    //     orgId
    // }, (error, response) => {
    //     if (error) {
    //         console.log({ error })
    //     }
    //     console.log({ response })
    // })
}
</script>
<template>
    <ModalForm title="Add a new tag" :fields="fields" @submit="onSubmitHandler" />
</template>