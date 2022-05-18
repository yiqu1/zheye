<template>
  <div class="login-page">
    <!-- 表单组件 有来自ValidateForm发出的事件-->
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label for="inputEmail1" class="form-label">邮箱地址</label>
        <!-- ValidateInput组件 -->
        <validate-input
          :rules="emailRules"
          v-model="emailVal"
          type="text"
          placeholder="请输入邮箱地址"
          id="inputEmail1"
        />
      </div>
      <div class="mb-3">
        <label for="inputPassword1" class="form-label">密码</label>
        <!-- ValidateInput组件 -->
        <validate-input
          v-model="passwordVal"
          :rules="passwordRules"
          type="password"
          class="form-control"
          id="inputPassword1"
          placeholder="请输入密码"
        />
      </div>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import ValidateForm from '@/components/ValidateForm.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Login',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    // 组件的双向数据绑定 可以拿到input的输入
    const emailVal = ref('')
    const passwordVal = ref('')

    // 定义邮箱验证规则, 用于ValidateInput组件
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    // 定义邮箱密码验证规则, 用于ValidateInput组件
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' },
      {
        type: 'range',
        min: { message: '你的密码至少包括六位，不能含有空格', length: 6 }
      }
    ]
    // 定义路由的一系列行为
    const router = useRouter()
    // 获取数据
    const store = useStore()
    // 接受来自ValidateForm发出的事件, 参数是boolean类型
    const onFormSubmit = (result: boolean) => {
      console.log(result)
      if (result) {
        // 路由跳转
        router.push('/')
        // 用户登录触发login事件
        store.commit('login')
      }
    }

    return {
      emailRules,
      emailVal,
      passwordRules,
      passwordVal,
      onFormSubmit
    }
  }
})
</script>
