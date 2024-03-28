<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="icon">
            <el-icon><User /></el-icon>
            <span class="text">账号登陆</span>
          </span>
        </template>
        <login-account ref="accountRef"></login-account>
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <el-icon><Iphone /></el-icon>
          <span class="text">手机登陆</span>
        </template>
        <loginphone></loginphone>
      </el-tab-pane>
    </el-tabs>
    <div class="control">
      <el-checkbox label="记住密码" v-model="isRemember" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="login">立即登录</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import loginAccount from './login-account.vue'
import loginphone from './login-phone.vue'
import { User, Iphone } from '@element-plus/icons-vue'
import { localCache } from '@/utils/cache'
const currentTab = ref('account')
const accountRef = ref<InstanceType<typeof loginAccount>>()

const isRemember = ref<boolean>(localCache.getItem('isRemember') ?? false)

watch(isRemember, (newval) => {
  localCache.setItem('isRemember', newval)
})

const login = () => {
  if (currentTab.value === 'account') {
    accountRef.value?.loginAction(isRemember.value)
  } else {
  }
}
</script>
<style scoped lang='less'>
.login-panel {
  width: 330px;
  .title {
    text-align: center;
  }
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    .text {
      margin-left: 5px;
    }
  }
  .control {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>