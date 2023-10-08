<template>
    <v-container fluid fill-height>
        <v-row justify="center">
            <v-col cols="12" md="3">
                <v-text-field
                    class="rounded-0"
                    prepend-inner-icon="person"
                    ref="email"
                    v-model="email"
                    label="E-mail"
                    single-line
                    outlined
                    required
                    @keyup.enter="login()"
                ></v-text-field>
                <v-text-field
                    class="rounded-0"
                    prepend-inner-icon="lock"
                    ref="password"
                    v-model="password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    label="비밀번호"
                    single-line
                    outlined
                    required
                    @click:append="show1 = !show1"
                    @keyup.enter="login()"
                ></v-text-field> 
                <div class="auto-login-box" style="display: inline-flex;">
                    <div style="margin-right: 0px;">
                      <v-checkbox v-model="checkbox" @click.native.stop>
                        <template v-slot:label>
                            <div>
                                로그인 상태 유지
                            </div>
                        </template>
                      </v-checkbox>
                    </div>
                      <div style="margin-top: 13px;">
                        <v-tooltip right>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn icon v-bind="attrs" v-on="on">
                              <v-icon size="20" class="">
                                error
                              </v-icon>
                            </v-btn>
                          </template>
                          <span>보안에 취약할 수 있습니다.</span>
                        </v-tooltip>
                      </div>
                    </div>
                <div class="login-message">{{ loginMessage }}</div>
                <v-btn class="login-btn text-h6 rounded-0 flat" color="secondary" @click="login()" block height="55">로그인</v-btn>
                <div class="account-options-container">
                  <div class="join-btn" @click="openPwdPopUp()">비밀번호 찾기</div>
                  <div class="vertical-line"></div>
                  <div class="join-btn" @click="openIdpopUp()">아이디 찾기</div>
                  <div class="vertical-line"></div>
                  <div class="join-btn" @click="join()">회원가입</div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { mapState } from "vuex";
export default {
    data () {
      return {
        dialog: false,
        show1: false,
        loader: null,
        checkbox: false,
        password: '',
        nameRules: [
            v => !!v || 'Name is required',
            v => v.length <= 10 || 'Name must be less than 10 characters',
        ],
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
     }
    }, 
    watch: {
      loader () {
        this.email = ''
        this.password = ''
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      },
    },  
    computed: {
      ...mapState(['loginMessage'])
    },  
    mounted() {
      this.$refs.email.focus()
    },  
    methods: {
        join() {
          this.$router.push({name: 'join'}).catch(() => {})
        },
        async login() {
          // 유효성 검사
          if(this.email !== '' && this.password === '') {
            this.$store.commit('setLoginMessage', '비밀번호를 입력하세요.')
            this.$refs.password.focus()
            return;
          }
          if(this.email === '' && this.password !== '') {
            this.$store.commit('setLoginMessage', '이메일을 입력하세요.')
            this.$refs.email.focus()
            return;
          }
          if(this.email === '' && this.password === '') {
            this.$store.commit('setLoginMessage', '이메일 또는 비밀번호가 입력되지 않았습니다.')
            this.$refs.email.focus()
            return;
          }
          this.$store.dispatch('login2', {
            email: this.email,
            password: this.password,
            autoLogin: this.checkbox
          })
        },
        openIdpopUp() {
          const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
          const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
          const popupWidth = 650;
          const popupHeight = 800;
          const left = (screenWidth - popupWidth) / 2;
          const top = (screenHeight - popupHeight) / 2;
          const popUpAttribute = `top=${top}, left=${left}, width=${popupWidth}, height=${popupHeight}, resizable=no, status=no, scrollbars=no`
          window.open("/findId",'',popUpAttribute)
        },
        openPwdPopUp() {
          const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
          const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
          const popupWidth = 650;
          const popupHeight = 800;
          const left = (screenWidth - popupWidth) / 2;
          const top = (screenHeight - popupHeight) / 2;
          const popUpAttribute = `top=${top}, left=${left}, width=${popupWidth}, height=${popupHeight}, resizable=no, status=no, scrollbars=no`
          window.open("/findpwd",'',popUpAttribute)
        }
    }         
}
</script>
<style scoped>
    .auto-login-box {
      position: relative;
      bottom: 35px;
    }
    .login-btn {
      position: relative;
      bottom: 35px;
    }
    .account-options-container {
      position: relative;
      float: right;
      display: flex;
      align-items: center;
      bottom: 15px;
    }
    .vertical-line { 
      width: 1px;
      height: 16px; 
      background-color: #888888; 
      margin-left: 10px;
      margin-right: 10px; 
    }
    .join-btn {
      text-decoration: none;
      cursor: pointer;
      color: #303030;
    }
    .join-btn:hover {
      color: #1877F2;
      text-decoration: underline;
    }
    .login-message {
      position: relative;
      bottom: 50px;
      font-size: 14px;
      color: #FF003E;
    }   
</style>