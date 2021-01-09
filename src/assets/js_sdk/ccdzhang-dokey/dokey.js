import random from './random.js';

const key = window.myConfig.appsecret;
export default {
    secretdate: function () {
        let timestamp = new Date().getTime();
        window.myConfig.timestamp = timestamp
        let nonce = window.myConfig.accessToken;
        let data_for_sign = (nonce.toString() + timestamp);
        return data_for_sign;
    },
    getkey: function () {
        return key;
    }
}
