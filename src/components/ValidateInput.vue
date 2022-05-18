<template>
  <div class="validate-input-container pb-3">
    <input
      v-if="tag !== 'textarea'"
      v-bind="$attrs"
      :value="inputRef.val"
      @input="updateValue"
      @blur="validateInput"
      :class="{ 'is-invalid': inputRef.error }"
      class="form-control"
    />
    <textarea
      v-else
      v-bind="$attrs"
      :value="inputRef.val"
      @input="updateValue"
      @blur="validateInput"
      :class="{ 'is-invalid': inputRef.error }"
      class="form-control"
    >
    </textarea>
    <span v-if="inputRef.error" class="invalid-feedback">
      {{ inputRef.message }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, reactive } from 'vue'
// 导入事件监听器
import { emitter } from './ValidateForm.vue'

// 邮箱正则表达式
const emailReg =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
// input验证规则
interface RuleProp {
  type: 'required' | 'email' | 'range'
  message?: string
  min?: { message: string; length: number }
  max?: { message: string; length: number }
}
export type RulesProp = RuleProp[]
// 定义input类型
export type TagType = 'input' | 'textarea'
export default defineComponent({
  name: 'ValidateInput',
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String,
    // 接受标签名
    tag: {
      type: String as PropType<TagType>,
      default: 'input'
    }
  },
  // non-props属性
  inheritAttrs: false,
  setup (props, context) {
    const inputRef = reactive({
      val: props.modelValue || '',
      error: false,
      message: ''
    })

    const updateValue = (e: Event) => {
      const targetValue = (e.target as HTMLInputElement).value
      inputRef.val = targetValue
      context.emit('update:modelValue', targetValue)
    }

    // input输入验证函数
    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every((rule) => {
          let passed = true
          inputRef.message = rule.message ? rule.message : ''
          switch (rule.type) {
            case 'required':
              passed = inputRef.val.trim() !== ''
              break
            case 'email':
              passed = emailReg.test(inputRef.val)
              break
            case 'range':
              if (rule.min && inputRef.val.length < rule.min.length) {
                passed = false
                inputRef.message = rule.min.message
              }
              if (rule.max && inputRef.val.length > rule.max.length) {
                passed = false
                inputRef.message = rule.max.message
              }
              break
            default:
              break
          }
          return passed
        })
        inputRef.error = !allPassed
        return allPassed
      }
      return true
    }

    // 清空input
    const clearInputs = () => {
      inputRef.val = ''
    }
    // 添加事件: 发送validateInput事件, 事件名字form-item-created
    onMounted(() => {
      emitter.emit('form-item-created', validateInput)
      emitter.emit('form-item-clear', clearInputs)
    })

    return {
      inputRef,
      validateInput,
      updateValue
    }
  }
})
</script>
