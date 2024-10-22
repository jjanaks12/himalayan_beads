<script setup lang="ts">
    import breakpoints from '~/lib/helper/breakpoints'
    import { debounce } from '~/lib/helper/debounce'

    interface DropdownProps {
        as?: string
    }

    const props = withDefaults(defineProps<DropdownProps>(), {
        as: 'div'
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
    <div :class="{ 'dropdown': true, 'dropdown--active': isActive }" ref="dropdown">
        <slot name="opener" :click-handler="toggleDropdown" />
        <teleport to="body" v-if="!isMobile">
            <component :is="as" :class="{ 'dropdown__menu': true, 'dropdown--active': isActive }">
                <div class="dropdown__holder">
                    <slot />
                </div>
            </component>
        </teleport>
        <component v-else :is="as" :class="{ 'dropdown__menu': true, 'dropdown--active': isActive }">
            <div class="dropdown__holder">
                <slot />
            </div>
        </component>
    </div>
</template>