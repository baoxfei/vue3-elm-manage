<template>
  <div v-loading="state.loading" class="pageContainer">
    <div class="menu" >
      <ElMenu
        router
      >
        <ElMenuItem index="panel">
          <template #title>
            <div class="title">
              <ElIcon :size="20">
                <Menu />
              </ElIcon>
              <span>数据面板</span>
            </div>
          </template>
        </ElMenuItem>
        <ElSubMenu index="add">
          <template #title>
            <div class="title">
              <ElIcon :size="20"><Setting /></ElIcon>
              <span>添加数据</span>
            </div>
          </template>
          <ElMenuItem index="addShop" title="添加店铺">添加店铺</ElMenuItem>
          <ElMenuItem index="addGoods" title="添加商品">添加商品</ElMenuItem>
        </ElSubMenu>
        <ElSubMenu index="list">
          <template #title>
            <div class="title">
              <ElIcon :size="20"><List /></ElIcon>
              <span>列表</span>
            </div>
          </template>
          <ElMenuItem index="shopList" title="店铺列表">店铺列表</ElMenuItem>
          <ElMenuItem index="goods" title="商品列表">商品列表</ElMenuItem>
        </ElSubMenu>
      </ElMenu>
    </div>
    <div class="subPage">
      <RouterView></RouterView>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import { RouterView } from 'vue-router'
import { List, Setting, Menu } from '@element-plus/icons-vue'
// import { ElMenuItem, ElMenu, ElSubMenu, ElIcon, } from 'element-plus'

const state = reactive({
  loading: false
})
</script>
<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 20px;
  gap: 8px;
  color: white;
}
.menu {
  width: 200px;
  height: 100vh;
  overflow-y: auto;
  background-color: #324057;
  flex-shrink: 0;
}
.pageContainer {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.subPage {
  flex-grow: 1;
}
</style>