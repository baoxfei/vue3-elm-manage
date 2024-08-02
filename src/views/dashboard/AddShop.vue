<script lang="tsx">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import type { FormRules, FormInstance } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { UPLOAD_URL_PREFIX } from '@/utils/const'
import { DISCOUNT_OPTIONS } from './const'
import { getCategories, addShop } from '@/api/shop'
import { PageWrapperVue as PageWrapper } from '@/components/pageWrapper'
import { ElForm, ElFormItem, ElInput, ElSelect, ElTreeSelect, ElCascader, ElSwitch, ElInputNumber, ElTimeSelect, ElUpload, ElButton, ElIcon, ElCol, ElMessage, ElOption, ElTable, ElTableColumn, ElDialog } from 'element-plus'
export default defineComponent({
  name: 'addGoods',
  // components: { ElForm, ElFormItem, ElInput, ElSelect, ElTreeSelect, ElSwitch, ElInputNumber, ElCol, PageWrapper, ElDialog },
  setup(props, { slots, attrs, emit, expose }) {
    const form = reactive({
      city: {},
      categoryOptions: [],
      visible: false,
      formData: {
        name: '', //店铺名称
        address: '杭州市', //地址
        latitude: '123.000',
        longitude: '123.000',
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
        activities: [
        { title: '测试标题', name: '测试名称', detail: '测试详情', id: 0 }
        ]
      },
      select: {
        visible: false,
        selectCategory: '0',
        activeDetail: ''
      }
    })

    const formRef = ref<FormInstance>()

    const formRules = reactive<FormRules<typeof form.formData>>({
      name: [{ required: true, message: '请输入' }],
      address: [{ required: true, message: '请选择' }],
      phone: [{ required: true, message: '请输入' }, { validator: () => true, message: '请输入正确的电话号码' }],
    })

    onMounted(async () => {

      // const [city, categoryOptions] = await Promise.all([ getCategories])
      // form.city = city
      // form.categoryOptions = categoryOptions
      getCategoryOptions()
    })

    const getCategoryOptions = async () => {
      try {
      const list = await getCategories()
      
      form.categoryOptions = list.map(n => ({ label: n.name, value: n.id }))
      
      } catch (error) {
        console.error(error)
      }
    }
    const getCity = async () => {
      return Promise.resolve({})
    }

    const onValidate = async () => {
      try {
        const value = await formRef.value?.validate()
        // await formRef.value?.validate((valid, fields) => {
        //   console.log(valid, fields, '---->')
        // })
        console.log(value);

      } catch (error) {
        console.log(error)
      }
    }

    const onSubmit = async () => {
      try {
        await addShop({ ...form.formData })
      } catch (error) {
        console.error(error)
      }
    }

    const handleClose = () => {
      console.log('close')
    }

    const handleBeforeUpload = (rawFile) => {
      if (rawFile.type !== 'image/jpeg') {
        ElMessage.error('Avatar picture must be JPG format!')
        return false
      } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
      }
      return true
    }

    const handleSelect = (value) => {
      form.select.activeDetail = ''
      form.select.visible = true
      form.select.selectCategory = value
    }

    const handleDel = (value) => {
      console.log(value, 'value')
      // form.formData.activities = form.formData.activities.filter(n => )
    }

    const handleSure = () => {
      form.formData.activities.push({ detail: form.select.activeDetail, title: DISCOUNT_OPTIONS.find(n => n.value == form.select.selectCategory)?.label || '', name: '增', id: form.formData.activities.length  })
      form.select.visible = false
    }

    return () => {
      return (
        <PageWrapper title={'添加店铺'} onClose={handleClose}>
          <div class="container">
            <ElForm ref={formRef} model={form.formData} rules={formRules} labelWidth={200}>
              <ElFormItem required label='店铺名称' prop="name">
                <ElInput placeholder='请输入' v-model={form.formData.name} />
              </ElFormItem>
              <ElFormItem required label='详细地址' prop="address">
                {/* <ElTreeSelect placeholder='选择' v-model={form.formData.address} /> */}
                <div>{form.city || '杭州'}</div>
              </ElFormItem>
              <ElFormItem required label='联系电话' prop="phone">
                <ElInput placeholder='选择' v-model={form.formData.phone} />
              </ElFormItem>
              <ElFormItem label='店铺简介' prop="description">
                <ElInput type="textarea" autosize={{ minRows: 2, maxRows: 4 }} placeholder='请输入' v-model={form.formData.description} />
              </ElFormItem>
              <ElFormItem label='店铺标语' prop="promotion_info">
                <ElInput placeholder='请输入' v-model={form.formData.promotion_info} />
              </ElFormItem>
              <ElFormItem  label='店铺分类' prop="selectedCategory">
                <ElCascader options={form.categoryOptions} placeholder='请选择' v-model={form.formData.selectedCategory} />
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
                <ElUpload
                  v-model={form.formData.image_path}
                  class="avatar-uploader"
                  showFileList
                  beforeUpload={handleBeforeUpload}
                  action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                >
                  {
                    form.formData.image_path ? (
                      <>
                      <img src={form.formData.image_path} class="avatar" />
                      <ElIcon class="avatar-uploader-icon">
                        <Plus />
                      </ElIcon>
                      </>
                    ) : (
                      <ElIcon class="avatar-uploader-icon">
                        <Plus />
                      </ElIcon>
                    )
                  }
                </ElUpload>
              </ElFormItem>
              <ElFormItem label="上传营业执照">
                <ElUpload
                  v-model={form.formData.business_license_image}
                  class="avatar-uploader"
                  showFileList
                  beforeUpload={handleBeforeUpload}
                  action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                >
                  {
                    form.formData.business_license_image ? (
                      <>
                      <img src={form.formData.business_license_image} class="avatar" />
                      <ElIcon class="avatar-uploader-icon">
                        <Plus />
                      </ElIcon>
                      </>
                    ) : (
                      <ElIcon class="avatar-uploader-icon">
                        <Plus />
                      </ElIcon>
                    )
                  }
                </ElUpload>
              </ElFormItem>
              <ElFormItem label="上传饮服务许可证">
                <ElUpload
                  v-model={form.formData.catering_service_license_image}
                  class="avatar-uploader"
                  showFileList
                  beforeUpload={handleBeforeUpload}
                  action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                >
                  {
                    form.formData.catering_service_license_image ? (
                      <>
                      <img src={form.formData.catering_service_license_image} class="avatar" />
                      <ElIcon class="avatar-uploader-icon">
                        <Plus />
                      </ElIcon>
                      </>
                    ) : (
                      <ElIcon class="avatar-uploader-icon">
                        <Plus />
                      </ElIcon>
                    )
                  }
                </ElUpload>
              </ElFormItem>
              <ElFormItem label='优惠活动'>
                <ElSelect onChange={handleSelect}>
                  {DISCOUNT_OPTIONS.map(n => (
                    <ElOption value={n.value} label={n.label}></ElOption>
                  ))}
                </ElSelect>
              </ElFormItem>
              <div class="tableContainer">
                <ElTable data={form.formData.activities}>
                  <ElTableColumn prop="title" label='活动标题' align='center' width={200} />
                  <ElTableColumn prop="name" label='活动名称' align='center' width={200} />
                  <ElTableColumn prop="detail" label='活动详情' align='center' width={200} />
                  <ElTableColumn prop="operate" label='操作' align='center' width={200} >
                    {{ default: (scope) => <ElButton type='danger' onClick={() => handleDel(scope)}>删除</ElButton> }}
                    
                  </ElTableColumn>
                </ElTable>
              </div>
              <ElFormItem>
                <ElButton onClick={onSubmit}>提交</ElButton>
                <ElButton onClick={onValidate}>校验</ElButton>
              </ElFormItem>
            </ElForm>
          </div>
        <ElDialog onClose={() => {
          form.select.visible = false
          form.select.activeDetail = ''
          }} title='提示' v-model={form.select.visible} beforeClose={() => {}}>
          
          {{ 
            default: () => (
              <ElFormItem label='活动详情'>
                <ElInput v-model={form.select.activeDetail}></ElInput>
              </ElFormItem>
            ),
            footer: () =>  <div class="footer"> <ElButton onClick={() => handleSure()}>确定</ElButton> </div>}}
        </ElDialog>
        </PageWrapper>
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

.tableContainer {
  display: flex;
  justify-content: center;
  width: 100%;
}

</style>

<style>
.avatar-uploader .avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.footer {
  display: flex;
  justify-content: flex-end;
  padding-right: 24px;
}

</style>