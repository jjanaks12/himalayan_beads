
export const useAuthStore = defineStore('auth', () => {
  const isLoggedin = ref(false)

  const fetch = () => { }

  return {
    isLoggedin,

    fetch
  }
})