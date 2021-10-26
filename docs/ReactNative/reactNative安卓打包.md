## 首先生成一个签名

```
 keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 1000
```

- my-release-key.keystore 其中 my-release-key 可以修改成自己任意想改的名字
- -alias my-key-alias 这个别名也需要记住 因为需要设置

## 设置 gradle 变量

reactNative 项目下 android 目录下有个 gradle.properties 可以设置全局变量

添加以下内容

```js
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****
```

密码在你开始生成签名的时候会有要求输入密码 这个地方**\***修改成自己的密码即可

当然这里不设置变量也可以 。直接在配置里面写入即可。后面会解释

## 把签名配置加入项目中

编辑 android/app/build.gradle，添加配置

```js
...
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                storeFile file(MYAPP_RELEASE_STORE_FILE)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            }
            // 或者 这样写 不需要配置变量
            //  keyAlias 'shanji' //别名
            //  keyPassword '123456' //密钥密码 之前设置秘钥口令
            //  storeFile file('shanji.keystore') //shanji.keystore文件的绝对路径
            //  storePassword '123456' //存储密码
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
...
```

## package.json 添加打包命令

```js
"scripts": {
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "start": "react-native start",
    "build:android": "cd ./android && ./gradlew assembleRelease",
    "test": "jest",
    "lint": "eslint ."
  },
```

执行 npm run build:android 成功之后 查看 app/build/outputs/apk/release 目录下面有个 app-release.apk 包，这样就代表打包成功了。

[更多方案参考官网即可](https://www.react-native.cn/docs/signed-apk-android)
