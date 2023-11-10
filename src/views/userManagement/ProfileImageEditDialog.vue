<template>
    <v-dialog
        v-model="dialogValue"
        max-width="700"
        persistent
        style="z-index: 1001 !important;"
    >
    <v-card>
        <v-card-title class="profile-image-title text-h6">
            프로필 사진 편집
        <v-spacer></v-spacer>
        <v-btn icon color="#303030" @click="closeProfieImageEditDialog()">
            <v-icon>mdi-close</v-icon>
        </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-container>
            <v-row dense>
                <v-col cols="12">
                    <v-card flat>
                        <v-btn class="image-upload-btn" block elevation="0" color="#EBF5FF" @click="alertFile()">
                            <v-icon size="16">add</v-icon><span class="ml-1">사진 업로드</span>
                        </v-btn>
                        <v-btn class="avatar-profile-image-btn mt-2" block elevation="0" color="#E4E6EB">
                            <v-icon size="16" style="width: 16px;">familiar_face_and_zone</v-icon><span class="ml-1">아바타 프로필 사진 만들기</span>
                        </v-btn>
                        <v-btn class="frame-add-btn mt-2" block elevation="0" color="#E4E6EB">
                            <v-icon size="16">add</v-icon><span class="ml-1">프레임 추가</span>
                        </v-btn>
                        <v-img :src="url" aspect-ratio="1" sizes="150" alt="이미지 파일"/>
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
import { mapState } from "vuex";
export default {
    data() {
        return {
            url: null
        }
    },
    props: {
        imageEditDialog: {
            type: Boolean,
            default: false
        },
        imageFile: {
            type: File
        },
        imageUrl: {
            type: String
        }
    },
    mounted() {
        console.log(this.imageFile)
        this.alertFile()
    },
    watch: {
        imageUrl(newImageData) {
            // 이미지가 변경될 때 실행되는 로직을 추가할 수 있습니다.
            this.url = newImageData
        }
    },
    computed: {
        ...mapState(['userInfoData']),
        dialogValue: {
            get() {
                return this.imageEditDialog;
            },
            set(val) {
                this.$emit('close', val);
            }
        }
    },
    methods: {
        closeProfieImageEditDialog() {
            this.dialogValue = false
        },
        alertFile() {
            console.log(this.imageUrl)
            this.url = this.imageFile
        }
    }
}
</script>
<style scoped>
 .profile-image-title {
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
</style>