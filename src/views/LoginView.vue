<template>
  <div class="container">
    <el-form>
    <el-form-item label="帐号">
      <el-input v-model="form.username" />
    </el-form-item>
    <el-form-item  label="密码">
      <el-input type="password" v-model="form.password" />
    </el-form-item>
    <el-form-item>
      <el-button @click="onSubmit" >提交</el-button>
    </el-form-item>
    <el-form-item>
      <router-link to="/register">注册</router-link>
    </el-form-item>
  </el-form>
  </div>

</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { request } from '@/utils/http/axios'
import QTool from '@/utils/tools';
import { ElMessage } from 'element-plus'
import { login } from '@/api/user'
import router from '@/router';

const form = reactive<{ username: string; password: string }>({
  username: '',
  password: ''
})

const onSubmit =  async () => {
  try {
    await login({ ...form, password: QTool.encrypt(form.password) })
    router.push('/addShop')
  } catch (error) {
    ElMessage(`${error}`)
  }
}

</script>

<style scoped="scss">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>