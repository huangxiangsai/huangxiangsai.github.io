# 通用分享_Share

## 介绍

分享相关接口

## 模块名

**`Share`**

## 参数说明

#### 介绍

 - shareType 
    - 必须参数: 分享类型
    - 类型 ： String
 - params 
    - shareTemplate （主App 9.0.42支持的参数）
        - 选填，使用分享模板，支持“101”,“102”,“103”,“201”,“301”,“302”,“303“,”304“
        - 类型： String
    - ubt_currPage （主App 9.0.42支持的参数）
        - 选填，用于ubt统计的currPage参数
        - 类型： String
    - ubt_contentType （主App 9.0.42支持的参数）
        - 选填，用于ubt统计的ubt_contentType参数
        - 类型： String
    - ubt_contentId （主App 9.0.42支持的参数）
        - 选填，用于ubt统计的contentId参数
        - 类型： String
    - title 
        - 必须参数， 分享标题
        - 类型： String
    - desc
        - 必须参数， 分享内容  
        - 类型 ： string
    - link
        - 必须参数， 声音详情页跳转链接
        - 类型 ： String
    - imgUrl
        - 必须参数， 图片Url
        - 类型 ： String
    - type
        - 分享什么东西（通俗的讲）
        - 可选参数，默认是 link 
        - 可选类型

            - 默认是 链接即 `link`(主App iOS端传 `default`这个参数值，群峰 iOS端传 `link` 这个参数值)
            -  `music` ： 音乐
            -  `picture` ： 图片
            -  `video` ：视频是 
            - 对于不支持的的类型，iOS 端这个值统一传 `default`.比如上面的 `link`
        - 类型 String  
    - dataUrl 
        -  可选参数，声音MP3文件跳转地址
        -  类型 ： String
 - channel : 分享渠道
    - 类型 ： string数组
    - 必须参数
    - 可选渠道
        - 微信朋友圈 ： weixinGroup
        - 微信 ： weixin
        - 微博 ： tSina
        - QQ空间 ： qzone
        - QQ： qq
        - 群组： xmGroup
        - 我的动态： tingZone(听友圈iOS会默认弹出“已发送” 无法更改)
        - 圈子： community
        - 生成二维码： qrcode
        - 复制链接： url


#### 示例

```json
{
    "shareType": "default",
    "params":{
        "title":"分享标题",
        "desc":"分享内容",
        "link":"链接",
        "imgUrl":"http://baidu.image.com&id=1381",
        "type":"picture",
        "dataUrl":"http://xx.mp3.com&id=2342",
    },
    "channel":[
        "wx"
    ]
}

```

## 方法

 - share()
    - 参数 见上参数说明
    - 返回值
        - 分享失败 ，返回 

        ```json
        {
            "code":-1,
            "message":"分享失败",
            "data":{
                "device":"android",
                "deviceId":"2ufn2n2r20inf2rnbf dj3r",
                "appVersion":"1.0",
                "osVersion":"23",
                "channel":"weixin"
            }
        }
        ```

        - 取消分享：
        
        ```json
        {
            "code":-1,
            "message":"取消分享",
            "data":""
        }
        ```

        - 分享成功，如下
        
        ```json
        {
            "code":0,
            "message":"分享成功",
            "data":{
                "device":"android",
                "deviceId":"2ufn2n2r20inf2rnbf dj3r",
                "appVersion":"1.0",
                "osVersion":"23",
                "channel":"weixin"
            }
        }
        ```
       
    - 调用示例

        ```javascript
        NativeModules.Share.share({
            "shareType": "default",
            "channel": [
                "weixin"
            ],
            "params": {
                "title": "AlexanderMa禅修打坐 在喜马拉雅FM开通了问答，等待你的提问。",
                "desc": "TA在喜马拉雅FM开通了问答，快向TA提问吧！",
                "link": "http://hotline.ximalaya.com/hotline/answerer/82496140",
                "imgUrl": "http://fdfs.xmcdn.com/group29/M07/08/66/wKgJWVkusdjTwp6MAAFfBqlnZUc198_web_x_large.jpg",
                "type": "link",
                "dataUrl": ""
            }
        }).then((result) => {
            console.log(result)
        }).catch(e => {
            console.warn(e.message)
        })
        ```
    -   `注意`
        - `如果channel数组中只有一个值，那么就不会展示分享弹框`
        - `如果数组中有多个channel，那么会展示分享弹框（原生分享弹框） `
