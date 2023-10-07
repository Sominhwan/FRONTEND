<template>
    <div>
        <v-card-title style="padding-bottom: 0px;">
            <v-breadcrumbs class="account-header" :items="accountTabTitle" large>
                <template v-slot:item="{ item }">
                    <v-breadcrumbs-item :disabled="item.disabled">
                        <router-link class="account-title" :style="`color: ${item.color}`" :to="{ name: 'findId'}">
                            {{ item.text }}
                        </router-link>
                    </v-breadcrumbs-item>
                </template>
            </v-breadcrumbs>
        </v-card-title>
        <v-card-text>
            <v-stepper class="password-stepper"  v-model="e1" flat>
                <v-stepper-header>
                    <v-stepper-step :complete="e1 > 1" step="1"></v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :complete="e1 > 2" step="2"></v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step step="3"></v-stepper-step>
                </v-stepper-header>
            </v-stepper>
            <div class="additional-text">비밀번호를 찾기를 위한 아이디를 입력해주세요.</div>
            <v-container>
                <v-col cols="12">
                    <v-card id="test"  class="identification-container rounded-0" elevation="0" color="#F5F5F5">
                    <div class="d-flex">
                        <v-card-title class="text-h6 ma-5">
                            <div class="identification-title">휴대폰 인증</div>
                            <div class="identification-content">고객님 명의의 휴대폰으로 인증</div>
                        </v-card-title>
                        <v-card-actions>
                            <v-btn class="identification-btn rounded-0" text @click="$router.push({name: ''})">
                                인증하기
                            </v-btn>
                        </v-card-actions>
                        </div>
                    </v-card>
                </v-col>
                <v-footer class="identification-footer">Copyright © 2023 smh.co.Ltd. All rights reserved.</v-footer>
            </v-container>
        </v-card-text>
    </div>
</template>
<script>
export default {
    data () {
      return { 
        e1: 1,
        accountTab: null,
        accountTabTitle: [
            { text: '아이디 찾기', disabled: false, href: '/findid', color: 'grey'}, 
            { text: '비밀번호 찾기', disabled: true, href: '/findpwd', color: '#2889f1'}
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
 .account-title {
    cursor: pointer;
    text-decoration: none;
 }
 .password-stepper {
    margin-bottom: 20px;
 }
 .additional-text {
    margin-left: 20px; /* 원하는 여백 설정 */
    font-size: 16px;
    font-weight: bold;
 }
 .identification-container {
    border: 1px solid #e0e0e0 !important;
    cursor: pointer;
 }
 .identification-title {
    font-size: 18px;
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
 .identification-footer {
    position: absolute; 
    bottom: 0px;
    font-size: 12px;
    color: #afafaf;
    font-weight: normal;
    background-color: transparent;
 }
</style>