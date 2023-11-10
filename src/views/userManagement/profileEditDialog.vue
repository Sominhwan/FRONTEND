<template>
    <v-dialog
        v-model="dialogValue"
        max-width="700"
        persistent
        style="z-index: 1001 !important;"
    >
    <ProfileImageDialog :imageDialog="imageDialog" @close="closeProfileImageDialog()"/>
    <v-card>
        <v-card-title class="profile-title text-h6">
            프로필 편집
        <v-spacer></v-spacer>
        <v-btn icon color="#303030" @click="closeProfieEditDialog()">
            <v-icon>mdi-close</v-icon>
        </v-btn>
        </v-card-title>
        <v-divider></v-divider>

        <v-container>
            <v-row dense>
                <v-col cols="12">
                    <v-card flat>
                        <v-card-title class="profile-sub-title text-h6">
                            프로필 사진
                            <v-spacer></v-spacer>
                            <span text class="edit-btn" @click="openProfileImageDialog()">
                                수정
                            </span>
                        </v-card-title>
                        <v-card-text class="d-flex justify-center">
                            <v-icon size="180">account_circle</v-icon>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12">
                    <v-card flat>
                        <v-card-title class="profile-sub-title text-h6">
                            프로필 설정
                        </v-card-title> 
                        <v-card-subtitle>
                            계정의 세부 정보 식별 변경
                        </v-card-subtitle>  
                    </v-card>
                    <v-card class="profile-setting ml-4 mr-4" elevation="0">
                        <v-card-title class="nickname-change-text">
                            닉네임<span class="nickname-rule">(최대 한글 6자, 영문 12자 입력 가능)</span>
                            <v-spacer></v-spacer>
                            <span text class="edit-btn" @click="editNickname()">
                                변경
                            </span>
                        </v-card-title> 
                        <v-card-text>
                            <v-text-field
                                class=""
                                ref="nickname"
                                v-model="nickname"
                                single-line
                                outlined
                                required
                                hide-details
                                :readonly="useNickname"
                            >
                                <template v-slot:append>
                                    <span v-if="!useNickname" class="double-check-btn" @click="nicknameDoubleCheck()">중복확인</span>
                                </template>
                            </v-text-field>  
                        </v-card-text>   
                        <div v-if="useNicknameCheck" class="double-check-ok">사용가능한 닉네임입니다.</div>
                        <div v-if="existNicknameCheck" class="double-check-warn">이미 존재하는 닉네임입니다.</div>
                        <div v-if="currentNicknameCheck" class="double-check-warn">현재 사용하고 있는 닉네임입니다.</div>
                    </v-card>
                </v-col>
                <v-col cols="12">
                    <v-card flat>
                        <v-card-title class="profile-sub-title text-h6">
                            프로필 사진
                            <v-spacer></v-spacer>
                            <span text class="edit-btn">
                                수정
                            </span>
                        </v-card-title>
                        <v-card-text class="d-flex justify-center">
                            <v-icon size="180">account_circle</v-icon>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>           
        </v-container>
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="green darken-1"
            text
            @click="saveProfileData()"
        >
            저장하기
        </v-btn>
        </v-card-actions>
    </v-card>
    </v-dialog>
</template>
<script>
import { changeNickname, checkNickname } from "@/api/auth/auth";
import ProfileImageDialog from '@/views/userManagement/ProfileImageDialog.vue';
import { mapState } from "vuex";

export default {
    data() {
        return {
            useNickname: true,
            nickname: '',
            currentNicknameCheck: false,
            existNicknameCheck: false,
            useNicknameCheck: false,
            imageDialog: false
        }
    },
    props: {
        dialog: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        this.nickname = this.userInfoData.nickname
    },
    components: {
        ProfileImageDialog
    },
    computed: {
        ...mapState(['userInfoData']),
        dialogValue: {
            get() {
                return this.dialog;
            },
            set(val) {
                this.$emit('close', val);
            }
        }
    },
    methods: {
        closeProfieEditDialog() {
            const isConfirmed = confirm('변경된 사항이 있습니다.\n변경사항이 저장되지 않을 수 있습니다.')
            if (isConfirmed) {
                this.nickname = this.userInfoData.nickname
                this.currentNicknameCheck = false
                this.existNicknameCheck = false
                this.useNicknameCheck = false
                this.useNickname = true
                this.dialogValue = false
            } else {
                return
            }
        },
        closeProfileImageDialog() {
            this.imageDialog = false
        },
        openProfileImageDialog() {
            this.imageDialog = true
            document.documentElement.style.overflow = 'hidden'
        },
        agree() {
            this.dialogValue = true
        },
        editNickname() {
            this.useNickname = false
            this.$refs.nickname.focus()
        },
        nicknameDoubleCheck() {
            if(this.userInfoData.nickname === this.nickname) {
                this.existNicknameCheck = false
                this.useNicknameCheck = false
                this.currentNicknameCheck = true
            } else {
                checkNickname(this.nickname)
                    .then((res) => {
                        console.log(res)
                        if(res.data.code === 1) {
                            this.currentNicknameCheck = false
                            this.existNicknameCheck = false
                            this.useNicknameCheck = true
                        } else {
                            this.currentNicknameCheck = false
                            this.useNicknameCheck = false
                            this.existNicknameCheck = true
                        }
                    })
                    .catch(() => {
                        alert("서버와 연결이 불안합니다.")
                    })
                    .finally(() => {

                    })
            }
        },
        saveProfileData() {
            const isConfirmed = confirm('변경된 사항을 저장하시겠습니까?')
            if(isConfirmed) {
                if(this.useNicknameCheck === true) {
                    const data = { "nickname" : this.nickname, "userId" : this.userInfoData.userId }
                    changeNickname(data)
                        .then((res) => {
                            location.reload()
                            alert(res.data.data)
                        })
                        .catch(() => {
                            alert("서버와 연결이 불안합니다.")
                        })
                        .finally(() => {

                        })
                }
                // TODO 20231107 프로필 저장하기 추가
            } 
        }
    }
}
</script>
<style scoped>
 .profile-title {
    font-weight: 600 !important;
 }
 .profile-sub-title {
    font-weight: 600 !important;
 }
 .edit-btn {
    color: #0064D1;
    font-weight: 500;
    font-size: 16px;
    cursor: pointer;
 }
 .edit-btn:hover {

 }
 .profile-setting {
    border: 1px solid #eee;
 }
 .nickname-change-text {
    font-size: 16px;
    font-weight: 600;
 }
 .nickname-rule {
    margin-left: 5px;
    color: grey;
    font-weight: 400;
    font-size: 13px;
 }
 .v-text-field--outlined >>> fieldset {
  border-color: #eee;
 }
 .double-check-btn {
    z-index: 100;
    color: #1877F2;
    position: relative;
    display: inline;
    top: 3px;
    cursor: pointer;
 }
 .double-check-warn {
    display: inline;
    position: relative;
    font-weight: 300;
    font-size: 13px;
    left: 20px;
    top: -10px;
    color: #FF003E;
 }
 .double-check-ok {
    display: inline;
    position: relative;
    font-weight: 300;
    font-size: 13px;
    left: 20px;
    top: -10px;
    color: #1877F2; 
 }
</style>