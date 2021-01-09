<template>
    <div class="index">
        <p class="p-top">请正对手机，确保光线充足</p>
        <i class="face-img"></i>
        <p class="p-red">请确保是本人操作</p>
        <div class="btn-box">
            <!--IOS-->
            <input type="file"
                   accept="image/*"
                   capture="user"
                   @change="changePic"
                   class="fileInput"
                   @click="agreeFun"
                   v-if="isIos"
                   id="fileInput"/>
            <!--微信安卓-->
            <input
                    v-else
                    type="file"
                    accept="image/*"
                    capture="camera"
                    @change="changePic"
                    class="fileInput"
                    @click="agreeFun"
                    id="fileInput"/>
            <button class="btn-start" @click="isAgreeBox = false">开始采集</button>
        </div>
    </div>
</template>

<script>
    import lrz from 'lrz'
    import rotate from '../../assets/js/picRotate'
    export default {
        name: "index",
        data() {
            return {
                isAgreeBox: true,
                isIos: '',
                isImageAutomaticRotation: ''
            }
        },
        computed: {
            hospital: () => {
                return window.myConfig.hospitalName
            }
        },
        created() {
            this.testIos()
            //获取浏览器的userAgent,并转化为小写
            let ua = navigator.userAgent.toLowerCase();
            this.isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1);
            sessionStorage.setItem('name', decodeURI(this.getUrlCode().name))
            sessionStorage.setItem('idcard', this.getUrlCode().idcard)
            sessionStorage.setItem('mobile', this.getUrlCode().mobile)
            sessionStorage.setItem('pageUrl', decodeURIComponent(this.getUrlCode().page))
        },
        methods: {
            //检测当前IOS版本是否会自动回正
            changePic() {
                let that = this
                let file = document.getElementById('fileInput').files[0];
                lrz(file, {width: 1024, quality: 0.3})
                    .then((res) => {
                        if (!this.isImageAutomaticRotation) {//不会自动校正的ios
                            this.pushImage(res.base64)
                        } else {//会自动校正的旋转逆时针90°
                            let newFile = this.convertBase64UrlToBlob(res.base64)
                            rotate(newFile, (val) => {
                                let reader = new FileReader() //html5读文件
                                //转BASE64
                                reader.readAsDataURL(val)
                                reader.onload = e => {
                                    that.pushImage(e.target.result)
                                }
                            })
                        }
                    })
                    .catch(function (err) {
                        // 如果出错了，这里可以捕捉到错误信息
                        // 而且以上的then都不会执行
                        let reader = new FileReader() //html5读文件
                        //转BASE64
                        reader.readAsDataURL(file)
                        reader.onload = e => {
                            that.pushImage(e.target.result)
                        }
                    })
            },
            pushImage(imgUrl) {
                this.ajaxPost(this.rootUrl + "queryAnalyze", {
                    base64Img: imgUrl
                }, (res) => {
                    if (res.success === 'true' || res.success === true) {
                        sessionStorage.setItem('myFaceImg', imgUrl)
                        this.$router.push({
                            path: '/form'
                        })
                    } else {
                        setTimeout(() => {
                            this.$toast({
                                type: 'fail',
                                mask: true,
                                message: res.message,
                                duration: 2000
                            })
                        }, 500)
                    }
                })
            },
            agreeFun() {
                this.isAgreeBox = true
            },
            getUrlCode() { // 截取url中的参数
                let url = location.hash
                let theRequest = new Object()
                if (url.indexOf("?") != -1) {
                    let str = url.substr(8)
                    let strs = str.split("&")
                    for (let i = 0; i < strs.length; i++) {
                        theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1])
                    }
                }
                return theRequest
            },
            //检测当前IOS版本是否会自动回正
            testIos() {
                // 用一张特殊的图片来检测当前浏览器是否对带 EXIF 信息的图片进行回正
                // 方法来源: https://github.com/blueimp/JavaScript-Load-Image
                // 一张 2x1 的 JPEG 图片, EXIF Orientation: 6
                const testAutoOrientationImageURL =
                    'data:image/jpeg;base64,/9j/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAYAAAA' +
                    'AAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBA' +
                    'QEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQE' +
                    'BAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAEAAgMBEQACEQEDEQH/x' +
                    'ABKAAEAAAAAAAAAAAAAAAAAAAALEAEAAAAAAAAAAAAAAAAAAAAAAQEAAAAAAAAAAAAAAAA' +
                    'AAAAAEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8H//2Q==';
                const img = new Image();
                img.src = testAutoOrientationImageURL;
                img.onload = () => {
                    // 如果图片变成 1x2，说明浏览器对图片进行了回正
                    this.isImageAutomaticRotation = img.width === 1 && img.height === 2;
                };
            },
            convertBase64UrlToBlob(urlData) {
                const bytes = window.atob(urlData.split(',')[1]) // 去掉url的头，并转换为byte
                // 处理异常,将ascii码小于0的转换为大于0
                const ab = new ArrayBuffer(bytes.length)
                const ia = new Uint8Array(ab)
                for (let i = 0; i < bytes.length; i++) {
                    ia[i] = bytes.charCodeAt(i)
                }
                return new Blob([ab], {type: 'image/png'})
            }
        }
    }
