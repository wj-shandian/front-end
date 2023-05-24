reactNative 项目禁止 app 横屏展示

## 安卓

目录 android/app/src/main/AndroidManifest.xml

```js
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
  xmlns:tools="http://schemas.android.com/tools"
  package="com.cua.cuaapp"
  android:versionCode="1"
  android:versionName="1.0.0">
  <queries>
    <package android:name="com.tencent.mm" />
    <package android:name="com.tencent.mobileqq" />
    <package android:name="com.eg.android.AlipayGphone"/>
  </queries>

  <application
    android:name=".MainApplication"
    android:allowBackup="false"
    android:appComponentFactory="android.support.v4.app.CoreComponentFactory"
    android:icon="@mipmap/ic_launcher"
    android:label="@string/app_name"
    android:theme="@style/AppTheme"
    android:usesCleartextTraffic="true"
    android:requestLegacyExternalStorage="true"
    tools:replace="android:allowBackup,android:appComponentFactory">
    <activity
      android:name=".MainActivity"
      android:configChanges="keyboard|keyboardHidden|orientation|screenSize|uiMode"
      android:screenOrientation="portrait" // 添加这行代码 禁止横屏
      android:label="@string/app_name"
      android:launchMode="singleTask"
      android:theme="@style/ActivityTheme"
      android:windowSoftInputMode="adjustPan|stateHidden">
      <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
      </intent-filter>
      <intent-filter>
        <action android:name="android.intent.action.VIEW" />

        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />

        <data android:scheme="ddyd" />
      </intent-filter>
    </activity>

    <activity android:name="com.facebook.react.devsupport.DevSettingsActivity" />

    <meta-data
      android:name="android.max_aspect"
      android:value="2.1" />

    <meta-data
      android:name="TRNW_CHANNEL_CODE"
      android:value="0002"></meta-data>

    <meta-data
      android:name="TRNW_CHANNEL_VALUE"
      android:value="tmall"></meta-data>

    <meta-data
      android:name="CHANNEL"
      android:value="terminus" />

    <uses-library
      android:name="org.apache.http.legacy"
      android:required="false" />
  </application>
  <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />
  <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
  <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
  <uses-permission android:name="android.permission.INTERNET" />

  <!--用于进行网络定位-->
  <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
  <!-- 可以提高室内定位的精确度 -->
  <uses-permission android:name="android.permission.BLUETOOTH_ADMIN"/>
  <!-- 可以提高室内定位的精确度 -->
  <uses-permission android:name="android.permission.BLUETOOTH"/>
  <!--用于访问GPS定位-->
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
  <!--用于提高GPS定位速度-->
  <uses-permission android:name="android.permission.ACCESS_LOCATION_EXTRA_COMMANDS"/>
  <!--写入扩展存储，向扩展卡写入数据，用于写入缓存定位数据-->
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
  <!--AMAP SDK库里面重复声明了权限，会导致合并失败-->
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" tools:node="remove"/>
  <uses-permission android:name="android.permission.RECORD_AUDIO"/>
  <uses-sdk tools:overrideLibrary="com.facebook.react"/>

</manifest>

```

## ios

用 xcode 打开 项目的 ios 目录

![](img/ios%E6%A8%AA%E5%B1%8F.png)

只勾选第一个

然后重新编译 然后发现 ios 目录下 Info.plist 这个文件有变化

```js
// 可以发现 这个保留了一个横屏
<array>
  <string>UIInterfaceOrientationPortrait</string>
</array>
```
