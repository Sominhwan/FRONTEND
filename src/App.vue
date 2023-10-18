<template>
  <v-app>
    <!-- <PageHeader style="z-index: 1000;" :key="$route.fullPath"/> -->
    <PageHeader style="z-index: 1000" v-if="$route.name !== 'join' && $route.name !== 'login' && $route.name !== 'findId' && $route.name !== 'findPwd' && $route.name !== 'findPwd2' && $route.name !== 'phoneVerification' && $route.name !== 'checkPhoneVerification' 
      && $route.name !== 'changePassword' && $route.name !== 'changePasswordComplete' && $route.name !== 'emailVerification'"/>
    <router-view :key="$route.fullPath"/>
    <PageFooter v-if="$route.name !== 'notice' && $route.name !== 'error404' && $route.name !== 'findId' && $route.name !== 'findPwd' && $route.name !== 'findPwd2' && $route.name !== 'phoneVerification' && $route.name !== 'checkPhoneVerification' 
      && $route.name !== 'changePassword' && $route.name !== 'changePasswordComplete' && $route.name !== 'emailVerification'"/>
  </v-app>
</template>

<script>
import PageFooter from '@/components/PageFooter';
import PageHeader from '@/components/PageHeader';
export default {
    name: "App",
    comments: {
        PageHeader,
        PageFooter
    },
    components: { PageHeader, PageFooter }
};
</script>
