import * as Y from 'yup'

export const blogCreateSchema = Y.object({
    id: Y.string().label('Id'),
    title: Y.string().required().label('Title'),
    excerpt: Y.string().required().label('Excerpt'),
    slug: Y.string().required().label('Slug'),
    description: Y.string().label('Description'),
    category_id: Y.string().required().label('Category'),
})

export const blogTagSchema = Y.object({
    tags: Y.array().of(Y.string().required()).min(1).label('Tags')
})