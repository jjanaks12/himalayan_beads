import moment from "moment"

export const formatDate = (date: Date, format = 'YYYY/MM/DD hh:mm a') => moment(date).format(format)