<script setup lang="ts">
import { ref } from 'vue'
import { Input, Button } from '../../components'

const userCredentials = ref({
    email: "",
    password: ""
})

const inputFielChangeHandler = (name: 'email' | 'password', value: string) => {
    userCredentials.value[name] = value
}

const loginHandler = () => {
    console.log(userCredentials.value)
}

</script>
<template>
    <div class="flex h-screen p-4 ">
        <div class="w-[25rem] h-full grid content-center">
            <div class="w-3/4 m-auto">
                <form @submit.prevent="loginHandler">
                    <Input required @on-change="inputFielChangeHandler" type="email" name="email"
                        placeholder="uchiha_madara@naruto.com" />
                    <Input required @on-change="inputFielChangeHandler" type="password" name="password"
                        placeholder="********" />
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