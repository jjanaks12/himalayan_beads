import { useIntersectionObserver } from "@vueuse/core"

export const useViewport = (sectionRef?: Ref<HTMLElement | null>) => {
    const isVisible = ref(false)

    useIntersectionObserver(sectionRef, ([{ isIntersecting }]) => {
        if (isIntersecting)
            isVisible.value = true
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    })

    return { isVisible }
}