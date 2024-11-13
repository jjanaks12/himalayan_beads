let timer: any

export const debounce = (callback: Function, time = 200) => {
    if (timer)
        clearTimeout(timer)

    timer = setTimeout(() => {
        callback()
    }, time)
}