import type { APIQuery, APIRequest, Image } from "~/himalayan_beads"
import { debounce, isObjEq } from "~/lib/filters"
import { useAxios } from "~/services/axios"

export const useMediaStore = defineStore('media', () => {
    const { axios } = useAxios()
    const { isLoading, params } = useModalMeta()

    const images = ref<Image[]>([])
    const query = ref<APIQuery<Image>>({
        s: '',
        sort: {
            field: 'createdAt',
            order: 'asc'
        }
    })

    const fetch = async () => {
        isLoading.value = true

        const { data: { data, ...p } } = await axios.get<APIRequest<Image[]>>('/images', { params: { ...params.value, ...query.value } })

        images.value = data
        params.value = p
        isLoading.value = false
    }

    watch(params, (oldValue, newValue) => {
        if (!isObjEq(oldValue, newValue))
            fetch()
    })

    watch(query, (oldValue, newValue) => {
        if (!isObjEq(oldValue, newValue))
            fetch()
    }, {
        deep: true,
        immediate: true
    })

    return {
        images, params, query,
        fetch
    }
})