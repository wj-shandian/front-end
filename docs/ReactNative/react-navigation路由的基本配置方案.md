### 路由配置

- basic.js //基础（静态）页面

  - 包含 首页，分类，我的 等 tabbar 的页面
  - 用户登录、注册 相关页面
  - Guide 开屏广告页面

- business.js //业务（普通）页面

#### 配置规则：

基本参照 navigation 的配置方式
参考如下：

```javascript
import Guide from "pages/guide";
import Design from "pages/category";
import Login from "pages/login";
import SignIn from "pages/sign-in";
import Home from "pages/home";
import { isWeb } from "utils/platform";

export const basicRouterConfig = {
  Main: {
    Home: { screen: Home, navigationOptions: { title: "Home" }, path: "index" },
    Category: {
      screen: Design,
      navigationOptions: { title: "Category" },
      path: "category",
    },
  },
  Auth: {
    Login: {
      screen: Login,
      navigationOptions: Login.navigationOptions,
      path: "login",
    },
    SignIn: {
      screen: SignIn,
      navigationOptions: SignIn.navigationOptions,
      path: "sign-in",
    },
  },
  Guide,
  initialRouteName: isWeb ? "App" : "Guide",
  bottomTabNavigatorConfig: {},
};
```

### basic.js 配置说明

#### 概览

- Main 配置首屏展示的 tabs 页面
- Auth 配置登录注册相关的页面
- Guide 配置开屏引导页
- initialRouteName 页面打开时
- bottomTabNavigatorConfig tabBar 配置项，针对 Main 中的 router

#### Main

- Main: { [routerName:string]: RouterConfig }
- RouterConfig.tabBarIconType: 项目自定义配置项，传入 icon 的 type，控制 tabbar 的 icon 图标。优先级低于 navigationOptions.tabBarIcon
- RouterConfig.screen: 页面组件
- RouterConfig.navigationOptions: 导航选项
- RouterConfig.path: When deep linking or using react-navigation in a web app, this path is used

#### Auth

- Login: { [routerName:string]: RouterConfig } 登录、注册、三方登录、注册须知等等

#### Guid

- Guid: Component 配置开屏广告

#### BottomTabNavigatorConfig

- initialRouteName -第一次加载时初始选项卡路由的 routeName。
- navigationOptions-导航器本身的导航选项，用于配置父导航器
- defaultNavigationOptions - 用于屏幕的默认导航选项
- resetOnBlur - 切换离开屏幕时，重置所有嵌套导航器的状态， 默认值： false。
- order -定义选项卡顺序的 routeNames 数组。
- paths - 提供 routeName 到 path 配置的映射, 它重写 routeConfigs 中设置的路径。
- backBehavior-initialRoute 返回初始选项卡，order 返回上一个选项卡，history 返回上次访问标签或 none。
- lazy - 默认值: true. 如果 false，则所有选项卡都将立即呈现。 如果为 true，则仅在第一次使选项卡处于活动状态时才会显- 示这些选项卡。 注意：not 标签会在以后的访问中重新呈现。
- tabBarComponent -可选，覆盖用作标签栏的组件.
- tabBarOptions-具有以下属性的对象：
  - activeTintColor -活动选项卡的标签和图标颜色。
  - activeBackgroundColor -活动选项卡的背景色。
  - inactiveTintColor -"非活动" 选项卡的标签和图标颜色。
  - inactiveBackgroundColor -非活动选项卡的背景色。
  - showLabel -是否显示选项卡的标签, 默认值为 true。
  - showIcon - 是否显示 Tab 的图标，默认为 false。
  - style -选项卡栏的样式对象。
  - labelStyle -选项卡标签的样式对象。
  - labelPosition - 与标签图标相关的标签标签显示位置。 可用值为 beside-icon 和 below-icon。 默认为 beside-icon。
  - tabStyle -选项卡的样式对象。
  - allowFontScaling -无论标签字体是否应缩放以尊重文字大小可访问性设置，默认值都是 true。
  - adaptive - 标签图标和标签对齐方式是否应根据屏幕尺寸而改变？ iOS 11 上默认为 true. 如果 false，则选项卡图标和标签始终保持垂直对齐。 如果 true，则标签图标和标签在平板电脑上水平对齐。
  - safeAreaInset - 为 <SafeAreaView> 组件重写 forceInset prop， 默认值：{ bottom: 'always', top: 'never' }； top | bottom | left | right 的可选值有： 'always' | 'never'。
  - keyboardHidesTabBar - 默认值: false. 如果 true，则在键盘打开时隐藏标签栏。

以下下属性放在 navigationOptions 中，用于控制 tabbar

- tabBarVisible true 或 false 用于显示或隐藏标签栏，如果未设置，则默认为 true。

- tabBarIcon 给定{focused：boolean, horizo​​ntal：boolean, tintColor：string}的函数返回 React.Node，以显示在选项卡栏中。 当设备处于横屏时，horizontal 是 true；当设备处于竖屏时 false。 每当设备方向发生变化时, 都会重新渲染该图标。

- tabBarLabel 显示在选项卡栏中的选项卡的标题字符串或给定{focused：boolean, tintColor：string}的函数将返回 React.Node，以显示在选项卡栏中。 未定义时，使用场景 title。 要隐藏，请参阅上一节中的 tabBarOptions.showLabel。

- tabBarButtonComponent React 组件，它包装图标和标签并实现 onPress。 默认情况下是 TouchableWithoutFeedback 的一个封装，使其其表现与其它可点击组件相同。 tabBarButtonComponent: TouchableOpacity 将使用 TouchableOpacity 来替代.

- tabBarAccessibilityLabel 选项卡按钮的无障碍标签。 当用户点击该选项卡时，该标签会被屏幕阅读器阅读（用于方便视障人士使用 手机，鼓励有条件的开发者设置该标签）， 如果您的选项卡的没有标签, 强烈建议您设置此选项。

- tabBarTestID 用于在测试中找到该选项卡按钮的 ID。

- tabBarOnPress 处理点击事件的回调; 该参数是一个对象，其中包含：

  - navigation：页面的 navigation props
  - defaultHandler: tab press 的默认 handler
  - 在过渡到下一个场景之前添加自定义逻辑很有用（ 点击一个）开始。 设置 tabBarOnPress 时，需要调用 defaultHandler 来执行默认操作（即 switch 选项卡）。

- tabBarOnLongPress
  - 回调以处理长按事件；参数是一个包含以下内容的对象：
  - navigation：页面的 navigation props
  - defaultHandler: tab press 的默认 handler
