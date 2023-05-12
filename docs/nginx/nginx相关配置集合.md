## Content-Security-Policy 和 X-Frame-Options

- X-Frame-Options

```js
add_header X-Frame-Options "ALLOW-FROM https://example.com"; // 这里把 https://example.com 替换为允许嵌套的站点主机名或 IP 地址。
```

这样，对于指定的站点，浏览器将允许该站点在 iframe 中嵌入当前站点的内容。同时请注意，ALLOW-FROM 是旧版浏览器兼容处理方式，现代的浏览器建议使用 Content-Security-Policy（CSP）来控制 iframe 嵌套。

- Content-Security-Policy

Content-Security-Policy（CSP）是一个安全策略协议，用于帮助减少 XSS 攻击、点击劫持和其他代码注入攻击的风险。CSP 配置告诉浏览器可以加载的资源类型，从哪些来源加载资源以及可以使用哪些执行代码的方式。

CSP 配置的基本语法可以如下所示：

```js
Content-Security-Policy: policy-directive; policy-directive
```

policy-directive 可以是以下之一：

default-src：定义默认资源加载的源。
script-src：定义可以加载 JavaScript 脚本的源。
style-src：定义可以加载 CSS 样式的源。
img-src：定义可以加载图片的源。
media-src：定义可以加载音频和视频文件的源。
font-src：定义可以加载字体文件的源。
connect-src：定义可以进行网络请求（如 AJAX 请求）的源。
object-src：定义可以加载 Flash 和其他嵌入式媒体的源。
frame-src：定义可以加载 iframe 的源。
base-uri：定义文档的基本 URI。
form-action：定义允许提交表单的源。
report-uri：定义服务器接收 CSP 违规报告的 URI。

在 Content-Security-Policy 报头中添加 frame-ancestors 指令，指定要允许嵌套的来源。

```js
Content-Security-Policy: frame-ancestors 'self' https://*.example.com;
```

X-Frame-Options 头用于防止网站被嵌套在 iframe 中，以防止点击劫持攻击。它只有两个值：DENY 和 SAMEORIGIN。DENY 表示网站永远不能被嵌套在 iframe 中，而 SAMEORIGIN 表示网站只能被同源页面嵌套，即只有来源域名完全匹配才能嵌套。

CSP 头允许您更细粒度地控制网站的安全性，并帮助防止 XSS、代码注入以及其他类似攻击。CSP 配置指定了哪些来源可以加载特定的资源类型，同时指定了允许执行何种类型的 JavaScript 代码，从而增加了控制网站的安全性的灵活性。
