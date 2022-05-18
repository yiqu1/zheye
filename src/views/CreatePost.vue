<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label for="inputTitle1" class="form-label">文章标题: </label>
        <!-- ValidateInput组件 -->
        <validate-input
          :rules="titleRules"
          v-model="titleVal"
          type="text"
          placeholder="请输入文章标题"
          id="inputTitle1"
        />
      </div>
      <div class="mb-3">
        <label for="inputContent1" class="form-label">文章详情: </label>
        <!-- ValidateInput组件 -->
        <validate-input
          tag="textarea"
          rows="10"
          :rules="contentRules"
          v-model="contentVal"
          placeholder="请输入文章详情"
          id="inputContent1"
        />
      </div>
      <template #submit>
        <div class="d-grid gap-2">
          <button class="btn btn-primary btn-lg">发表文章</button>
        </div>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { GlobalDataProps, PostProps } from '../store'

export default defineComponent({
  name: 'CreatePost',
  components: {
    ValidateForm,
    ValidateInput
  },
  setup () {
    // 组件的双向数据绑定 可以拿到input的输入
    const titleVal = ref('')
    const contentVal = ref('')
    // 定义文章标题规则, 用于ValidateInput组件
    const titleRules: RulesProp = [
      { type: 'required', message: '文章标题不能为空' }
    ]
    // 定义文章内容规则, 用于ValidateInput组件
    const contentRules: RulesProp = [
      { type: 'required', message: '文章详情不能为空' }
    ]
    // 定义路由的一系列行为
    const router = useRouter()
    // 获取数据
    const store = useStore<GlobalDataProps>()
    // 接受来自ValidateForm发出的事件, 参数是boolean类型
    const onFormSubmit = (result: boolean) => {
      if (result) {
        // 用户登录触发login事件
        // store.commit('login')
        const { columnId } = store.state.user
        if (columnId) {
          const newPost: PostProps = {
            id: new Date().getTime(),
            title: titleVal.value,
            content: contentVal.value,
            createdAt: new Date().toLocaleString(),
            columnId
          }
          store.commit('createPost', newPost)
          // 路由跳转
          router.push({ name: 'column', params: { id: columnId } })
        }
      }
    }
    return {
      onFormSubmit,
      titleVal,
      contentVal,
      titleRules,
      contentRules
    }
  }
})
</script>
