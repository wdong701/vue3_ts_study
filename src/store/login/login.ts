import { accountLogin, getRoleMenus, getUserById } from '@/service/login/login'
import { defineStore } from 'pinia'
import type { Account } from '@/types/login'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { mapMenusRoutes } from '@/utils/map-menus'

interface userState {
  token: string,
  userInfo: any,
  userMenus: any
}

const useLoginStore = defineStore('login', {
  state: (): userState => ({
    token: '',
    userInfo: {},
    userMenus: []
  }),
  actions: {
    async loginAccountAction(account: Account) {
      const res = await accountLogin(account)
      const id = res.data.id
      this.token = res.data.token

      localCache.setItem('token', this.token)

      //获取用户信息
      const userInfoRes = await getUserById(id)
      this.userInfo = userInfoRes.data

      //获取用户角色菜单
      const roleMenusRes = await getRoleMenus(id)
      this.userMenus = roleMenusRes.data

      //缓存信息
      localCache.setItem('userInfo', this.userInfo)
      localCache.setItem('userMenus', this.userMenus)

      //动态路由
      const routes = mapMenusRoutes(this.userMenus)
      routes.forEach((route) => router.addRoute('main', route))
      console.log(router.getRoutes());

      //跳转到主页
      router.push('/main')
    },
    loadLocalCacheAction() {
      const token = localCache.getItem('token')
      const userInfo = localCache.getItem('userInfo')
      const userMenus = localCache.getItem('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        // 2.动态添加路由
        const routes = mapMenusRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  },
})

export default useLoginStore