</script>

<style scoped lang="scss">
    .index {
        .p-top {
            padding-top: 15px;
            padding-bottom: 25px;
            font-size: 17px;
            color: #000;
        }
        .face-img {
            display: inline-block;
            width: 275px;
            height: 300px;
            background: url("../../assets/image/rlcj.png") no-repeat;
            background-size: 275px 300px;
        }
        .p-red {
            padding: 20px 0 40px 0;
            color: #fe5447;
            font-size: 17px;
        }
        .btn-box {
            position: relative;
            .btn-start {
                background-image: -webkit-linear-gradient(#4372eb, #224ecb);
                background-image: linear-gradient(#4372eb, #224ecb);
                box-shadow: 1px 0px 6px #224ecb;
                border-radius: 10px;
                width: 300px;
                color: #fff;
                font-size: 21px;
                margin: 0 auto 5px;
                padding: 10px 0;
            }
            input{
                width: 100%;
                height: 60px;
                position: absolute;
                left: 0;
                top: 0;
                opacity: 0;
                z-index: 99;
            }
        }

        .p-blue {
            font-size: 12px;
            color: #0581d7;
            margin-top: 10px;
        }
        .agreeBox-none {
            display: none !important;
        }
        /*.fileInput {*/
            /*position: fixed;*/
            /*left: 0;*/
            /*bottom: 0;*/
            /*width: 100%;*/
            /*height: 56px;*/
            /*opacity: 0;*/
            /*z-index: 99;*/
        /*}*/
        .agreementBox {
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            background: #FFF;
            color: #454545 !important;
            text-align: left;
            font-size: 14px;
            padding: 0 5px;
            .agree-title {
                text-align: center;
                font-size: 20px;
                font-weight: bold;
                padding: 10px 0 5px;
            }
            h4 {
                font-size: 18px;
                font-weight: bold;
                padding: 5px 0;
            }
            .firstP {
                text-indent: 40px;
            }
            .boldFont {
                font-weight: 600;
            }
            .lineFont {
                text-decoration: underline;
            }
            .redFont {
                color: #FF3333
            }
            .blueFont {
                color: #3d91e8;
            }
            .agreeBtn {
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                background: #3d91e8;
                color: #FFF;
                font-size: 15px;
                border-radius: 0;
                margin-top: 30px;
                padding: 13px 0;
                margin-bottom: 0 !important;
                &:after {
                    border: none;
                }
            }
            .lastP {
                padding-bottom: 150px;
            }
        }
    }
</style>
