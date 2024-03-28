<template>
  <div class="login-phone">
    <el-form :model="account" label-width="60px" ref="formRef">
      <el-form-item label="手机号">
        <el-input v-model="phone" />
      </el-form-item>
      <el-form-item label="验证码">
        <div class="verity">
          <el-input v-model="verity" />
          <el-button class="btn" type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const phone = ref()
const verity = ref()
</script>
<style scoped lang='less'>
.verity {
  display: flex;
  .btn {
    margin-left: 8px;
  }
}
</style>