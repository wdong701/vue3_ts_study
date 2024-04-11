import { usersListData,deleteUserById,newUserData,editUserData } from '@/service/main/system'
import {defineStore} from 'pinia'
import type { ISystemState } from './type'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0
  }),
  actions: {
    async usersListAction(queryInfo: any) {
      const usersListResult = await usersListData(queryInfo)
      const { totalCount, list } = usersListResult.data
      this.usersTotalCount = totalCount
      this.usersList = list
    },
    async deleteUserByIdAction(id: number) {
      const deleteResult = await deleteUserById(id)
      this.usersListAction({ offset: 0, size: 10 })
    },
    async newUserDataAction(userInfo: any) {
      const newResult = await newUserData(userInfo)
      this.usersListAction({ offset: 0, size: 10 })
    },
    async editUserDataAction(id: number, userInfo: any) {
      const editResult = await editUserData(id, userInfo)
      this.usersListAction({ offset: 0, size: 10 })
    },
  }
})

export default useSystemStore
