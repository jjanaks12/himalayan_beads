import { useAuthStore } from "~/store/auth"

export default defineNuxtRouteMiddleware(async () => {
    const { isLoggedin } = storeToRefs(useAuthStore())

    return !isLoggedin.value ? navigateTo('/login') : undefined
})
