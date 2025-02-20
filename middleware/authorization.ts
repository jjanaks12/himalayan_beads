export default defineNuxtRouteMiddleware((to, from) => {
    const { can } = useAuthorization()

    if (to.meta.role)
        if (!can(to?.meta?.permission as string, to?.meta?.role as string))
            throw showError({
                status: 403,
                statusMessage: 'You do not have enough permission'
            })

    if (to.meta.permission) {
        if (!can(to?.meta?.permission as string))
            throw showError({
                status: 403,
                statusMessage: 'You do not have enough permission'
            })
    } else
        throw showError({
            status: 403,
            statusMessage: 'Permission not set'
        })
})
