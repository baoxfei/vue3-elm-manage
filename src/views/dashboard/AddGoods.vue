<!-- <template>
  <div>
    addGoods
  </div>
</template>
<script setup lang="ts">

</script> -->

<script lang="tsx">
  import { defineComponent, reactive } from 'vue'
  import { ElForm, ElFormItem } from 'element-plus'
  export default defineComponent({
    name: 'addGoods',
    components: { ElForm, ElFormItem },
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
          business_license_image: '',
          catering_service_license_image: '',
        },
      })
      return () => {
        return (
          <div>
            <ElForm >
              <ElFormItem>

              </ElFormItem>
            </ElForm>
          </div>
        )
      }
    }
  })
</script>

<style lang="scss">

</style>