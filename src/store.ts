import { createStore } from 'vuex'
import { testData, testPosts } from './testData'
import axios from 'axios'

interface UserProps {
  isLogin: boolean
  name?: string
  id?: number
  columnId?: number
}
// 定义每个专栏的类型
export interface ColumnProps {
  id: number
  title: string
  avatar?: string
  description: string
}
// 定义每个专栏对应文章的类型, 一个专栏对应多个文章
export interface PostProps {
  id: number
  title: string
  content: string
  image?: string
  createdAt: string
  columnId: number
}
// 定义全局数据类型
export interface GlobalDataProps {
  columns: ColumnProps[]
  posts: PostProps[]
  user: UserProps
}
export const store = createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: { isLogin: true, name: 'viking', columnId: 1 }
  },
  mutations: {
    login (state) {
      state.user = { ...state.user, isLogin: true, name: 'viking' }
    },
    createPost (state, newPost) {
      state.posts.push(newPost)
    },
    fetchColumns (state, rawData) {
      state.columns = rawData.data.list
    }
  },
  actions: {
    fetchColumns (context) {
      axios.get('/columns').then((resp) => {
        context.commit('fetchColumns', resp.data)
      })
    }
  },
  getters: {
    biggerColumnLen (state) {
      return state.columns.filter((c) => c.id > 2).length
    },
    getColumnById: (state) => (id: number) => {
      return state.columns.find((c) => c.id === id)
    },
    getPostsByCid: (state) => (cid: number) => {
      return state.posts.filter((post) => post.columnId === cid)
    }
  }
})
