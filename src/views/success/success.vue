<template>
    <div class='success'>
        <i class="img"></i>
    </div>
</template>

<script>
    export default {
        name: "success",
        data() {
            return {}
        },
        created() {
            // setTimeout(()=>{
            //     if(sessionStorage.getItem('pageUrl') != 'undefined'){
            //         window.location.href = sessionStorage.getItem('pageUrl')
            //     }
            // },1000)
        },
        methods: {
        }
    }
</script>

<style scoped lang='scss'>
    .success{
        .img{
            display: inline-block;
            width:187px;
            height: 400px;
            background: url("../../assets/image/success.png") no-repeat center;
            background-size: 100%;
        }
    }
</style>
