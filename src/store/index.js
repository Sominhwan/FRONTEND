import { signIn } from "@/api/auth/auth";
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfoData: null, // 사용자 정보를 저장할 상태
    //currentPage: 1,
  },
  getters: {
    getUserInfoData: state => state.userInfoData
  },
  mutations: {
    // setCurrentPage(state, page) {
    //   state.currentPage = page;
    // },
    setUserInfoData(state, userInfoData) {
      state.userInfoData = userInfoData;
    },
  },
  actions: {
    // setPage({ commit }, page) {
    //   commit('setCurrentPage', page);
    // },
    login ({ commit }, data) {
      signIn(data)
          .then((res) => {
              if(res.headers.authorization != null)
                  localStorage.setItem("access-token", res.headers.authorization)
              console.log(res.data)
              commit('SET_USER_DATA', res.data);
          })
          .catch((error) => {
              console.log(error);
          })
          .finally(() => {

          })
   },
  },
  modules: {
  }
})