<template>
  <div class="container">
    <el-form>
      <el-form-item label="帐号">
      <el-input v-model="form.username" />
        </el-form-item>
      <el-form-item  label="密码">
        <el-input type="password" v-model="form.password" />
      </el-form-item>
      <el-button @click="onSubmit">注册</el-button>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { getErrorMsg } from '@/utils/http';
import { ElMessage } from 'element-plus';
import { reactive } from 'vue';
import { register } from '@/api/user'
import router from '@/router';
import QTool from '@/utils/tools';

  const form = reactive({ username: '', password: '' })
  const onSubmit = async () => {
    try {
      const data =  await register({ ...form, password: QTool.encrypt(form.password) })
      router.push('/login')
    } catch (error) {
      ElMessage(getErrorMsg(error))
    }
  }
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>