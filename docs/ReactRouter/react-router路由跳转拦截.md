## 方法一 Prompt 组件

react-router-dom 提供了 Prompt 组件，通过在需要进行路由跳转拦截的页面的任意地方加上 Prompt 组件，我们都能实现路由跳转拦截。

`<Prompt when={true} message={(location) => { return '信息还没保存，确定离开吗？' }} />`

when 为 true 才会触发组件 message 是必传参数 不传会报错

Prompt 对路由拦截的作用只会作用于其所挂载的当前路由，当跳转到另一个路由（

## 方法二 history.block

我们可用 withrouter 把 histroy 注入 props，用 history.block 阻塞路由跳转。

当 history.block 的回调函数返回 true，则释放路由跳转；
当 history.block 的回调函数返回 false，则阻塞路由跳转，不弹出弹窗；
当 history.block 的回调函数返回字符串，则阻塞路由跳转，弹出弹窗，弹窗提示信息为回调函数的返回字符串
history.block 的回调函数接受 location 参数，location 参数包含即将要跳转到指定路径的路由信息

使用 demo

```js
import React, { Component } from "react";
import { Button } from "antd";
import { withRouter } from "react-router-dom";

class index extends Component {
  state = {};

  componentDidMount() {
    this.props.history.block((location) => {
      // 当history.block的回调函数返回true，则释放路由跳转；当history.block的回调函数返回false，则阻塞路由跳转，不弹出弹窗；当history.block的回调函数返回字符串，则阻塞路由跳转，弹出弹窗，弹窗提示信息为回调函数的返回字符串（点击确定，释放路由，继续跳转到指定页面，点击取消，关闭弹窗，继续阻塞路由跳转）
      console.log(location); // history.block的回调函数接手location参数，location参数包含即将要跳转到指定路径的路由信息
      // return true;
      // return false;
      return "信息还没保存，确定离开吗？";
    });
  }

  componentWillUnmount() {
    // history.block的作用对项目是全局影响的，组件的componentWillUnmount一定要记得重新初始化history.block，让其回调函数返回true，取消history.block的路由跳转拦截作用，防止其影响其他页面做路由跳转
    this.props.history.block((location) => {
      // 当history.block的回调函数返回true，则释放路由跳转；当history.block的回调函数返回false，则阻塞路由跳转，不弹出弹窗；当history.block的回调函数返回字符串，则阻塞路由跳转，弹出弹窗，弹窗提示信息为回调函数的返回字符串（点击确定，释放路由，继续跳转到指定页面，点击取消，关闭弹窗，继续阻塞路由跳转）
      console.log(location); // history.block的回调函数接手location参数，location参数包含即将要跳转到指定路径的路由信息
      return true;
      // return false;
      // return '信息还没保存，确定离开吗？'
    });
  }

  // 跳转路由
  handleRouterSwitch = () => {
    this.props.history.push("/outside");
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleRouterSwitch}>跳转路由</Button>
      </div>
    );
  }
}

export default withRouter(index);
```
