import * as Y from 'yup'
import { defineStore } from "pinia"
import type { Token, User } from "~/himalayan_beads"

import type { userDetailSchema, userLoginSchema, userRegisterSchema } from "~/lib/schemas/user.schema"
import { useAxios } from '~/services/axios'

export const useAuthStore = defineStore('auth', () => {
  const { axios } = useAxios()

  const token = ref<Token | null>(null)
  const isLoading = ref(false)
  const user = ref<User | null>()

  const isLoggedin = computed(() => token.value != null)
  const permissions = computed<string[]>(() => (user.value?.role?.permissions
    ? user.value?.role?.permissions.map((permission) => permission.name)
    : []
  ))
  const fullName = computed(() => [user.value?.first_name, user.value?.last_name].join(' ').trim())
  const role = computed(() => user.value?.role?.name)

  const fetch = async () => {
    const { data } = await axios.get<User>('/profile')
    user.value = data
  }

  const login = async (formData: Y.InferType<typeof userLoginSchema>, redirectURL = '/dashboard') => {
    isLoading.value = true

    const { data } = await axios.post<Token>('/login', formData)
    if (data) {
      token.value = data
      navigateTo(redirectURL)
    }
    isLoading.value = false
  }

  const register = async (formData: Y.InferType<typeof userRegisterSchema>) => {
    isLoading.value = true
    const { data } = await axios.post<Token>('/register', formData)
    token.value = data
    isLoading.value = false
  }

  const refreshToken = () => new Promise(async (resolve, reject) => {
    try {
      if (token.value != null) {
        const { data } = await axios.post('/refresh-token', {
          refreshToken: token.value?.refreshToken
        })

        token.value = data
      }
      resolve(true)
    } catch (e) {
      reject(e)
    }
  })

  const logout = async () => {
    isLoading.value = true

    await axios.post('/logout', {
      refreshToken: token.value?.refreshToken
    })
    token.value = null
    user.value = null
    isLoading.value = false
    navigateTo('/login')
  }

  const changePassword = async () => {
    isLoading.value = true

    setTimeout(() => {
      isLoading.value = false
      navigateTo('/login')
    }, 4000)
  }

  const updateDetail = async (formData: Y.InferType<typeof userDetailSchema>) => {
    isLoading.value = true
    await axios.put('profile', formData)
    await fetch()
    isLoading.value = false
  }

  const checkUser = async () => {
    if (token.value == null && user.value != null)
      user.value = null
  }

  watch(token, () => {
    checkUser()
  })

  return {
    user, token, isLoading,
    isLoggedin, permissions, role, fullName,
    fetch, login, logout, register, refreshToken, updateDetail, changePassword
  }
}, {
  persist: {
    pick: ['user', 'token']
  }
})