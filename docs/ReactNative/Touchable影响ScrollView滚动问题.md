这是实际场景遇到的一个问题。

如果 ReactNative 的组件 `Touchable*` （TouchableWithoutFeedback，TouchableOpacity，TouchableHighlight）组件内使用 ScrollView，会造成滚动异常卡顿，因为触摸事件会被 `Touchable*` 捕获到

## 解决办法 一

阻止`ScrollView`内部事件冒泡到外层去

在`ScrollView`内部包裹一个 ` Touchable*`组件

```js
<TouchableWithoutFeedback>
  <View>
    <ScrollView>
      <TouchableWithoutFeedback>{list}</TouchableWithoutFeedback>
    </ScrollView>
  </View>
</TouchableWithoutFeedback>
```

## 解决办法 二

禁止外层捕获 使用`pointerEvents`属性

pointerEvents 是字符串类型的属性, 可以取值 none,box-none,box-only,auto.

- none 发生在本组件与本组件的子组件上的触摸事件都会交给本组件的父组件处理.
- box-none 发生在本组件显示范围内,但不是子组件显示范围内的事件交给本组件,在子组件显示范围内交给子组件处理
- box-only 发生在本组件显示范围内的触摸事件将全部由本组件处理,即使触摸事件发生在本组件的子组件显示范围内
- auto 视组件的不同而不同,并不是所有的子组件都支持 box-none 和 box-only 两个值,使用时最好测试下

```js
<TouchableWithoutFeedback>
  <View pointerEvents="box-none">
    <ScrollView>{list}</ScrollView>
  </View>
</TouchableWithoutFeedback>
```

设置 pointerEvents 的值为 box-none，让 View 无法接受触摸事件，但是它的子元素可以。这样就避免了 ScrollView 内部触摸事件被外层捕获导致卡顿。

## 解决办法 三

改变他们的层级 由父子改成兄弟 即可避免
