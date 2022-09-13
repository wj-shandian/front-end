## 前置知识

### toStringTag

- toStringTag 是一个内置的 symbol 通常作为对象的属性键使用 对应的属性值应该为字符串类型，这个字符串用来表示对象的自定义类型标签
- 通常只有内置的 Object.prototype.toString() 方法会读取 这个标签并把它包含在自己的返回值里

```js
console.log(Object.prototype.toString.call("foo")); // [object String]

let param = {};
Object.defineProperty(param, Symbol.toStringTag, { value: "Module" });
console.log(Object.prototype.toString.call(param)); // [object Module]
```

### defineProperty

defineProperty 方法会直接在一个对象上定义一个新的属性，或者修改一个对象的现有属性，并返回这个对象

```js
let obj = {};
let ageValue = 10;
Object.defineProperty(obj, "age", {
  value: 12, //也可以直接设置value value不能和 get 和set一起使用

  get() {
    return ageValue;
  }, // 当直接获取的时候直接调用 get 没有value的时候
  set(newValue) {
    ageValue = newValue;
  }, // 修改的时候调用set
});

console.log(obj.age); // 10
obj.age = 20;
console.log(obj.age); // 20
```

## 分析 webpack 打包生成了什么

index.js

```js
let test = require("./test");
console.log(test);
```

test.js

```js
module.exports = "test";
```

打包后生成的代码

```js
// 一个自执行函数
(() => {
  // 定义一个对象 moduleId是相对根路径的相对路径
  var __webpack_modules__ = {
    "./src/test.js": (module) => {
      module.exports = "test";
    },
  };
  // 缓存对象 模块加载后会把加载后的结果放到 对象里缓存
  var __webpack_module_cache__ = {};
  function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      // 有缓存直接返回
      return cachedModule.exports;
    }
    // 没有缓存 则初始化
    var module = (__webpack_module_cache__[moduleId] = {
      exports: {},
    });
    // 执行函数  会把对应的值 赋值到 module上
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    // 返回exports
    return module.exports;
  }
  var __webpack_exports__ = {};
  (() => {
    var test = __webpack_require__("./src/test.js");
    console.log(test);
  })();
})();
```

这是一个简单的 commonjs 加载的规则

## 兼容性实现

### commonjs 加载 commonjs

这和上面的是一样的 参考上面的即可

### commonjs 加载 ES6modules

index.js

```js
let test = require("./test");
console.log(test.default);
console.log(test.age);
```

test.js

```js
export default "test_default";
export const age = "18";
```

打包后的代码

```js
(() => {
  var __webpack_modules__ = {
    "./src/test.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__); // 这个是用来标识是一个ES6模块
      __webpack_require__.d(__webpack_exports__, {
        // 定义属性
        age: () => age,
        default: () => __WEBPACK_DEFAULT_EXPORT__,
      });
      const __WEBPACK_DEFAULT_EXPORT__ = "test_default";
      var age = "18";
    },
  };

  var __webpack_module_cache__ = {};

  function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    var module = (__webpack_module_cache__[moduleId] = {
      exports: {},
    });
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    return module.exports;
  }

  (() => {
    __webpack_require__.d = (exports, definition) => {
      for (var key in definition) {
        if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          // 给 exports 挂载属性
          Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
          // exports.key = definition[key]() 这里不能这样写 因为这样写的话 在这里 执行default函数的时候 无法取值到 __WEBPACK_DEFAULT_EXPORT__ 使用上面的写法可以 延迟取值
        }
      }
    };
  })();
  (() => {
    // 判断这个属性自身是否已经存在
    __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
  })();
  (() => {
    __webpack_require__.r = (exports) => {
      // 给这个exports 加上两个属性  主要是用来标识是否是ES6模块
      if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" }); // [object Module]
      }
      Object.defineProperty(exports, "__esModule", { value: true }); // exports.__esModule = true
    };
  })();
  var __webpack_exports__ = {};
  (() => {
    var test = __webpack_require__("./src/test.js");

    console.log(test["default"]);
    console.log(test.age);
  })();
})();
```

