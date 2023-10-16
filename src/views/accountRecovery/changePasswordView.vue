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
            <div class="additional-text">비밀번호 변경하기</div>
            <v-container>
                <v-row class="ma-0 mt-3">
                    <v-col cols="12" style="display: inline-flex;">
                        <v-text-field
                            hide-details
                            type="password"
                            class="id-text-field rounded-0"
                            ref="newPassword"
                            v-model="newPassword"
                            label="새 비밀번호"
                            single-line
                            maxlength="50"
                            outlined
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row class="ma-0">
                    <v-col cols="12">
                        <v-text-field
                            hide-details
                            type="password"
                            class="id-text-field rounded-0"
                            ref="checkPassword"
                            v-model="checkPassword"
                            label="비밀번호 확인"
                            single-line
                            maxlength="50"
                            outlined
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row class="ma-0 ml-3">
                    <div class="certification-text">⦁ 영문, 숫자, 특수문자를 혼합하여 8~15자로 사용합니다.</div>
                </v-row>
                <v-row class="ma-0">
                    <v-col cols="12">
                        <v-btn class="change-password-btn rounded-0" x-large text block @click="changePassword()">
                            변경하기
                        </v-btn>
                    </v-col>
                </v-row>
                <v-footer class="identification-footer">Copyright © 2023 smh.co.Ltd. All rights reserved.</v-footer>
            </v-container>
        </v-card-text>
    </div>
</template>
<script>
import { changePassword } from "@/api/auth/auth";
import { mapState } from "vuex";
export default {
    data () {
      return { 
        accountTab: null,
        email: '',
        newPassword: '',
        checkPassword: '',
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
        changePassword() {
            // TODO 추후에 비밀번호 정규식 추가
            if(this.newPassword === '') {
                alert('입력되지 않은 칸이 있습니다.')
                this.$refs.newPassword.focus()
                return 
            } else if(this.checkPassword === '') {
                alert('입력되지 않은 칸이 있습니다.')
                this.$refs.checkPassword.focus()
                return 
            }

            if(this.newPassword === this.checkPassword) {
                const data = { 'email': this.email, 'password': this.newPassword }
                changePassword(data)
                    .then((res) => {
                        console.log(res.data)
                    })
                    .catch(() => {
                        alert('알 수 없는 오류가 발생하였습니다.')
                    })
                    .finally(() => {

                    }) 
            } else {
                alert('비밀번호가 일치하지 않습니다.')
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
 .certification-text {
    color: #afafaf;
 }
 .change-password-btn {
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