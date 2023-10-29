import { userInfo } from "@/api/auth/auth"
import store from '@/store/vuex'
import BoardView from '@/views/BoardDetailView.vue'
import BoardWriteView from '@/views/BoardWriteView.vue'
import ErrorView from '@/views/ErrorView.vue'
import HomeView from '@/views/HomeView.vue'
import NoticeView from '@/views/NoticeView.vue'
import changePasswordCompleteView from '@/views/accountRecovery/changePasswordCompleteView'
import changePasswordView from '@/views/accountRecovery/changePasswordView'
import checkPhoneVerificationIdView from '@/views/accountRecovery/checkPhoneVerificationIdView'
import checkPhoneVerificationView from '@/views/accountRecovery/checkPhoneVerificationView'
import emailVerificationView from '@/views/accountRecovery/emailVerificationView.vue'
import findIdCompleteView from '@/views/accountRecovery/findIdCompleteView'
import findIdView from '@/views/accountRecovery/findIdView.vue'
import findPassword2View from '@/views/accountRecovery/findPassword2View.vue'
import findPasswordView from '@/views/accountRecovery/findPasswordView.vue'
import phoneVerificationIdView from '@/views/accountRecovery/phoneVerificationIdView.vue'
import phoneVerificationView from '@/views/accountRecovery/phoneVerificationView.vue'
import LoginView from '@/views/login/loginView.vue'
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
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/findid',
    name: 'findId',
    component: findIdView
  },
  {
    path: '/findid',
    name: 'phoneVerificationId',
    component: phoneVerificationIdView
  },
  {
    path: '/findid',
    name: 'checkPhoneVerificationId',
    component: checkPhoneVerificationIdView
  },
  {
    path: '/findid/complete',
    name: 'findIdComplete',
    component: findIdCompleteView
  },
  {
    path: '/findpwd',
    name: 'findPwd',
    component: findPasswordView
  },
  {
    path: '/findpwd',
    name: 'findPwd2',
    component: findPassword2View
  },
  {
    path: '/findpwd',
    name: 'phoneVerification',
    component: phoneVerificationView
  },
  {
    path: '/findpwd',
    name: 'checkPhoneVerification',
    component: checkPhoneVerificationView
  },
  {
    path: '/findpwd',
    name: 'changePassword',
    component: changePasswordView
  },
  {
    path: '/findpwd/complete',
    name: 'changePasswordComplete',
    component: changePasswordCompleteView
  },
  {
    path: '/findpwd',
    name: 'emailVerification',
    component: emailVerificationView
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
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition || to.name === 'home' || to.name === 'noticeDetail') {
      // 이전 스크롤 위치가 저장되어 있다면 해당 위치로 이동
      return savedPosition;
    } else {
      // 이전 스크롤 위치가 없다면 페이지의 맨 위로 이동
      return { x: 0, y: 0 };
    }
  },
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("access-token")
  const currentName = to.name;

  if(token !== null) {
    userInfo(token)
      .then((res) => {
          if(res.headers.authorization != null){
              localStorage.removeItem("access-token")
              localStorage.setItem("access-token", res.headers.authorization)
          }
          store.commit('setAuthState', true)
          store.commit('setUserInfoData', res.data)
      })
      .catch(() => {
          if(localStorage.getItem("access-token")){
            this.$store.dispatch('logout');
          } 
      })
      .finally(() => {

      })
  } 
  if(token === null) {
    if(currentName === 'write') {
      const authState = store.state.authState
      if(!authState) {
        location.href = '/home/main'
        alert('접근되지 않은 권한입니다.');
      }
    }
  } else {
    if(currentName === 'login') {
      const authState = store.state.authState
      if(authState) {
        location.href = '/home/main'
        alert('접근되지 않은 권한입니다.');
      }
    }
  }
  if(to.name !== 'login' && to.name !== 'findId' && to.name !== 'findPwd' && to.name !== 'findPwd2' && to.name !== 'join' && to.name !== 'phoneVerification' && to.name !== 'checkPhoneVerification' 
      && to.name !== 'changePassword' && to.name !== 'changePasswordComplete' && to.name !== 'emailVerification' && to.name !== 'phoneVerificationId' && to.name !== 'checkPhoneVerificationId'
      && to.name !== 'findIdComplete') {
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

