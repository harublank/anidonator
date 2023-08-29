<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue';
import { ROLES } from '../../../data';
import { Meteor, } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { ModalForm } from '../index'
import { userOrgRoleCollection } from '../../../api/collections/UserOrgRole';
import { useRoute } from 'vue-router';
const selectRoleField = {
    type: "select",
    options: [{ label: "Admin", value: ROLES.org_admin, }, { label: "Co-ordinator", value: ROLES.org_coordinator }],
    name: "role",
    required: true,
}

const usersRef = reactive({
    data: [],
    isLoading: false
})

const { params: { orgId } } = useRoute()

const onSubmitHandler = (data) => {
    const { user: userId, role } = data
    const orgUsreRoleId = userOrgRoleCollection.insert({ userId, orgId, role }, (error, response) => {
        if (error) {
            console.log({ error })
        } else {
            //
        }
    })
    console.log(orgUsreRoleId)
}
const onCancelHandler = () => { }

const fields = computed(() => {
    const userOptions = usersRef.data.map(user => {
        const { name, email, _id } = user
        return {
            label: `${name} - ${email}`,
            value: _id
        }
    })
    const selectUserField = {
        type: "select",
        options: userOptions,
        name: "user",
        required: true,
    }
    return [selectRoleField, selectUserField]
})

onMounted(() => {
    const usersCollection = Meteor.subscribe("users")
    Tracker.autorun(() => {
        const isUsersCollectionReady = usersCollection.ready()
        if (isUsersCollectionReady) {
            usersRef.isLoading = true
            const users = Meteor.users.find({}, {
                transform: (doc: any) => {
                    const { emails, profile: { name } } = doc
                    const email = emails[0].address
                    return { email, name }
                }
            }).fetch()
            usersRef.data = users
        } else {
            usersRef.isLoading = false
        }
    })

    const userOrgRoleSub = Meteor.subscribe("userOrgRole")
    Tracker.autorun(() => {
        const isUserRoleSub = userOrgRoleSub.ready()

        if (isUserRoleSub) {
            //
        } else {
            //
        }
    })
})
</script>
<template>
    <ModalForm title="Add a new user" :fields="fields" @submit="onSubmitHandler" @cancel="onCancelHandler" />
</template>