import md5 from '@/assets/js_sdk/ccdzhang-dokey/md5.js'
import dokey from '@/assets/js_sdk/ccdzhang-dokey/dokey.js';
const accessToken = window.myConfig.accessToken;
const areaSelect = {
    install(vue, options) {
        //post请求封装
        vue.prototype.ajaxPost = function (url, data, fun) {
            //loading
            const loadingToast = this.$toast({
                type: 'loading',
                mask: true,
                message:'服务器请求中',
                duration: 0, // 持续展示 toast
            });
            let secretdate = md5.md5(dokey.secretdate()).toUpperCase();
            let secreted = md5.md5(secretdate + JSON.stringify(data) + dokey.getkey()).toUpperCase();
            //网络请求前的loading
            options.axios.post(url, data, {
                headers: {
                    accessToken: accessToken,
                    sign: secreted,
                    timestamp:window.myConfig.timestamp
                },
            }).then((response) => {
                fun(response.data)
                //loading成功失败消失
                loadingToast.clear();
            }).catch((error) => {
                //服务器方面繁忙也消失
                loadingToast.clear();
                //服务器繁忙
                this.$toast({
                    type: 'fail',
                    mask: true,
                    message: '服务器繁忙'
                })
            })
        };
        vue.prototype.ajaxPostLoading = function (url, data, fun) {
            //loading
            const loadingToast = this.$toast({
                type: 'loading',
                mask: true,
                duration: 0, // 持续展示 toast
            });
            let secretdate = md5.md5(dokey.secretdate()).toUpperCase();
            let secreted = md5.md5(secretdate + JSON.stringify(data) + dokey.getkey()).toUpperCase();
            //网络请求前的loading
            options.axios.post(url, data, {
                headers: {
                    accessToken: accessToken,
                    sign: secreted,
                    timestamp:window.myConfig.timestamp
                },
            }).then((response) => {
                fun(response.data)
            }).catch((error) => {
                //服务器繁忙
                this.$toast({
                    type: 'fail',
                    mask: true,
                    message: '服务器繁忙'
                })
            })
        };
        vue.prototype.ajaxGet = function (url, data, fun) {
            //loading
            const loadingToast = this.$toast({
                type: 'loading',
                mask: true,
                message: '加载中...'
            });
            data.headers = {
                "Authorization": sessionStorage.getItem('Authorization') || "",
                "accept": "application/json"
            };
            //网络请求前的loading
            loadingToast.show();
            options.axios.get(url, data).then((response) => {
                if (response.data.code == 0) {
                    fun(response.data)
                } else if (response.data.code == 401) {
                    //未登陆重定向登陆页面
                    this.$router.push({path: '/login'});
                } else {
                    this.$toast({
                        type: 'fail',
                        mask: true,
                        message: response.data.msg
                    })
                }
                //loading成功失败消失
                setTimeout(() => {
                    loadingToast.clear();
                }, 1000)
            }).catch((error) => {
                console.log(error);
                //服务器方面繁忙也消失
                loadingToast.clear();
                //服务器繁忙
                this.$toast({
                    type: 'fail',
                    mask: true,
                    message: '服务器繁忙'
                })
            })
        };
    }
}
export default areaSelect
