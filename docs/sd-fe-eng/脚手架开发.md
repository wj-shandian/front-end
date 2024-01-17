# lint 脚手架开发

## 首先在项目 sd-fe-eng 初始化文件

`lerna create sd-fe-lint`

相关的配置以及依赖包参考源代码，这里只说下整个实现的过程，代码中部分关键点会有注释说明

这里我们用 ts 来写

首先创建 src 文件夹，在 src 文件夹下创建 index.ts 文件，作为入口文件 创建 cli.ts 文件作为命令行入口文件

## 实现初始化

初始化函数 首先实现 版本检查 如果脚手架有最新版本 那么更新

```ts
import ora from "ora";
import { execSync } from "child_process";
import log from "../utils/log";
import npmType from "../utils/npm-type";
import { PKG_NAME, PKG_VERSION } from "../utils/constants"; // PKG_VERSION 获取当前package的版本号

/** 检查版本号 */

const checkVersion = async () => {
  const npm = await npmType;
  const latestVersion = await execSync(`${npm} view ${PKG_NAME} version`)
    .toString("utf-8")
    .trim(); // 这个的意思是 执行 npm view node version 然后会返回当前最新版本号  这里的node只是举个例子
  if (latestVersion === PKG_VERSION) return null;

  const compareArr = PKG_VERSION.split(".").map(Number);
  const beComparedArr = latestVersion.split(".").map(Number);

  // 依次比较版本号大小
  for (let i = 0; i < compareArr.length; i++) {
    if (compareArr[i] > beComparedArr[i]) {
      return null;
    } else if (compareArr[i] < beComparedArr[i]) {
      return latestVersion;
    }
  }
};

/*
 * 检查版本并自动升级
 */
export default async (install = true) => {
  // ora 作用是用于node的控制台进度美化 这里只是展示作用 没啥实际意义
  const checking = ora(`Checking ${PKG_NAME} version...`);
  checking.start();
  // 关键逻辑在这里
  try {
    const npm = await npmType;
    const latestVersion = await checkVersion();
    checking.stop();

    // 升级版本
    if (latestVersion && install) {
      const update = ora(`Updating ${PKG_NAME} to version ${latestVersion}...`);
      update.start();
      execSync(`${npm} i -g ${PKG_NAME}`);
      update.stop();
    } else if (latestVersion) {
      // 提示但是不下载 最新版本为 ${latestVersion}，本地版本为 ${PKG_VERSION}，请尽快升级到最新版本。\n你可以执行 ${npm} install -g ${PKG_NAME}@latest 来安装此版本
      log.warn(
        `The latest version is ${latestVersion} and the local version is ${PKG_VERSION} please upgrade to the latest version as soon as possible. \n You can run  ${npm} install -g ${PKG_NAME}@latest  to install this version\n`
      );
    } else {
      // 当前没有可用的更新
      log.info(`There are currently no updates available`);
    }
  } catch (error) {
    checking.stop();
    log.error(error);
  }
};
```

检查完版本 然后开始一些默认属性的初始化 这里会添加一些交互提示是否需要该选项，然后得到选择后的结果配置

因为我们的脚手机可以再新的项目中接入，所以需要检查是否有选项配置有冲突 然后执行 代码中 conflictResolve 函数进行检查配置 并弹出交互提示是否覆盖继续，如果覆盖 那么则删除一些配置项 然后重新写入

然后修改 package.json 中的一些命令 加入一键修复 一键扫描 以及两个 husk commit 提交检查和文件扫描检查

处理完 然后写入配置好的模版，这里的模版使用的是 ejs

然后写入成功后 初始化完毕

## 一键扫描 一键修复

执行一键扫描 一键修复的原理 主要是 读取对应的文件内容 然后根据 prettier eslint stylelint markdownlint 提供的方法进行格式化修复
不是所有的错误都能被修复，不能修复的错误给出提示。让用户自己手动修复

这里举一个 例子来讲解 比如 prettier 的 自动修复

```ts
import fg from "fast-glob";
import { readFile, writeFile } from "fs-extra";
import { extname, join } from "path";
import prettier from "prettier";
import { ScanOptions } from "../../types";
import {
  PRETTIER_FILE_EXT,
  PRETTIER_IGNORE_PATTERN,
} from "../../utils/constants";

// extname 返回扩展名
// fast-glob 文件系统遍历工具
export interface DoPrettierOptions extends ScanOptions {}
export async function doPrettier(options: DoPrettierOptions) {
  let files: string[] = [];
  if (options.files) {
    files = options.files.filter((name) =>
      PRETTIER_FILE_EXT.includes(extname(name))
    );
  } else {
    const pattern = join(
      options.include,
      `**/*.{${PRETTIER_FILE_EXT.map((t) => t.replace(/^\./, "")).join(",")}}`
    );
    files = await fg(pattern, {
      cwd: options.cwd,
      ignore: PRETTIER_IGNORE_PATTERN,
    });
  }
  await Promise.all(files.map(formatFile));
}

async function formatFile(filepath: string) {
  // 读取文件内容
  const text = await readFile(filepath, "utf8");
  // 获取配置
  const options = await prettier.resolveConfig(filepath);
  // 格式化内容
  const formatted = prettier.format(text, { ...options, filepath });
  // 输出内容
  await writeFile(filepath, formatted, "utf8");

  /**
   * prettier.resolveConfig 是一个函数，用于解析和获取项目中的 prettier 配置。它会搜索项目目录及其父级目录中的配置文件，找到最接近的配置文件，并返回解析后的配置对象。
   * prettier.format 是一个函数，用于格式化代码。它接受一个代码字符串作为输入，并返回格式化后的代码字符串。它会根据项目中的 prettier 配置来进行代码格式化，包括缩进、换行、括号等等。这个函数可以用于在开发过程中自动格式化代码，以保持代码风格的一致性。
   */
}
```
