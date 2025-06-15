<script lang="ts" setup>
    import { ArrowLeftToLineIcon } from 'lucide-vue-next'
</script>

<template>
    <header id="header" class="flex justify-between items-center py-4 px-8 border-b">
        <Brand />
        <div class="flex justify-center items-center gap-4">
            <Button @click="navigateTo('/')" variant="secondary" size="icon">
                <span class="sr-only">Back to site</span>
                <ArrowLeftToLineIcon />
            </Button>
        </div>
    </header>
</template>