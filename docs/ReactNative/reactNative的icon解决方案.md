# react-native-svg

使用 react-native-svg 搭配 iconfont

## 编写脚本

```js
const fs = require("fs");
const path = require("path");
const request = require("request");

// 下载iconfontsvg图标
function downloadFile(uri, filename, callback) {
  const stream = fs.createWriteStream(`./src/fonts/${filename}`);
  request(uri).pipe(stream).on("close", callback);
}
let fileUrl = process.argv[2];
const filename = "svgfont.js";
if (fileUrl.indexOf("//") === 0) fileUrl = `http:${fileUrl}`;

downloadFile(fileUrl, filename, () => {
  svgformat("./src/fonts");
});

function svgformat(filePath) {
  fs.readFile(path.join(filePath, filename), "utf8", (error, data) => {
    if (error) {
      throw error;
    } else {
      // const pattern = /<symbol ("[^"]*"|'[^']*'|[^'">])*>[\s\S]*?<\/symbol>/
      // 获取svg图标数组
      const svgArr = data.split("</symbol>");
      console.log(svgArr, "svgArr");
      // 最后一个为js代码忽略
      svgArr.pop();
      let svgTmp = "";
      let viewBox = "";
      svgArr.forEach((svg) => {
        const tmpPath = svg.split("<path");
        // 删除iconfont的图片的'icon-'字母，将-连接的变量转为驼峰式命名变量
        const viewBoxKey = tmpPath[0].match('id=.*"')[0].split('"')[1];
        // .replace('ic-tmall-', '')
        // .replace(/-(\w)/g, x => x.slice(1).toUpperCase());
        // 获取viewBox大小
        const viewBoxValue = tmpPath[0].match('viewBox=.*"')[0].split('"')[1];
        // const pathValue = tmpPath
        // 默认为 0 0 1024 1024的viewBox不写入文件
        if (viewBoxValue !== "0 0 1024 1024") {
          viewBox[viewBoxKey] = viewBoxValue;
          viewBox += `    "${viewBoxKey}": '${viewBoxValue}',\n`;
        }
        const pathArr = [];
        // 第一个用来获取viewBox获取信息，后面的数据为path
        tmpPath.shift();
        tmpPath.forEach((path) => {
          // 组装为object对象
          pathArr.push(
            `{${path
              .replace(/=/g, ": ")
              .replace("fill", ", fill")
              .replace("></path>", "")}}`
          );
        });
        svgTmp += `  "${viewBoxKey}": [${pathArr}],\n`;
      });
      const svgStr = `export const svgIcon = {\n  viewBox: {\n${viewBox}\n  },\n${svgTmp}\n}`;
      fs.writeFileSync("./src/fonts/iconfont-svg.ts", svgStr, "utf8");
      // 删除下载的文件
      fs.unlink(`./src/fonts/${filename}`, (err) => {
        if (err) throw err;
      });
    }
  });
}
```

执行 `node index.js http://at.alicdn.com/t/font_1467886_dwetegeeyd.js` index.js 为脚本文件，`http://at.alicdn.com/t/font_1467886_dwetegeeyd.js` 为 iconfont 的链接

上面的脚本主要是下载 文件 然后解析文件 写入

```js
export const svgIcon = {
  viewBox: {},
  "icon-qiehuan": [
    {
      d: "M896 128H128c-38.4 0-64 25.6-64 64v448c0 32 25.6 64 64 64h217.6v121.6h-57.6c-19.2 0-38.4 19.2-38.4 38.4s19.2 38.4 38.4 38.4h448c19.2 0 38.4-19.2 38.4-38.4s-19.2-38.4-38.4-38.4h-57.6V704H896c32 0 64-25.6 64-64V192c0-38.4-25.6-64-64-64zM601.6 825.6H422.4V704h179.2v121.6z m281.6-198.4H140.8V204.8h736v422.4z",
    },
    {
      d: "M435.2 582.4h153.6c19.2 0 38.4-19.2 38.4-38.4s-19.2-38.4-38.4-38.4H435.2c-19.2 0-38.4 19.2-38.4 38.4s19.2 38.4 38.4 38.4z",
    },
  ],
};
```

类似这样格式的文件

## 组件开发

```js
import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import {svgIcon} from './iconfont'; //引入 刚刚生成的文件

import { IProps } from './type';

const ICON_SIZE = {
  xxs: 15,
  xs: 18,
  sm: 21,
  md: 22,
  lg: 36,
};
const IconSvg = (props) => {
  const { type, width, height, size, style, color } = props;
  return (
    <Svg
      width={width || ICON_SIZE[size] || size || 22}
      height={height || width || ICON_SIZE[size] || size || 22}
      viewBox={svgIcon.viewBox[type] || '0 0 1024 1024'}
      style={{ ...(style as any) }}
    >
      {
        svgIcon[type] && svgIcon[type].map((path, i) => {
          const fill = color || path.fill;
          return <Path key={i} d={path.d} fill={fill} />;
        })
      }
    </Svg>
  );
};

export default IconSvg

```

## 使用

```js
import IconSvg from "./IconSvg";

<IconSvg type="icon-qiehuan" color="#fff" size="md" />;
```
