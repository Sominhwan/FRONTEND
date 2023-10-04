<template>
    <v-card-title>
        <v-breadcrumbs :items="accountTabTitle" large>
            <template v-slot:item="{ item }">
                <v-breadcrumbs-item :disabled="item.disabled">
                    <span class="account-title" :style="`color: ${item.color}`" @click="$router.push({name: 'findPwd'})"> {{ item.text }}</span>
                </v-breadcrumbs-item>
            </template>
        </v-breadcrumbs>
        <div class="additional-text">아이디를 찾이 위한 본인확인 방법을 선택하세요.</div>
    </v-card-title>
</template>
<script>
export default {
    data () {
      return { 
        accountTab: null,
        accountTabTitle: [
            { text: '아이디 찾기', disabled: true, href: '/findid', color: '#2889f1'}, 
            { text: '비밀번호 찾기', disabled: false, href: '/findpwd', color: 'grey'}
        ],
        text: 'Lor',
      }
    },   
    mounted() {
        document.documentElement.style.overflow = 'hidden'
    }       
}
</script>
<style scoped>
 .account-title{
    cursor: pointer;
 }
 .additional-text {
    display: inline-block; /* 텍스트를 가리지 않도록 인라인 블록으로 설정 */
    margin-left: 20px; /* 원하는 여백 설정 */
    font-size: 18px;
    font-weight: bold;
 }
</style>