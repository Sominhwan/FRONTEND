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
                                <div style="display: flex;;">
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
                        </v-card-text>
                    </v-col>
                    <!-- TODO Vuetify Treeview 네이버 약관동의 참고하여 추가하기 --> 
                    <v-text-field
                        class="sign-loading"
                        color="primary"
                        loading
                        disabled
                    ></v-text-field>
                </v-card>
            </v-col>
        </v-row>
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
        telecom: ['SKT', 'KT', 'LG U+']
    }),
}
</script>

<style scoped>
    .sign-loading {
        position: absolute; 
        width: 100%;
        bottom: 0px;
    }
</style>