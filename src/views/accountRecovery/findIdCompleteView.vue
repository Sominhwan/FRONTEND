<template>
    <v-container class="fill-height">
        <v-row justify="center">
            <v-col>
                <v-row justify="center"> 
                    <v-col class="d-flex">
                        <v-icon class="mx-auto" color="gray" size="100">task_alt</v-icon>
                    </v-col>
                </v-row>
                <v-row justify="center"> 
                    <v-col class="d-flex text-center">
                        <div class="title-text">아이디 찾기</div>
                    </v-col>
                </v-row>
                <v-row justify="center"> 
                    <v-col class="d-flex text-center">
                        <div class="content-text2">휴대폰번호와 일치하는 아이디입니다.</div>
                    </v-col>
                </v-row>
                <v-row justify="center"> 
                    <v-col class="d-flex text-center">
                        <div class="content-text">아이디: {{ email }}</div>
                    </v-col>
                </v-row>
                <v-row justify="center">
                    <v-col class="d-flex text-center" cols="5">
                        <v-btn class="check-btn" rounded x-large text block @click="closeWindow()">
                            확인
                        </v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-footer class="identification-footer">Copyright © 2023 smh.co.Ltd. All rights reserved.</v-footer>
    </v-container>
</template>
<script>
export default {
    data () {
      return { 
        email: ''
      }
    },   
    mounted() {
        document.documentElement.style.overflow = 'hidden'
        this.email = this.$route.params.email
        if(this.email === '') {
            alert('접근되지 않은 권한입니다.')
            this.$router.push({name: 'findId'})
        }
    },
    methods: {
        closeWindow() {
            this.email = ''
            window.close()
        }
    }     
}
</script>
<style scoped>
 .title-text {
   margin: auto; 
   font-size: 30px;
   font-weight: bold;
   color: gray;
 }
 .content-text {
    margin: auto;
    font-size: 16px;
    font-weight: 600;
    color: grey
 }
 .content-text2 {
    margin: auto;
    font-size: 18px;
    font-size: 18px;
    font-weight: 600;
    color: #303030
 }
 .check-btn {
    font-size: 20px;
    color: #fff;
    background-color: #6E81DF;
    margin-top: 35px;
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