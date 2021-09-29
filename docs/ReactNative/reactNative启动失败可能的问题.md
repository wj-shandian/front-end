## react-native :app:installDebug FAILED

检查设备是否安装了同名设备，如果有先卸载再重试

是否连接了设备 如果没有 请连接 adb reverse tcp:8081 tcp:8081

以上都尝试之后还报错，清除缓存试试

```js
cd android

.\gradlew clean

cd ..

npm cache clean --force

重新启动
```

## 安卓初始化项目需要在 android 项目下添加一个文件

- What went wrong:
  Could not determine the dependencies of task ':app:compileDebugJavaWithJavac'.
  > SDK location not found. Define location with an ANDROID_SDK_ROOT environment variable or by setting the sdk.dir path in your project's local properties file at '/Users/wangjie/mySpace/shanJi/android/local.properties'.

文件名 local.properties
内容 sdk.dir = /Users/wangjie/Library/Android/sdk wangjie 需要改成你自己的项目目录名称

## 忘记什么错误的问题

在 android app 目录下 的 build.gradle

少了一个 arm64-v8a 而不能正常 build 遇到问题可以参考一下

```
include "armeabi-v7a", "x86", "arm64-v8a", "x86_64"
```
