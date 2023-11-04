import { userInfo } from "@/api/auth/auth"
import store from '@/store/vuex'
import BoardView from '@/views/BoardDetailView.vue'
import BoardWriteView from '@/views/BoardWriteView.vue'
import ErrorView from '@/views/ErrorView.vue'
import HomeView from '@/views/HomeView.vue'
import NoticeView from '@/views/NoticeView.vue'
import ChangePasswordCompleteView from '@/views/accountRecovery/ChangePasswordCompleteView'
import ChangePasswordView from '@/views/accountRecovery/ChangePasswordView'
import CheckPhoneVerificationIdView from '@/views/accountRecovery/CheckPhoneVerificationIdView'
import CheckPhoneVerificationView from '@/views/accountRecovery/CheckPhoneVerificationView'
import EmailVerificationView from '@/views/accountRecovery/EmailVerificationView.vue'
import FindIdCompleteView from '@/views/accountRecovery/FindIdCompleteView'
import FindIdView from '@/views/accountRecovery/FindIdView.vue'
import FindPassword2View from '@/views/accountRecovery/FindPassword2View.vue'
import FindPasswordView from '@/views/accountRecovery/FindPasswordView.vue'
import PhoneVerificationIdView from '@/views/accountRecovery/PhoneVerificationIdView.vue'
import PhoneVerificationView from '@/views/accountRecovery/PhoneVerificationView.vue'
import LoginView from '@/views/login/LoginView.vue'
import SignUpView from '@/views/signUp/SignUpView.vue'
import UserAccountManagementView from '@/views/userManagement/UserAccountManagementView.vue'
import MyCommentThreadTab from '@/views/userManagement/userAccountManagementTab/MyCommentThreadTab.vue'
import MyLikeThreadTab from '@/views/userManagement/userAccountManagementTab/MyLikeThreadTab.vue'
import MyThreadTab from '@/views/userManagement/userAccountManagementTab/MyThreadTab.vue'
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
    component: FindIdView
  },
  {
    path: '/findid',
    name: 'phoneVerificationId',
    component: PhoneVerificationIdView
  },
  {
    path: '/findid',
    name: 'checkPhoneVerificationId',
    component: CheckPhoneVerificationIdView
  },
  {
    path: '/findid/complete',
    name: 'findIdComplete',
    component: FindIdCompleteView
  },
  {
    path: '/findpwd',
    name: 'findPwd',
    component: FindPasswordView
  },
  {
    path: '/findpwd',
    name: 'findPwd2',
    component: FindPassword2View
  },
  {
    path: '/findpwd',
    name: 'phoneVerification',
    component: PhoneVerificationView
  },
  {
    path: '/findpwd',
    name: 'checkPhoneVerification',
    component: CheckPhoneVerificationView
  },
  {
    path: '/findpwd',
    name: 'changePassword',
    component: ChangePasswordView
  },
  {
    path: '/findpwd/complete',
    name: 'changePasswordComplete',
    component: ChangePasswordCompleteView
  },
  {
    path: '/findpwd',
    name: 'emailVerification',
    component: EmailVerificationView
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
  /* 404 error */
  {
    path: '/error404',
    name: "error404",
    component: ErrorView
  },
  {
    path: '*',
    redirect: "/error404"
  },
  /* userManagement */
  {
    path: '/account',
    name: 'userAccountManagement',
    component: UserAccountManagementView
  },
  {
    path: '/account/',
    name: 'myThreadTab',
    component: MyThreadTab
  },
  {
    path: '/account',
    name: 'myCommentThreadTab',
    component: MyCommentThreadTab
  },
  {
    path: '/account',
    name: 'myLikeThreadTab',
    component: MyLikeThreadTab
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

