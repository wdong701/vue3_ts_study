<template>
  <div class="user">
    <user-search @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <user-content ref="contentRef" @new-click="handleNewClick" @edit-click="handleEditClick" />
    <user-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import UserSearch from './c-cmps/user-search.vue'
import UserContent from './c-cmps/user-content.vue'
import UserModal from './c-cmps/user-modal.vue'
import { ref } from 'vue'
const contentRef = ref<InstanceType<typeof UserContent>>()
function handleQueryClick(formData: any) {
  contentRef.value?.getList(formData)
}
function handleResetClick() {
  contentRef.value?.getList()
}

const modalRef = ref<InstanceType<typeof UserModal>>()
function handleNewClick() {
  modalRef.value?.setModalVisible()
}
function handleEditClick(itemData: any) {
  modalRef.value?.setModalVisible(false, itemData)
}
</script>

<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
