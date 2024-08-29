# react-native 相关 hooks 总结

## useCompLayout

背景，在安卓设置上，子元素如果超过父元素 那么内容无法被惦记，所以类似搜索框 展示一些搜索条件的话 无法点击 只能使用全局定位的方式，这个时候就需要获取布局信息 进行定位。所以 封装 useCompLayout 布局信息的获取

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

## useDownload

RN 的文件下载

```js
function useDownload() {
  function downloadFile(url) {
    // 获取文件后缀
    const getFileTypeFromUrl = (url) => {
      const splitType = url.split("?");
      const fileType = splitType[0].split(".").pop();
      if (fileType) return fileType;
      return null;
    };
    const fileType = getFileTypeFromUrl(url);
    const imageType = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
    if (imageType.includes(fileType)) {
      // 图片下载 // handleDownloadImage handleDownloadFile 方法参考 RN下载解决方案
      handleDownloadImage(url);
    } else {
      handleDownloadFile(url, fileType);
    }
  }
  return downloadFile;
}
```

## usePagination

配置 RN 的 FlatList 使用 实现 下拉数据分页

```js
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import usePersistFn from "hooks/usePersistFn";
import Footer from "hooks/usePagination/footer";
import { BaseOptions, BaseRequest } from "hooks/usePagination/types";
import _get from "lodash/get";
import _set from "lodash/set";

/**
 * 通过传入分页接口、参数等配置 获取分页列表所需数据
 * @param {object} options getData 分页接口函数 args 初始参数
 */
function usePagination<S = undefined>(options: BaseOptions<S>): BaseRequest<S> {
  const { getData, dataPath = "data", totalPath = "total" } = options;
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(() => {
    // 根据 dataPath、totalPath 设置初始 result
    const initResult = {};
    _set(initResult, dataPath, []);
    return _set(initResult, totalPath, 0);
  });
  const { current: initArgs } = useRef({
    pageNo: 1,
    pageSize: 10,
    ...options?.initArgs,
  });
  const [args, setArgs] = useState(initArgs);

  const total = useMemo(() => _get(result, totalPath, 0), [result, totalPath]);
  const data = useMemo(() => _get(result, dataPath, []), [dataPath, result]);

  const hook = useEffect;
  const getDataPersist = usePersistFn(getData);

  const _getData = useCallback(() => {
    setLoading(true);
    getDataPersist(args)
      .then((res) => {
        console.log(res, "res");
        if (args.pageNo > 1) {
          setResult((prevResult) => {
            const newList = [
              ..._get(prevResult, dataPath, []),
              ..._get(res, dataPath, []),
            ];
            return _set({ ...res }, dataPath, newList);
          });
        } else {
          setResult(res);
        }
      })
      .finally(() => setLoading(false));
  }, [args, dataPath, getDataPersist]);

  hook(_getData, [_getData]);

  const refresh = usePersistFn((type) => {
    if (type === "init") {
      setResult(() => {
        // 根据 dataPath、totalPath 设置初始 result
        const initResult = {};
        _set(initResult, dataPath, []);
        return _set(initResult, totalPath, 0);
      });
    }
    setArgs(type === "init" ? { ...initArgs } : { ...args });
  });

  const loadMore = usePersistFn(() => {
    if (!loading && total > data?.length) {
      setArgs((prevArgs) => ({ ...prevArgs, pageNo: prevArgs.pageNo + 1 }));
    }
  });

  const renderFooter = useCallback(
    () => <Footer loading={loading} hasMore={total > data?.length} />,
    [data?.length, loading, total]
  );

  return { result, loading, loadMore, renderFooter, refresh, setArgs, args };
}

export default usePagination;
```

```js
//hooks/usePagination/types 代码
import React from "react";

type noop = (...args: any[]) => any;

export type BaseOptions<S> = {
  getData: noop,
  initArgs?: S,
  isOnShow?: boolean,
  dataPath?: string,
  totalPath?: string,
};

type RefreshType = "init";

export type BaseRequest<S> = {
  refresh: (type: RefreshType) => void,
  result: any,
  loading: boolean,
  loadMore: () => void,
  renderFooter: () => void,
  setArgs: React.Dispatch<React.SetStateAction<S | undefined>>,
  args: S,
};
```

```js
// "hooks/usePagination/footer" 代码
import React, { memo } from "react";
import { Text } from "react-native";
import { themes, createStyle } from "styles/theme";
import { useIntl } from "utils/react-intl";

const Style = createStyle({
  footerText: {
    fontSize: 12,
    color: themes.$gray,
    paddingTop: 8,
    paddingBottom: 16,
    textAlign: "center",
  },
});

function Footer(props) {
  const { loading, hasMore } = props;
  const { formatMessage } = useIntl();

  if (loading) {
    return (
      <Text style={Style.footerText}>
        {formatMessage({
          id: "common.list.loading",
          defaultMessage: "正在加载...",
        })}
      </Text>
    );
  }
  return (
    <Text style={Style.footerText}>
      {hasMore
        ? formatMessage({
            id: "common.list.scrollForMore",
            defaultMessage: "上拉加载更多",
          })
        : formatMessage({
            id: "common.list.noMore",
            defaultMessage: "没有更多啦！",
          })}
    </Text>
  );
}

export default memo(Footer);
```

## useOnShow

监听页面失活和聚焦

```js
import React, { useRef, useCallback } from "react";
import { AppState } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import useOnHide from "../useOnHide";

export default (callback) => {
  const ref = useRef(false);

  useFocusEffect(
    useCallback(() => {
      callback?.();
      ref.current = true;
    }, [callback])
  );

  useOnHide(() => {
    ref.current = false;
  });

  React.useEffect(() => {
    const handleAppStateChange = (state) => {
      // 加 ref.current 的条件是为了防止在 web 端应用失焦后再聚焦时非当前页面也会触发。
      if (state === "active" && ref.current === true) {
        callback?.();
      }
    };

    const listener = AppState.addEventListener("change", handleAppStateChange);

    return () => {
      if (typeof listener?.remove === "function") {
        listener.remove();
      } else {
        AppState.removeEventListener("change", handleAppStateChange);
      }
    };
  }, [callback]);
};
```

## useOnHide

监听页面是否离开

```js
import * as React from "react";
import { useNavigation } from "@react-navigation/native";

type EffectCallback = () => undefined | void | (() => void);

export default function useFocusEffect(effect: EffectCallback) {
  const navigation = useNavigation();

  React.useEffect(() => {
    let isBlured = false;
    let cleanup: any;

    const callback = () => {
      const destroy = effect();

      if (destroy === undefined || typeof destroy === "function") {
        return destroy;
      }
    };
    if (navigation.isFocused() === false) {
      cleanup = callback();
      isBlured = true;
    }

    const unsubscribeBlur = navigation.addListener("blur", () => {
      if (isBlured) {
        return;
      }

      if (cleanup !== undefined) {
        cleanup();
      }

      cleanup = callback();
      isBlured = true;
    });

    const unsubscribeFocus = navigation.addListener("focus", () => {
      if (cleanup !== undefined) {
        cleanup();
      }

      cleanup = undefined;
      isBlured = false;
    });

    return () => {
      if (cleanup !== undefined) {
        cleanup();
      }

      unsubscribeBlur();
      unsubscribeFocus();
    };
  }, [effect, navigation]);
}
```

## useQuery

获取路由参数

```js
import { useRoute } from "@react-navigation/native";

export default () => {
  return useRoute().params || {};
};
```
