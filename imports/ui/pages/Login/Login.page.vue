<script setup lang="ts">
import { Meteor } from 'meteor/meteor';
import { onMounted, ref } from 'vue';
import { Button, Input } from '../../components';
import { isAniAdmin } from '../../utils'
import { useRouter } from 'vue-router';
import { ROUTES } from '../../../data'

const router = useRouter()
const userCredentials = ref({
    email: "",
    password: ""
})

const errorMessages = ref({
    email: "",
    password: "",
    login: ""
})



const inputFielChangeHandler = (name: 'email' | 'password', value: string) => {
    userCredentials.value[name] = value
}

const loginHandler = () => {
    errorMessages.value = {
        email: "",
        password: "",
        login: ""
    }

    const { email, password } = userCredentials.value

    Meteor.loginWithPassword({
        email,
    }, password, (e) => {
        if (e) {
            const { reason } = e
            errorMessages.value.login = reason
            return
        }

        const loggedInUser = Meteor.user()
        const someoneIsLoggedIn = loggedInUser !== null

        if (someoneIsLoggedIn) {
            const { _id: userId } = loggedInUser
            const _isAniAdminm = isAniAdmin(userId)

            if (_isAniAdminm) {
                router.push(ROUTES.aniAdmin)
            } else {
                // must be OA OR OC

            }


        }

    })
}

onMounted(() => {
    Meteor.subscribe('findAniAdmin')
})

</script>
<template>
    <div class="flex h-screen p-4 ">
        <div class="w-[25rem] h-full grid content-center">
            <div class="w-3/4 m-auto">
                <form @submit.prevent="loginHandler">
                    <Input required @on-change="inputFielChangeHandler" type="email" name="email"
                        placeholder="uchiha_madara@naruto.com" />
                    <Input required @on-change="inputFielChangeHandler" type="password" name="password"
                        placeholder="********" :class="'mb-2'" />
                    <p class="text-xs text-red-600">
                        {{ errorMessages.login }}
                    </p>
                    <Button class="w-full" type="submit">
                        Login
                    </Button>
                </form>
            </div>
        </div>

        <div
            class="flex-1 bg-cover bg-center bg-no-repeat bg-[url('https://mcdn.wallpapersafari.com/medium/45/30/5Q6cL2.jpg')]">
        </div>
    </div>
</template>