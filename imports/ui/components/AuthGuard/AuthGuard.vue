<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { aniAdminsCollection } from '../../../api/collections';
import { ROLES } from '../../../data';
const props = defineProps({
    requiredRoles: {
        type: Array
    }
})
const router = useRouter()
const userId = Meteor.userId()
const { params: { orgId } } = useRoute()
const isAuthorizedRef = reactive({
    allowAccess: true
})

onMounted(() => {
    const aniAdminCollection = Meteor.subscribe("findAniAdmin")
    const orgUserRealCollection = Meteor.subscribe("userOrgRole")

    Tracker.autorun(() => {

        const admin = aniAdminsCollection.findOne({ userId })
        if (!!admin && props.requiredRoles?.includes(ROLES.ani_admin)) {
            isAuthorizedRef.allowAccess = true
        }
    })
})




</script>
<template>
    <div v-if="isAuthorizedRef.allowAccess">
        <slot></slot>
    </div>
</template>