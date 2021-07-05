- props
- Vuex
- provide/inject
- $attrs/$listeners
- $parent/$children
- $emit/$on
- event bus

常用的就这几种

父子组件传值 一般用 props 如果需要保存状态，可以用 vuex
兄弟组件可以用 vuex 或者 $emit/$on
跨组件 推荐 vuex

不推荐使用$parent/$children
