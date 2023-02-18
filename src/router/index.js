import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import songList from '../views/songList.vue'
import Search from '../views/Search.vue'
import Login from '../views/Login.vue'
import InfoUser from '../views/InfoUser.vue'
import store from '@/store/index.js'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/songList',
    name: 'songList',
    component: songList
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/infouser',
    name: 'InfoUser',
    component: InfoUser,
    // 路由独享守卫，未登录跳转登录页
    beforeEnter:(to,from,next)=>{
      if(store.state.isLogin || localStorage.getItem('token') || store.state.token){
        next()
      }else{
        next('/login')
      }
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
//全局路由守卫
router.beforeEach((to,from,next)=>{
  if(to.path=='/login'){
    store.state.isMusicBar=false
    next()
  }else{
    store.state.isMusicBar=true
    next()
  }
})
export default router
