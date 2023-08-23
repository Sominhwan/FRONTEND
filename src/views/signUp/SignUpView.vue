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
                                <v-treeview
                                    v-model="selection"
                                    selectable
                                    selected-color="primary"
                                    :items="items"
                                >
                                    <template v-slot:prepend="{ item }">
                                    <span @click="dialogCheck(item)" style="cursor: pointer;">{{ item.id }}</span>
                                    </template>                   
                                </v-treeview>                            
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
        <v-dialog
        v-model="dialog"
        width="600px"
        >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
            >
            Open Dialog
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
            <span class="text-h5">Use Google's location service?</span>
            </v-card-title>
            <v-card-text>{{ dialogContent }}</v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="green darken-1"
                text
                @click="dialog = false"
            >
                Disagree
            </v-btn>
            <v-btn
                color="green darken-1"
                text
                @click="dialog = false"
            >
                Agree
            </v-btn>
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
            { id: '개인정보 이용', content: '개인정보 이용 동의 약관 페이지 입니다.',  action: 'openDialog' },
            { id: '고유식별정보 처리', content: '고유식별저보 처리 관련 페이지입니다.',  action: 'openDialog' },
            { id: '통신사 이용약관', content: '통신사 이용약관 관련 페이지입니다.',  action: 'openDialog' },
          ],
        },
      ],  
      dialogContent: '',
      dialog: false,      
    }),
    methods: {
        dialogCheck(item) {
            if (item.action) {
                this[item.action](item);
            }       
        },
        openDialog(item) {
            this.dialogContent = item.content;
            this.dialog = true;
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
</style>