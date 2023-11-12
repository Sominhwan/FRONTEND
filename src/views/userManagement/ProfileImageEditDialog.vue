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
                        <div style="width: 87%;">
                            <cropper 
                                class="cropper" 
                                ref="cropper"
                                :src="url" 
                                :canvas="{
                                    height: 250,
                                    width: 250
                                }"
                                :stencil-props="{
                                    handlers: {},
                                    movable: false,
                                    resizable: false,
                                    aspectRatio: 1,
                                }"
                                :resize-image="{
                                    adjustStencil: false
                                }"
                                :default-size="defaultSize"
                                :debounce="false"
                                image-restriction="stencil"
                                stencil-component="circle-stencil"
                                @change="change"
                            />
                            <!-- 편집 버튼 -->
                            <v-btn 
                                class="rotate-right-btn"
                                v-show="!hidden"
                                color="white"
                                elevation="0"
                                fab
                                large
                                absolute
                                bottom
                                left
                                @click="rotate(90)"
                            >
                                <v-icon>rotate_right</v-icon>
                            </v-btn>
                            <v-btn 
                                class="rotate-left-btn"
                                v-show="!hidden"
                                color="white"
                                elevation="0"
                                fab
                                large
                                absolute
                                bottom
                                left
                                @click="rotate(-90)"
                            >
                                <v-icon>rotate_left</v-icon>
                            </v-btn>
                            <v-btn 
                                class="flip-right-btn"
                                v-show="!hidden"
                                color="white"
                                elevation="0"
                                fab
                                large
                                absolute
                                bottom
                                left
                                @click="flip(true,false)"
                            >
                                <v-icon>flip</v-icon>
                            </v-btn>
                            <v-btn 
                                class="flip-up-btn"
                                v-show="!hidden"
                                color="white"
                                elevation="0"
                                fab
                                large
                                absolute
                                bottom
                                left
                                @click="flip(false,true)"
                            >
                                <v-icon>flip</v-icon>
                            </v-btn>
                        </div>
                        <v-card-text>
                            <v-row>
                                <v-col cols="1">
                                    <v-btn 
                                        class="size-minus-btn"
                                        v-show="!hidden"
                                        color="white"
                                        elevation="0"
                                        fab
                                        small
                                        @click="flip(false,true)"
                                    >
                                        <v-icon>mdi-minus</v-icon>
                                    </v-btn>
                                    </v-col>
                                    <v-col cols="8">
                                    <v-slider
                                        class="image-size-slider"
                                        v-model="value"
                                        hide-details
                                        height="20"
                                        color="#0064D1"
                                        track-color="grey"
                                        step="10"
                                        ticks="always"
                                        tick-size="0"
                                    ></v-slider>
                                    </v-col>
                                    <v-col cols="1">
                                    <v-btn 
                                        class="size-plus-btn"
                                        v-show="!hidden"
                                        color="white"
                                        elevation="0"
                                        fab
                                        small
                                        @click="flip(false,true)"
                                    >
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                    </v-col>
                            </v-row>
                        </v-card-text>
                            <preview
                                class="preview"
                                :width="200"
                                :height="200"
                                :image="result.image"
                                :coordinates="result.coordinates"
                            />

                        <div class="w-1/4">
                            <div class="pb-2">Preview</div>
                            <div class="flex items-center justify-center h-32 bg-yellow-100">
                                <div class="preview overflow-hidden w-full h-32 text-center bg-gray-200"></div>
                            </div>
                        </div>
                        <button @click="value()">Crop Image</button>
                        <button @click="flip(true,false)">뒤집기</button>
                        <button @click="rotate()">돌리기</button>
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
import { Cropper, Preview } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import { mapState } from "vuex";
export default {
    data() {
        return {
            url: null,
            cropper: null,
			coordinates: {
				width: 0,
				height: 0,
				left: 0,
				top: 0,
			},
			//image: null,
            profileImg: null,
            result: {
				coordinates: null,
				image: null
			},
            angle: true
        }
    },
    components: {
		Cropper,
        Preview 
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
        stencilComponent: {
            type: Object
        }
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
            //this.url = null
            this.profileImg = null
            this.imagfeUrl = null
            this.dialogValue = false
        },
        alertFile() {
            console.log(this.imageUrl)
            this.url = this.imageFile
            
        },
        change({ coordinates, image }) {
            this.result = {
				coordinates,
				image
			};
			console.log(coordinates, image);
		},
        /* 뒤집기 */
        flip(x,y) {
			this.$refs.cropper.flip(x,y);
		},
        /* 회전하기 */
		rotate(angle) {
			this.$refs.cropper.rotate(angle);
		},
        /* 편집 줌 크기 */
        defaultSize() {
			return {
				width: 300,
				height: 300,
			};
		},
        /* 결과 출력 */
        value() {
			const { coordinates, canvas, } = this.$refs.cropper.getResult();
			this.coordinates = coordinates;
			// You able to do different manipulations at a canvas
			// but there we just get a cropped image, that can be used 
			// as src for <img/> to preview result
			this.image = canvas.toDataURL()
            this.profileImg = canvas.toDataURL()
            console.log(this.coordinates)
            console.log(this.image)
            console.log(this.$refs.cropper.getResult())
        }
    }
}
</script>
<style scoped>
  .cropper {
    /* display: block;
    max-width: 100%; */
 }
 .preview {
    border-radius: 50%;
 }
 .profile-image-title {
    font-weight: 600 !important;
 }
 .rotate-right-btn {
    position: absolute; 
    top: 0px; 
    left: 90%;
 }
 .rotate-left-btn {
    position: absolute; 
    top: 75px; 
    left: 90%;
 }
 .flip-right-btn {
    position: absolute; 
    top: 150px; 
    left: 90%;
 }
 .flip-up-btn {
    position: absolute; 
    top: 225px; 
    left: 90%;
    transform: rotate(90deg);
 }
 .image-size-slider {
    /* position: relative; 
    width: 80%;
    left: 50px; */
 }
 .size-minus-btn {
    bottom: 10px;
    left: 5px;
 }
 .size-plus-btn {
    bottom: 10px;
    right: 20px;
 }

</style>