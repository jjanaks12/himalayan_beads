import moment from 'moment'

export const formatDate = (value: Date | null | string, format = 'YYYY-MM-DD HH:mm a') => value ? moment(value).utc().format(format) : ''

export const timeAgo = (value: Date|string) => value ? moment(value).utc().fromNow() :''