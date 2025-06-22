
export const useLanguageStore = defineStore('language', () => {
    const languages = ref([
        { code: "en", name: "English", flag: "🇺🇸" },
        { code: "ne", name: "नेपाली", flag: "🇳🇵" },
    ])
    const languageIndex = ref(0)

    const currentLanguage = computed(() => languages.value[0])

    const switchLanguage = (index: number) => {
        languageIndex.value = index
    }
    return {
        languages, languageIndex,
        currentLanguage,
        switchLanguage
    }
})