import { logout, signIn, userInfo } from "@/api/auth/auth";
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfoData: null, // 사용자 정보를 저장할 상태
    authState: false, // 로그인 인증 상태
    loginMessage: null, // 로그인 실패시 메시지
    findPwdState: false, // 비밀번호 찾기(아이디 인증 상태)
    //currentPage: 1,
  },
  getters: {
    getUserInfoData: state => state.userInfoData
  },
  mutations: {
    setUserInfoData(state, userInfoData) {
      state.userInfoData = userInfoData
    },
    setAuthState(state, authState) {
      state.authState = authState
    },
    setLoginMessage(state, loginMessage) {
      state.loginMessage = loginMessage
    },
    setFindPwdState(state, findPwdState) {
      state.findPwdState = findPwdState
    }
  },
  actions: {
    /* 다이얼로그 로그인 */
    async login (dispatch, data) {
      signIn(data)
        .then((res) => {  
            if(res.headers.authorization != null) {
                localStorage.setItem("access-token", res.headers.authorization)
            }
            location.reload()
            this.commit('setLoginMessage', null)
        })
        .catch(() => {
          this.commit('setLoginMessage', '이메일 또는 비밀번호가 잘못됐습니다.')
        })
        .finally(() => {

        })
   },
    /* 로그인 */
    async login2 (dispatch, data) {
      signIn(data)
        .then((res) => {  
            if(res.headers.authorization != null) {
                localStorage.setItem("access-token", res.headers.authorization)
            }
            location.href = '/home/main'
            this.commit('setLoginMessage', null)
        })
        .catch(() => {
          this.commit('setLoginMessage', '이메일 또는 비밀번호가 잘못됐습니다.')
        })
        .finally(() => {

        })
    },
   /* 회원정보 */
   async userInfo({ commit }) {
    const token = localStorage.getItem("access-token")
    userInfo(token)
      .then((res) => {
          if(res.headers.authorization != null){
              localStorage.removeItem("access-token")
              localStorage.setItem("access-token", res.headers.authorization)
          }
      })
      .catch((error) => {
          console.log(error);
          const userData = {'nickname' : '없음'};
          commit('setUserInfoData', userData)
      })
      .finally(() => {

      })
   },
  /* 로그아웃 */ 
  async logout () {
    const token = localStorage.getItem("access-token")
    logout(token)
      .then(() => {
          location.href = '/home/main' 
          localStorage.removeItem("access-token")
      })
      .catch(() => {

      })
      .finally(() => {
        this.commit('setAuthState', false)
      })
  },
  },
  modules: {
  }
})