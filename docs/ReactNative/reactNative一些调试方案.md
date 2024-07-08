# native 端常见调试技巧及注意事项

## 1. 调试

react-native 在调试时，一般需要开启 Debug JS Remotely 模式。 
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/114906/1573543710248-7ce544d8-0d6c-4c6e-b5d4-9533e5ec62fe.png#align=left&display=inline&height=521&name=image.png&originHeight=1676&originWidth=852&size=671508&status=done&width=265)![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/114906/1573546252642-03477a35-5e07-4c1a-826e-f689f110c2f1.png#align=left&display=inline&height=513&name=image.png&originHeight=1468&originWidth=884&size=381699&status=done&width=309)

唤起方式:
真机： 摇晃手机即可唤起开发工具框
模拟器：
Android： command+M
ios:  command+D

android 端还可以直接通过执行 react-native log-android 查看 Android 端的 console.log 日志输出

## 2. 网络请求

移动端网络请求无法直接直观展示，只能通过抓包工具(如 Charles)进行抓包查看。具体抓包配置可以参考[文档](https://zhuanlan.zhihu.com/p/26182135)

## 3. native 端样式辅助排查

React-Native 是将 js 端 component 都会在 native 端以原生布局来展示出来，因为可以通过启动 Android 的开发者模式来显示布局边界。
具体流程 设置-> 系统->开发者选项->显示布局边界。 效果如下图
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/114906/1573549703744-00dbe537-f42f-42a6-a1df-9b376b8c6bca.png#align=left&display=inline&height=613&name=image.png&originHeight=1580&originWidth=892&size=1079012&status=done&width=346)
可以清晰看到每个 component 的布局边界，辅助排查 view 样式问题。

iOS 
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/114906/1573701146403-79dc3f69-2361-4976-adf5-b7af4feda14e.png#align=left&display=inline&height=937&name=image.png&originHeight=937&originWidth=1437&size=480594&status=done&width=1437)

## 3. 注意事项

1. iOS 模拟器无法调试 移动推送、分享、三方登录、支付、三方地图定位问题，需要进行真机调试。
1. ios 真机调试，需要添加真机 UDID 到 Apple 开发者平台，并且更新本地开发描述文件。debug 模式需要手机跟电脑在同一个网段，否则无法链接远程 jsbundle

## 4. APP 权限问题

目前随着 APP 安全及隐私问题要求越来越高，APP 的权限问题越来越重要。
如常见的拍照权限、定位权限、获取联系人权限、获取设备信息权限等等。
Android 权限详解

1. [Android 权限说明](https://developer.android.com/guide/topics/security/permissions.html?hl=zh-cn)
1. [权限申请最佳做发](https://developer.android.com/training/permissions/usage-notes?hl=zh-cn)

Ios 权限说明

```xml
<key>NSAppleMusicUsageDescription</key>
    <string>App需要您的同意,才能访问媒体资料库</string>
    <key>NSBluetoothPeripheralUsageDescription</key>
    <string>App需要您的同意,才能访问蓝牙</string>
    <key>NSCalendarsUsageDescription</key>
    <string>App需要您的同意,才能访问日历</string>
    <key>NSCameraUsageDescription</key>
    <string>App需要您的同意,才能访问相机</string>
    <key>NSHealthShareUsageDescription</key>
    <string>App需要您的同意,才能访问健康分享</string>
    <key>NSHealthUpdateUsageDescription</key>
    <string>App需要您的同意,才能访问健康更新 </string>
    <key>NSLocationAlwaysUsageDescription</key>
    <string>App需要您的同意,才能始终访问位置</string>
    <key>NSLocationUsageDescription</key>
    <string>App需要您的同意,才能访问位置</string>
    <key>NSLocationWhenInUseUsageDescription</key>
    <string>App需要您的同意,才能在使用期间访问位置</string>
    <key>NSMicrophoneUsageDescription</key>
    <string>App需要您的同意,才能访问麦克风</string>
    <key>NSMotionUsageDescription</key>
    <string>App需要您的同意,才能访问运动与健身</string>
    <key>NSPhotoLibraryUsageDescription</key>
    <string>App需要您的同意,才能访问相册</string>
    <key>NSRemindersUsageDescription</key>
    <string>App需要您的同意,才能访问提醒事项</string>
```
