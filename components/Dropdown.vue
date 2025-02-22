<script setup lang="ts">
    import breakpoints from '~/lib/helper/breakpoints'

    interface DropdownProps {
        as?: string
        direction?: 'right' | 'left'
    }

    const props = withDefaults(defineProps<DropdownProps>(), {
        as: 'div',
        direction: 'left'
    })
    const isActive = ref(false)
    const dropdown = ref()
    const isMobile = ref(false)

    const toggleDropdown = () => {
        isActive.value = !isActive.value
    }

    const clickOnOutside = (event: Event) => {
        if (isActive.value) {
            event.preventDefault()
            event.stopPropagation()

            if (!dropdown.value.contains(event.target)) {
                isActive.value = false
            }
        }
    }

    const mediaChangeHandler = (e: any) => {
        isMobile.value = e.matches
    }

    const classList = computed(() => ({
        'dropdown': true,
        'dropdown--active': isActive.value,
        ['dropdown--' + props.direction]: true
    }))

    onMounted(() => {
        document.addEventListener('click', clickOnOutside)
        matchMedia(breakpoints('desktop')).addListener(mediaChangeHandler)
        mediaChangeHandler(matchMedia(breakpoints('desktop')))

    })

    onBeforeUnmount(() => {
        document.removeEventListener('click', clickOnOutside)
    })
</script>

<template>
    <div :class="classList" ref="dropdown">
        <slot name="opener" :click-handler="toggleDropdown" />
        <teleport to="body" v-if="!isMobile">
            <component :is="as" :class="{ 'dropdown__menu': true, 'dropdown--active': isActive }">
                <div class="dropdown__holder">
                    <slot />
                </div>
            </component>
        </teleport>
        <div v-else :class="{ 'dropdown__menu': true, 'dropdown--active': isActive }">
            <component :is="as" class="dropdown__holder">
                <slot />
            </component>
        </div>
    </div>
</template>