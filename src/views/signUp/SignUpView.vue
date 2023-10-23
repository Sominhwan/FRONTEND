<template>
    <v-container fluid fill-height>
        <!-- scroll to top 버튼 -->
        <v-btn
            v-scroll="onScroll"
            v-show="fab"
            elevation="0"
            fab
            tile
            dark
            fixed
            bottom
            right
            color="white"
            @click="toTop"
            style="border: 2px solid #eee !important"
        >
            <v-icon color="grey" large>keyboard_arrow_up</v-icon>
        </v-btn>
        <v-row justify="center" align="center" style="margin: 200px 0 250px;">
            <v-col cols="6" md="4" offset="0">
                <v-card class="pa-0 mx-auto" elevation="0" height="600">
                    <v-toolbar elevation="0" height="100">
                        <v-spacer></v-spacer>
                        <v-img class="ma-3" :src="require('@/assets/signUp/signUpLogo.png')" max-width="40" height="40"></v-img>
                        <v-toolbar-title class="text-h4" style="font-weight: bold;">회원가입</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-col cols="12" md="8" offset="2">
                        <v-card-text>
                            <v-text-field
                                ref="email"
                                v-model="email"
                                dense
                                label="아이디(이메일)"
                                solo
                                flat
                                outlined
                                prepend-inner-icon="person"
                                suffix="@naver.com"
                                :rules="[() => !!email || '* 아이디(이메일): 필수정보입니다.']"
                                required
                            ></v-text-field>
                            <v-text-field
                                ref="password"
                                v-model="password"
                                dense
                                label="비밀번호"
                                solo
                                flat
                                type="password"
                                outlined
                                prepend-inner-icon="lock"
                                counter="25"
                                :rules="[() => !!password || '* 비밀번호: 필수정보입니다.']"
                                required
                            ></v-text-field>
                            <v-text-field
                                ref="name"
                                v-model="name"
                                dense
                                solo
                                label="이름"
                                flat
                                outlined
                                prepend-inner-icon="person"
                                :rules="[() => !!name || '* 이름: 필수정보입니다.']"
                                required
                            ></v-text-field>
                            <v-text-field
                                ref="name"
                                v-model="birthdate"
                                dense
                                solo
                                label="생년월일"
                                flat
                                outlined
                                prepend-inner-icon="calendar_month"
                                :rules="[() => !!name || '* 생년월일: 필수정보입니다.']"
                                required
                            ></v-text-field>
                            <v-row>
                                <v-col>
                                    <v-select
                                        :items="gender"
                                        dense
                                        label="성별"
                                        v-model="genderSelect"
                                        outlined
                                        flat
                                        solo
                                    ></v-select>
                                </v-col>
                                <v-col>
                                    <v-select
                                        :items="division"
                                        v-model="foreignerSelect"
                                        dense
                                        outlined
                                        flat
                                        solo
                                    ></v-select>
                                </v-col>
                            </v-row>
                                <div style="display: flex;">
                                    <v-text-field
                                        style="width: 300px; margin-right: 20px;"
                                        ref="phonenum"
                                        v-model="phonenum"
                                        dense
                                        solo
                                        label="휴대폰번호"
                                        flat
                                        outlined
                                        prepend-inner-icon="phone_iphone"
                                        :rules="[() => !!name || '* 휴대폰번호: 필수정보입니다.']"
                                        required
                                    ></v-text-field>
                                    <v-select
                                        style="width: 100px;"
                                        :items="telecom"
                                        label="통신사"
                                        v-model="telecomSelect"
                                        dense
                                        outlined
                                        flat
                                        solo
                                        prepend-inner-icon="cell_tower"
                                    ></v-select>
                                </div>
                                <v-row>
                                    <v-treeview
                                        v-model="selection"
                                        selectable
                                        selected-color="primary"
                                        :items="items"
                                        return-object
                                    >
                                        <template v-slot:prepend="{ item }">
                                            <div v-if="item.idx == 1 || item.idx == 2 || item.idx == 3">
                                                <span class="terms-service" @click="dialogCheck(item)" style="cursor: pointer;">{{ item.id }}<v-icon style="margin-bottom: 3px;">arrow_right</v-icon></span>
                                            </div>
                                            <div v-else>
                                                <span>{{ item.id }}</span>
                                            </div>
                                        </template>                   
                                    </v-treeview>   
                                </v-row>   
                                <v-col style="margin-top: 30px;">
                                    <v-row>
                                        <v-btn dark block @click="join()">가입하기</v-btn>
                                    </v-row>
                                </v-col>                    
                        </v-card-text>
                    </v-col>
                    <!-- TODO Vuetify Treeview 네이버 약관동의 참고하여 추가하기--> 
                    <!-- <v-text-field
                        class="sign-loading"
                        color="primary"
                        loading
                        disabled
                    ></v-text-field> -->
                </v-card>
            </v-col>
        </v-row>
        <v-dialog v-model="dialog" persistent width="550" style="position: fixed; z-index: 1002;">
        <v-card style="position: relative;">
            <v-card-title class="terms-service-title">
                <span class="text-h5">{{ dialogTitle }}</span>
            </v-card-title>
            <div class="terms-service-content" ref="scrollableContent">
                <span v-html="dialogContent"></span>
            </div>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="terms-service-btn" depressed color="darken-1"  @click="closeDialog">확인</v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>        
    </v-container>
