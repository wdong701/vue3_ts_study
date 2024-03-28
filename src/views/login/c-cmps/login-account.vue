<template>
  <div class="login-account">
    <el-form :model="account" :rules="accountRules" label-width="60px" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import useLoginStore from '@/store/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
const account = reactive<IAccount>({
  name: localCache.getItem('name') ?? '',
  password: localCache.getItem('password') ?? ''
})

const accountRules = {
  name: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { pattern: /^[a-z0-9]{6,20}$/, message: '必须是6~20个字母或数字', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^[a-z0-9]{3,}$/, message: '密码必须在3位以上', trigger: 'blur' }
  ]
}

const formRef = ref()
const loginStore = useLoginStore()
const loginAction = (isRemember: boolean) => {
  formRef.value?.validate((valid) => {
    if (valid) {
      const name = account.name
      const password = account.password
      loginStore.loginAccountAction({ name, password }).then(() => {
        if (isRemember) {
          localCache.setItem('name', name)
          localCache.setItem('password', password)
        } else {
          localCache.removeItem('name')
          localCache.removeItem('password')
        }
      })
    } else {
      ElMessage.error('格式不正确！')
    }
  })
}

defineExpose({
  loginAction
})
</script>
<style scoped lang='less'>
</style>