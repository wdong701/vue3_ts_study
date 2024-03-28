import hyRequest from '..'
import type { Account } from '@/types'

export function accountLogin(account: Account) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}

export function getUserById(id: number) {
  return hyRequest.get({
    url: '/users/' + id
  })
}

export function getRoleMenus(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`
  })
}
