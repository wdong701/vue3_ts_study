<template>
  <div class="search">
    <el-form :model="searchForm" ref="formRef" label-width="80px" size="large">
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="(item, prop)">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="searchForm[item.prop]" :placeholder="item.placeholder" />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>

    <div class="btns">
      <el-button @click="handleResetClick">重置</el-button>
      <el-button type="primary" @click="handleQueryClick">查询</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'

interface IProps {
  searchConfig: {
    formItems: any[]
  }
}

const emit = defineEmits(['resetClick', 'queryClick'])
const props = defineProps<IProps>()

const initialFrom: any = {}
for (const i of props.searchConfig.formItems) {
  initialFrom[i.prop] = ''
}

const searchForm = reactive(initialFrom)

// 重置操作
const formRef = ref<InstanceType<typeof ElForm>>()
function handleResetClick() {
  formRef.value?.resetFields()
  emit('resetClick')
}

function handleQueryClick() {
  emit('queryClick', searchForm)
}
</script>
<style lang="less" scoped>
.search {
  background-color: #fff;
  padding: 20px;

  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0;
  }

  .btns {
    text-align: right;
    padding: 0 50px 10px 0;

    .el-button {
      height: 36px;
    }
  }
}
</style>