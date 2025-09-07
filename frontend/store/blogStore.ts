import * as Y from 'yup'

import type { APIQuery, APIRequest, Blog } from "~/himalayan_beads"
import { blogCreateSchema } from '~/lib/schemas/blog.schema'
import { useAxios } from "~/services/axios"

export const useBlogStore = defineStore('blog', () => {
    const blogs = ref<Blog[]>([])
    const { isLoading, params } = useModalMeta()
    const query = ref<APIQuery<Blog>>({
        s: '',
        sort: {
            field: 'createdAt',
            order: 'asc'
        },
        filter: {
            published: true
        }
    })

    const { axios } = useAxios()

    const fetch = async () => {
        isLoading.value = true

        const { data } = await axios.get<APIRequest<Blog[]>>('/blogs', { params: { ...params.value, ...query.value } })

        if (data) {
            const { data: d, ...p } = data
            blogs.value = d
            params.value = p
            isLoading.value = false
        }
    }

    const save = async (formData: Y.InferType<typeof blogCreateSchema>) => {
        const url = formData.id ? `/blogs/${formData.id}` : 'blogs'
        const method = formData.id ? 'put' : 'post'

        await axios[method](url, formData)
    }

    const saveBody = async (id: string, body: string) => {
        await axios.put(`/blogs/${id}/update_body`, { body })
    }

    const publish = async (id: string) => {
        await axios.put(`/blogs/${id}/publish`)
    }

    const destory = async (id: string) => {
        await axios.delete(`/blogs/${id}`)
    }

    const getBlog = async (id: string): Promise<Blog> => {
        const { data } = await axios.get<Blog>('/blogs/' + id)
        return data
    }

    const getBlogBySlug = async (slug: string): Promise<Blog> => {
        const { data } = await axios.get<Blog>('/blogs/bySlug/' + slug)
        return data
    }

    const saveImage = async (id: string, image: string) => {
        await axios.put(`/blogs/${id}/save_image`, { image })
    }

    const saveTags = async (id: string, tags: string[]) => {
        await axios.put(`/blogs/${id}/save_tags`, tags)
        await axios.put(`/blogs/${id}/save_tags`, tags)
    }

    const publishBlog = async (id: string) => {
        await axios.put(`/blogs/${id}/publish`)
    }

    return {
        blogs, isLoading, params, query,
        fetch, destory, save, publish, getBlog, saveBody, saveImage, saveTags, publishBlog, getBlogBySlug
    }
})