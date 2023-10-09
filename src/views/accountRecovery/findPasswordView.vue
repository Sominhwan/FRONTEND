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
            <v-stepper class="password-stepper" v-model="e1" flat>
                <v-stepper-header>
                    <v-stepper-step :complete="e1 > 1" step="1"></v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :complete="e1 > 2" step="2"></v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :complete="e1 > 2" step="3"></v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step step="4"></v-stepper-step>
                </v-stepper-header>
            </v-stepper>
            <div class="additional-text">비밀번호를 찾기를 위한 아이디를 입력해주세요.</div>
            <v-container>
                <v-col cols="12">
                    <v-card class="identification-container rounded-0" elevation="0" color="#F5F5F5">
                            <v-card-title class="text-h6 ma-5">
                                <v-row>
                                    <v-card-subtitle class="identification-title">아이디</v-card-subtitle>
                                    <v-text-field
                                        class="id-text-field rounded-0 mr-5"
                                        ref="email"
                                        v-model="email"
                                        label="E-mail"
                                        single-line
                                        outlined
                                        background-color="white"
                                        @keyup.enter="checkEmail()"
                                    ></v-text-field>
                                </v-row>
                            </v-card-title>
                        <div class="error-message">{{ errorMessage }}</div>
                    </v-card>
                </v-col>
                <v-card-actions class="d-flex justify-center">
                    <v-btn class="identification-btn rounded-0" text @click="checkEmail()">
                        다음
                    </v-btn>
                </v-card-actions>
                <v-footer class="identification-footer">Copyright © 2023 smh.co.Ltd. All rights reserved.</v-footer>
            </v-container>
        </v-card-text>
    </div>
</template>
<script>
import { checkId } from "@/api/auth/auth";
export default {
    data () {
      return { 
        e1: 1,
        accountTab: null,
        errorMessage: null,
        email: '',
        accountTabTitle: [
            { text: '아이디 찾기', disabled: false, href: '/findid', color: 'grey'}, 
            { text: '비밀번호 찾기', disabled: true, href: '/findpwd', color: '#2889f1'}
        ],
      }
    },   
    mounted() {
        document.documentElement.style.overflow = 'hidden'
    },
    methods: {
        checkEmail() {
            if(this.email === '') {
                this.errorMessage = '아이디를 입력해주세요.'
                this.$refs.email.focus()
                return;
            }
            const data  = { email : this.email }
            checkId(data)
                .then((res) => {
                    if(res.data.data) {
                        this.$store.commit('setFindPwdState', res.data.data)
                        this.$router.push({name: 'findPwd2', params: { email: this.email}})
                        this.email = ''
                        this.errorMessage = ''
                    } else {
                        this.errorMessage = '존재하지 않은 아이디입니다.'
                        this.$refs.email.focus()
                        return;
                    }

                })
                .catch(() => {
                    alert('서버와의 연결이 좋지 않습니다.')
                })
                .finally(() => {

                })
        }
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
    height: 110px;
 }
 .identification-title {
    font-size: 18px;
    font-weight: normal;
 }
 .v-text-field--outlined >>> fieldset {
  border-color: #e0e0e0;
}
.error-message {
    position: relative;
    bottom: 50px;
    left: 111px;
    font-size: 12px;
    color: #FF003E;
 }  
 .identification-btn {
    font-size: 14px;
    color: #fff;
    display: inline-block;
    width: 80px;
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