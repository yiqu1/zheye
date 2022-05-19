<template>
  <div class="column-detail-page w-75 mx-auto">
    <!-- 专栏 -->
    <div
      v-if="column"
      class="column-info row mb-4 border-bottom pb-4 align-items-center"
    >
      <div class="col-3 text-center">
        <img
          :src="column.avatar.url"
          :alt="column.title"
          class="rounded-circle border w-100"
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
import { computed, defineComponent, onMounted } from 'vue'
import PostList from '@/components/PostList.vue'
import { useRoute } from 'vue-router'
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
    const currentId = route.params.id
    // 找到该id的专栏, find方法只返回符合的第一项元素
    onMounted(() => {
      store.dispatch('fetchColumn', currentId)
      store.dispatch('fetchPosts', currentId)
    })
    const column = computed(() => store.getters.getColumnById(currentId))
    // 通过id, 找到该专栏id下的所有符合的元素, 返回一个数组
    const list = computed(() => store.getters.getPostsByCid(currentId))

    return {
      column,
      list
    }
  }
})
</script>
