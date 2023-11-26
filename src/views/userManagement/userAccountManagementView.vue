<template>
    <v-app class="v-app">
        <ProfileEditDialog :dialog="dialog" @close="closeProfileEditDialog()"/>
        <v-row class="profile" justify="center" align="center">
            <v-col class="profile-col" cols="8">
                <v-list class="profile-list" three-line>
                    <v-card class="mx-auto" height="1800">
                    <v-list-item>
                        <v-list-item-action>
                            <v-icon v-if="userInfoData.profileUrl == null" size="100">account_circle</v-icon>
                            <v-img 
                                :src="userInfoData.profileUrl"                                         
                                height="100"
                                max-width="100"
                                style="border-radius: 50%;"
                                ></v-img>
                        </v-list-item-action>
                        <v-list-item-content style="align-content: center;">
                            <v-list-item-title class="profile-nickname" style="margin-bottom: 10px;">{{ userInfoData.nickname }}</v-list-item-title>
                            <v-card-actions style="margin-right: 10px;">
                                <img :src="require('@/assets/userManagement/chat.svg')" width="22"/>
                                <span class="comment-text">256</span>
                                <img :src="require('@/assets/userManagement/edit_document.svg')" width="22"/>
                                <span class="write-text">300</span>
                                <v-spacer></v-spacer>
                                <v-btn color="#E4E6EB" @click="openProfileEditDialog()" elevation="0">
                                    <v-icon left>mdi-pencil</v-icon>
                                    <span class="profile-edit-text">프로필 편집</span>
                                </v-btn>
                            </v-card-actions>  
                        </v-list-item-content>
                    </v-list-item>
                        <v-toolbar flat>
                            <template v-slot:extension>
                                <!-- fixed-tabs 탭 좌우로 균형 배분 -->
                                <v-tabs v-model="tabs">
                                <v-tabs-slider></v-tabs-slider>
                                <v-tab class="tab-text" @click="changeTab('tab1')">
                                    작성 글
                                </v-tab>
                                <v-tab  class="tab-text" @click="changeTab('tab2')">
                                    댓글 단 글
                                </v-tab>
                                <v-tab  class="tab-text" @click="changeTab('tab3')">
                                    좋아요 한 글
                                </v-tab>
                                </v-tabs>
                            </template>
                        </v-toolbar>
                        <v-tabs-items v-model="tabs">
                            <component :is="currentTabComponent"></component>        
                        </v-tabs-items>
                    </v-card> 
                </v-list>
            </v-col>
        </v-row>
    </v-app>
</template>
<script>
import ProfileEditDialog from '@/views/userManagement/ProfileEditDialog.vue';
import MyCommentThreadTab from '@/views/userManagement/userAccountManagementTab/MyCommentThreadTab.vue';
import MyLikeThreadTab from '@/views/userManagement/userAccountManagementTab/MyLikeThreadTab.vue';
import MyThreadTab from '@/views/userManagement/userAccountManagementTab/MyThreadTab.vue';
import { mapState } from "vuex";
export default {
    data() {
        return {
            tabs: null,
            text: '게시글이 없습니다.',
            currentTab: 'tab1',
            tabComponents: {
                tab1: MyThreadTab,
                tab2: MyCommentThreadTab,
                tab3: MyLikeThreadTab
            },
            dialog: false
        }
    },
    components: {
        ProfileEditDialog
    },
    computed: {
        // 회원정보, 권한 가져오기
        ...mapState(['userInfoData']),
        currentTabComponent() {
            return this.tabComponents[this.currentTab];
        }
    },
    methods: {
        changeTab(tab) {
            this.currentTab = tab;
        },
        openProfileEditDialog() {
            this.dialog = true
            document.documentElement.style.overflow = 'hidden'
        },
        closeProfileEditDialog() {
            this.dialog = false
            document.documentElement.style.overflowY = 'auto'
        }
    }
}
</script>
<style scoped>
 .profile {
    position: relative;
    display: inline;
    padding: 130px;
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