</template>

<script>
import { signUp } from "@/api/auth/auth";
export default {
    data: () => ({
        fab: false, // 상단 스크롤 이동
        name: null,
        koreaName: null,
        foreignerName: null,
        email: null,
        password: null,
        birthdate: null,
        phonenum: null,
        gender: ['남자', '여자'],
        genderItem: null, 
        genderSelect: null,
        division: ['내국인', '외국인'],
        foreignerStatus: 'N', 
        foreignerSelect: '내국인',
        telecom: ['SKT', 'KT', 'LG U+'],
        telecomSelect: null,
        selection: [],
        privateInfoTerms: 'N',
        uniqueIdentifyTerms: 'N',
        mobileCarrierTerms: 'N',
        items: [
        {
          id: '[필수] 약관동의',
          name: '',
          children: [
            { id: '개인정보 이용', idx: 1, title: '개인정보 이용 동의서', content: '',  action: 'openDialog' },
            { id: '고유식별정보 처리', idx: 2, title: '고유식별정보 동의서', content: '',  action: 'openDialog' },
            { id: '통신사 이용약관', idx:3, title: '통신사 이용약관 동의서', content: '',  action: 'openDialog' },
          ],
        },
      ],  
      dialogTitle: '',
      dialogContent: '',
      dialog: false,      
    }),
    mounted() {
        this.loadAgreementContent()
        this.loadAgreementContent2()
        this.loadAgreementContent3()
        window.addEventListener('beforeunload', this.handleBeforeUnload);
    },
    beforeDestroy() {
        window.removeEventListener('beforeunload', this.handleBeforeUnload);
    },
    beforeRouteLeave(to, from, next) {
        const isConfirmed = confirm('이 사이트에서 나가시겠습니까?\n변경사항이 저장되지 않을 수 있습니다.');
        if (isConfirmed) {
            next();
        } else {
            next(false);
        }
    },
    methods: {
        handleBeforeUnload(event) {
            event.preventDefault();
            event.returnValue = '';     
        },
        onScroll (e) {
            if (typeof window === 'undefined') 
            return
            const top = window.pageYOffset || e.target.scrollTop || 0
            this.fab = top > 20
        },
        toTop () {
            this.$vuetify.goTo(0)
        },
        dialogCheck(item) {
            if (item.action) {
                this[item.action](item);
            }       
        },
        openDialog(item) {
            this.dialogTitle = item.title;
            this.dialogContent = item.content.replace(/\n/g, '<br>');
            this.dialog = true;
        },  
        closeDialog() {
            this.dialog = false;
            this.$refs.scrollableContent.scrollTop = 0;
        },
        async loadAgreementContent() {
            try {
                const response = await fetch('agreementContent/privateAgreement.txt'); 
                this.items[0].children[0].content = await response.text();
            } catch (error) {
                console.error('Error loading agreement content:', error);
            }
        },  
        async loadAgreementContent2() {
            try {
                const response = await fetch('agreementContent/uniqueIdentificationNumber.txt'); 
                this.items[0].children[1].content = await response.text();
            } catch (error) {
                console.error('Error loading agreement content:', error);
            }
        },   
        async loadAgreementContent3() {
            try {
                const response = await fetch('agreementContent/carrierTermsOfUse.txt'); 
                this.items[0].children[2].content = await response.text();
            } catch (error) {
                console.error('Error loading agreement content:', error);
            }
        },     
        // 회원가입
        join() {
            for(let i=0; i<3; i++) {
                if(this.selection[i] == undefined) {
                    alert('필수약관을 모두 동의하세요');
                    return;
                } 
            }
            if(this.foreignerSelect == "내국인") {
                this.koreaName = this.name;      
            } else {
                this.foreignerName = this.name;
                this.foreignerStatus = 'Y'
            }
            if(this.gender == "남자") {
                this.genderItem = 'M';
            } else {
                this.genderItem = 'F';
            }
            const data = { email: this.email + '@naver.com', password: this.password, koreaName: this.koreaName, foreignerName: this.foreignerName, foreignerStatus: this.foreignerStatus, birthDate: this.birthdate, gender: this.genderItem, phoneNum: this.phonenum, mobileCarrier: this.telecomSelect, privateInfoTerms: 'Y', uniqueIdentifyTerms: 'Y', mobileCarrierTerms: 'Y' }
            signUp(data)
                .then((res) => {
                    console.log(res.data)
                    this.email = "",
                    this.password = "",
                    this.name = "",
                    this.birthdate = "",
                    this.phonenum = ""
                    // TODO 약관동의 체크 해제하기
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {

                })
        }  
    }
}
</script>

<style scoped>
    .sign-loading {
        position: absolute; 
        width: 100%;
        bottom: 0px;
    }
    .terms-service:hover{
        text-decoration: underline;
    }
    .terms-service-title {
        position: relative;
        top: 10px;
        margin-bottom: 25px;
    }
    .terms-service-content {
        background-color: #eee;
        margin-left: 20px;
        margin-right: 20px;
        padding: 10px;
        overflow-y: auto;
        height: 600px;
    }
    .terms-service-btn {
        margin-top: 10px;
        margin-right: 4px;
        margin-bottom: 10px;
    }
</style>