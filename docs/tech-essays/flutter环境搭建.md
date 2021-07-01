## 下载 java 的 sdk

下载地址：`https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html`  
 然后一步步安装，在命令行里输入 java,可以显示很多命令解释，则说明安装成功

## 下载 flutter 的 sdk

到官网下载稳定版的 sdk,地址是：`https://flutter.dev/docs/development/tools/sdk/releases#windows`
可能会有变动，变动则网上搜索，下载好，然后解压到自己想放的文件夹中  
 然后再 flutter 文件下找到，flutter_console.bat,打开就可以运行 flutter  
 如果想要在任何位置都可以运行 flutter,那么还需要配置环境变量  
 我的电脑---属性--高级系统设置--环境变量  
 把 D:\flutter\flutter_windows_v1.7.8+hotfix.4-stable\flutter\bin，放在 path 下面保存就可以了  
 打开命令行，输入 flutter,看到很多命令行的解释就说明成功了
然后进行 flutter doctor 的测试，此时你会看到一些 X,说明有些内容还没有安装。接下来安装 android studio

## 安装 android studio

到官网下载地址是：`https://developer.android.com/`
然后一步一步安装，打开，file--plugins,搜索 flutter,
这个时候可能你搜索不到任何插件  
 然后 file--setting--appearance--systemSettings--updates  
 把 use secure connection 的勾选去掉
然后再点到 http proxy 查看代理选择 no proxy 然后保存
之后再取搜索插件，当然网络不好可能会影响搜索。
搜索之后然后下载 flutter。

## 虚拟机的安装

原本想使用 android studio 的虚拟机，奈何一直运行不起来，  
 感觉可能是公司电脑的内存太小无法运行，于是安装了一个夜神安卓模拟器
首选我们需要在 android studio 上安装 android 的 sdk  
 file--setting--appearance--systemsetting--android sdk
然后安装，然后配置环境变量  
 C:\Users\Administrator\AppData\Local\Android\Sdk\platform-tools  
 C:\Users\Administrator\AppData\Local\Android\Sdk\tools
然后配置到 path 下去，打开名令行，输入 adb version,如果成功打印版本则说明添加成功  
 否侧查看自己的环境变量配置，重新添加，路径是否正确。

打开夜神模拟器的安装位置，直到文件 bin,然后把路径添加到环境变量中：
例如：D:\模拟器\Nox\bin

## vscode 下载 flutter 插件

打开 vscode，下载 flutter 插件，成功下载，然后 flutter creater <文件名>  
 成功创建文件，然后 flutter run  
 这时会提示没有设备

连接夜神模拟器，首先打开夜神模拟器，在命令行中输入 adb connect 127.0.0.1:62001  
 正常情况下就可以成功连接，然后在 vscode 右下角可以成功看到设备名称。
运行 flutter run ,此时会看到很多的报错。
首先输入命令 flutter doctor  
 查看有没有 X，如果证书有问题 ，就重新安装证书输入命令：flutter doctor --android-licenses  
 一路 y 即可，
然后 fluuter run 可以看到一篇红，修改项目下 android - gradle -build.gradle 文件

```js
buildscript {
  repositories {
      // google()
      // jcenter()
      maven { url 'https://maven.aliyun.com/repository/google' }
      maven { url 'https://maven.aliyun.com/repository/jcenter' }
      maven { url 'http://maven.aliyun.com/nexus/content/groups/public'}
  }

  dependencies {
      classpath 'com.android.tools.build:gradle:3.1.2'
  }
}

allprojects {
  repositories {
      // google()
      // jcenter()
      maven { url 'https://maven.aliyun.com/repository/google' }
      maven { url 'https://maven.aliyun.com/repository/jcenter' }
      maven { url 'http://maven.aliyun.com/nexus/content/groups/public'}
  }
}
```

然后找到 flutter 的 flutter.gradle 文件：D:\flutter\flutter_windows_v1.7.8+hotfix.4-stable\flutter\packages\flutter_tools\gradle

```js
buildscript {
    repositories {
        //google()
        //jcenter()
        maven { url 'https://maven.aliyun.com/repository/google' }
        maven { url 'https://maven.aliyun.com/repository/jcenter' }
        maven { url 'http://maven.aliyun.com/nexus/content/groups/public'}
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.1.2'
    }
}
```

主要是修改代理：

```js
        maven { url 'https://maven.aliyun.com/repository/google' }
        maven { url 'https://maven.aliyun.com/repository/jcenter' }
        maven { url 'http://maven.aliyun.com/nexus/content/groups/public'}
```

还有可能用了阿里云的依然会报错，又可能是使用的 gradle 的版本较高，阿里云的不能及时更新，这时候我们要降低一下 gradle 的版本  
找到 flutter 的 flutter.gradle 和 build.gradle 的

```js
dependencies {
        classpath 'com.android.tools.build:gradle:3.1.2'
    }
```

更改相应的版本号，保存，然后再运行。
如果一顿操作之后依然运行不了，这个时候要 flutter doctor 一下看看有没有 X,
安卓的证书有可能失效会导致一直运行不起来，重装即可。
运行起来，打开夜神模拟器，然后就可以看到了。
