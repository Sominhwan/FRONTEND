<template>
    <v-dialog
        v-model="dialogValue"
        max-width="700"
        style="z-index: 1001 !important;"
    >
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
                            <span text class="edit-btn">
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
                            닉네임
                        </v-card-title> 
                        <v-card-subtitle>
                            계정의 세부 정보 식별 변경
                        </v-card-subtitle>  
                    </v-card>
                </v-col>
                <v-col cols="12">
                    <v-card>
                        <v-card-title class="profile-sub-title text-h6">
                            프로필 사진
                        </v-card-title>
                        <v-card-actions>
                            <v-btn text>
                                Listen Now
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>           
        </v-container>
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="green darken-1"
            text
            @click="closeProfieEditDialog()"
        >
            Disagree
        </v-btn>
        <v-btn
            color="green darken-1"
            text
            @click="closeProfieEditDialog()"
        >
            Agree
        </v-btn>
        </v-card-actions>
    </v-card>
    </v-dialog>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    props: {
        dialog: {
            type: Boolean,
            default: false
        }
    },
    mounted() {

    },
    computed: {
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
            this.dialogValue = false;
        },
        agree() {
            this.dialogValue = true;
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
</style>