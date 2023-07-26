<template>
  <v-app>
    <PageHeader style="z-index: 1000;"/>
    <router-view/>
    <PageFooter/>
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
