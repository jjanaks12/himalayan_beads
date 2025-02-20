import type { Country } from '@prisma/client'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const countryList = ref<Country[]>([])

  const fetchCountry = async () => {
    const countries = await $fetch('/api/country')
    countryList.value = countries
  }

  return { countryList, fetchCountry }
})