只要出现 import 或者 export ，webpack 就会判断这个是一个 ES6 模块

### ES6modules 加载 ES6modules

index.js

```js
import test, { age } from "./test";
console.log(test);
console.log(age);
```

test.js

```js
export default "test_default";
export const age = "18";
```

打包后的代码

```js
(() => {
  "use strict";
  var __webpack_modules__ = {
    "./src/test.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__);
      __webpack_require__.d(__webpack_exports__, {
        age: () => age,
        default: () => __WEBPACK_DEFAULT_EXPORT__,
      });
      const __WEBPACK_DEFAULT_EXPORT__ = "test_default";
      var age = "18";
    },
  };
  var __webpack_module_cache__ = {};
  function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    var module = (__webpack_module_cache__[moduleId] = {
      exports: {},
    });
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    return module.exports;
  }
  (() => {
    __webpack_require__.d = (exports, definition) => {
      for (var key in definition) {
        if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
        }
      }
    };
  })();
  (() => {
    __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
  })();
  (() => {
    __webpack_require__.r = (exports) => {
      if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module",
        });
      }
      Object.defineProperty(exports, "__esModule", { value: true });
    };
  })();
  var __webpack_exports__ = {};
  (() => {
    //和上一版唯一的区别  这里开始就标识为ES6模块 其他的没有任何区别
    __webpack_require__.r(__webpack_exports__);
    var _test__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__("./src/test.js");
    console.log(_test__WEBPACK_IMPORTED_MODULE_0__["default"]);
    console.log(_test__WEBPACK_IMPORTED_MODULE_0__.age);
  })();
})();
```

### ES6modules 加载 commonjs

index.js

```js
import test, { age } from "./test";
console.log(test);
console.log(age);
```

test.js

```js
module.exports = {
  test: "test",
  age: "18",
};
```

打包后的代码

```js
(() => {
  var __webpack_modules__ = {
    "./src/test.js": (module) => {
      module.exports = {
        test: "test",
        age: "18",
      };
    },
  };

  var __webpack_module_cache__ = {};
  function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }

    var module = (__webpack_module_cache__[moduleId] = {
      exports: {},
    });
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    return module.exports;
  }
  (() => {
    __webpack_require__.n = (module) => {
      // 如果是ES6模块 则导出 模块的 default 否则导出 模块本身
      var getter =
        module && module.__esModule ? () => module["default"] : () => module;
      __webpack_require__.d(getter, { a: getter });
      return getter;
    };
  })();
  (() => {
    __webpack_require__.d = (exports, definition) => {
      for (var key in definition) {
        if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
        }
      }
    };
  })();

  (() => {
    __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
  })();
  (() => {
    __webpack_require__.r = (exports) => {
      if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
      }
      Object.defineProperty(exports, "__esModule", { value: true });
    };
  })();
  var __webpack_exports__ = {};
  (() => {
    __webpack_require__.r(__webpack_exports__);
    var _test__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__("./src/test.js");
    // 和上一版的主要区别 多了一个n方法 n方法的目的主要是为了 兼容 ES6 导出 default
    var _test__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
      _test__WEBPACK_IMPORTED_MODULE_0__
    );
    // 导出 default
    console.log(_test__WEBPACK_IMPORTED_MODULE_0___default());
    // 导出正常的解构对象
    console.log(_test__WEBPACK_IMPORTED_MODULE_0__.age);
  })();
})();
```

## 异步加载

index.js

```js
document.addEventListener("click", () => {
  // import 是天然的代码分割 动态导入webpack打包 会把 test单独打包成一个文件
  import("./test").then((res) => {
    console.log(res);
  });
});
```

test.js

```js
export default "test";
```

打包后的代码

