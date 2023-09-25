import { userInfo } from "@/api/auth/auth"
import store from '@/store/vuex'
import BoardView from '@/views/BoardDetailView.vue'
import BoardWriteView from '@/views/BoardWriteView.vue'
import ErrorView from '@/views/ErrorView.vue'
import HomeView from '@/views/HomeView.vue'
import NoticeView from '@/views/NoticeView.vue'
import SignUpView from '@/views/signUp/SignUpView.vue'
import NProgress from "nprogress"
import "nprogress/nprogress.css"; // css까지 import 해주어야 한다.
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    redirect: '/home/main'
    
  },
  {
    path: '/home/main',
    name: 'home',
    component: HomeView
  },
  {
    path: '/join',
    name: 'join',
    component: SignUpView
  },
  {
    path: '/notice/detail',
    name: 'noticeDetail',
    component: NoticeView,
    props: route => ({ page: parseInt(route.query.page || 1) })
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

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("access-token")
  userInfo(token)
  .then((res) => {
      if(res.headers.authorization != null){
          localStorage.removeItem("access-token")
          localStorage.setItem("access-token", res.headers.authorization)
      }
      console.log('인증완료')
      store.commit('setUserInfoData', res.data)
  })
  .catch((error) => {
      console.log(error);
      if(localStorage.getItem("access-token")){
        alert('로그아웃 되었습니다.');
      } 
  })
  .finally(() => {

  })
  if(to.path) {
    NProgress.configure({ showSpinner: false });
    NProgress.start(); // 라우팅 시작 시 NProgress 시작
  }
  // 이전 코드에서 NProgress.done()를 제거하고, next()를 호출하여 다음 단계로 진행합니다.
  next();
})

router.afterEach(() => {
  NProgress.done(); // 라우팅 완료 시 NProgress 종료
})


export default router 

