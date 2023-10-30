<template>
    <v-app>
        <v-row class="profile" justify="center" align="center">
        <v-col class="profile-col" cols="8">
        <v-list class="profile-list" three-line>
            <v-card class="mx-auto">
            <v-list-item>
                <v-list-item-action>
                    <v-icon size="100">account_circle</v-icon>
                </v-list-item-action>
                <v-list-item-content style="align-content: center;">
                    <v-list-item-title class="profile-nickname" style="margin-bottom: 10px;">{{ userInfoData.nickname }}</v-list-item-title>
                  
                    <v-card-actions style="margin-right: 10px;">
                        <img :src="require('@/assets/userManagement/chat.svg')" width="22"/>
                        <span>256</span>
                        <img :src="require('@/assets/userManagement/edit_document.svg')" width="22"/>
                    </v-card-actions>
                
                </v-list-item-content>
            </v-list-item>
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
  }
  
</style>