```js
(() => {
  var __webpack_modules__ = {};
  var __webpack_module_cache__ = {};
  function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    var module = (__webpack_module_cache__[moduleId] = {
      exports: {},
    });
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    return module.exports;
  }
  __webpack_require__.m = __webpack_modules__;
  (() => {
    __webpack_require__.d = (exports, definition) => {
      for (var key in definition) {
        if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
        }
      }
    };
  })();
  (() => {
    __webpack_require__.f = {};
    // 通过j方法加载代码块 chunkId = src_test_js
    __webpack_require__.e = (chunkId) => {
      return Promise.all(
        Object.keys(__webpack_require__.f).reduce((promises, key) => {
          __webpack_require__.f[key](chunkId, promises);
          return promises;
        }, [])
      );
    };
  })();
  (() => {
    // import 加载的 代码块 chunkId如何计算的
    //得到加载模块的相对根目录的相对路径 ./src/test.js
    // 删除./ 把/和.转化成下划线 src_test_js
    __webpack_require__.u = (chunkId) => {
      return "" + chunkId + ".js";
    };
  })();
  (() => {
    __webpack_require__.g = (function () {
      if (typeof globalThis === "object") return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if (typeof window === "object") return window;
      }
    })();
  })();
  (() => {
    __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
  })();
  (() => {
    var inProgress = {};
    var dataWebpackPrefix = "webpack-init:";
    // jsonp加载文件 这一整段的核心就是 创建script 加载js
    __webpack_require__.l = (url, done, key, chunkId) => {
      if (inProgress[url]) {
        inProgress[url].push(done);
        return;
      }
      var script, needAttach;
      if (key !== undefined) {
        var scripts = document.getElementsByTagName("script");
        for (var i = 0; i < scripts.length; i++) {
          var s = scripts[i];
          if (
            s.getAttribute("src") == url ||
            s.getAttribute("data-webpack") == dataWebpackPrefix + key
          ) {
            script = s;
            break;
          }
        }
      }
      if (!script) {
        needAttach = true;
        script = document.createElement("script");

        script.charset = "utf-8";
        script.timeout = 120;
        if (__webpack_require__.nc) {
          script.setAttribute("nonce", __webpack_require__.nc);
        }
        script.setAttribute("data-webpack", dataWebpackPrefix + key);
        script.src = url;
      }
      inProgress[url] = [done];
      var onScriptComplete = (prev, event) => {
        script.onerror = script.onload = null;
        clearTimeout(timeout);
        var doneFns = inProgress[url];
        delete inProgress[url];
        script.parentNode && script.parentNode.removeChild(script);
        doneFns && doneFns.forEach((fn) => fn(event));
        if (prev) return prev(event);
      };
      var timeout = setTimeout(
        onScriptComplete.bind(null, undefined, {
          type: "timeout",
          target: script,
        }),
        120000
      );
      script.onerror = onScriptComplete.bind(null, script.onerror);
      script.onload = onScriptComplete.bind(null, script.onload);
      needAttach && document.head.appendChild(script);
    };
  })();
  (() => {
    // 这个之前有介绍 不再描述
    __webpack_require__.r = (exports) => {
      if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
      }
      Object.defineProperty(exports, "__esModule", { value: true });
    };
  })();
  (() => {
    var scriptUrl;
    if (__webpack_require__.g.importScripts)
      scriptUrl = __webpack_require__.g.location + "";
    var document = __webpack_require__.g.document;
    if (!scriptUrl && document) {
      if (document.currentScript) scriptUrl = document.currentScript.src;
      if (!scriptUrl) {
        var scripts = document.getElementsByTagName("script");
        if (scripts.length) scriptUrl = scripts[scripts.length - 1].src;
      }
    }
    if (!scriptUrl)
      throw new Error("Automatic publicPath is not supported in this browser");
    scriptUrl = scriptUrl
      .replace(/#.*$/, "")
      .replace(/\?.*$/, "")
      .replace(/\/[^\/]+$/, "/");
    __webpack_require__.p = scriptUrl;
  })();
  (() => {
    var installedChunks = {
      main: 0, // 0表示已经加载
    };

    __webpack_require__.f.j = (chunkId, promises) => {
      var installedChunkData = __webpack_require__.o(installedChunks, chunkId)
        ? installedChunks[chunkId]
        : undefined;
      if (installedChunkData !== 0) {
        if (installedChunkData) {
          promises.push(installedChunkData[2]);
        } else {
          if (true) {
            var promise = new Promise(
              (resolve, reject) =>
                (installedChunkData = installedChunks[chunkId] =
                  [resolve, reject])
            );
            promises.push((installedChunkData[2] = promise));

            // start chunk loading
            var url = __webpack_require__.p + __webpack_require__.u(chunkId);
            // create error before stack unwound to get useful stacktrace later
            var error = new Error();
            var loadingEnded = (event) => {
              if (__webpack_require__.o(installedChunks, chunkId)) {
                installedChunkData = installedChunks[chunkId];
                if (installedChunkData !== 0)
                  installedChunks[chunkId] = undefined;
                if (installedChunkData) {
                  var errorType =
                    event && (event.type === "load" ? "missing" : event.type);
                  var realSrc = event && event.target && event.target.src;
                  error.message =
                    "Loading chunk " +
                    chunkId +
                    " failed.\n(" +
                    errorType +
                    ": " +
                    realSrc +
                    ")";
                  error.name = "ChunkLoadError";
                  error.type = errorType;
                  error.request = realSrc;
                  installedChunkData[1](error);
                }
              }
            };
            __webpack_require__.l(
              url,
              loadingEnded,
              "chunk-" + chunkId,
              chunkId
            );
          } else {
          }
        }
      }
    };
    // 加载文件后的 回调函数 把加载完的 chunkId置为0 表示已加载完毕
    var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
      var [chunkIds, moreModules, runtime] = data;
      var moduleId,
        chunkId,
        i = 0;
      if (chunkIds.some((id) => installedChunks[id] !== 0)) {
        for (moduleId in moreModules) {
          if (__webpack_require__.o(moreModules, moduleId)) {
            __webpack_require__.m[moduleId] = moreModules[moduleId];
          }
        }
        if (runtime) var result = runtime(__webpack_require__);
      }
      if (parentChunkLoadingFunction) parentChunkLoadingFunction(data);
      for (; i < chunkIds.length; i++) {
        chunkId = chunkIds[i];
        if (
          __webpack_require__.o(installedChunks, chunkId) &&
          installedChunks[chunkId]
        ) {
          installedChunks[chunkId][0]();
        }
        installedChunks[chunkId] = 0;
      }
    };

    var chunkLoadingGlobal = (self["webpackChunkwebpack_init"] =
      self["webpackChunkwebpack_init"] || []);
    chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
    // 重写了push方法
    chunkLoadingGlobal.push = webpackJsonpCallback.bind(
      null,
      chunkLoadingGlobal.push.bind(chunkLoadingGlobal)
    );
  })();
  var __webpack_exports__ = {};
  document.addEventListener("click", function () {
    // e方法会返回一个promise
    __webpack_require__
      .e("src_test_js")
      .then(__webpack_require__.bind(__webpack_require__, "./src/test.js"))
      .then(function (res) {
        console.log(res);
      });
  });
})();
```

src_test_js.js 代码

```js
(self["webpackChunkwebpack_init"] =
  self["webpackChunkwebpack_init"] || []).push([
  ["src_test_js"],
  {
    "./src/test.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__);
      __webpack_require__.d(__webpack_exports__, {
        default: () => __WEBPACK_DEFAULT_EXPORT__,
      });
      const __WEBPACK_DEFAULT_EXPORT__ = "test";
    },
  },
]);
```

打包之后会有两个文件 main.js 和 src_test_js.js 文件

代码量比较大，描述一下整体流程

1. 首先点击触发 会有一个 `__webpack_require__.e` 方法，这个方法主要是返回一个 Promise，`__webpack_require__.f[key](chunkId, promises)`调用了 `__webpack_require__.f.j` 这个方法主要作用是封装了把 chunkId（chunkId 就是动态加载的文件名）封装成为 promise
2. `__webpack_require__.f.j`会调用 `__webpack_require__.l`这个函数 这个函数最重要的功能就是 创建 script 加载 js 原理就是 jsonp 加载文件
3. 在文件中创建了 script 标签，然后就会加载 js 文件，之后会走 `__webpack_require__.e`then 函数 然后走 `__webpack_require__`函数读取值
