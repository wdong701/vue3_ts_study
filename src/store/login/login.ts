import { accountLogin } from '@/service/login/login'
import { defineStore } from 'pinia'
import type { Account } from '@/types/login'
import { localCache } from '@/utils/cache'
import router from '@/router'

const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    name: '',
    token: localCache.getItem('token') ?? ''
  }),
  actions: {
    async loginAccountAction(account: Account) {
      const res = await accountLogin(account)
      this.id = res.data.id
      this.name = res.data.name
      this.token = res.data.token

      localCache.setItem('token', this.token)

      router.push('/main')
    }
  },
})

export default useLoginStore