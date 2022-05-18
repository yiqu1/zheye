<template>
  <form class="validate-form-container">
    <slot></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit"
        ><button type="submit" class="btn btn-primary">提交</button></slot
      >
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'

// 定义验证函数的类型
type ValidateFunc = () => boolean
// 定义清空input函数的类型
type clearFunc = () => void
// 要求定义evens类型
type Events = {
  'form-item-created': ValidateFunc
  'form-item-clear': clearFunc
}
export const emitter = mitt<Events>()

export default defineComponent({
  name: 'ValidateForm',
  emits: ['form-submit'],
  setup (props, context) {
    // 创建验证函数的数组
    let funcArr: ValidateFunc[] = []
    // 创建清空input函数的数组
    let funcClearArr: clearFunc[] = []
    // 验证
    const submitForm = () => {
      const result = funcArr.map((func) => func()).every((result) => result)
      // 验证结果
      context.emit('form-submit', result)
      // 清空input
      funcClearArr.map((func) => func())
    }
    // 创建回调函数
    const callback = (func: ValidateFunc) => {
      funcArr.push(func)
    }
    const clearCallback = (func: clearFunc) => {
      funcClearArr.push(func)
    }
    // 添加到监听器中
    emitter.on('form-item-created', callback)
    emitter.on('form-item-clear', clearCallback)
    // 事件销毁
    onUnmounted(() => {
      emitter.off('form-item-created', callback)
      emitter.off('form-item-clear', clearCallback)
      // 事件数组清空
      funcArr = []
      funcClearArr = []
    })
    return {
      submitForm
    }
  }
})
</script>
