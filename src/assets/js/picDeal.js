/** 图片压缩，默认同比例压缩
  *  @param {Object} fileObj
  *  图片对象
  *  回调函数有一个参数，base64的字符串数据
  */
const compress = function compress(fileObj, callback) {
    try {
        const image = new Image()
        image.src = URL.createObjectURL(fileObj)
        image.onload = function () {
            const that = this
            let w = that.width
            let h = that.height
            // const scale = w / h
            let quality = 0.7
            let img_width = 750 //此处的750是压缩后图片的宽度，也是canvas画布的宽度
            //定义压缩后的宽度，也可封装后调用时传入
            //宽度750 ，通过计算可得出缩放后的高
            that.height = img_width*h/w
            that.width = img_width
            // 生成canvas
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            // 创建属性节点
            const anw = document.createAttribute('width')
            anw.nodeValue = img_width
            const anh = document.createAttribute('height')
            anh.nodeValue = img_width*h/w
            canvas.setAttributeNode(anw)
            canvas.setAttributeNode(anh)
            const Orientation = sessionStorage.getItem('myOrientation')
            // 如果方向角不为1，都需要进行旋转 added by lzk
            if (Orientation != "" && Orientation != 1 && Orientation != 'undefined') {
                switch (parseInt(Orientation)) {
                    case 6://需要顺时针（向左）90度旋转
                        rotateImg(that, 'left', canvas,w,h);
                        break;
                    case 8://需要逆时针（向右）90度旋转
                        rotateImg(that, 'right', canvas,w,h);
                        break;
                    case 3://需要180度旋转
                        rotateImg(that, 'right', canvas,w,h);//转两次
                        rotateImg(that, 'right', canvas,w,h);
                        break;
                }
            }else{
                ctx.drawImage(image, 0, 0, w, h, 0, 0, img_width,img_width*h/w)
                // ctx.drawImage(that, 0, 0, w, h)
            }
            // 图像质量
            if (fileObj.quality && fileObj.quality <= 1 && fileObj.quality > 0) {
                quality = fileObj.quality
            }
            // quality值越小，所绘制出的图像越模糊
            const data = canvas.toDataURL('image/jpeg', quality)
            // 压缩完成执行回调
            const newFile = convertBase64UrlToBlob(data)
            callback(newFile)

        }
    } catch (e) {
        console.log('压缩失败!')
    }
}

function convertBase64UrlToBlob(urlData) {
    const bytes = window.atob(urlData.split(',')[1]) // 去掉url的头，并转换为byte
    // 处理异常,将ascii码小于0的转换为大于0
    const ab = new ArrayBuffer(bytes.length)
    const ia = new Uint8Array(ab)
    for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i)
    }
    return new Blob([ab], {type: 'image/png'})
}

//对图片旋转处理 added by lzk
function rotateImg(img, direction,canvas,w,h) {
    //最小与最大旋转方向，图片旋转4次后回到原方向
    var min_step = 0;
    var max_step = 3;
    //var img = document.getElementById(pid);
    if (img == null)return;
    //img的高度和宽度不能在img元素隐藏后获取，否则会出错
    var height = h;
    var width = w;
    //var step = img.getAttribute('step');
    var step = 2;
    if (step == null) {
        step = min_step;
    }
    if (direction == 'right') {
        step++;
        //旋转到原位置，即超过最大值
        step > max_step && (step = min_step);
    } else {
        step--;
        step < min_step && (step = max_step);
    }
    //旋转角度以弧度值为参数
    var degree = step * 90 * Math.PI / 180;
    var ctx = canvas.getContext('2d');
    switch (step) {
        case 0:
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0);
            break;
        case 1:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, 0, -height);
            break;
        case 2:
            canvas.width = width;
            canvas.height = height;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, -height);
            break;
        case 3:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, 0);
            break;
    }
}
export default compress
