// 定义是否点击了dom节点外面的函数

import { onMounted, onUnmounted, ref, Ref } from 'vue'

const useClickOutside = (elementRef: Ref<HTMLElement | null>) => {
  // 是否点击了节点外面
  const isClickOutside = ref(false)
  const handler = (e: MouseEvent) => {
    // 判断如果下拉菜单的dom存在
    if (elementRef.value) {
      // 判断如果下拉菜单是打开的并且是否包含鼠标点击的节点 语法: node.contains(otherNode)
      // 只写e.target会报错, 这里要做类型断言
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false
      } else {
        isClickOutside.value = true
      }
    }
  }
  // 绑定事件
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  // 解除事件
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
  return isClickOutside
}

export default useClickOutside
