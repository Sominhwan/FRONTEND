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
                                :transitions="true"
                                :stencil-props="{
                                    handlers: {},
                                    minAspectRatio: 10 / 20,
                                    movable: true,
                                    resizable: false,
                                }"
                                :resize-image="{
                                    adjustStencil: true
                                }"
                                :default-size="{
                                    width: 250,
                                    height: 250
                                }"
                                :debounce="false"
                                stencil-component="circle-stencil"
                                @change="change"
                            />
                            <!-- 편집 버튼 -->
                            <v-btn 
                                class="rotate-right-btn"
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
                        <!-- 줌 인,아웃 -->
                        <v-card-text>
                            <v-row>
                                <v-col cols="1">
                                    <v-btn 
                                        class="size-minus-btn"
                                        color="white"
                                        elevation="0"
                                        fab
                                        small
                                        @click="zoom(0.5)"
                                        :disabled="minusBtnCheck"
                                    >
                                        <v-icon>mdi-minus</v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="8">
                                    <v-slider
                                        class="image-size-slider"
                                        v-model="zoomValue"
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
                                        color="white"
                                        elevation="0"
                                        fab
                                        small
                                        @click="zoom(2)"
                                        :disabled="plusBtnCheck"
                                    >
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <!-- 편집 미리보기 -->
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
                    </v-card>
                </v-col>
            </v-row>           
        </v-container>
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="green darken-1"
            text
            @click="uploadImage()"
        >
            저장하기
        </v-btn>
        </v-card-actions>
    </v-card>
    </v-dialog>
</template>
<script>
import { profileImage } from "@/api/upload/upload";
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
			zoomValue: 0,
            profileImg: null,
            result: {
				coordinates: null,
				image: null
			},
            angle: true,
            minusBtnCheck: false,
            plusBtnCheck: false,
            zoomCount: 0
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
        zoomValue(event) {
            // 줌 컨트롤러 추가
            this.zoomController(event)
            console.log(event)
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
			console.log(coordinates, image)
		},
        zoomController(e) {
            this.zoomCount = e/10
            if(this.zoomCount === 10) {
                this.plusBtnCheck = true    
            } else if(this.zoomCount === 0) {
                this.minusBtnCheck = true
            } else {
                this.plusBtnCheck = false
                this.minusBtnCheck = false
            }
            this.$refs.cropper.zoom(2 * this.zoomCount)
            
        },
        /* 줌 인,아웃 */
        zoom(event) {
			this.$refs.cropper.zoom(event)
		},
        /* 뒤집기 */
        flip(x,y) {
			this.$refs.cropper.flip(x,y)
		},
        /* 회전하기 */
		rotate(angle) {
			this.$refs.cropper.rotate(angle)
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
			const { coordinates, canvas, } = this.$refs.cropper.getResult()
			this.coordinates = coordinates;
			// You able to do different manipulations at a canvas
			// but there we just get a cropped image, that can be used 
			// as src for <img/> to preview result
			this.image = canvas.toDataURL()
            this.profileImg = canvas.toDataURL()
            console.log(this.coordinates)
            console.log(this.image)
            console.log(this.$refs.cropper.getResult())
        },
        uploadImage() {
            const { canvas } = this.$refs.cropper.getResult()
            if (canvas) {
				let form = new FormData();
                let data = {
                    userId: this.userInfoData.userId,
                    originFileName: this.imageFile.name
                }
                console.log(data)
				canvas.toBlob(blob => {
					form.append('file', blob);
                    form.append('key', new Blob([JSON.stringify(data)], { type: 'application/json' }))
                    profileImage(form)
                        .then((res) => {
                            if(res.data.code === 0) {
                                location.reload()
                            } else if(res.data.code === 1) {
                                alert(res.data.message)
                            }             
                        })
                        .catch(() => {
   
                            alert("서버와 연결이 불안합니다.")
                        })
                        .finally(() => {

                        })
				}, 'image/jpeg');

			}
        }
    }
}
</script>
<style scoped>
  .cropper {
    max-height: 500px;
		background: black;
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