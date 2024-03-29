使用 ts 实现一个简易版本的 axios

[仓库地址](https://github.com/wj-shandian/axios-ts)

## 创建项目

```js
npx create-react-app axios-ts --template typescript
npm i axios @types/axios qs @types/qs parse-headers express body-parser
```

写一个 express 服务端点接口 用来调用调试

在项目根目录创建 api.js

```js
let express = require("express");
let bodyParser = require("body-parser");

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.set({
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Credential": true,
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,name",
  });
  if (res.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
app.get("/get", function (req, res) {
  res.json(req.query);
});
app.post("/post", function (req, res) {
  res.json(req.body);
});
app.post("/post_timeout", function (req, res) {
  let { timeout } = req.query;
  console.log(req.query);
  if (timeout) {
    timeout = parseInt(timeout);
  } else {
    timeout = 0;
  }

  setTimeout(function () {
    res.json(req.body);
  }, timeout);
});
app.post("/post_status", function (req, res) {
  let { code } = req.query;
  if (code) {
    code = parseInt(code);
  } else {
    code = 0;
  }
  res.statusCode = code;
  res.json(req.body);
});
app.listen(8080);
```

切换到项目的 文件夹 使用 nodemon api.js 启动项目 没有 nodemon 可以使用 npm 安装 nodemon

访问 localhost:8080 地址可以看到 项目成功启动

在 index.tsx 文件中写一些测试内容

```js
// AxiosResponse 是响应数据的 类型
import axios, { AxiosResponse } from "./axios";

const baseUrl = "http://localhost:8080";

interface User {
  name: string;
  password: string;
}

let user: User = {
  name: "ceshi",
  password: "13444344",
};

axios({
  method: "get",
  url: baseUrl + "/get",
  params: user,
}).then((response: AxiosResponse) => {
  console.log(response, "get");
  return response.data;
});

axios({
  method: "post",
  url: baseUrl + "/post",
  headers: {
    "content-type": "application/json",
  },
  data: user,
}).then((response: AxiosResponse) => {
  console.log(response, "post");
  return response.data;
});
```

## get 和 post

开始写 axios 的 get 方法
在 src 下 创建 axios 文件夹 创建 index types Axios 文件

index

```js
import Axios from "./Axios";
import { AxiosInstance } from "./types";

// 可以创建一个axios 的实例 axios 其实是一个函数
function createInstance(): AxiosInstance {
  let context: Axios = new Axios();
  // 让request方法里的 this 指向context 也就是 new Axios
  let instance = Axios.prototype.request.bind(context);
  // 把Axios 的类的实例 和类的原型上方法都拷贝到instance上 也就是request方法上
  instance = Object.assign(instance, Axios.prototype, context);
  return instance as AxiosInstance;
}
let axios = createInstance();
export default axios;

export * from "./types";

```

types

```js
export type Methods =
  | "get"
  | "GET"
  | "POST"
  | "post"
  | "put"
  | "PUT"
  | "delete"
  | "DELETE"
  | "options"
  | "OPTIONS";

export interface AxiosRequestConfig {
  url?: string;
  method?: Methods;
  // params?: Record<string, any>; // Record 和 [name:string]:any 效果一样 意思是字段是字符串 值可以是任何值
  params?: any;
  headers?: Record<string, any>;
  data?: Record<string, any>;
}

// promise 的泛型 T代表此 promise 变成成功态 之后resolve 的值 resolve(value)
export interface AxiosInstance {
  <T = any>(config: AxiosRequestConfig): Promise<T>;
}

// 泛型 T 代表响应体到类型 T=any 意思给个默认值 是any

export interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers?: Record<string, any>;
  config?: AxiosRequestConfig;
  request?: XMLHttpRequest;
}
```

Axios

```TS
import { AxiosRequestConfig, AxiosResponse } from "./types";
import qs from "qs";
import parseHeaders from "parse-headers";
export default class Axios {
  // T 用来限制响应 对象response 里的 data类型
  request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.dispatchRequest<T>(config);
  }
  dispatchRequest<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return new Promise<AxiosResponse<T>>(function (resolve, reject) {
      let { method = "GET", url = "", params, headers, data } = config;
      let request = new XMLHttpRequest();
      if (params) {
        params = qs.stringify(params);
        url += (url.indexOf("?") === -1 ? "?" : "&") + params;
      }

      request.open(method, url, true);
      request.responseType = "json";
      request.onreadystatechange = function () {
        if (request.readyState === 4) {
          if (request.status >= 200 && request.status <= 300) {
            let response: AxiosResponse<T> = {
              data: request.response ? request.response : request.responseText,
              status: request.status,
              statusText: request.statusText,
              headers: parseHeaders(request.getAllResponseHeaders()),
              config: config,
            };
            resolve(response);
          } else {
             // 接口状态码失败
            reject(`Error: Request failed with status code ${request.status}`);
          }
        }
      };
      if (headers) {
        for (let key in headers) {
          request.setRequestHeader(key, headers[key]);
        }
      }
      let body: string | null = null;
      if (data) {
        body = JSON.stringify(data);
      }
      request.send(body);
    });
  }
}

```

## 错误处理

- 网络错误
- 超时异常
- 错误状态码

Axios 添加相关代码
具体 可以查看 代码库的 feature/get-post-error 分支

```js
request.onerror = function () {
  // 网络错误
  reject("net:ERR_INTERNET_DISCONNECTED");
};
// 超时错误
if (timeout) {
  request.timeout = timeout;
  request.ontimeout = function () {
    reject(`Error: timeout of ${timeout}ms exceeded`);
  };
}
```

types AxiosRequestConfig 类型新增一个 timeout

```TS
export interface AxiosRequestConfig {
  ...
  timeout?: number;
}
```

## 拦截器

axios 有请求拦截器和响应拦截器 并且都可以设置多个

请求拦截是 先设置的 后执行 先进后出 响应拦截是先进先出

![](img/axios.jpg)

不再贴代码 具体查看 仓库的 feature/interceptors 分支

关键代码讲解

```ts
request<T>(
    config: AxiosRequestConfig
  ): Promise<AxiosRequestConfig | AxiosResponse<T>> {
    // return this.dispatchRequest<T>(config);
    const chain: Array<
      Interceptor<AxiosRequestConfig> | Interceptor<AxiosResponse<T>>
    > = [
      {
        onFulfilled: this.dispatchRequest,
      },
    ];
    this.interceptors.request.interceptors.forEach(
      (interceptor: Interceptor<AxiosRequestConfig> | null) => {
        // 向数组右侧添加一个数据
        interceptor && chain.unshift(interceptor);
      }
    );
    this.interceptors.response.interceptors.forEach(
      (interceptor: Interceptor<AxiosResponse> | null) => {
        // 向数组左侧添加一个数据
        interceptor && chain.push(interceptor);
      }
    );
    let promise: any = Promise.resolve(config);
    while (chain.length) {
      const { onFulfilled, onRejected } = chain.shift()!;
      promise = promise.then(onFulfilled, onRejected);
    }
    return promise;
  }
```

把 request 放在数组中间 根据添加的拦截器 分别放置在 数组两边 然后 循环数组执行 promise

## 任务取消

新建 cancel 文件

```ts
export class Cancel {
  message: string;
  constructor(value: string) {
    this.message = value;
  }
}

export function isCancel(error: any) {
  return error instanceof Cancel;
}

export class CancelToken {
  public resolve: any;
  source() {
    return {
      token: new Promise((resolve) => {
        this.resolve = resolve;
      }),
      cancel: (message: string) => {
        this.resolve(new Cancel(message));
      },
    };
  }
}
```

新增测试代码
index

```ts
// 取消
let cancelToken = axios.cancelToken;
let isCancel = axios.isCancel;
const source = cancelToken.source();

axios({
  method: "post",
  url: baseUrl + "/post",
  headers: {
    "content-type": "application/json",
  },
  cancelToken: source.token, // 添加 cancel标志
  // timeout: 2000,
  data: user,
})
  .then((response: AxiosResponse) => {
    console.log(response, "post");
    return response.data;
  })
  .catch((err) => {
    if (isCancel(err)) {
      console.log("取消了", err);
    } else {
      console.log(err);
    }
  });
source.cancel("用户取消了"); // 触发取消
```

axios 文件 添加 取消

```ts
// 取消
if (config.cancelToken) {
  config.cancelToken.then((message: any) => {
    reject(message);
    request.abort(); // ajax 取消请求
  });
}
```

具体可以参考 feature/cancel 分支

以上就是简单版本的 axios 当然还有很多功能没有实现 就不一一写了 主要的目的还是练习一下 TS，加深一些 TS 操作
