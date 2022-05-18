<template>
  <div class="dropdown" ref="dropdownRef">
    <a
      @click.prevent="openDropdown"
      class="btn btn-outline-light my-2 dropdown-toggle"
      href="#"
      >{{ title }}</a
    >
    <ul class="dropdown-menu" style="display: block" v-if="isOpen">
      <slot> </slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
// 导入下拉菜单关闭函数
import useClickOutside from '@/hooks/useClickOutside'

export default defineComponent({
  name: 'Dropdown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup () {
    // 定义下拉菜单的打开状态
    const isOpen = ref(false)
    // 定义打开/关闭下拉菜单的函数
    const openDropdown = () => {
      isOpen.value = !isOpen.value
    }
    // 定义下拉菜单的dom元素并声明类型(要return出去) dropdownRef.value可以拿到div.dropdown节点
    const dropdownRef = ref<HTMLElement | null>(null)
    const isClickOutside = useClickOutside(dropdownRef)
    // watch监测响应式变化
    watch(isClickOutside, () => {
      if (isClickOutside.value && isOpen.value) {
        isOpen.value = false
      }
    })
    return {
      isOpen,
      openDropdown,
      dropdownRef,
      isClickOutside
    }
  }
})
</script>
