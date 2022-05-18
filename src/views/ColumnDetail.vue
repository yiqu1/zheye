<template>
  <div class="column-detail-page w-75 mx-auto">
    <!-- 专栏 -->
    <div
      v-if="column"
      class="column-info row mb-4 border-bottom pb-4 align-items-center"
    >
      <div class="col-3 text-center">
        <img
          :src="column.avatar"
          :alt="column.title"
          class="rounded-circle border"
        />
      </div>
      <div class="col-9">
        <h4>{{ column.title }}</h4>
        <p class="text-muted">{{ column.description }}</p>
      </div>
    </div>
    <!-- 该专栏下的文章列表 -->
    <post-list :list="list" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import PostList from '@/components/PostList.vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store'
export default defineComponent({
  name: 'ColumnDetail',
  components: {
    PostList
  },
  setup () {
    // 获取路由的信息
    const route = useRoute()
    const store = useStore<GlobalDataProps>()
    // 找到当前id
    const currentId = +route.params.id
    // 找到该id的专栏, find方法只返回符合的第一项元素
    const column = store.getters.getColumnById(currentId)
    // 通过id, 找到该专栏id下的所有符合的元素, 返回一个数组
    const list = store.getters.getPostsByCid(currentId)
    return {
      column,
      list
    }
  }
})
</script>
