<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { useModal } from 'vue-final-modal';
import { Button, Card, Table as AniTable, AuthGuard } from '../../components';
import OrgForm from './components/OrgForm.vue';
import UserForm from './components/UserForm.vue';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { contactsCollection, organizationCollection } from '../../../api/collections';
import { useRouter } from 'vue-router';
import { userOrgRoleCollection } from '../../../api/collections/UserOrgRole';
import { checkRole } from '../../utils';
import { ROLES } from '../../../data';
import { isAdmin } from '../../../api/collections/aniAdminCollection';
const mode = { create: "create", edit: "edit" }
import { useGetRole } from '../../utils/useRole.js'
const userId = Meteor.userId()
const orgForm = ref({
    mode: mode.create,
    orgId: null
})
const role = computed(() => {
    return useGetRole({ userId })
})
const userROle = Meteor.call("getUserRole", userId)
console.log({ userROle }, 'user role aerja na ')
console.log("roooleee", role.value)
const orgDataRef = reactive({
    data: [{ name: "Test Name", email: "Test email", contact: "989898" }],
    isLoading: false
})

const userDataRef = reactive({
    data: [],
    isLoading: false
})

const router = useRouter()

const userToEditRef = reactive({
    _id: "",
    email: "",
    name: ""
})

const { open: openOrgForm, close: closeOrgForm } = useModal({
    component: OrgForm,

})

const { open: openUserForm, close: closeUserForm } = useModal({
    component: UserForm,
    attrs: {
        test: "tetst",
        defaultValues: userToEditRef
    }
})


const onCloseOrgForm = () => {
    closeOrgForm()
}

onMounted(() => {
    const orgCollection = Meteor.subscribe('organizations', userId)
    const usersCollection = Meteor.subscribe('users')
    const userOrgRelCollection = Meteor.subscribe("userOrgRole")

    Tracker.autorun(() => {
        const isOrgReady = orgCollection.ready()
        const isUserReady = usersCollection.ready()

        if (isOrgReady) {
            let organizationsData: any = []
            // const isAniAdmin = checkRole({ isAniAdmin: true })
            // console.log({ isAniAdmin }, 'admin haina abw?')
            const isAniAdmin = true
            if (isAniAdmin) {

                organizationsData = organizationCollection.find({}, {
                    transform: (doc) => {
                        const { name, contact, email, _id } = doc
                        return { name, contact, email, viewId: _id }
                    }
                }).fetch()
                console.log({ isAniAdmin, organizationsData })
            } else {
                organizationsData = userOrgRoleCollection.find({ userId }, {
                    transform: (doc) => {
                        const { orgId } = doc

                        const org = organizationCollection.findOne({ _id: orgId })

                        if (org) {
                            const { name, email, contact } = org
                            return { name, email, contact, viewId: orgId }
                        }

                        return doc
                    }
                }).fetch()

            }

            orgDataRef.data = [...orgDataRef.data, ...organizationsData]
            orgDataRef.isLoading = false
        } else {
            orgDataRef.isLoading = true
        }

        if (isUserReady) {
            const usersData = Meteor.users.find({}, {
                transform: (doc: any) => {
                    const { emails, profile: { name } } = doc
                    const email = emails[0].address

                    return { name, email }
                }
            }).fetch()
            userDataRef.data = usersData
            userDataRef.isLoading = false
        } else {
            userDataRef.isLoading = true
        }
    })
})




const viewUserHandler = (row) => {

}

const editUserHandler = (row) => {
    const _id = row[2]
    const name = row[0]
    const email = row[1]


    userToEditRef.value = { _id, name, email }
    openUserForm()
}

const deleteUserHandler = (row) => {
    const userId = row[2]
    Meteor.call("removeUser", userId)
}

const deleteOrgHandler = (row) => {
    const orgId = row[row.length - 1 - 1]
    organizationCollection.remove(orgId, (error, response) => {
        if (error) {
            console.log("error while deleting org with id", orgId, error)
        } else {
            console.log("deleted org")
        }
    })
}

const editOrgHandler = (row) => {
    const orgId = row[row.length - 1]
}

const viewOrgHandler = (row) => {
    console.log({ row })
    const orgId = row[row.length - 1 - 1]
    const url = "/org/" + orgId
    router.push(url)
}



</script>

<template>
    <h1>Welcome to Ani-donation :)</h1>

    <div class="flex gap-4">
        <AuthGuard :requiredRoles="[ROLES.ani_admin]">
            <div class="flex-1">
                <Card title="User Management">
                    <Button @click="openUserForm">
                        Create User
                    </Button>
                    <AniTable :data="userDataRef.data" title="User Table" @delete="deleteUserHandler"
                        @edit="editUserHandler" />
                </Card>

                <!-- <UserForm @on-close="closeUserForm" test="wtf" :defaultValues="userToEditRef.data" /> -->
            </div>
        </AuthGuard>


        <div class="flex-1">
            <Card title="Organization Management">
                <AuthGuard :required-roles="[ROLES.ani_admin]">
                    <Button @click="openOrgForm">
                        Create Organization
                    </Button>
                </AuthGuard>
                <AniTable @view="viewOrgHandler" @delete="deleteOrgHandler" :data="orgDataRef.data"
                    title="Organization Table" />
            </Card>
            <OrgForm :id="orgForm.orgId" :mode="orgForm.mode" @on-close="onCloseOrgForm" />
        </div>
    </div>
</template>