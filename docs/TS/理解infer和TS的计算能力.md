## extends

TS 的 `extends` 关键字有两种用法

- 用于继承 例如接口继承

```TS
interface A {
    name:string
}
interface B {
    age:number
}

interface C extends A,B{
    sex:string
}
/*
此时C定义的类型继承了 A B
*/
```

- 用于条件类型 可以用在三元表达式中

```TS
type A = 'a' extends 'a' ? 'a':'b'
// type A = 'a'

type B = 'a' | 'b' extends ? 'a':'b'
// type B = 'b'

type C<T> = T extends 'a':'b'
type D = C<'a'|'b'>
// type D = 'a' | 'b'
```

从 A B 我们可以看出来 只有前面的类型是否可分配给后面的类型 才是对的 否则则是 false

但是 `type C`却又不是这样的，那是因为 T 是一个泛型 当泛型是一个联合类型的时候 ，会依次判断联合类型的字类型是否符合条件 （依次遍历联合类型中的每一项） 所以 `type D `可能有两个类型

## infer

`infer`是一个只能在 `extends`出现的时候 才能使用的关键字

看个例子，我们再来解释下 用法

```TS

type paramType<T> = T extends (params:infer U) => void ? U : T

interface Ip {
  name:string,
  age:number
}
type Func = (Ip:Ip)=>void

type Parma = paramType<Func>
// type Parma = Ip
type ParamsString = paramType<string>
// type ParamsString = string
```

首选我们声明了一个泛型`T` 如果我们传入`T`可以分配给 `(params:infer U) => void` 那么我们返回 `U`

`infer`相当于声明一个类型变量，这个类型的变量 取决于传入的 `T` ,`U`只能值 `?`的左侧 也就是 true 分支使用

看个例子

```TS
type Flattered<T> = T extends (infer V)[] ? V : T // (infer U)[] 等同于 Array<infer U>

type D = Flattered<Array<number>>
// type D = number
type E = Flattered<Array<Array<number>>>
// type E = number[]
```

我们改造一下 `Flattered`

```TS
type Flattered<T> = T extends (infer V)[] ? Flattered<V> : T

// 这里相当于递归重复调用

type E = Flattered<Array<Array<number>>>
// type E = number

```

```Ts

type Flattered<T> = T extends Array<infer V> ? Flattered<V> : T

function flattered<T extends Array<any>>(arr:T):Array<Flattered<T>>{
    return (new Array<Flattered<T>>()).concat(...arr.map(x=>Array.isArray(x)?flattered(x):x))
}

flattered([1,2,3,[4,5,[6,7]]])
```
