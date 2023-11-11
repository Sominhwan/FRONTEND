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
                        <div>
                        <!-- <img class="img" ref="image" :src="url" alt="이미지 파일"/> -->
                        <cropper class="img" :src="url" @change="change"/>
                        </div>
                        <div class="w-1/4">
                            <div class="pb-2">Preview</div>
                            <div class="flex items-center justify-center h-32 bg-yellow-100">
                                <div class="preview overflow-hidden w-full h-32 text-center bg-gray-200"></div>
                            </div>
                        </div>
                        <button @click="cropImage()">Crop Image</button>
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
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import { mapState } from "vuex";
export default {
    data() {
        return {
            url: null,
            image: {},
        }
    },
    components: {
		Cropper,
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
        },
    },
    mounted() {
        console.log(this.imageFile)
        this.alertFile()
        //this.image = this.$refs.iamge
    },
    watch: {
        imageUrl(newImageData) {
            // 이미지가 변경될 때 실행되는 로직을 추가할 수 있습니다.
            this.url = newImageData        
        },
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
            
        },
        change({ coordinates, canvas }) {
			console.log(coordinates, canvas);
		},
    }
}
</script>
<style scoped>
  img {
    display: block;
    max-width: 100%; /* This rule is very important, please do not ignore this! */
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
</style>