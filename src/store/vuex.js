import { logout, signIn, userInfo } from "@/api/auth/auth";
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfoData: null, // 사용자 정보를 저장할 상태
    loginMessage: null, // 로그인 실패시 메시지
    //currentPage: 1,
  },
  getters: {
    getUserInfoData: state => state.userInfoData
  },
  mutations: {
    setUserInfoData(state, userInfoData) {
      state.userInfoData = userInfoData
    },
    setLoginMessage(state, loginMessage) {
      state.loginMessage = loginMessage
    }
  },
  actions: {
    /* 로그인 */
    async login (dispatch, data) {
      signIn(data)
        .then((res) => {
            if(res.headers.authorization != null)
                localStorage.setItem("access-token", res.headers.authorization)
            console.log(res.data)
            this.commit('setLoginMessage', null)
            this.dispatch('userInfo') // userInfo 호출
        })
        .catch(() => {
          this.commit('setLoginMessage', '아이디 또는 비밀번호를 잘못 입력했습니다.')
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
          console.log(res.data)
          commit('setUserInfoData', res.data)
      })
      .catch((error) => {
          console.log(error);
          const userData = {'username' : '없음'};
          commit('setUserInfoData', userData)
      })
      .finally(() => {

      })
   },
  /* 로그아웃 */ 
  async logout () {
    const token = localStorage.getItem("access-token")
    logout(token)
      .then((res) => {
          console.log(res.data)
          localStorage.removeItem("access-token")
          location.href = '/home/main'
          alert('로그아웃 되었습니다.');  
      })
      .catch(() => {

      })
      .finally(() => {

      })
 },
  },
  modules: {
  }
})