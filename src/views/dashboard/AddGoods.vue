<script lang="tsx">
  import { defineComponent, reactive, ref } from 'vue'
  import type { FormRules, FormInstance } from 'element-plus'
  import { Plus } from '@element-plus/icons-vue'
  import { UPLOAD_URL_PREFIX } from '@/utils/const'
  import { ElForm, ElFormItem, ElInput, ElSelect, ElTreeSelect, ElCascader, ElSwitch, ElInputNumber, ElTimeSelect,ElUpload,  ElButton, ElIcon, ElCol } from 'element-plus'
  export default defineComponent({
    name: 'addGoods',
    components: { ElForm, ElFormItem, ElInput, ElSelect, ElTreeSelect, ElSwitch, ElInputNumber, ElCol },
    setup(props, { slots, attrs, emit, expose }) {
      const form = reactive({
        city: {},
        formData: {
          name: '', //店铺名称
          address: '', //地址
          latitude: '',
          longitude: '',
          description: '', //介绍
          phone: '',
          promotion_info: '',
          float_delivery_fee: 5, //运费
          float_minimum_order_amount: 20, //起价
          is_premium: true,
          delivery_mode: true,
          new: true,
          bao: true,
          zhun: true,
          piao: true,
          startTime: '',
          endTime: '',
          image_path: '',
          selectedCategory: '',
          business_license_image: '',
          catering_service_license_image: '',
        },
      })

      const formRef = ref<FormInstance>()

      const formRules = reactive<FormRules<typeof form.formData>>({
        name: [{ required: true, message: '请输入' }],
        address: [{ required: true, message: '请选择' }],
        phone: [{ required: true, message: '请输入' }, { validator: () => true, message: '请输入正确的电话号码' }],
      })

      const onValidate = async () => {
        try {
          const value =  await formRef.value?.validate()
          // await formRef.value?.validate((valid, fields) => {
          //   console.log(valid, fields, '---->')
          // })
          console.log(value);
          
        } catch (error) {
          console.log(error)
        }
      }

      const onSubmit = () => {
        console.log('提交')
      }

      return () => {
        return (
          <div class="container">
            <ElForm ref={formRef} model={form.formData} rules={formRules} labelWidth={200}>
              <ElFormItem required label='店铺名称' prop="name">
                <ElInput placeholder='请输入' v-model={form.formData.name} />
              </ElFormItem>
              <ElFormItem required label='详细地址' prop="address">
                <ElTreeSelect placeholder='选择' v-model={form.formData.address} />
              </ElFormItem>
              <ElFormItem required label='联系电话' prop="phone">
                <ElInput placeholder='选择' v-model={form.formData.phone} />
              </ElFormItem>
              <ElFormItem label='店铺简介' prop="description">
                <ElInput type="textarea" autosize={{ minRows: 2, maxRows: 4  }} placeholder='请输入' v-model={form.formData.description} />
              </ElFormItem>
              <ElFormItem label='店铺标语' prop="promotion_info">
                <ElInput placeholder='请输入' v-model={form.formData.promotion_info} />
              </ElFormItem>
              <ElFormItem label='店铺分类' prop="selectedCategory">
                <ElCascader placeholder='请选择' v-model={form.formData.selectedCategory} />
              </ElFormItem>
              <ElFormItem label='店铺特点' >
                <ElCol span={8} style="white-space: no-wrap">
                  <span>品牌保证</span>
                  <ElFormItem prop="is_premium">
                    <ElSwitch v-model={form.formData.is_premium}></ElSwitch>
                  </ElFormItem>
                </ElCol>
                <ElCol span={8} style="white-space: no-wrap">
                  <span>蜂鸟专送</span>
                  <ElFormItem prop={'delivery_mode'}>
                    <ElSwitch v-model={form.formData.delivery_mode}></ElSwitch>
                  </ElFormItem>
                </ElCol>
                <ElCol span={8} style="white-space: no-wrap">
                  <span>新开店铺</span>
                  <ElFormItem prop={'new'}>
                    <ElSwitch v-model={form.formData.new}></ElSwitch>
                  </ElFormItem>
                </ElCol>
              </ElFormItem>
              <ElFormItem style="white-space: nowrap;">
                <ElCol span={8} style="white-space: no-wrap">
                  <span>外卖保</span>
                  <ElFormItem prop="bao">
                    <ElSwitch v-model={form.formData.bao}></ElSwitch>
                  </ElFormItem>
                </ElCol>
                <ElCol span={8} style="white-space: no-wrap">
                  <span>准时达</span>
                  <ElFormItem prop="zhun">
                    <ElSwitch v-model={form.formData.zhun}></ElSwitch>
                  </ElFormItem>
                </ElCol>
                <ElCol span={8} style="white-space: no-wrap">
                  <span>开发票</span>
                  <ElFormItem prop="piao">
                    <ElSwitch v-model={form.formData.piao}></ElSwitch>
                  </ElFormItem>
                </ElCol>
              </ElFormItem>
              <ElFormItem label="配送费" prop="float_delivery_fee">
						    <ElInputNumber v-model={form.formData.float_delivery_fee} min={0} max={20}></ElInputNumber>
              </ElFormItem>
              <ElFormItem label="起送价" prop="float_minimum_order_amount">
                <ElInputNumber v-model={form.formData.float_minimum_order_amount} min={0} max={100}></ElInputNumber>
              </ElFormItem>
              <ElFormItem label="营业时间" style="white-space: nowrap;">
                <ElFormItem prop={'startTime'}>
                  <ElTimeSelect
                    placeholder="起始时间"
                    v-model={form.formData.startTime}
                    start='05:30'
                    step='00:15'
                    end='23:30'
                  />
                </ElFormItem>
                <ElFormItem>
                  <ElTimeSelect
                    placeholder="结束时间"
                    v-model={form.formData.endTime}
                    start='05:30'
                    step='00:15'
                    end='23:30'
                    minTime={form.formData.startTime}
                  >
                  </ElTimeSelect>
                </ElFormItem>
					    </ElFormItem>
              <ElFormItem label="上传店铺头像">
                <ElUpload v-model={form.formData.image_path}>
                  {
                    form.formData.image_path ? (
                      <img src={UPLOAD_URL_PREFIX + form.formData.image_path} class="avatar" />
                    ) : (
                      <ElIcon>
                        <Plus />
                      </ElIcon>
                    )
                  }
                </ElUpload>
              </ElFormItem>
              <ElFormItem>
                <ElButton onClick={onSubmit}>提交</ElButton>
                <ElButton onClick={onValidate}>校验</ElButton>
              </ElFormItem>
            </ElForm>
          </div>
        )
      }
    }
  })
</script>

<style lang="scss" scoped>
.container {
  padding: 12px;
  max-height: 100%;
  overflow-y: auto;
}
</style>