<template>
    <v-app>

    </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
    data() {
        return {

        }
    },
    computed: {
        // 회원정보, 권한 가져오기
        ...mapState(['userInfoData']),
    },
}
</script>
<style scoped>

</style>