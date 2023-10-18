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
        <v-card-text class="mt-5">
            <div class="additional-text">이름, 생년월일 확인 후 이메일로 인증번호가 발송됩니다.</div>
            <v-container>
                <v-row class="mt-3">
                    <v-col cols="3">
                        <v-subheader class="vertification-title">이름</v-subheader>
                    </v-col>
                    <v-col cols="9">
                        <v-text-field 
                            hide-details
                            clearable
                            class="id-text-field rounded-0"
                            ref="name"
                            v-model="name"
                            label="이름"
                            single-line
                            outlined
                            background-color="#F5F5F5"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="3">
                        <v-subheader class="vertification-title">생년월일</v-subheader>
                    </v-col>
                    <v-col cols="9">
                        <v-text-field
                            hide-details
                            clearable
                            class="id-text-field rounded-0"
                            ref="birthDate"
                            v-model="birthDate"
                            label="생년월일 (예 : 19990101)"
                            single-line
                            outlined
                            background-color="#F5F5F5"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="3">
                    </v-col>
                    <v-col cols="9">
                    <v-btn class="identification-btn rounded-0" x-large text block @click="emailVerification()">
                        인증번호 발송
                    </v-btn>
                    </v-col>
                </v-row>
                <v-footer class="identification-footer">Copyright © 2023 smh.co.Ltd. All rights reserved.</v-footer>
            </v-container>
        </v-card-text>
    </div>
</template>
<script>
import { sendEmail } from "@/api/auth/auth";
import { mapState } from "vuex";
export default {
    data () {
      return { 
        accountTab: null,
        errorMessage: null,
        email: '',
        name: '',
        birthDate: '',
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
        } 
    },
    methods: {
        emailVerification() {
            if(this.name === '') {
                alert('이름을 입력해주세요.')
                this.$refs.name.focus()
                return;
            } else if(this.birthDate === ''){
                alert('생년월일을 입력해주세요.')
                this.$refs.birthDate.focus()
                return;
            } 

            const data = { 'email' : this.email, 'koreaName': this.name, 'birthDate': this.birthDate }
            sendEmail(data)
                .then((res) => {
                    console.log(res.data)
                    if(res.data.code === 0) {
                        alert(res.data.data)
                        //this.$router.push({name: 'checkPhoneVerification', params: { certificationNumber: res.data.data, email : this.email, koreaName: this.name, phoneNum: this.phoneNum }})
                    } else {
                        alert(res.data.data)
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