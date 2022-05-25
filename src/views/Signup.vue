<template>
  <div class="signup-page mx-auto p-3 w-330">
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label for="inputEmail2" class="form-label">邮箱地址</label>
        <!-- ValidateInput组件 -->
        <validate-input
          :rules="emailRules"
          v-model="formData.email"
          type="text"
          placeholder="请输入邮箱地址"
          id="inputEmail2"
        />
      </div>
      <div class="mb-3">
        <label for="inputNickname" class="form-label">昵称</label>
        <!-- ValidateInput组件 -->
        <validate-input
          :rules="nameRules"
          v-model="formData.nickName"
          type="text"
          placeholder="请输入昵称"
          id="inputNickname"
        />
      </div>
      <div class="mb-3">
        <label for="inputPsw" class="form-label">密码</label>
        <!-- ValidateInput组件 -->
        <validate-input
          :rules="passwordRules"
          v-model="formData.password"
          type="password"
          placeholder="请输入密码"
          id="inputPsw"
        />
      </div>
      <div class="mb-3">
        <label for="inputPsw2" class="form-label">重复密码</label>
        <!-- ValidateInput组件 -->
        <validate-input
          :rules="repeatPasswordRules"
          v-model="formData.repeatPassword"
          type="password"
          placeholder="请再次输入密码"
          id="inputPsw2"
        />
      </div>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import ValidateForm from '@/components/ValidateForm.vue'
import createMessage from '@/components/createMessage'
import axios from 'axios'

export default defineComponent({
  name: 'Signup',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const formData = reactive({
      email: '',
      nickName: '',
      password: '',
      repeatPassword: ''
    })
    const router = useRouter()
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const nameRules: RulesProp = [{ type: 'required', message: '昵称不能为空' }]
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' }
    ]
    const repeatPasswordRules: RulesProp = [
      { type: 'required', message: '重复密码不能为空' },
      {
        type: 'custom',
        validator: () => {
          return formData.password === formData.repeatPassword
        },
        message: '密码不相同'
      }
    ]
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const payload = {
          email: formData.email,
          password: formData.password,
          nickName: formData.nickName
        }
        axios
          .post('/users/', payload)
          .then((data) => {
            createMessage('注册成功 正在跳转登录页面', 'success')
            setTimeout(() => {
              router.push('/login')
            }, 2000)
          })
          .catch((e) => {
            console.log(e)
          })
      }
    }
    return {
      emailRules,
      nameRules,
      passwordRules,
      repeatPasswordRules,
      onFormSubmit,
      formData
    }
  }
})
</script>

<style>
.w-300 {
  max-width: 330px;
}
</style>
