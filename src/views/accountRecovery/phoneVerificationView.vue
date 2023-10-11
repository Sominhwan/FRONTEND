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
            <div class="additional-text">휴대폰 본인인증</div>
            <v-container>
                <v-row class="mt-3">
                    <v-col cols="3">
                        <v-subheader class="vertification-title">이름</v-subheader>
                    </v-col>
                    <v-col cols="9">
                        <v-text-field 
                            hide-details
                            class="id-text-field rounded-0 mr-3"
                            ref="name"
                            v-model="name"
                            label="이름"
                            single-line
                            outlined
                            background-color="#F5F5F5"
                            @keyup.enter="checkEmail()"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="3">
                        <v-subheader class="vertification-title">휴대폰 번호</v-subheader>
                    </v-col>
                    <v-col cols="9">
                        <v-text-field
                            hide-details
                            class="id-text-field rounded-0 mr-3"
                            ref="phoneNum"
                            v-model="phoneNum"
                            label="'-' 없이 숫자만 입력"
                            single-line
                            outlined
                            background-color="#F5F5F5"
                            @keyup.enter="checkEmail()"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-btn class="identification-btn rounded-0" text @click="phoneVerification()">
                    인증하기
                </v-btn>
                <v-footer class="identification-footer">Copyright © 2023 smh.co.Ltd. All rights reserved.</v-footer>
            </v-container>
        </v-card-text>
    </div>
</template>
<script src="https://www.google.com/recaptcha/enterprise.js?render=6LeVyIkoAAAAAKMvziugsAX40vRPkceyjmhjgY4v"></script>
<script>
import { checkPhoneNum, reCAPTCHA } from "@/api/auth/auth";
import { mapState } from "vuex";
export default {
    data () {
      return { 
        e1: 3,
        accountTab: null,
        errorMessage: null,
        email: '',
        name: '',
        phoneNum: '',
        token: null,
        accountTabTitle: [
            { text: '아이디 찾기', disabled: false, href: '/findid', color: 'grey'}, 
            { text: '비밀번호 찾기', disabled: true, href: '/findpwd', color: '#2889f1'}
        ],
      }
    },   
    computed: {
      ...mapState(['findPwdState'])
    }, 
    mounted() {
        document.documentElement.style.overflow = 'hidden'
        this.email = this.$route.params.email
        if(!this.findPwdState && this.email === '') {
            alert('접근되지 않은 권한입니다.')
            this.$router.push({name: 'findPwd'})
        } else {
            this.loadRecaptchaScript()
                .then(() => {
                    this.reCaptcha();
                })
                .catch((error) => {
                    console.error('스크립트 로드 중 오류 발생: ', error);
                });
        }
    },
    methods: {
        loadRecaptchaScript() {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = 'https://www.google.com/recaptcha/enterprise.js?render=6LdJJYsoAAAAAHpqWx0_Af8X-wURNKo9sKZoyiXd';
                script.async = true;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        },
        reCaptcha() {
            grecaptcha.enterprise.ready(async () => {
                const token = await grecaptcha.enterprise.execute('6LdJJYsoAAAAAHpqWx0_Af8X-wURNKo9sKZoyiXd', {action: 'LOGIN'});
                this.token = token
            });
        },
        phoneVerification() {
            const phoneNumberPattern = /^[0-9-]+$/;
            // TODO 추후에 정규식 패턴 수정 
            if(this.name === '') {
                alert('이름을 입력해주세요')
                this.$refs.name.focus()
                return;
            } else if(this.phoneNum === ''){
                alert('휴대폰 번호를 입력해주세요')
                this.$refs.phoneNum.focus()
                return;
            } else if(!phoneNumberPattern.test(this.phoneNum)) {
                alert('올바른 휴대폰 번호를 입력해주세요')
                this.phoneNum = ''
                this.$refs.phoneNum.focus()
                return;
            }
            if(this.token === null ) return false
            const data = { secret: this.token }
            reCAPTCHA(data)
                .then((res) => {
                    if(res.data.data == "true") {
                        // TODO 휴대폰 번호 전송 
                        const data = { email : this.email, koreaName: this.name, phoneNum: this.phoneNum}
                        //checkPhoneNum(data)
                        checkPhoneNum(data)
                            .then((res) => {
                                console.log(res.data)
                            })
                            .catch(() => {
                                alert('서버와의 연결이 좋지 않습니다.')
                            })
                            .finally(() => {

                            })                        
                    } else {
                        alert('정상적인 동작이 아닙니다')
                        this.findPwdState = false
                        window.close()
                    }
                })
                .catch(() => {
                    alert('서버와의 연결이 좋지 않습니다.')
                })
                .finally(() => {

                })
        },
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
 .vertification-title {
    font-size: 15px;
    color: #000;
 }
 .v-text-field--outlined >>> fieldset {
  border-color: #e0e0e0;
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