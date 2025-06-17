<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { ChevronDownIcon } from "lucide-vue-next";
import { readonly } from "vue";

// Props for customization
interface Props {
  variant?: "header" | "footer";
  position?: "top" | "bottom";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "header",
  position: "bottom",
});

// Language interface
interface Language {
  code: string;
  name: string;
  flag: string;
  nativeName: string;
}

// Language state
const isLanguageOpen = ref(false);
const currentLanguage = ref<Language>({
  code: "en",
  name: "English",
  flag: "🇺🇸",
  nativeName: "English",
});

const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸", nativeName: "English" },
  { code: "ne", name: "Nepali", flag: "🇳🇵", nativeName: "नेपाली" },
  { code: "hi", name: "Hindi", flag: "🇮🇳", nativeName: "हिन्दी" },
];

// Language switching functionality
const switchLanguage = (language: Language) => {
  currentLanguage.value = language;
  isLanguageOpen.value = false;

  // Save to localStorage
  localStorage.setItem("selectedLanguage", JSON.stringify(language));

  // Update document language attribute
  document.documentElement.lang = language.code;

  // Update document direction for RTL languages if needed
  const rtlLanguages = ["ar", "he", "fa", "ur"];
  document.documentElement.dir = rtlLanguages.includes(language.code)
    ? "rtl"
    : "ltr";

  // Emit event for parent components
  emit("language-changed", language);

  // Show success notification
  showLanguageChangeNotification(language);

  console.log(`Language switched to: ${language.name} (${language.code})`);
};

const toggleDropdown = () => {
  isLanguageOpen.value = !isLanguageOpen.value;
};

const closeDropdown = () => {
  isLanguageOpen.value = false;
};

// Load saved language on mount
onMounted(() => {
  loadSavedLanguage();
});

const loadSavedLanguage = () => {
  try {
    const savedLanguage = localStorage.getItem("selectedLanguage");
    if (savedLanguage) {
      const parsedLanguage = JSON.parse(savedLanguage);
      const foundLanguage = languages.find(
        (lang) => lang.code === parsedLanguage.code
      );
      if (foundLanguage) {
        currentLanguage.value = foundLanguage;
        document.documentElement.lang = foundLanguage.code;
      }
    }
  } catch (error) {
    console.warn("Failed to load saved language:", error);
  }
};

// Notification system
const showNotification = ref(false);
const notificationMessage = ref("");

const showLanguageChangeNotification = (language: Language) => {
  notificationMessage.value = `Language changed to ${language.name}`;
  showNotification.value = true;

  // Hide notification after 3 seconds
  setTimeout(() => {
    showNotification.value = false;
  }, 3000);
};

// Watch for language changes to update UI
watch(
  currentLanguage,
  (newLanguage) => {
    // You can add more UI updates here based on language change
    // For example, updating text content, number formats, etc.
  },
  { deep: true }
);

// Keyboard navigation
const handleKeydown = (event: KeyboardEvent, language: Language) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    switchLanguage(language);
  }
};

// Close dropdown on escape key
const handleEscapeKey = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    closeDropdown();
  }
};

// Emits
const emit = defineEmits<{
  "language-changed": [language: Language];
}>();

// Expose methods for parent components
defineExpose({
  closeDropdown,
  currentLanguage: readonly(currentLanguage),
  switchLanguage,
});
</script>

<template>
  <div class="language__selector relative">
    <!-- Language Button -->
    <button
      @click="toggleDropdown"
      @keydown="handleEscapeKey"
      :class="[
        'flex items-center gap-2 px-3 py-2 rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2',
        variant === 'header'
          ? 'bg-white/10 hover:bg-white/20 text-white focus:ring-offset-transparent'
          : 'bg-gray-800 hover:bg-gray-700 text-white focus:ring-offset-black',
      ]"
      :aria-expanded="isLanguageOpen"
      aria-haspopup="true"
      :aria-label="`Current language: ${currentLanguage.name}. Click to change language.`"
    >
      <img
        :src="`https://flagcdn.com/w20/${
          currentLanguage.code === 'en'
            ? 'us'
            : currentLanguage.code === 'ne'
            ? 'np'
            : 'in'
        }.png`"
        :alt="`${currentLanguage.name} flag`"
        class="w-4 h-3 object-cover rounded-sm"
        loading="lazy"
      />
      <span class="text-sm font-medium">{{ currentLanguage.name }}</span>
      <ChevronDownIcon
        class="h-4 w-4 transition-transform duration-200"
        :class="{ 'rotate-180': isLanguageOpen }"
      />
    </button>

    <!-- Language Dropdown -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 scale-95 translate-y-1"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 translate-y-1"
    >
      <div
        v-if="isLanguageOpen"
        :class="[
          'absolute left-0 w-48 rounded-lg shadow-lg border py-2 z-50',
          variant === 'header'
            ? 'bg-white border-gray-200 shadow-xl'
            : 'bg-gray-800 border-gray-600 shadow-2xl',
          position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2',
        ]"
        role="menu"
        :aria-label="'Language selection menu'"
      >
        <button
          v-for="language in languages"
          :key="language.code"
          @click="switchLanguage(language)"
          @keydown="handleKeydown($event, language)"
          :class="[
            'w-full px-4 py-3 text-left hover:bg-opacity-80 flex items-center gap-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-inset',
            variant === 'header'
              ? 'text-gray-700 hover:bg-gray-100 focus:bg-gray-100'
              : 'text-white hover:bg-gray-700 focus:bg-gray-700',
            currentLanguage.code === language.code &&
              (variant === 'header'
                ? 'bg-gray-100 font-medium'
                : 'bg-gray-700 font-medium'),
          ]"
          role="menuitem"
          :aria-selected="currentLanguage.code === language.code"
        >
          <img
            :src="`https://flagcdn.com/w20/${
              language.code === 'en'
                ? 'us'
                : language.code === 'ne'
                ? 'np'
                : 'in'
            }.png`"
            :alt="`${language.name} flag`"
            class="w-5 h-4 object-cover rounded-sm"
            loading="lazy"
          />
          <div class="flex flex-col">
            <span class="text-sm font-medium">{{ language.name }}</span>
            <span class="text-xs opacity-70">{{ language.nativeName }}</span>
          </div>
          <!-- Selected indicator -->
          <div
            v-if="currentLanguage.code === language.code"
            class="ml-auto w-2 h-2 bg-orange-400 rounded-full"
          ></div>
        </button>
      </div>
    </Transition>

    <!-- Success Notification -->
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 translate-y-2 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-2 scale-95"
    >
      <div
        v-if="showNotification"
        :class="[
          'absolute z-50 px-4 py-2 rounded-lg shadow-lg text-sm font-medium',
          position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2',
          variant === 'header'
            ? 'bg-green-100 text-green-800 border border-green-200'
            : 'bg-green-800 text-green-100 border border-green-700',
        ]"
      >
        {{ notificationMessage }}
      </div>
    </Transition>

    <!-- Overlay for closing dropdown -->
    <div
      v-if="isLanguageOpen"
      @click="closeDropdown"
      class="fixed inset-0 z-40"
      aria-hidden="true"
    ></div>
  </div>
</template>

<style scoped>
.language__selector {
  position: relative;
}

/* Focus states for accessibility */
.language__selector button:focus {
  outline: 2px solid #fb923c;
  outline-offset: 2px;
}
</style>
