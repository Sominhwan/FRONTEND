import BoardView from '@/views/BoardDetailView.vue'
import BoardWriteView from '@/views/BoardWriteView.vue'
import ErrorView from '@/views/ErrorView.vue'
import HomeView from '@/views/HomeView.vue'
import NoticeView from '@/views/NoticeView.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/home/main'
  },
  {
    path: '/home/main',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/notice/detail',
    name: 'notice',

    component: NoticeView
  },
  {
    path: '/board/write',
    name: 'write',
    component: BoardWriteView
  },
  {
    path: '/board_view',
    name: 'boardView',
    component: BoardView
  },
  {
    path: '/error404',
    name: "error404",
    component: ErrorView
  },
  {
    path: '*',
    redirect: "/error404"
  }
]

const router = new VueRouter({
  mode: 'history', // history 모드를 사용시 # 이 붙여서 url 중복이 허용되지 않음, hash 모드일 경우 # 이 붙여서 중복 허용가능
  base: process.env.BASE_URL,
  routes
})

export default router
