# cookie 的携带状态

当我们登录时，登录接口的响应中会包含一个 Set-Cookie 头部，这个头部会设置一个 cookie。

set-cookie 会携带一些属性

name = value 赋予 cookie 的名称和其值
expires = date 设置 cookie 的过期时间
path = path 设置 cookie 的路径
domain = domain 设置 cookie 的域
secure = true/false 设置 cookie 是否只能通过 https 发送
httpOnly = true/false 设置 cookie 是否只能通过 http 发送 设置为 true 禁止 js 脚本访问 cookie

关键点 path domain Secure

拿一个 http 请求来举例 `http://www.example.com/test/list`

1. 浏览器的某个 Cookie 的 domain 字段 等同于 `www.example.com`或者 `example.com` 才会携带
2. 如果 Secure 设置 为 true 了 那么只有 https 情况下才会携带 cookie，或者为 false 则 http/https 都会携带
3. 要发送的请求路径，即 test 必须和 Cookie 的 path 字段一致才会携带 或者是浏览器端端 Cookie 的 path 的子目录
