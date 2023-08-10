<template>
        <v-row justify="center">
        <div id="errorContent">
            <img :src="require('@/assets/error404/errorIcon.svg')" alt="errorIcon" id="errorIcon"/>
            <div id="errorAlert"><span>4</span><span style="color: #395DAF">0</span><span>4</span><div style="font-size: 35px; position: relative; left: 20px; top:11px; height: 50px;">ERROR</div></div>
            <div id="errorNotFoundPage">페이지를 찾을 수 없습니다.</div>
            <div id="errorMessage">페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.<br>입력하신 주소가 정확한지 다시 한 번 확인해주세요.</div>
        </div>
    </v-row>
</template>
<script>
export default {
    name: 'ErrorPage',
    data(){
    return{

    }
  },    
}
</script>
<style scoped>
    div{
        position: relative;
        top: 20%;
        height: 500px;
    }
    #errorContent{
        width: 800px;
        height: 300px;
    }
    #errorIcon{
        position: relative;
        width: 220px;
    }
    #errorAlert{
        position: absolute;
        display: flex;
        width: 230px;
        height: 50px;
        left: 35%;
        top: 0%;
        font-size: 50px;
        font-weight: bold;
    }
    #errorNotFoundPage{
        position: absolute;
        font-size: 25px;
        font-weight: bold;
        width: 310px;
        height: 30px;
        left: 35%;
        top: 25%;
    }
    #errorMessage{
        position: absolute;
        line-height: 25px;
        font-size: 17px;
        width: 435px;
        height: 50px;
        left: 35%;
        top: 45%;
    }
</style>