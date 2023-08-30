<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { getRoleplz } from '../../utils/useRole'

import { Tracker } from 'meteor/tracker';
import { aniAdminsCollection, orgUserRelationsCollection } from '../../../api/collections';
import { ROLES } from '../../../data';
import { useRoute } from 'vue-router';
const props = defineProps({
    requiredRoles: {
        type: Array
    },
    orgId: {
        type: String
    }
})

const isAuthorizedRef = reactive({
    allowAccess: false
})

const userId = Meteor.userId()
const { params: { orgId } } = useRoute()

onMounted(() => {
    const roleaejaw = getRoleplz({ userId })
    console.log({ roleaejaw }, 'ayo?')
    const aniAdminSub = Meteor.subscribe("findAniAdmin");

    Tracker.autorun(() => {

        if (aniAdminSub.ready()) {
            let user;
            let role = ""

            user = aniAdminsCollection.findOne({ userId });
            const isAniAdmin = Boolean(user);
            if (isAniAdmin) {
                role = ROLES.ani_admin
            } else {
                user = orgUserRelationsCollection.findOne({ userId, orgId });
                console.log({ user }, 'else bitra')
                role = user?.role || ""
            }

            if (props.requiredRoles?.includes(role)) {
                isAuthorizedRef.allowAccess = true
            }
        }
    });
})




</script>
<template>
    <div v-if="isAuthorizedRef.allowAccess">
        <slot></slot>
    </div>
</template>