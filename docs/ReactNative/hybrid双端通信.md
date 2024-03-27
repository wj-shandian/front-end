# hybrid 双端通信

混合开发中，主要的通信都是通过 JSBridge 实现的。

常规的方案都是

```js
         ->         ->
Native      JSBridge    WebView
         <-         <-
```

通过 JSBridge 进行桥接

## JSBridge 基本使用 Webview 调用 Native

1. 向 Native 发消息 不需要回调

```js
const payload = {
  test: "test",
};
JSBridge.postMessage({
  type: "webview_event",
  payload,
});
```

2. 调用 Native 方法，传递信息，并执行回调函数

```js
JSBridge.invoke("webview_event", payload, function (res) {
  // 执行 native 的回调函数
});
```

3. 监听 Native 事件。

```js
JSBridge.registerEvent("webview_event", function (res) {
  // 监听 native 的 webview_event 事件，
});
```

通过监听器监听 Native 通知的 webview_event、事件执行、回调函数触发。当然，上面的 JSBridge 和下面的方法并不是直接存在的，需要我们自己实现。

## JS 调用 Native

1. API 注入
   通过 Native 注入 api 的方式本质上是 WebView 提供对应的接口，Native 可以通过接口把方法进行映射，并最终挂载 window 对象上。当 JavaScript 中调用该方法时，本质上调用的就是与之对应的 Native 方法。
2. url scheme 拦截
   通过 locaiton.href 或者 iframe.src 改变 url，Native 可以感知到 scheme 的变化进行拦截，参数会以 query string 的方式存在于 url 上。

   例如 xxx://xxx.xxx.com/message?name=alien 类似的
   但是这种方式会有一些缺陷 url 长度的限制等

## Native 调用 JS

Native 调用 JavaScript 的方式本质上就是调用 WebView 上的方法。Native 调用 JavaScript 其实就是执行拼接 JavaScript 字符串，从外部调用 JavaScript 中的方法，因此 JavaScript 的方法必须在全局的 window 上。

例如

```js
WebView.loadUrl("javascript:xxxfunction()");
```

例如

```js
webView.evaluateJavascript("javascript:alert('测试标题')", resultCallback);
```

有回调函数

JSBridge 伪代码

```js
const isAndroid = window.navigator.userAgent.indexOf('Android') !== -1
​
 function possNativeMessage(message){
    if(isAndroid){
        window.JSOriginBridge.postMessage(message);
    }else {
        window.webkit.messageHandlers.JSOriginBridge.postMessage(message);
    }
}
​
/* 向 Native 发布事件 */
function publishNativeMessage(params){
    const message = {
        eventType:'publish',
        data:params
    }
    possNativeMessage(message)
}
​
/* 触发 Native 方法, 触发回调函数 */
function invokeNativeEvent(name,params,callbackId){
    const message = {
        eventType:'invoke',
        type:name,
        data:params,
        callbackId
    }
    possNativeMessage(message)
}
​
class JSBridge {
    /* 保存 */
    eventHandlers = new Map()
    responseCallbacks = new Map()
    callbackID = 0
    constructor() {
        window._handleNativeCallback = this.handleNativeCallback.bind(this)
        window._handleNativeEvent = this.handleNativeEvent.bind(this)
    }
    /* 向 native 发送消息 */
    postMessage(params){
        const data = JSON.stringify(params)
        publishNativeMessage(data)
    }
     /* 向 native 发送消息,等待回调函数 */
    invoke(name,payload,callback){
        this.callbackID++
        /* 将回调函数保存起来 */
        this.responseCallbacks.set(this.callbackID,callback)
        invokeNativeEvent(name,payload,this.callbackID)
    }
    /*
    处理 native 调用 window 上的 _handleNativeCallback 方法。
    当执行 invoke 回调的时候，执行该方法
    */
    handleNativeCallback(jsonResponse){
        const res = JSON.parse(jsonResponse)
        const { callbackID,...params } = res
        const callback = this.responseCallbacks.get(callbackID)
        /* 取出回调函数并且执行 */
        callback && callback(params)
        /* 删除对应的回调函数 */
        this.responseCallbacks.delete(callbackID)
    }
    /*
     处理 native 调用 window 上的 _handleNativeEvent 方法。
     处理绑定在 native 的事件
     */
    handleNativeEvent(jsonResponse){
        const res = JSON.parse(jsonResponse)
        const { eventName,...params } = res
        const callback = this.eventHandlers.get(eventName)
        callback(params)
    }
    /* 绑定注册事件 */
    registerEvent(name,callback){
        this.eventHandlers.set(name,callback)
    }
    /* 解绑事件 */
    unRegisterEvent(name){
        this.eventHandlers.delete(name)
    }
}
​
export default new JSBridge()

```

仔细阅读 就会发现 这其实就是发布订阅模式
