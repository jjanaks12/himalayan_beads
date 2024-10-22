<script setup lang="ts">
    interface AlertProps {
        title: string,
        subTitle?: string | null
        confirmText?: string
        onConfirm?: Function
        cancelText?: string
        onCancel?: Function
    }

    const props = withDefaults(defineProps<AlertProps>(), {
        title: '',
        subTitle: null,
        confirmText: 'Ok!',
        onConfirm: () => { },
        cancelText: 'No!',
        onCancel: () => { },
    })

    const loading = defineModel('loading', {
        type: Boolean,
        default: false
    })
    const show = defineModel('show', {
        type: Boolean,
        default: false
    })

    const alert = ref()

    const init = () => {
        if (show.value) {
            document.body.style.overflow = 'hidden'
            setTimeout(() => {
                document.addEventListener('click', clickOnOutside)
            }, 500)
        } else {
            document.body.style.overflow = ''
            document.removeEventListener('click', clickOnOutside)
        }
    }

    const closeAlert = () => {
        show.value = false

        props.onCancel()
    }

    const clickOnOutside = (event: Event) => {
        if (show.value) {
            event.preventDefault()
            event.stopPropagation()

            if (!alert.value.contains(event.target)) {
                show.value = false
                props.onCancel()
            }
        }
    }

    const confirming = () => {
        props.onConfirm()
    }

    onMounted(() => {
        init()
    })

    watch(show, () => {
        init()
    })
</script>

<template>
    <Teleport to="body">
        <div :class="{ 'alert': true, 'alert--show': show }">
            <div class="alert__holder" ref="alert">
                <a href="#" class="alert__close" @click.prevent="closeAlert"><span class="icon-add"></span></a>
                <div class="alert__icon">
                    <span class="icon-question-c"></span>
                </div>
                <div class="alert__message">
                    <strong class="title">{{ title }}</strong>
                    <em class="subtitle" v-if="subTitle">{{ subTitle }}</em>
                    <div class="text">
                        <slot />
                    </div>
                </div>
                <div class="alert__action">
                    <button type="button" class="btn btn__primary btn--outline" @click="closeAlert">
                        {{ cancelText }}
                    </button>
                    <button type="button" :class="{ 'btn btn__primary': true, 'loading': loading }" @click="confirming">
                        {{ confirmText }}
                    </button>
                </div>
            </div>
        </div>
    </Teleport>
</template>