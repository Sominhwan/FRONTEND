<template>
    <div>
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
                                password
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
                                        outlined
                                        flat
                                        solo
                                    ></v-select>
                                </v-col>
                                <v-col>
                                    <v-select
                                        :items="division"
                                        v-model="select"
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
            <div class="terms-service-content">
                <v-card-text>{{ dialogContent }}</v-card-text>
            </div>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="terms-service-btn" depressed color="darken-1"  @click="dialog = false">확인</v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>        
    </div>
</template>

<script>
export default {
    data: () => ({
        name: null,
        email: null,
        password: null,
        birthdate: null,
        phonenum: null,
        gender: ['남자', '여자'],
        division: ['내국인', '외국인'],
        select: '내국인',
        telecom: ['SKT', 'KT', 'LG U+'],
        selection: [],
        items: [
        {
          id: '[필수] 약관동의',
          name: '',
          children: [
            { id: '개인정보 이용', idx: 1, title: '개인정보 이용 동의서', content: '',  action: 'openDialog' 
            },
            { id: '고유식별정보 처리', idx: 2, title: '고유식별정보 동의서', content: '고유식별정보 처리 관련 페이지입니다.',  action: 'openDialog' },
            { id: '통신사 이용약관', idx:3, title: '통신사 이용약관 동의서', content: '통신사 이용약관 관련 페이지입니다.',  action: 'openDialog' },
          ],
        },
      ],  
      dialogTitle: '',
      dialogContent: '',
      dialog: false,      
    }),
    mounted() {
        this.loadAgreementContent();
    },
    methods: {
        dialogCheck(item) {
            if (item.action) {
                this[item.action](item);
            }       
        },
        openDialog(item) {
            this.dialogTitle = item.title;
            this.dialogContent = item.content;
            this.dialog = true;
        },  
        async loadAgreementContent() {
            try {
                const response = await fetch('agreementContent/privateAgreement.txt'); // 파일 경로는 프로젝트에 맞게 수정
                this.items[0].children[0].content = await response.text();
            } catch (error) {
                console.error('Error loading agreement content:', error);
            }
        },     
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
        overflow-y: auto;
        height: 600px;
    }
    .terms-service-btn {
        margin-top: 10px;
        margin-right: 4px;
        margin-bottom: 10px;
    }
</style>