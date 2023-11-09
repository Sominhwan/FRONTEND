<template>
    <v-dialog
        v-model="dialogValue"
        max-width="700"
        persistent
        style="z-index: 1001 !important;"
    >
    <v-card>
        <v-card-title class="profile-image-title text-h6">
            프로필 사진 선택
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
                        <v-btn class="image-upload-btn" block elevation="0" color="#EBF5FF">
                            <v-icon size="16">add</v-icon><span class="ml-1">사진 업로드</span>
                        </v-btn>
                        <v-btn class="avatar-profile-image-btn mt-2" block elevation="0" color="#E4E6EB">
                            <v-icon size="16" style="width: 16px;">familiar_face_and_zone</v-icon><span class="ml-1">아바타 프로필 사진 만들기</span>
                        </v-btn>
                        <v-btn class="frame-add-btn mt-2" block elevation="0" color="#E4E6EB">
                            <v-icon size="16">add</v-icon><span class="ml-1">프레임 추가</span>
                        </v-btn>
                    </v-card>
                </v-col>
                <v-col cols="12">
                    <v-card flat class="mt-2">
                        <span class="upload-image-sub-title">업로드한 사진</span>
                            <v-row class="mt-1 scrollable-container mb-3">
                                <v-col v-for="n in 9" :key="n" class="d-flex child-flex" cols="3">
                                    <v-img
                                        :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                                        :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                                        aspect-ratio="1"
                                        height="130"
                                        max-width="130"
                                        class="grey lighten-2"
                                    >
                                        <template v-slot:placeholder>
                                            <v-row class="fill-height ma-0" align="center" justify="center">
                                                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                            </v-row>
                                        </template>
                                    </v-img>
                                </v-col> 
                            </v-row>
                        <span class="profile-image-sub-title">프로필 사진</span>
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
import { changeNickname } from "@/api/auth/auth";
import { mapState } from "vuex";

export default {
    data() {
        return {
            useNickname: true,
            nickname: '',
            currentNicknameCheck: false,
            existNicknameCheck: false,
            useNicknameCheck: false
        }
    },
    props: {
        imageDialog: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        this.nickname = this.userInfoData.nickname
    },
    computed: {
        ...mapState(['userInfoData']),
        dialogValue: {
            get() {
                return this.imageDialog;
            },
            set(val) {
                this.$emit('close', val);
            }
        }
    },
    methods: {
        closeProfieEditDialog() {
            this.dialogValue = false
        },
        agree() {
            this.dialogValue = true
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
 .profile-image-title {
    font-weight: 600 !important;
 }
 .profile-sub-title {
    font-weight: 600 !important;
 }
 .image-upload-btn {
    color: #0064D1;
    font-size: 15px;
    font-weight: 600;
 }
 .avatar-profile-image-btn {
    font-size: 15px;
    font-weight: 600;
 }
 .frame-add-btn {
    font-size: 15px;
    font-weight: 600;
 }
 .upload-image-sub-title {
    margin-top: 10px !important;
    font-weight: 700;
 }
 .scrollable-container {
    max-height: 400px; /* 예시로 설정한 최대 높이 */
    overflow-y: auto;
 }
 .scrollable-container::-webkit-scrollbar {
    width: 8px; /* 스크롤바의 너비 */
 }
 .scrollable-container::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: #E4E6EB; /* 스크롤바의 색상 */
    border-radius: 8px; /* 스크롤바의 모서리를 둥글게 설정 */
 }
 .scrollable-container::-webkit-scrollbar-track {
    background: #fff; /*스크롤바 뒷 배경 색상*/
 }
 .profile-image-sub-title {
    font-weight: 700;
 }
</style>