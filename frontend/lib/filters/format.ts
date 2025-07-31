import moment from 'moment'

export const formatDate = (value: Date | null | string, format = 'YYYY-MM-DD HH:mm a') => value ? moment(value).utc().format(format) : ''
