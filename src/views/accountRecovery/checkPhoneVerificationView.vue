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
                        <v-text class="re-send-btn ma-0">
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
                            outlined
                            @keyup.enter="checkEmail()"
                        ></v-text-field>
                        <div class="time-text">{{ certificationTime }}</div>
                    </v-col>
                </v-row>
                <v-footer class="identification-footer">Copyright © 2023 smh.co.Ltd. All rights reserved.</v-footer>
            </v-container>
        </v-card-text>
    </div>
</template>
<script>
import { checkPhoneNum, reCAPTCHA } from "@/api/auth/auth";
import { mapState } from "vuex";
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
        koreaName: '',
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
        this.certificationNumber = this.$route.params.certificationNumber
        this.koreaName = this.$route.params.koreaName
        this.phoneNum = this.$route.params.phoneNum
        if(!this.findPwdState && this.email === '' && this.certificationNumber === null && this.koreaName === '' && this.phoneNum === '') {
            alert('접근되지 않은 권한입니다.')
            this.$router.push({name: 'findPwd'})
        } else {
            console.log(this.$route.params.email)
            console.log(this.$route.params.certificationNumber)
            console.log(this.$route.params.koreaName)
            console.log(this.$route.params.phoneNum) 
            this.decrementTime()
            // 5초 뒤 인증번호 초기화
            // setTimeout(() => {
            //     this.certificationNumber = null;
            //     alert(this.certificationNumber)
            // }, 5000); 
        }
    },
    methods: {
        decrementTime() {
            setInterval(() => {
                const [minutes, seconds] = this.certificationTime.split(":").map(Number);
                if (this.certificationTime.indexOf(":") === 1) {
                    this.certificationTime = "0" + this.certificationTime;
                }
                if (minutes === 0 && seconds === 0) {
                    // 시간이 00:00이 되면 동작을 멈춥니다.
                    this.certificationNumber = null;
                    //clearInterval(this.timer);
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
                        checkPhoneNum(data)
                            .then((res) => {
                                console.log(res.data)
                                if(res.data.code === "0") {
                                    this.$router.push({name: 'phoneVerification', params: { certificationNumber: res.data.data, email : this.email, koreaName: this.name, phoneNum: this.phoneNum }})
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
 .identification-footer {
    position: absolute; 
    bottom: 0px;
    font-size: 12px;
    color: #afafaf;
    font-weight: normal;
    background-color: transparent;
 }
</style>