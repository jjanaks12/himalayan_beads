export const humanize = (str: string) => str
    .replace(/^[\s_]+|[\s_]+$/g, '')
    .replace(/[_\s]+/g, ' ')
    .replace(/^[a-z]/, (m) => m.toUpperCase())

export const slugify = (text: string) => text.toLowerCase().trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ').trim()
    .replace(/[\s-]+/g, '-')
    .replace(/^-+|-+$/g, '')