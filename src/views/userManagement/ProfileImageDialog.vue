<template>
    <v-dialog
        v-model="dialogValue"
        max-width="700"
        persistent
        style="z-index: 1001 !important;"
    >

    <ProfileImageEditDialog :imageEditDialog="imageEditDialog" :imageFile="imageFile" :imageUrl="imageUrl" @close="closeProfileImageEditDialog()"/>
    <v-card>
        <div class="loading text-center" v-if="loading">
            <v-progress-circular color="grey" indeterminate :value="20" style="top: 45%;"></v-progress-circular>
        </div>
        <v-card-title class="profile-image-title text-h6">
            프로필 사진 선택
        <v-spacer></v-spacer>
        <v-btn icon color="#303030" @click="closeProfileImageDialog()">
            <v-icon>mdi-close</v-icon>
        </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-container>
            <v-row dense>
                <v-col cols="12">
                    <v-card flat>
                        <v-btn class="image-upload-btn" block elevation="0" color="#EBF5FF" @click="openFileInput()">
                            <v-icon size="16">add</v-icon><span class="ml-1">사진 업로드</span>
                        </v-btn>
                        <input ref="fileInput" type="file" accept="image/*" @change="handleFileUpload" style="display: none;"/>
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
                                <v-col v-for="n in 5" :key="n" class="d-flex child-flex" cols="3">
                                    <v-img
                                        :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                                        :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                                        aspect-ratio="1"
                                        height="130"
                                        max-width="130"
                                        class="upload-image grey lighten-2"
                                    >
                                        <template v-slot:placeholder>
                                            <v-row class="fill-height ma-0" align="center" justify="center">
                                                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                            </v-row>
                                        </template>
                                    </v-img>
                                </v-col> 
                            </v-row>
                    </v-card>
                    <v-card flat class="mt-2">
                        <span class="profile-image-sub-title">프로필 사진</span>
                            <v-row class="mt-1 scrollable-container mb-3">
                                <v-col v-for="n in 3" :key="n" class="d-flex child-flex" cols="3">
                                    <v-img
                                        :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                                        :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                                        aspect-ratio="1"
                                        height="130"
                                        max-width="130"
                                        class="profile-image grey lighten-2"
                                    >
                                        <template v-slot:placeholder>
                                            <v-row class="fill-height ma-0" align="center" justify="center">
                                                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                            </v-row>
                                        </template>
                                    </v-img>
                                </v-col> 
                            </v-row>
                    </v-card>
                </v-col>
            </v-row>           
        </v-container>
    </v-card>
    </v-dialog>
</template>
<script>
import { getProfileImage, getUploadImage } from "@/api/profile/profile.js";
import ProfileImageEditDialog from '@/views/userManagement/ProfileImageEditDialog.vue';
import { mapState } from "vuex";
export default {
    data() {
        return {
            imageEditDialog: false,
            imageFile: null,
            imageUrl: null,
            loading: false,
        }
    },
    props: {
        imageDialog: {
            type: Boolean,
            default: false
        }
    },
    components: {
        ProfileImageEditDialog
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
    watch: {
        imageDialog(flag) {
            if(flag) {
                this.uploadImage()
                this.profileImage()
            }
        },
    },
    mounted() {

    },
    methods: {
        // TODO 업로드 한 사진 불러오기
        uploadImage() {
            const userId = this.userInfoData.userId 
            getUploadImage(userId)
                .then(() => {
                    
                })
                .catch(() => {

                })
                .finally(() => {

                })
        },
        // TODO 프로필 사진 불러오기
        profileImage() {
            const userId = this.userInfoData.userId 
            getProfileImage(userId)
                .then(() => {
          
                })
                .catch(() => {

                })
                .finally(() => {

                })
        },
        closeProfileImageDialog() {
            this.dialogValue = false
        },
        closeProfileImageEditDialog() {
            this.imageEditDialog = false
            this.dialogValue = false
            //this.closeProfileEditDialog()
        },
        openFileInput() {
            this.$refs.fileInput.click();
        },
        openProfileImageDialog() {
            this.imageEditDialog = true
        },
        handleFileUpload(event) { 
            this.loading = true
            if(event.target.files.length < 2) {
                const imageFile = event.target.files[0]
                const maxImageSize = 500 * 1024 // 500KB 
                if(imageFile.size > maxImageSize) {
                    alert('파일 크기는 500KB 이하여야 합니다.')
                    return
                }      
                if(imageFile) {
                    const reader = new FileReader()
                    reader.onload = () => {
                        this.imageFile = imageFile
                        this.imageUrl = reader.result
                    }
                    reader.readAsDataURL(imageFile)  
                    event.target.value = '';   
                    this.loading = false     
                    this.openProfileImageDialog()
                }
            } else {
                alert('파일 개수가 제한 되어있습니다.')
            }
        },
    }
}
</script>
<style scoped>
 .loading {
    background-color: rgba(255, 255, 255, 0.6);
    width: 100%; 
    height: 100%;
    z-index: 10; 
    position: absolute;
 }
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
 .upload-image-sub-title {
    margin-top: 10px !important;
    font-weight: 700;
 }
 .upload-image {
    border-radius: 10px;
    border: 1px solid #eee;
 }
 .profile-image-sub-title {
    font-weight: 700;
 }
 .profile-image {
    border-radius: 10px;
    border: 1px solid #eee;
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
</style>