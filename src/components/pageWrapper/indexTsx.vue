
<script lang="tsx">
  interface Props {
    title?: string
    onClose?: () => void;
  }
  import { defineComponent, defineEmits, defineProps } from 'vue'
  import { ElIcon } from 'element-plus'
  import { ArrowLeft } from '@element-plus/icons-vue'
  export default defineComponent({
    props: ['title', 'onClose'],
    setup({ title, onClose }, { slots }) {
        return () => {
          return (
            <div class="container">
              <div class="header">
                <div class="icon" onClick={() => onClose?.()}>
                  <ElIcon>
                    <ArrowLeft></ArrowLeft>
                  </ElIcon>
                </div>
                <div>{title}</div>
              </div>
              <div class={'pageContent'}>
                {slots.default?.()}
              </div>
            </div>
          )
        }
    },
  })
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
<!-- ``父组件
<A>我是默认插槽的内容</A>
<A>{{ default: () => <p>我是默认插槽的内容</p> }}</A>
<B>{{ foo: () => <p>我是具名插槽的内容</p> }}</B>
<C>
  {{
      // 通过解构得到插槽作用域的参数。{ name: string; data: number[] }是定义的ts类型
      footer: ({ name, data }: { name: string; data: number[] }) => (
          <p>
              {name}---{data}
          </p>
      )
  }}
</C>
`` -->


