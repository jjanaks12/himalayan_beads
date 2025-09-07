import axios from 'axios'
import { toast } from 'vue-sonner'
import { useAuthStore } from '~/store/auth'

export const useAxios = () => {
    const { public: { apiUrl } } = useRuntimeConfig()

    const instance = axios.create({
        baseURL: apiUrl
    })

    instance.interceptors.request.use(request => {
        const { token } = storeToRefs(useAuthStore())

        if (token.value && token.value !== null) {
            request.headers['Authorization'] = `Bearer ${token.value.accessToken}`
        }

        return request
    })

    // Response interceptor
    instance.interceptors.response.use(response => response, async error => {
        const { status } = error.response || {}
        const { token } = storeToRefs(useAuthStore())
        const { refreshToken } = useAuthStore()
        const currentRoute = null

        if ([401, 403].indexOf(status) !== -1) {
            if (error.response.data.error.message == 'jwt expired') {
                const originalRequest = error.config
                originalRequest._retry = true

                await refreshToken()
                    .then(async () => {
                        reloadNuxtApp({
                            force: true
                        })
                        if (currentRoute)
                            navigateTo({ name: currentRoute })
                        else
                            navigateTo('/')
                    })
            }

            if (error.response.data.error.message == 'Unauthorized') {
                token.value = null
            }

            toast({
                title: 'Something went wrong',
                description: error.response.data.error.message,
                variant: 'destructive',
            })
        }

        /* if (status == 500)
            await logout() */

        toast({
            title: error.message,
            description: error.response?.data?.error?.message,
            variant: 'destructive',
        })

        return error
    })

    return { axios: instance }
}