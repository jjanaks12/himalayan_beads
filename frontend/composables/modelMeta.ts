import type { APIParam } from "~/himalayan_beads"

export const useModalMeta = () => {
    const isLoading = ref(false)
    const params = ref<APIParam>({
        current: 1,
        per_page: 10,
        total: 0,
        total_page: 0
    })

    const nextPage = () => {
        if ((params.value.current + 1) <= params.value.total_page)
            params.value = {
                ...params.value,
                current: params.value.current + 1
            }
    }

    const prevPage = () => {
        if ((params.value.current - 1) > 0)
            params.value = {
                ...params.value,
                current: params.value.current - 1
            }
    }

    return {
        isLoading, params,
        nextPage, prevPage
    }
}