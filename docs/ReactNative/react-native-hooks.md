# react-native 相关 hooks 总结

## useCompLayout

```js
import { useEffect, useState } from "react";
import { isNative } from "utils/platform";

/**
 * 用于获取组件的layout信息，使用 ReactNative measure 方法：https://reactnative.cn/docs/direct-manipulation#measurecallback
 * View也可使用onLayout获取布局信息，由于小程序API所限 底层polyfill的onLayout方法使用轮询方式监听View的尺寸变换 对性能有一定影响
 * 故建议使用 measure 方法获取组件布局信息，其余如Text等没有onLayout的组件也可以用 measure 获取布局信息
 *
 * android端的 View 返回结果为 undefined 可尝试添加 collapsable={false} 属性：https://www.jianshu.com/p/4166649306c4，据调试 设置 collapsable 应该与设置 onLayout 一样 过度绘制层级也一致
 * @param {ref} ref
 */
function useCompLayout(ref) {
  const [location, setLocation] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    pageX: 0,
    pageY: 0,
  });

  useEffect(() => {
    if (ref.current) {
      if (isNative) {
        // native 需要等页面完成渲染后才可获取正确的布局信息 故加个setTimeout 调用速度没 onLayout 快
        setTimeout(
          () =>
            ref?.current?.measure?.((x, y, width, height, pageX, pageY) =>
              setLocation({ x, y, width, height, pageX, pageY })
            ),
          10
        );
      } else {
        ref?.current?.measure?.((x, y, width, height, pageX, pageY) =>
          setLocation({ x, y, width, height, pageX, pageY })
        );
      }
    }
  }, [ref]);

  return { location };
}

export default useCompLayout;
```

## usePagination

## useOnShow

## useOnHide
