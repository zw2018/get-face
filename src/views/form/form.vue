<template>
    <div class="myForm  animated fadeInUp">
        <p class="title">请填写身份信息</p>
        <div class="img-box" @click="$router.go(-1)">
            <img :src="imgUrl" class="img"/>
        </div>
        <div class="input-box">
            <div class="input-item">
                <span class="input-label">姓名：</span>
                <input type="text" class="my-input" v-model="name"/>
            </div>
            <!--<div class="input-item">-->
            <!--<span class="input-label">身份证：</span>-->
            <!--<input type="text" @blur="inputBlur"  class="my-input" v-model="idCard"/>-->
            <!--</div>-->
            <div class="input-item">
                <span class="input-label">手机号：</span>
                <input type="number" @blur="inputBlur" class="my-input" v-model="phone"/>
            </div>
            <div class="input-item code-input" v-if="isCode">
                <span class="input-label">验证码：</span>
                <input type="number" class="my-input" maxlength="6" v-model="code"/>
                <button class="code-btn" v-if="codeNum>0">{{codeNum}}</button>
                <button class="code-btn" @click="getCode()" v-else>{{codeText}}</button>
            </div>
        </div>
        <div class="btn-box">
            <button class="btn" @click="confirm">确认提交</button>
        </div>
    </div>
</template>1

<script>
    let timer = null
    const regPhone = /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/;
    export default {
        name: "myForm",
        data() {
            return {
                name: sessionStorage.getItem('name') == 'undefined' ? '' : sessionStorage.getItem('name'),
                // idCard: sessionStorage.getItem('idcard') == 'undefined' ? '' : sessionStorage.getItem('idcard'),
                code: '',
                isCode: false,
                codeNum: 0,
                phone: sessionStorage.getItem('mobile') == 'undefined' ? '' : sessionStorage.getItem('mobile'),
                codeText: '获取验证码',
            }
        },
        computed: {
            imgUrl: function () {
                return sessionStorage.getItem('myFaceImg')
            },
            idCard: function () {
                return '33032719' + parseInt(Math.random() * 10) + parseInt(Math.random() * 10) + 0 + parseInt(Math.random() * 10) + parseInt(Math.random() * 2) + parseInt(Math.random() * 10) + parseInt(Math.random() * 10) + parseInt(Math.random() * 10) + parseInt(Math.random() * 10) + parseInt(Math.random() * 10)
            },
        },
        methods: {
            inputBlur() {
                window.scrollTo(0, 0)
            },
            confirm() {
                if (!this.name) {
                    this.$toast.fail('请输入姓名');
                    return
                }
                if (!this.idCard) {
                    this.$toast('请输入身份证号码');
                    return
                }
                if (this.isCode) {//更新人脸
                    if (!regPhone.test(this.phone)) {
                        this.$toast({
                            mask: true,
                            message: '请输入正确手机号',
                            duration: 1500
                        })
                        return
                    }
                    if (!this.code) {
                        this.$toast({
                            mask: true,
                            message: '请输入验证码',
                            duration: 1000
                        })
                        return
                    }
                    this.ajaxPostLoading(this.rootUrl + "yjs/checkCode", {//验证验证码
                        mobile: this.phone,
                        code: this.code
                    }, (res) => {
                        if (res.success == 'true' || res.success == true) {
                            this.updateFace()
                        } else {
                            this.$toast({
                                type: 'fail',
                                mask: true,
                                message: res.message,
                                duration: 2000
                            })
                        }
                    })
                } else {//首次采集
                    this.addFace()
                }
            },
            //人脸采集
            addFace() {
                if (!regPhone.test(this.phone)) {
                    this.$toast({
                        mask: true,
                        message: '请输入正确手机号',
                        duration: 1500
                    })
                    return
                }
                this.ajaxPost(this.rootUrl + window.myConfig.submitUrl, {
                    name: this.name,
                    cardNo: this.idCard,
                    base64Img: this.imgUrl,
                    mobile: this.phone,
                    operator: 'app'
                }, (res) => {
                    if (res.success == true || res.success == 'true') {
                        this.signFun()
                        // this.$router.push({
                        //     path: '/success'
                        // })
                    } else {
                        if (res.code == 1013) {//信息重复
                            this.$dialog.alert({
                                title: '信息重复',
                                message: '身份信息已存在',
                            })
                            // this.$dialog.confirm({
                            //     title: '信息重复',
                            //     message: '身份信息已存在，是否更新',
                            // })
                            //     .then(() => {
                            //         // on confirm
                            //         this.isCode = true
                            //         this.getCode()
                            //     })
                        } else {
                            this.$router.push({
                                path: '/error'
                            })
                        }
                    }
                })
            },
            //更新人脸
            updateFace() {
                this.ajaxPost(this.rootUrl + "updatePortrait", {
                    name: this.name,
                    cardNo: this.idCard,
                    base64Img: this.imgUrl,
                    operator: 'app'
                }, (res) => {
                    if (res.success == 'true' || res.success == true) {//会返回false字符串
                        this.signFun()
                        // this.$router.push({
                        //     path: '/success'
                        // })
                    } else {
                        this.$router.push({
                            path: '/error'
                        })
                    }
                })
            },
            signFun() {
                const loadingToast = this.$toast({
                    type: 'loading',
                    mask: true,
                    message:'服务器请求中',
                    duration: 0, // 持续展示 toast
                });
                this.ajaxPost(window.myConfig.signUrl, {
                    name: this.name,
                    cardNo: this.idCard,
                    portraitImage: this.imgUrl,
                    captureImage: this.imgUrl,
                    mobile: this.phone
                }, (res) => {
                    loadingToast.clear()
                    if (res.success == 'true' || res.success == true) {//会返回false字符串
                        this.$dialog.alert({
                            title: '成功！',
                            message: '签到成功!',
                        })
                            .then(() => {
                                // on confirm
                                this.$router.push({
                                    path: '/success'
                                })
                            })
                    } else {
                        this.$dialog.alert({
                            title: '失败！',
                            message: res.message,
                        })
                            .then(() => {
                                // on confirm
                                this.$router.push({
                                    path: '/error'
                                })
                            })
                    }
                })
            },
            //获取验证码
            getCode() {
                clearInterval(timer);
                timer = null;
                if (!this.phone) {
                    this.$toast({
                        mask: true,
                        message: '请输入手机号',
                        duration: 1000
                    })
                    return
                }
                // let regPhone = /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/;
                if (!regPhone.test(this.phone)) {
                    this.$toast({
                        mask: true,
                        message: '请输入正确手机号',
                        duration: 2000
                    })
                    return
                }
                this.ajaxPost(this.rootUrl + "yjs/sendMessage", {
                    mobile: this.phone,
                }, (res) => {
                    setTimeout(() => {
                        this.$toast({
                            mask: true,
                            message: '验证码已发送',
                            duration: 2000
                        })
                    }, 1000)
                    this.codeText = '重新发送'
                    this.codeNum = 60
                    timer = setInterval(() => {
                        if (this.codeNum > 0) {
                            this.codeNum--
                        } else {
                            clearInterval(timer);
                            timer = null;
                        }
                    }, 1000)
                })
            },
        },
    }
