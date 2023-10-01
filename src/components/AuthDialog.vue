<template>
  <v-dialog v-model="authDialog" persistent max-width="290">
    <v-card>
      <!-- <v-card-title></v-card-title> -->
      <v-card-text class="pa-6" style="font-size: 16px;">댓글을 달기위해서 로그인이 필요합니다.</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="rounded-0" text outlined @click="closeAuthDialog()">
          취소
        </v-btn>
        <v-btn class="rounded-0" text outlined @click="openLoginDialog()">
          확인
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
    data() {
      return {
        //authDialog: true
        loginDialog2: false,
      }
    },
    props: {
      value: {
          type: Boolean,
          required: true,
        },
    },
    computed: {
      authDialog: {
        get() {
          return this.value;
        },
        set(value) {
          this.$emit('input', value);
        },
      },
    },
    methods: {
      closeAuthDialog() {
        document.documentElement.style.overflowY = 'auto'
        this.authDialog = false
      },
      openLoginDialog() {
        this.authDialog2 = true
      }
    }
}
</script>