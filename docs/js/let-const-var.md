## var 和 let/const 的区别

let/const

- 块级作用域
- 不存在变量提升
- 暂时性死区
- 不可以重复声明
- 在全局作用域不会挂载到 window 对象上

## const 使用场景

声明常量 匿名函数 箭头函数

let 可以先声明后赋值，const 声明必须要赋值，

const 声明基本类型后不可以再更改，引用类型可以修改引用类型的值

## let 使用场景

定义变量 代替 var