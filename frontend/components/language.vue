<script lang="ts" setup>
    import { ChevronDownIcon } from 'lucide-vue-next'
    import { useLanguageStore } from '~/store/language';

    const { currentLanguage, languages } = storeToRefs(useLanguageStore())
    const { switchLanguage } = useLanguageStore()
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger>
            <div
                class="flex items-center gap-1 lg:gap-2 hover:bg-gray-100 transition-colors duration-200 px-2 lg:px-3 py-2">
                <img :src="`https://flagcdn.com/w20/${currentLanguage.code === 'en'
                    ? 'us'
                    : currentLanguage.code === 'ne'
                        ? 'np'
                        : 'in'
                    }.png`" :alt="currentLanguage.name" class="w-4 h-3 object-contain" loading="lazy" />
                <span class="inline text-sm font-medium">{{ currentLanguage.name }}</span>
                <ChevronDownIcon class="h-3 w-3 lg:h-4 lg:w-4 transition-transform duration-200" />
            </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem v-for="(language, index) in languages" :key="language.code" @click="switchLanguage(index)"
                class="flex items-center gap-3 transition-colors duration-150 py-2" :class="{
                    'bg-gray-50': currentLanguage.code === language.code,
                }">
                <img :src="`https://flagcdn.com/w20/${language.code === 'en'
                    ? 'us'
                    : language.code === 'ne'
                        ? 'np'
                        : 'in'
                    }.png`" :alt="language.name" class="w-5 h-4 object-contain" loading="lazy" />
                <span class="text-sm">{{ language.name }}</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>