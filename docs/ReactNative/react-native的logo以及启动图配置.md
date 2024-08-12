# 常用配置

## Logo

```js
//android
android/app/src/main/res/  // 路径
├── mipmap-hdpi
│   └── ic_launcher.png    // 72*72
├── mipmap-mdpi
│   └── ic_launcher.png   // 48*48
├── mipmap-xhdpi
│   └── ic_launcher.png   // 96*96
├── mipmap-xxhdpi
│   ├── ic_launcher.png   // 144*144
├── mipmap-xxxhdpi
│   └── ic_launcher.png   // 192*192

//ios

ios/项目名称/Images.xcassets/
├── AppIcon.appiconset   // 图片名称规则 实际大小 1x图的大小*倍数，如icon-20@3x.png 大小size=20*3
│   ├── Contents.json
│   ├── icon-1024@1x.png
│   ├── icon-20@2x.png
│   ├── icon-20@3x.png
│   ├── icon-29@2x.png
│   ├── icon-29@3x.png
│   ├── icon-40@2x.png
│   ├── icon-40@3x.png
│   ├── icon-60@2x.png
│   └── icon-60@3x.png
├── Contents.json
└── LaunchImage.launchimage  //启动图
```

## 启动图

```js
// Android启动图路径如下
// 一般情况下只需要一张1080*1920的图片即可，720*1080也行(手淘用的是该尺寸)
// 启动图不能过于复杂、过大，内容展示需要在安全区域内
// 一般背景纯色比较好
android/app/src/main/res/
├── mipmap-hdpi
├── mipmap-mdpi
├── mipmap-xhdpi
├── mipmap-xxhdpi
│   └── start_up.png

//iOS启动图路径如下
//iOS由于需要App Store上架原因，对启动图要求比较多
// 目前只考虑竖屏
ios/项目名称/Images.xcassets/LaunchImage.launchimage/
├── 1125x2436.png
├── 1242x2208.png
├── 640x1136-1.png
├── 640x1136.png
├── 640x960-1.png
├── 640x960.png
├── 750x1334.png
└── Contents.json

```

## APP 名称和版本

iOS：iOS 版本在项目目录下的 ios/projectName/Info.plist 文件中修改分别是 CFBundleDisplayName(APP 名称)

android: APP 名称修改路径： android/app/src/main/res/values/strings.xml

```js
<resources>
  <string name="app_name">测试APP</string>
</resources>
```

```js
// android/app/build.gradle
android {
 defaultConfig {
  versionCode 2
    versionName "1.0.1"
 }
}
```
