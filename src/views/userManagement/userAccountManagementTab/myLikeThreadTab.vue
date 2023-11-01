<template>
  <v-card class="blank-text" flat>
      <v-card-text align="center">
          {{ text }}
      </v-card-text>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      text: 'Content for Tab 3' // Change this content for different tabs
    };
  }
};
</script>
<style scoped>
  .blank-text2 {
      font-size: 14px;
      padding-top: 50px;
  }
</style>