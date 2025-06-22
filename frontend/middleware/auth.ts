import type { RouteLocationNormalized } from "vue-router"
import { useAuthStore } from "~/store/auth"

export default defineNuxtRouteMiddleware(async (to: RouteLocationNormalized) => {
    const { isLoggedin } = storeToRefs(useAuthStore())

    return !isLoggedin.value ? navigateTo('/login?redirect_from=' + to.fullPath) : undefined
})
