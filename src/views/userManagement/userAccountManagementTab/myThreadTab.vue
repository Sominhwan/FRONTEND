<template>
  <v-card class="my-thread-container">
      <!-- <v-card-text align="center">
          {{ text }}
      </v-card-text> -->
      <v-card class="statistics-contontainer" flat rounded="0" elevation="0">
        <v-row>
          <v-col>
            <v-card class="write-text" flat rounded="0">
              <v-chip style="font-size: 16px;">글쓴 횟수</v-chip>
              <div class="count-text">10</div>
            </v-card>
          </v-col>
          <v-col>
            <v-card class="views-text" flat rounded="0">
              <v-chip style="font-size: 16px;">조회수</v-chip>
              <div class="count-text">0</div>
            </v-card>
          </v-col>
          <v-col>
            <v-card class="like-text" flat rounded="0">
              <v-chip style="font-size: 16px;">좋아요 수</v-chip>
              <div class="count-text">0</div>
            </v-card>
          </v-col>
          <v-col>
            <v-card class="comment-text" flat rounded="0">
              <v-chip style="font-size: 16px;">댓글 수</v-chip>
              <div class="count-text">0</div>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
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
  .my-thread-container {
    padding: 30px;
  }
  .statistics-contontainer {
    border: 1px solid #666 !important;
    padding: 20px;
  }
  .write-text {
    border-right: 1px solid #DEDEDE !important;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .views-text {
    border-right: 1px solid #DEDEDE !important;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .like-text {
    border-right: 1px solid #DEDEDE !important;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .comment-text {
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .count-text {
    font-weight: 500;
    font-size: 24px;
    color: #0064D1;
    padding-left: 5px;
    padding-top: 10px;
  }
</style>