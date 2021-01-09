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
            setTimeout(()=>{
                this.$router.push({
                    path:'/index'
                })
            },2000)
        },
        methods: {}
    }
</script>

<style scoped lang='scss'>
    .success{
        .img{
            display: inline-block;
            width:187px;
            height: 400px;
            background: url("../../assets/image/error.png") no-repeat center;
            background-size: 100%;
        }
    }
</style>
