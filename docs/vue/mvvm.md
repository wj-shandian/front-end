## 先看看 mvc

![avatar](img/01.png);

- view：用户界面
- controller:业务逻辑
- model：数据保存  
  View 传送指令到 Controller  
  Controller 完成业务逻辑后，要求 Model 改变状态  
  Model 将新的数据发送到 View，用户得到反馈

所有的通信都是单向的，随着项目的复杂程度增加，controller 业务逻辑会随之变的很大，耦合严重不好维护

## 再看看 mvvm

![avatar](img/02.png);

由 mvc 演变过来，c 变成了现在的 vm

viewModel:业务逻辑层，View 需要什么数据，ViewModel 要提供这个数据；View 有某些操作，ViewModel 就要响应这些操作，所以可以说它是 Model for View

vm 作为 m 和 v 之间的桥梁解决了数据频繁更新，MVVM 在使用当中，利用双向绑定技术，使得 Model 变化时，ViewModel 会自动更新，而 ViewModel 变化时，View 也会自动变化
