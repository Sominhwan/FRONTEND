<template>
    <div>
        <v-card-title style="padding-bottom: 0px;">
            <v-breadcrumbs class="account-header" :items="accountTabTitle" large>
                <template v-slot:item="{ item }">
                    <v-breadcrumbs-item :disabled="item.disabled">
                        <router-link class="account-title" :style="`color: ${item.color}`" :to="{ name: 'findPwd'}">
                            {{ item.text }}
                        </router-link>
                    </v-breadcrumbs-item>
                </template>
            </v-breadcrumbs>
        </v-card-title>
        <v-card-text class="mt-5">
            <div class="additional-text">휴대폰 본인인증</div>
            <v-container>
                <v-row class="mt-3">
                    <v-col cols="3">
                        <v-subheader class="vertification-title">이름</v-subheader>
                    </v-col>
                    <v-col cols="9">
                        <v-text-field 
                            hide-details
                            class="id-text-field rounded-0"
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
                            class="id-text-field rounded-0"
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
                <v-row>
                    <v-col cols="3">
                    </v-col>
                    <v-col cols="9">
                    <v-btn class="identification-btn rounded-0" x-large text block @click="phoneVerification()">
                        인증번호 발송
                    </v-btn>
                    </v-col>
                </v-row>
                <v-footer class="identification-footer">Copyright © 2023 smh.co.Ltd. All rights reserved.</v-footer>
            </v-container>
        </v-card-text>
    </div>
</template>
<script src="https://www.google.com/recaptcha/enterprise.js?render=6LeVyIkoAAAAAKMvziugsAX40vRPkceyjmhjgY4v"></script>
<script>
import { checkPhoneNumId, reCAPTCHA } from "@/api/auth/auth";
export default {
    data () {
      return { 
        accountTab: null,
        errorMessage: null,
        name: '',
        phoneNum: '',
        token: null,
        accountTabTitle: [
            { text: '아이디 찾기', disabled: true, href: '/findid', color: '#2889f1'}, 
            { text: '비밀번호 찾기', disabled: false, href: '/findpwd', color: 'grey'}
        ],
      }
    },   
    mounted() {
        document.documentElement.style.overflow = 'hidden'
        this.loadRecaptchaScript()
            .then(() => {
                this.reCaptcha();
            })
            .catch((error) => {
                console.error('스크립트 로드 중 오류 발생: ', error);
            });
        window.addEventListener('beforeunload', this.handleBeforeUnload);   
    },
    beforeRouteLeave(to, from, next) {
        const recaptchaElement = document.querySelector(".grecaptcha-badge");
        if (recaptchaElement) {
            recaptchaElement.remove();
        }
        next();
    },
    beforeUnmount() {
        window.removeEventListener('beforeunload', this.handleBeforeUnload);
    },
    methods: {
        handleBeforeUnload(event) {   
            event.preventDefault();
            event.returnValue = '';
        },
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
                        const data = { koreaName: this.name, phoneNum: this.phoneNum}
                        checkPhoneNumId(data)
                            .then((res) => {
                                console.log(res.data)
                                if(res.data.code === 0) {
                                    console.log(res.data.data2.email)
                                    console.log(res.data.data2.certificationNumber)
                                    this.$router.push({name: 'checkPhoneVerificationId', params: { certificationNumber: res.data.data2.certificationNumber, email : res.data.data2.email }})
                                } else {
                                    alert(res.data.data)
                                    this.findPwdState = false
                                    this.email = ''
                                    this.$router.go(0)
                                }
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
    color: #fff;
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