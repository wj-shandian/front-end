# 下载

RN 的下载不像 web 可以直接下载
需要使用 RN 的 `react-native-fs` 库

## 安装

```bash
npm install react-native-fs --save
```

## 使用

```js
import React, { useState } from "react";
import { View, PermissionsAndroid } from "react-native";
import { isNative, isAndroid, isIOS } from "utils/platform";
import RNFS from "react-native-fs"; // 下载
import FileViewer from "react-native-file-viewer"; // 打开文件

export async function handleDownloadImage(downloadUrl) {
  // 图片还没有生成好
  if (!downloadUrl) {
    Toast.info("图片正在生成中，请稍后...", 2);
    return;
  }

  // 判断安卓是否有保存图片的权限
  if (isAndroid) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) return;
  }

  try {
    // ios可以直接保存网络图片，安卓需要自定义
    if (isIOS) {
      await CameraRoll.save(downloadUrl);
    } else {
      const localPath = `${RNFS.DocumentDirectoryPath}/${(
        Math.random() * 100000
      ).toFixed(0)}.jpg`;

      RNFS.downloadFile({
        fromUrl: downloadUrl,
        toFile: localPath,
      }).promise.then((rep) => {
        if (rep.statusCode === 200) {
          CameraRoll.saveToCameraRoll(localPath)
            .then(() => {
              Toast.info("已下载到相册");
            })
            .finally(() => {
              RNFS.unlink(localPath);
            });
          return;
        }

        Toast.info("保存失败");
      });
    }
    Toast.info("已下载到相册");
  } catch (error) {
    if (isIOS && error.code === "E_PHOTO_LIBRARY_AUTH_DENIED") {
      Toast.info("无法获取相册访问权限");
      return;
    }

    Toast.info("保存失败");
  }
}

export async function handleDownloadFile(downloadUrl, fileType) {
  let localPath = "";
  // 判断安卓是否有保存图片的权限
  if (isAndroid) {
    localPath = `${RNFS.ExternalDirectoryPath}`;
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) return;
  } else {
    localPath = `${RNFS.DocumentDirectoryPath}`;
  }

  const toFilePath = `${localPath}/${(Math.random() * 100000).toFixed(
    0
  )}.${fileType}`;

  try {
    RNFS.downloadFile({
      fromUrl: downloadUrl,
      toFile: toFilePath,
    })
      .promise.then((rep) => {
        if (rep.statusCode === 200) {
          FileViewer.open(toFilePath)
            .then((res) => {
              // console.log(res, 'res---');
            })
            .catch((err) => {
              Toast.info("暂无相关应用打开文件,请安装相关应用后打开");
            });
          // Toast.info('保存成功');
          return;
        }
        Toast.info("保存失败");
      })
      .catch((err) => {
        // console.log(err, 'erra');
      });
  } catch (error) {
    Toast.info(error);
  }
}
```

当然也可以根据自己的业务需求封装成 hooks

## 参考

- [react-native-fs](https://github.com/wkh237/react-native-fs)
