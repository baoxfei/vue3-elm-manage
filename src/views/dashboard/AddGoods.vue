<template>
  <PageWrapper title="添加商品" @close="handleClose">
    <div class="container"></div>
  </PageWrapper>
</template>
<script setup lang="tsx">
import { PageWrapperTsx as PageWrapper } from '@/components/pageWrapper/index'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

onMounted(() => {
  console.log(route.params, route.query, '----->');
})

const handleClose = () => {
  console.log('---->close', );
  
}

</script>
<style lang="scss" scoped>
.container {
  padding: 12px;
  max-height: 100%;
  overflow-y: auto;
}
</style>