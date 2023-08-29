<template>
    <div class="flex min-h-screen">
        <div class="w-60">
            <slot name="sidebar"></slot>
        </div>

        <div class="flex-1 gap-2 flex flex-col">
            <div class="h-16 bg-blue-100">
                <slot name="header"></slot>
            </div>

            <div class="px-4">
                <router-view />
            </div>
        </div>
    </div>
</template>