<template>
    <div v-if="loading">
        <div class="lds-facebook">
        <div>
        </div>
        <div>
        </div>
        <div>
        </div>
        </div>
        <div class="loading-text">지금 데이터를 불러오고 있습니다.</div>
    </div>

</template>
<script>
export default {
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
    },
}
</script>
<style>
    .lds-facebook {
        display: inline-block;
        position: fixed;
        width: 64px;
        height: 64px;
        top: 50%;
        left: 48%;
    }
    .loading-text {
        display: inline-block;
        position: fixed;
        left: 42.5%; 
        top: 55%;
        color: #0000008A;
    }
    .lds-facebook div {
        display: inline-block;
        position: absolute;
        left: 6px;
        width: 13px;
        background: #DEDEDE;
        animation: lds-facebook 0.9s cubic-bezier(0, 0.5, 0.5, 1) infinite;
    }
    .lds-facebook div:nth-child(1) {
        left: 6px;
        animation-delay: -0.12s;
    }
    .lds-facebook div:nth-child(2) {
        left: 26px;
        animation-delay: -0.06s;
    }
    .lds-facebook div:nth-child(3) {
        left: 45px;
        animation-delay: 0;
    }
    @keyframes lds-facebook {
        0% {
        top: 6px;
        height: 51px;
        }

        50%,
        100% {
        top: 19px;
        height: 26px;
        }
    }
</style>