</script>

<style scoped lang="scss">
    .myForm {
        padding-bottom: 30px;
        .title {
            color: #3b4257;
            font-size: 16px;
            padding-top: 10px;
        }
        .img-box {
            width: 237px;
            height: 237px;
            padding: 19px;
            background: url("../../assets/image/2.png") no-repeat center;
            background-size: 100%;
            overflow: hidden;
            margin: 15px auto;
            .img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }
        .input-box {
            width: 100%;
            margin-top: 20px;
            padding: 0 44px;
            box-sizing: border-box;
            .input-item {
                background: #FFF;
                position: relative;
                border-radius: 25px;
                font-size: 16px;
                margin-bottom: 14px;
                .input-label {
                    width: 80px;
                    height: 40px;
                    line-height: 40px;
                    position: absolute;
                    text-align: right;
                }
                .my-input {
                    width: 100%;
                    height: 40px;
                    box-sizing: border-box;
                    padding-left: 80px;
                    line-height: 20px;
                    border-radius: 25px;
                }
            }
            .code-input {
                display: flex;
                .my-input {
                    flex: 1;
                }
                .code-btn {
                    padding: 0 10px;
                    min-width: 70px;
                    box-sizing: border-box;
                    border-top-right-radius: 25px;
                    border-bottom-right-radius: 25px;
                    background: #3ebaff;
                    color: #FFF;
                    font-size: 14px;
                }
            }
        }
        .btn-box {
            padding: 0 44px;
            box-sizing: border-box;
            margin-top: 20px;
            .btn {
                background-image: -webkit-linear-gradient(#13a323, #0b8917);
                background-image: linear-gradient(#13a323, #0b8917);
                box-shadow: 1px 0px 6px #0b8917;
                border-radius: 10px;
                width: 100%;
                box-sizing: border-box;
                color: #fff;
                font-size: 21px;
                padding: 10px 0;
            }
        }
    }
</style>
