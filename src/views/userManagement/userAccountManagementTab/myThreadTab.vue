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
      text: '게시글이 없습니다.' // Change this content for different tabs
    };
  }
};
</script>
<style>
  .blank-text {
    font-size: 14px;
    padding-top: 50px;
  }
</style>