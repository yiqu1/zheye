import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import axios from 'axios'
// 替换 baseURL
axios.defaults.baseURL = 'http://apis.imooc.com/api/'
// 下面的 icode 值是从慕课网获取的 token 值
axios.interceptors.request.use((config) => {
  // get 请求，添加到 url 中
  config.params = { ...config.params, icode: '82F53E57B88D65CB' }
  // 在发送axios请求之前, 设置setLoading为true
  store.commit('setLoading', true)
  store.commit('setError', { status: false, message: '' })
  // 其他请求，添加到 body 中
  // 如果是上传文件，添加到 FormData 中
  if (config.data instanceof FormData) {
    config.data.append('icode', '82F53E57B88D65CB')
  } else {
    config.data = { ...config.data, icode: '82F53E57B88D65CB' }
  }
  return config
})
axios.interceptors.response.use(
  (config) => {
    // 在axio响应返回时, 设置setLoading为false
    store.commit('setLoading', false)
    return config
  },
  (e) => {
    const { error } = e.response.data
    store.commit('setError', { status: true, message: error })
    store.commit('setLoading', false)
    return Promise.reject(error)
  }
)

createApp(App).use(router).use(store).mount('#app')
