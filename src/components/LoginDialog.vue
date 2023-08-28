<template>
    <v-app>
        <v-row justify="center" style="position: fixed; z-index: 1002 !important;">
            <v-dialog  v-model="dialog" persistent max-width="600">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on" style="width: 260px;">
                    로그인 버튼
                </v-btn>
            </template>
            <v-card elevation="0 flat" height="600">
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
                                    v-model="email"
                                    label="E-mail"
                                    single-line
                                    outlined
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="8" style="position: relative; bottom: 40px;">
                                <v-text-field
                                    class="rounded-0"
                                    prepend-inner-icon="lock"
                                    v-model="password"
                                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="show1 ? 'text' : 'password'"
                                    label="비밀번호"
                                    single-line
                                    outlined
                                    required
                                    @click:append="show1 = !show1"
                                ></v-text-field>   
                            </v-col>
                            <v-col cols="12" md="8" style="position: relative; bottom: 100px;">
                                <div style="width: 160px;">
                                    <v-checkbox v-model="checkbox" @click.native.stop>
                                        <template v-slot:label>
                                            <div>
                                                로그인 상태 유지
                                            </div>
                                        </template>
                                    </v-checkbox>
                                </div>
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
import { signIn } from "@/api/auth/auth";
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
    methods: {
        join() {
            this.dialog = false;
            this.$router.push({name: 'join'}).catch(() => {})
        },
        closeDialog() {
            this.email = ''
            this.password = ''
            this.dialog = false;
        },
        login() {
          const data = { email: this.email, password: this.password }
          signIn(data)
                .then((res) => {
                    console.log(res.data)
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
</style>
