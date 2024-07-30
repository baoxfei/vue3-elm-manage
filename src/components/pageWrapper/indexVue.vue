<template>
  <div class="container">
    <div class="header">
      <div @click="$emit('close')" class="icon">
        <ElIcon><ArrowLeft /></ElIcon>
      </div>
      <div>{{ title }}</div>
    </div>
    <div class="page">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ElIcon } from 'element-plus'
  import { ArrowLeft } from '@element-plus/icons-vue'
  import { defineComponent, defineEmits, defineProps, onMounted } from 'vue'
  defineProps(['title']);
  defineEmits(['close'])


</script>
<style lang="scss" scoped>
  .container {
    padding: 12px;
  }
  .header {
    height: 40px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    .icon {
      position: absolute;
      left: 16px;
      top: calc(50% - 8px);
      cursor: pointer;
    }
  }
  .pageContent {
    height: calc(100% - 40px);
    overflow-y: auto;
  }
</style>

<!-- setup 写在 script 上和 defineComponent 是截然不同的写法 -->