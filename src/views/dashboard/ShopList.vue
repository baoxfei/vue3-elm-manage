<template>
  <PageWrapper title="店铺列表">
    <div class="container">
      <ElTable :data="dataSource.tableData">
        <ElTableColumn type="expand" onchange="handleChange">
          <template #default="props">
            <div class="tableExpandContainer">
              <div>店铺名称：{{ props.row.name }}</div>
              <div>店铺地址：{{ props.row.name }}</div>
              <div>店铺介绍：{{ props.row.name }}</div>
              <div>店铺ID：{{ props.row.name }}</div>
              <div>联系电话：{{ props.row.name }}</div>
              <div>评分：{{ props.row.name }}</div>
              <div>销售量：{{ props.row.name }}</div>
              <div>分类：{{ props.row.name }}</div>
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="name" label="店铺名称" />
        <ElTableColumn prop="address" label="店铺地址" />
        <ElTableColumn prop="detail" label="店铺介绍" />
        <ElTableColumn label="操作">
          <template #default="props">
            <div class="actions">
              <ElButton @click="handleEdit(props)">编辑</ElButton>
              <ElButton @click="handleAdd(props)">添加食品</ElButton>
              <ElButton @click="handleDel(props)" type="danger">删除</ElButton>
            </div>
          </template>
        </ElTableColumn>
      </ElTable>
      <div>
        <ElPagination
          @sizeChange="handleChange"
          @current-change="handleChange"
          :currentPage="searchParams.currentPage"
          :pageSizes="[10, 20, 30]"
          :pageSize="searchParams.pageSize"
          layout="prev, jumper, next"
          :total="dataSource.total"
        />
      </div>
    </div>
  </PageWrapper>
</template>
<script setup lang="ts">
import { getShopList } from '@/api/shop';
import { PageWrapperVue as PageWrapper } from '@/components/pageWrapper';
import { getErrorMsg } from '@/utils/http';
import { ElTable, ElTableColumn, ElButton, ElMessage, ElPagination } from 'element-plus'
import { onMounted, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'

const dataSource = reactive<{ tableData: any[]; total: number }>({
  tableData: [],
  total: 0
})

const searchParams = reactive<{ pageSize: number; currentPage: number }>({ pageSize: 20, currentPage: 1 })

const router = useRouter()

onMounted(() => {
  getTableData()
})

watch([searchParams], (newValue, oldValue) => {
  console.log(newValue, oldValue);
})

const getTableData = async () => {
  try {
    const { list, total } = await getShopList({ currentPage: searchParams.currentPage, pageSize: searchParams.pageSize })
    dataSource.tableData = list
    dataSource.total = 2
    
  } catch (error) {
    ElMessage.error(getErrorMsg(error))
  }
}

const handleEdit = (value) => {
  console.log(value);
  router.push({ name: 'addGoods', params: { id: ''  } })
}

const handleChange = (value) => {
  console.log(value)
}

const handleDel = (value) => {
  console.log(value);
  // TODO 接口
}

const handleAdd = (value) => {
  console.log(value);
  router.push({ path: 'addGoods', query: { id: '' } })
}

</script>
<style lang="scss" scoped>
.container {
  padding: 12px;
  max-height: 100%;
  overflow-y: auto;
}

.actions {
  display: flex;
  justify-content: center;
}

.tableExpandContainer {
  width: 100%;
  display: flex;
  padding: 24px;
  flex-wrap: wrap;
  align-content: space-between;
  div {
    min-width: 40%;
    padding: 12px;    
  }
}
</style>