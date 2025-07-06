let timer: NodeJS.Timeout

export const debounce = (callback: Function, timeout = 200) => {
    if (timer)
        clearTimeout(timer)

    timer = setTimeout(() => {
        callback()
    }, timeout)
}