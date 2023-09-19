<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { contactsCollection, organizationCollection, tagsCollection } from '../../../api/collections';
import { useRoute } from 'vue-router';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Button, ButtonGroup, Card, AuthGuard } from '../../components'
import { useModal } from 'vue-final-modal';
import UserForm from '../AniAdmin/components/UserForm.vue';
import { AddUserModal, Table as AniTAble, ContactModal } from '../../components'
import { userOrgRoleCollection } from '../../../api/collections/UserOrgRole';
import TagModalComponent from '../../components/ContactModal/TagModal.component.vue';
import { ROLES } from '../../../data';
import AssignTagsComponent from '../../components/ContactModal/AssignTags.component.vue';
const { params: { orgId } } = useRoute()
const userId = Meteor.userId()
const defaultOrgInfo = { name: "", email: "", contact: "" }
const orgInfoRef = reactive({
    data: defaultOrgInfo,
    isLoading: false
})
const usersInThisOrgRef = reactive({
    data: [],
    isLoading: false
})
const contactsInThisOrgRef = reactive({
    data: [],
    isLoading: false
})

const tagsRef = reactive({
    data: [],
    isLoading: false
})

const { open: openUserForm, close: closeUserForm } = useModal({
    component: UserForm
})

const { open: openAddUser, close: closeAddUser } = useModal({
    component: AddUserModal
})

const { open: openAddContact, close: closeAddContact } = useModal({
    component: ContactModal
})

const { open: openCreateTag, close: closeCreateTag } = useModal({
    component: TagModalComponent
})

const { open: openAssignCreateTag, close: closeAssignCreateTag } = useModal({
    component: AssignTagsComponent
})
onMounted(() => {
    const orgSub = Meteor.subscribe("organizations", userId, orgId)
    Tracker.autorun(() => {
        const isOrgSubReady = orgSub.ready()

        if (isOrgSubReady) {
            const org = organizationCollection.findOne({ _id: orgId }, {
                transform: doc => {
                    const { contact, email, name } = doc
                    return { contact, email, name }
                }
            })
            console.log({ org, orgId })
            orgInfoRef.data = org || defaultOrgInfo
            orgInfoRef.isLoading = false
        } else {
            orgInfoRef.isLoading = true
        }
    })


    const usersInThisOrg = Meteor.subscribe("usersInThisOrg", orgId)
    const users = Meteor.subscribe("users")
    Tracker.autorun(() => {
        const isReady = usersInThisOrg.ready() && users.ready()
        if (isReady) {

            const users = userOrgRoleCollection.find({ orgId }, {
                transform: doc => {
                    const { userId, role } = doc

                    console.log({ userId })
                    const user = Meteor.users.findOne({ _id: userId })

                    if (user) {
                        const { emails = [], profile: { name } } = user || {}
                        const email = emails[0].address
                        return { email, name, role }
                    }
                    return doc
                }
            }).fetch()
            usersInThisOrgRef.data = users

        } else {

        }
    })

    const contactsSub = Meteor.subscribe("myContacts", orgId)
    Tracker.autorun(() => {
        const isReady = contactsSub.ready()
        if (isReady) {
            const contacts = contactsCollection.find({ orgId }, {
                transform: (doc) => {
                    const { email, name, tags } = doc
                    console.log({ tags })
                    return { email, name }
                }
            }).fetch()

            contactsInThisOrgRef.isLoading = false
            contactsInThisOrgRef.data = contacts
        } else {
            contactsInThisOrgRef.isLoading = true
        }
    })

    const tagsSub = Meteor.subscribe("tags", orgId)
    Tracker.autorun(() => {
        const isReady = tagsSub.ready()
        if (isReady) {
            const tags = tagsCollection.find({ orgId }, {
                transform: doc => {
                    const { _id, label } = doc
                    return { _id, label }
                }
            }).fetch()
            tagsRef.isLoading = false
            tagsRef.data = tags
        } else {
            tagsRef.isLoading = true
        }
    })
})



</script>

<template>
    <div class="bg-gray-100 p-4 max-w-sm shadow rounded-sm">
        <p class="mb-2">Org Name: {{ orgInfoRef.data.name }}</p>
        <p class="mb-2">Email: {{ orgInfoRef.data.email }}</p>
        <p>Contact: {{ orgInfoRef.data.contact }}</p>
    </div>

    <div>
        <ButtonGroup class="mt-2">
            <!-- <AuthGuard :requiredRoles="[ROLES.ani_admin, ROLES.org_admin]"> -->
            <AuthGuard :required-roles="[ROLES.ani_admin]">
                <Button @click="openUserForm">
                    Create User
                </Button>
            </AuthGuard>
            <!-- </AuthGuard> -->

            <Button @click="openAddUser">
                Add User
            </Button>

            <Button @click="openAddContact">
                Create Contacts
            </Button>
            <Button @click="openCreateTag">
                Create Tag
            </Button>
            <Button @click="openAssignCreateTag">
                Assign Tag
            </Button>
        </ButtonGroup>
    </div>

    <div class="flex gap-2">
        <div class="flex-1">
            <Card title="Users in our Org">
                <AniTAble :data="usersInThisOrgRef.data" title="User Table" />
            </Card>
        </div>

        <div class="flex-1">
            <Card title="Contacts in our Org">
                <AniTAble :data="contactsInThisOrgRef.data" title="Contacts Table" />
            </Card>
        </div>
    </div>

    <Card title="Tags in our Org">
        <AniTAble :data="tagsRef.data" title="Tags table" />
    </Card>
</template>