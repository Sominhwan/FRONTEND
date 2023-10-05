<template>
    <v-card-title>
        <v-breadcrumbs :items="accountTabTitle" large>
            <template v-slot:item="{ item }">
                <v-breadcrumbs-item :disabled="item.disabled">
                    <span class="account-title" :style="`color: ${item.color}`" @click="$router.push({name: 'findPwd'})"> {{ item.text }}</span>
                </v-breadcrumbs-item>
            </template>
        </v-breadcrumbs>
        <div class="additional-text">아이디를 찾이 위한 본인확인 방법을 선택하세요.</div>
        <v-container>
            <v-col cols="12">
                <v-card id="test"  class="identification-container rounded-0" elevation="0" color="#F5F5F5">
                <div class="d-flex">
                    <v-avatar class="ma-5" size="100" tile>
                        <v-img src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"></v-img>
                    </v-avatar>
                    <v-card-title class="text-h6 ma-5">
                        <div class="identification-title">휴대폰 인증</div>
                        <div class="identification-content">고객님 명의의 휴대폰으로 인증</div>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn class="identification-btn rounded-0" text>
                            인증하기
                        </v-btn>
                    </v-card-actions>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-card id="test"  class="identification-container rounded-0" elevation="0" color="#F5F5F5">
                <div class="d-flex">
                    <v-avatar class="ma-5" size="100" tile>
                        <v-img src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"></v-img>
                    </v-avatar>
                    <v-card-title class="text-h6 ma-5">
                        <div class="identification-title">휴대폰 인증</div>
                        <div class="identification-content">고객님 명의의 휴대폰으로 인증</div>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn class="identification-btn rounded-0" text>
                            인증하기
                        </v-btn>
                    </v-card-actions>
                    </div>
                </v-card>
            </v-col>
        </v-container>
    </v-card-title>
</template>
<script>
export default {
    data () {
      return { 
        accountTab: null,
        accountTabTitle: [
            { text: '아이디 찾기', disabled: true, href: '/findid', color: '#2889f1'}, 
            { text: '비밀번호 찾기', disabled: false, href: '/findpwd', color: 'grey'}
        ],
        text: 'Lor',
      }
    },   
    mounted() {
        document.documentElement.style.overflow = 'hidden'
    }       
}
</script>
<style scoped>
 .account-title{
    cursor: pointer;
 }
 .additional-text {
    display: inline-block; /* 텍스트를 가리지 않도록 인라인 블록으로 설정 */
    margin-left: 20px; /* 원하는 여백 설정 */
    font-size: 18px;
    font-weight: bold;
 }
 .identification-container {
    border: 1px solid #303030 !important;
    cursor: pointer;
 }
 .identification-title {
    font-weight: bold;
 }
 .identification-content {
    font-size: 15px;
    font-weight: normal;
 }
 .identification-btn {
    font-size: 14px;
    margin: 5px;
    color: #fff;
    display: inline-block;
    background-color: #6E81DF;
 }
</style>