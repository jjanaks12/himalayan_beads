import * as Y from 'yup'

export const blogCreateSchema = Y.object({
    id: Y.string().label('Id'),
    title: Y.string().required().label('Title'),
    excerpt: Y.string().required().label('Excerpt'),
    slug: Y.string().required().label('Slug'),
    description: Y.string().label('Description'),
})

export const blogImageSchema = Y.object({
    image: Y.string().required()
})