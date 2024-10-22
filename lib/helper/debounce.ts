let timer: any

export const debounce = (callback: Function) => {
    if (timer)
        clearTimeout(timer)

    timer = setTimeout(() => {
        callback()
    }, 200)
}