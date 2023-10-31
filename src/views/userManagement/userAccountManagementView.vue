<template>
    <v-app class="v-app">
        <v-row class="profile" justify="center" align="center">
            <v-col class="profile-col" cols="8">
                <v-list class="profile-list" three-line>
                    <v-card class="mx-auto" height="245px">
                    <v-list-item>
                        <v-list-item-action>
                            <v-icon size="100">account_circle</v-icon>
                        </v-list-item-action>
                        <v-list-item-content style="align-content: center;">
                            <v-list-item-title class="profile-nickname" style="margin-bottom: 10px;">{{ userInfoData.nickname }}</v-list-item-title>
                            <v-card-actions style="margin-right: 10px;">
                                <img :src="require('@/assets/userManagement/chat.svg')" width="22"/>
                                <span class="comment-text">256</span>
                                <img :src="require('@/assets/userManagement/edit_document.svg')" width="22"/>
                                <span class="write-text">300</span>
                                <v-spacer></v-spacer>
                                <v-btn color="#E4E6EB">
                                    <v-icon left>mdi-pencil</v-icon>
                                    <span class="profile-edit-text">프로필 편집</span>
                                </v-btn>
                            </v-card-actions>  
                        </v-list-item-content>
                    </v-list-item>
                        <v-toolbar flat>
                            <template v-slot:extension>
                                <v-tabs v-model="tabs" fixed-tabs>
                                <v-tabs-slider></v-tabs-slider>
                                <v-tab href="#mobile-tabs-5-1" class="tab-text">
                                    작성 글
                                </v-tab>
                                <v-tab href="#mobile-tabs-5-2" class="tab-text">
                                    댓글 단 글
                                </v-tab>
                                <v-tab href="#mobile-tabs-5-3" class="tab-text">
                                    좋아요 한 글
                                </v-tab>
                                </v-tabs>
                            </template>
                        </v-toolbar>
                    </v-card>
                    <v-card rounded="0">
                        <v-tabs-items v-model="tabs">
                        <v-tab-item
                            v-for="i in 3"
                            :key="i"
                            :value="'mobile-tabs-5-' + i"
                        >
                            <v-card flat>
                            <v-card-text>{{ text }}</v-card-text>
                            </v-card>
                        </v-tab-item>
                        </v-tabs-items>
                    </v-card>  
                </v-list>
            </v-col>
        </v-row>
    </v-app>
</template>
<script>
import { mapState } from "vuex";
export default {
    data() {
        return {
            tabs: null,
            text: '게시글이 없습니다.',
        }
    },
    computed: {
        // 회원정보, 권한 가져오기
        ...mapState(['userInfoData']),
    },
}
</script>
<style scoped>
 .profile {
    position: relative;
    display: inline;
    padding: 150px;
 }
  .profile-col {
    top: 50%;
    left: 0%;
    transform: translate(25%, 0%);
  }
  .profile-list {
    margin-left: 250px;
    margin-right: 250px;
  }
  .profile-nickname {
    font-size: 25px;
    font-weight: 600;
    color: #303030;
    margin-left: 5px;
  }
  .comment-text {
    margin-left: 5px;
    margin-right: 5px;
  }
  .write-text {
    margin-left: 5px;
    margin-right: 5px;
  }
  .profile-edit-text {
    font-weight: 600;
  }
  .tab-text {
    font-weight: 600;
    font-size: 16px;
  }
  
</style>