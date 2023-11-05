<template>
  <v-app>
        <!-- scroll to top 버튼 -->
    <v-btn
      v-scroll="onScroll"
      v-show="fab"
      elevation="0"
      fab
      tile
      dark
      fixed
      bottom
      right
      color="white"
      @click="toTop"
      style="border: 2px solid #eee !important"
    >
      <v-icon color="grey" large>keyboard_arrow_up</v-icon>
    </v-btn>  
    <!-- <PageHeader style="z-index: 1000;" :key="$route.fullPath"/> -->
    <PageHeader style="z-index: 1000" v-if="$route.name !== 'join' && $route.name !== 'login' && $route.name !== 'findId' && $route.name !== 'findPwd' && $route.name !== 'findPwd2' && $route.name !== 'phoneVerification' && $route.name !== 'checkPhoneVerification' 
      && $route.name !== 'changePassword' && $route.name !== 'changePasswordComplete' && $route.name !== 'emailVerification' && $route.name !== 'phoneVerificationId' && $route.name !== 'checkPhoneVerificationId' && $route.name !== 'findIdComplete'
      && $route.name !== 'myThreadTab' && $route.name !== 'myCommentThreadTab' && $route.name !== 'myLikeThreadTab'"/>
    <router-view :key="$route.fullPath" class="v-app"/>
    <PageFooter class="footer" v-if="$route.name !== 'notice' && $route.name !== 'error404' && $route.name !== 'findId' && $route.name !== 'findPwd' && $route.name !== 'findPwd2' && $route.name !== 'phoneVerification' && $route.name !== 'checkPhoneVerification' 
      && $route.name !== 'changePassword' && $route.name !== 'changePasswordComplete' && $route.name !== 'emailVerification' && $route.name !== 'phoneVerificationId' && $route.name !== 'checkPhoneVerificationId' && $route.name !== 'findIdComplete'
      && $route.name !== 'myThreadTab' && $route.name !== 'myCommentThreadTab' && $route.name !== 'myLikeThreadTab'"/>
  </v-app>
</template>

<script>
import PageFooter from '@/components/PageFooter';
import PageHeader from '@/components/PageHeader';
export default {
    name: "App",
    data() {
      return {
        fab: false, // 상단 스크롤 이동
      }
    },
    comments: {
        PageHeader,
        PageFooter
    },
    components: { PageHeader, PageFooter },
    methods: {
      onScroll (e) {
        if (typeof window === 'undefined') 
          return
        const top = window.pageYOffset || e.target.scrollTop || 0
        this.fab = top > 20
      },
      toTop () {
        this.$vuetify.goTo(0)
      }
    }
};
</script>
<style scoped>
</style>
