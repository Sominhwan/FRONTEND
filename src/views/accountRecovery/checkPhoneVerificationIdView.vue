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
            <div class="additional-text">휴대폰 본인인증</div>
            <v-container>
                <v-row class="ma-0 mt-3">
                    <v-col cols="12" style="display: inline-flex;">
                        <v-text-field 
                            hide-details
                            class="id-text-field rounded-0"
                            ref="phoneNum"
                            v-model="phoneNum"
                            single-line
                            readonly
                            outlined
                            background-color="#F5F5F5"
                        ></v-text-field>
                        <v-text class="re-send-btn ma-0" @click="reSendCertificationNumber()">
                            재전송
                        </v-text>
                    </v-col>
                </v-row>
                <v-row class="ma-0">
                    <v-col cols="12">
                        <v-text-field
                            hide-details
                            class="id-text-field rounded-0"
                            ref="checkCertificationNumber"
                            v-model="checkCertificationNumber"
                            label="인증번호 6자리 입력"
                            single-line
                            maxlength="20"
                            outlined
                        ></v-text-field>
                        <div class="time-text">{{ certificationTime }}</div>
                    </v-col>
                </v-row>
                <v-row class="ma-0 ml-3">
                    <div class="certification-text">⦁ 3분 이내로 인증번호(6자리)를 입력해 주세요.</div>
                </v-row>
                <v-row class="ma-0 ml-3">
                    <div class="certification-text">⦁ 인증번호가 전송되지 않은경우 "재전송" 버튼을 눌러주세요.</div>
                </v-row>
                <v-row class="ma-0">
                    <v-col cols="12">
                        <v-btn class="identification-btn rounded-0" x-large text block @click="certification()">
                            인증하기
                        </v-btn>
                    </v-col>
                </v-row>
                <v-footer class="identification-footer">Copyright © 2023 smh.co.Ltd. All rights reserved.</v-footer>
            </v-container>
        </v-card-text>
    </div>
</template>
<script>
import { checkPhoneNumId } from "@/api/auth/auth";
export default {
    data () {
      return { 
        accountTab: null,
        errorMessage: null,
        email: '',
        name: '',
        phoneNum: '',
        certificationNumber: null,
        checkCertificationNumber: null,
        certificationTime: '03:00',
        timer: null,
        koreaName: '',
        token: null,
        accountTabTitle: [
            { text: '아이디 찾기', disabled: true, href: '/findid', color: '#2889f1'}, 
            { text: '비밀번호 찾기', disabled: false, href: '/findpwd', color: 'grey'}
        ],
      }
    },   
    mounted() {
        document.documentElement.style.overflow = 'hidden'
        this.email = this.$route.params.email
        this.certificationNumber = this.$route.params.certificationNumber
        this.koreaName = this.$route.params.koreaName
        this.phoneNum = this.$route.params.phoneNum
        if(this.email === '' && this.certificationNumber === null && this.koreaName === '' && this.phoneNum === '') {
            alert('접근되지 않은 권한입니다.')
            this.$router.push({name: 'findId'})
        } else {
            window.addEventListener('beforeunload', this.handleBeforeUnload);
            this.decrementTime(false)
        }
    },
    beforeDestroy() {
        window.removeEventListener('beforeunload', this.handleBeforeUnload);
    },
    methods: {
        handleBeforeUnload() {
            this.decrementTime(true)
        },
        decrementTime(e) {
            if(e) {
                clearInterval(this.timer);
            } else {
                this.timer = setInterval(() => {
                    const [minutes, seconds] = this.certificationTime.split(":").map(Number);
                    if (this.certificationTime.indexOf(":") === 1) {
                        this.certificationTime = "0" + this.certificationTime;
                    }
                    if (minutes === 0 && seconds === 0) {
                        this.certificationNumber = null;
                        clearInterval(this.timer);
                    } else {
                        if (seconds === 0) {
                            this.certificationTime = `0${minutes - 1}:59`;
                        } else if(seconds > 10) {
                            this.certificationTime = `0${minutes}:${seconds - 1}`;
                        } else {
                            this.certificationTime = `0${minutes}:0${seconds - 1}`;
                        }
                    }
                }, 1000); // 1초마다 실행
            }
        },
        reSendCertificationNumber() {
            const data = { email : this.email, koreaName: this.koreaName, phoneNum: this.phoneNum}
            checkPhoneNumId(data)
                .then((res) => {
                    console.log(res.data)
                    if(res.data.code === 0) {
                        this.checkCertificationNumber = null
                        this.certificationNumber = res.data.data2.certificationNumber
                        this.email = res.data.data2.email
                        this.certificationTime = '03:00'
                        this.decrementTime(true)
                        this.decrementTime(false)
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
        certification() {
            if(this.certificationNumber === this.checkCertificationNumber && this.checkCertificationNumber !=null && this.certificationNumber != null) {
                alert('휴대폰 인증에 성공하였습니다.')
                // TODO 20231028 아이디 출력 이동
                //this.$router.push({name: 'changePassword', params: { email : this.email }})
            } else {
                alert('휴대폰 인증번호가 틀립니다.')
            }
        }
    }     
}
</script>
<style scoped>
 .account-title {
    cursor: pointer;
    text-decoration: none;
 }
 .additional-text {
    margin-left: 20px; /* 원하는 여백 설정 */
    font-size: 16px;
    font-weight: bold;
 }
 .v-text-field--outlined >>> fieldset {
    border-color: #e0e0e0;
}
 .re-send-btn {
    font-size: 16px;
    padding-left: 60px;
    padding-right: 60px;
    display: flex;
    align-items: center;
    color: #fff;  
    background-color: #6E81DF;
    cursor: pointer;
 }
 .time-text {
    position: absolute;
    top: 260px;
    left: 85%;
    display: inline;
    text-align: center;
    font-size: 16px;
    color:#FF003E;
 }
 .certification-text {
    color: #afafaf;
 }
 .identification-btn {
    font-size: 16px;
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