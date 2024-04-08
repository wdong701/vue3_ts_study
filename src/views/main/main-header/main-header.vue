<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuIconClick">
      <el-icon size="28px" v-if="isFold">
        <Expand />
      </el-icon>
      <el-icon size="28px" v-else>
        <Fold />
      </el-icon>
    </div>

    <div class="right">
      <bread-crumb></bread-crumb>
      <user-info></user-info>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import userInfo from './c-cmps/user-info.vue'
import breadCrumb from './c-cmps/bread-crumb.vue'
import { Expand, Fold } from '@element-plus/icons-vue'

const emit = defineEmits(['foldChange'])

const isFold = ref(false)
function handleMenuIconClick() {
  // 1.内部改变状态
  isFold.value = !isFold.value

  // 2.将事件和状态传递给父组件
  emit('foldChange', isFold.value)
}
</script>
<style scoped lang='less'>
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;
  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .right {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    padding: 0 18px;
  }
}
</style>