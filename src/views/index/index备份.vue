<template>
    <div class="index">
        <p class="p-top">请正对手机，确保光线充足</p>
        <i class="face-img"></i>
        <p class="p-red">请确保是本人操作</p>
        <div class="btn-box">
            <button class="btn-start" @click="isAgreeBox = false">开始采集</button>
        </div>
        <p class="p-blue">本次人脸采集图片仅用于本医院为患者提供智慧医院服务</p>
        <div class="agreementBox animated fadeIn" :class="{'agreeBox-none':isAgreeBox}">
            <p class="agree-title">人脸采集用户协议</p>
            <p class='firstP'>
                此人脸采集用户协议（以下简称“本协议”）是由您与{{hospital}}医院就“人脸采集”相关事项所订立的有效合约。请您先仔细阅读并充分理解本协议全部内容，尤其是字体加粗部分。如您对本协议内容及页面提示信息有疑问，请勿进行下一步操作。您在页面通过点击或其他方式确认即表示您已同意本协议。</p>
            <h4>一、定义</h4>
            <p>1.1&nbsp;&nbsp;脸部特征：可用以区分自然人个体的独特脸部特征。</p>
            <p>1.2&nbsp;&nbsp;人脸采集：通过比对脸部特征并结合用户的身份信息，建立人脸信息，确认用户本人身份，并用户提供医院信息建档、预约挂号、排队叫号、充值、结算等业务。</p>
            <h4>二、双方权利义务</h4>
            <p>2.1&nbsp;&nbsp;您同意仅使用您本人的脸部特征为您本人办理医院业务。</p>
            <p>2.2&nbsp;&nbsp;您<span class='boldFont'>同意开通并使用刷脸服务。</span>您同意开通并使用刷脸服务。为了方便您在医院使用刷脸服务办理医院业务，<span
                    class='boldFont'>您授权{{hospital}}医院采集并保存您的脸部特征和设备信息。</span>
            </p>
            <p>2.3&nbsp;&nbsp;为了提高验证的安全性与准确性，<span class='boldFont'>您同意{{hospital}}医院可在必要时将您向{{hospital}}医院提供的脸部特征与法律法规允许的机构或政府机关授权的机构所保存的您的脸部特征进行比对核验。</span>
            </p>
            <p>2.4&nbsp;&nbsp;您<span class='boldFont'>理解并同意，一旦您使用人像识别功能扫描脸部并通过之后，即视为您发出了在{{hospital}}医院办理业务的指令。</span>
            </p>
            <p>2.5&nbsp;&nbsp;您同意不将本人的脸部特征用于他人账户办理医院业务，或采取不正当或欺骗手段使用他人账户，否则{{hospital}}医院有权停止为您提供服务并依法采取相应的法律措施。</p>
            <p>2.6&nbsp;&nbsp;<span class='boldFont'> {{hospital}}医院重视对您的信息保护，承诺严格保护您的身份资料和脸部特征。<span class='lineFont'>{{hospital}}医院将依照法律法规及其他与您的约定保护您的信息。</span></span>
            </p>
            <h4>三、协议变更</h4>
            <p>3.1&nbsp;&nbsp;为了配合生物识别技术的进步并改善用户体验，{{hospital}}医院将会持续改进并为用户提供系统升级、功能升级等服务，这些更新将会持续同步在协议条款当中。<span
                    class='boldFont'>如您选择继续使用刷脸就医服务，则表示您同意更新后的协议条款。</span>如果更新的内容涉及您的主要权利或责任，{{hospital}}医院会向您进行提示，您也可以随时通过公众号或网站查阅最新版本的协议条款。
            </p>
            <p>3.2&nbsp;&nbsp;基于法律法规变化、监管政策变化或业务调整需要，<span class='boldFont'>{{hospital}}医院提前通过推送通知、发送邮件、发送短 信或在网站公告的方式，可以停止向您提供本协议项下的服务。</span>
            </p>
            <h4>四、责任限制</h4>
            <p>
                4.1&nbsp;&nbsp;{{hospital}}医院应在现有技术能力基础上保障刷脸就医的有效、正常运行，并尽商业上合理的努力来提升刷脸验证结果的准确性。但是，由于采集脸部特征易受表情、妆容、环境光等可变因素影响，且{{hospital}}医院能采集到的信息范围有限、技术水平及认证手段也仍在持续改进之中，<span
                    class='boldFont'>{{hospital}}医院暂无法保证刷脸验证结果的绝对准确。</span>如您发现刷脸验证结果不准确，您可重新提交脸部特征，<span
                    class='redFont'>或通过告知{{hospital}}医院，</span>以便我们重新验证并进一步提升验证水平。</p>
            <p>4.2&nbsp;&nbsp;请您理解，由于技术水平限制及可能存在的各种恶意手段，{{hospital}}医院刷脸就医有可能因{{hospital}}医院可控范围外的因素而出现问题。<span
                    class='boldFont'>由于不可抗力、计算机黑客袭击、系统故障、通讯故障、供电系统故障、电脑病毒、恶意程序攻击及其他不可归因于{{hospital}}医院的情况而导致用户损失的，{{hospital}}医院不承担责任；</span>但如因{{hospital}}医院故意或重大过失导致您的信息泄露并给您造成直接损失的，{{hospital}}医院应依法承担赔偿责任。若不幸发生个人信息安全事件，{{hospital}}医院将按照法律法规的要求，及时向您告知安全事件的基本情况和可能的影响、{{hospital}}医院已采取或将要采取的处置措施、您可自主防范和降低风险的建议、对您的补救措施等。我们将及时将事件相关情况以邮件、信函、电话、推送通知方式或发布公告的方式告知您。
            </p>
            <p>4.3&nbsp;&nbsp;{{hospital}}医院提醒您，{{hospital}}医院按本协议约定仅向您提供{{hospital}}医院刷脸就医服务。医院将独立向您提供具体服务，<span
                    class='boldFont'>{{hospital}}医院无法对医院向您提供的服务作出承诺或承担担保责任。</span>您与医院之间就具体服务的争议和纠纷，请您与医院协商解决。
            </p>
            <h4>五、协议的解释</h4>
            <p>5.1&nbsp;&nbsp;本协议的成立、生效、履行和解释，均适用中华人民共和国法律。<span class='lineFont'>本服务协议未约定部分依照<span class='blueFont'>《{{hospital}}医院服务协议》</span>及相关附属规则予以履行；本协议与<span
                    class='blueFont'>《{{hospital}}医院服务协议》</span>及相关附属规则不一致的，</span>以本协议为准。</p>
            <h4>六、争议的解决</h4>
            <p class='lastP'>6.1&nbsp;&nbsp;双方在履行本协议的过程中，如发生争议，应友好协商解决。协商不成的，任何一方均可向<span class='blodFont'>被告住所地</span>有管辖权的人民法院提起诉讼。
            </p>
            <button class='agreeBtn'>同 意</button>
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
        }

        .p-blue {
            font-size: 12px;
            color: #0581d7;
            margin-top: 10px;
        }
        .agreeBox-none {
            display: none !important;
        }
        .fileInput {
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 56px;
            opacity: 0;
            z-index: 99;
        }
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
