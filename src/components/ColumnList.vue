<template>
  <div class="row">
    <div v-for="column in columnList" :key="column.id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img
            :src="column.avatar"
            :alt="column.title"
            class="border border-light w-25 my-3 rounded-circle"
          />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-start">{{ column.description }}</p>
          <!-- 跳转到专栏, 通过不同的专栏id -->
          <router-link
            class="btn btn-outline-primary"
            :to="`/column/${column.id}`"
            >进入专栏</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { ColumnProps } from '../testData'

export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup (props) {
    // 如果list中某项没有avator, 重新计算, 用require使用本地默认图片, 再返回新的数组
    const columnList = computed(() => {
      return props.list.map((column) => {
        if (!column.avatar) {
          column.avatar = require('@/assets/column.jpg')
        }
        return column
      })
    })
    return {
      columnList
    }
  }
})
</script>
