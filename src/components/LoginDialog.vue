<template>
    <v-app>
        <v-row justify="center" style="position: fixed; z-index: 1002 !important;">
            <v-dialog v-model="dialog" persistent max-width="600">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on" style="width: 260px;" @click="openDialog()">
                    로그인 버튼
                </v-btn>
            </template>
            <v-card elevation="0 flat" height="650">
                <v-app-bar color="white" elevation="0">
                    <v-card-title class="text-center" style="position: relative; left: 50%; transform: translate(-50%, 0);">로그인</v-card-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="closeDialog()">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-app-bar>

                <v-form v-model="valid">
                    <v-container style="position: absolute; margin-top: 15%;">
                        <v-row justify="center">
                            <v-col cols="12" md="8">
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
                            </v-col>
                            <v-col cols="12" md="8" style="position: relative; bottom: 40px;">
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
                            </v-col>
                            <v-col cols="12" md="8" style="position: relative; bottom: 100px;">
                              <div style="display: inline-flex;">
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
                            </v-col>
                            <v-col cols="12" md="8" style="position: relative; bottom: 130px;">
                                <!-- <v-btn class="text-h6 rounded-0 flat" :loading="loading" :disabled="loading" color="secondary" @click="loader = 'loading'" block height="55">로그인</v-btn> -->
                                <v-btn class="text-h6 rounded-0 flat" :loading="loading" :disabled="loading" color="secondary" @click="login()" block height="55">로그인</v-btn>
                            </v-col>
                            <v-col class="text-right" cols="12" md="8" style="position: relative; bottom: 140px;">
                                <span class="join-btn" @click="join()">회원가입</span>
                            </v-col>
                        </v-row>

                    </v-container>
                </v-form>
            </v-card>
            </v-dialog>
        </v-row>
    </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
    data () {
      return {
        dialog: false,
        show1: false,
        loader: null,
        loading: false,
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
          this.dialog = false;
          this.$router.push({name: 'join'}).catch(() => {})
        },
        openDialog() {
          document.documentElement.style.overflow = 'hidden'
        },
        closeDialog() {
          document.documentElement.style.overflow = 'auto'
          this.email = ''
          this.password = ''
          this.$store.commit('setLoginMessage', null);
          this.dialog = false
        },
        async login() {
          // 유효성 검사
          if(this.email != '' && this.password == '') {
            this.$store.commit('setLoginMessage', '비밀번호를 입력하세요.')
            this.$refs.password.focus()
            return;
          }
          if(this.email == '' && this.password != '') {
            this.$store.commit('setLoginMessage', '이메일을 입력하세요.')
            this.$refs.email.focus()
            return;
          }
          if(this.email == '' && this.password == '') {
            this.$store.commit('setLoginMessage', '이메일 또는 비밀번호가 입력되지 않았습니다.')
            this.$refs.email.focus()
            return;
          }
          this.$store.dispatch('login', {
            email: this.email,
            password: this.password,
            autoLogin: this.checkbox
          })
        }
    }   
}
</script>

<style scoped>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
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
    bottom: 15px;
    font-size: 14px;
    color: #FF003E;
  }
</style>
