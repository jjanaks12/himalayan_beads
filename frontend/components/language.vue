<script lang="ts" setup>
    import { ChevronDownIcon } from 'lucide-vue-next'

    const isLanguageOpen = ref(false)
    const currentLanguage = ref({
        code: "en",
        name: "English",
        flag: "🇺🇸",
    })

    const languages = [
        { code: "en", name: "English", flag: "🇺🇸" },
        { code: "ne", name: "नेपाली", flag: "🇳🇵" },
    ]

    const switchLanguage = (language: (typeof languages)[0]) => {
        currentLanguage.value = language
        isLanguageOpen.value = false
    }
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger>
            <div class="flex items-center gap-1 lg:gap-2 hover:bg-gray-100 transition-colors duration-200 px-2 lg:px-3">
                <img :src="`https://flagcdn.com/w20/${currentLanguage.code === 'en'
                    ? 'us'
                    : currentLanguage.code === 'ne'
                        ? 'np'
                        : 'in'
                    }.png`" :alt="currentLanguage.name" class="w-4 h-3 object-cover  " loading="lazy" />
                <span class="hidden lg:inline text-sm font-medium">{{ currentLanguage.name }}</span>
                <ChevronDownIcon class="h-3 w-3 lg:h-4 lg:w-4 transition-transform duration-200"
                    :class="{ 'rotate-180': isLanguageOpen }" />
            </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem v-for="language in languages" :key="language.code" @click="switchLanguage(language)"
                class=" flex items-center gap-3 transition-colors duration-150" :class="{
                    'bg-gray-50': currentLanguage.code === language.code,
                }">
                <img :src="`https://flagcdn.com/w20/${language.code === 'en'
                    ? 'us'
                    : language.code === 'ne'
                        ? 'np'
                        : 'in'
                    }.png`" :alt="language.name" class="w-5 h-4 object-cover  " loading="lazy" />
                <span class="text-sm">{{ language.name }}</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    <!-- <div class="relative">
        <Button variant="ghost" @click="isLanguageOpen = !isLanguageOpen"
            class="flex items-center gap-1 lg:gap-2 hover:bg-gray-100 transition-colors duration-200 px-2 lg:px-3">
            <img :src="`https://flagcdn.com/w20/${currentLanguage.code === 'en'
                ? 'us'
                : currentLanguage.code === 'ne'
                    ? 'np'
                    : 'in'
                }.png`" :alt="currentLanguage.name" class="w-4 h-3 object-cover  " loading="lazy" />
            <span class="hidden lg:inline text-sm font-medium">{{ currentLanguage.name }}</span>
            <ChevronDownIcon class="h-3 w-3 lg:h-4 lg:w-4 transition-transform duration-200"
                :class="{ 'rotate-180': isLanguageOpen }" />
        </Button>
        <Transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100" leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
            <div v-if="isLanguageOpen"
                class="absolute right-0 top-full mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <button v-for="language in languages" :key="language.code" @click="switchLanguage(language)"
                    class="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors duration-150"
                    :class="{
                        'bg-gray-50': currentLanguage.code === language.code,
                    }">
                    <img :src="`https://flagcdn.com/w20/${language.code === 'en'
                        ? 'us'
                        : language.code === 'ne'
                            ? 'np'
                            : 'in'
                        }.png`" :alt="language.name" class="w-5 h-4 object-cover  " loading="lazy" />
                    <span class="text-sm">{{ language.name }}</span>
                </button>
            </div>
        </Transition>
    </div> -->
</template>