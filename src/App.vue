<template>
  <v-app>
    <!-- <PageHeader style="z-index: 1000;" :key="$route.fullPath"/> -->
    <PageHeader style="z-index: 1000 !important"/>
    <router-view :key="$route.fullPath"/>
    <PageFooter v-if="$route.name !== 'notice' && $route.name !== 'error404'"/>
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
