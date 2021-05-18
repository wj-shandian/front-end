这个问题网上有很多答案，也很容易搜索到，v-for 的优先级比 v-if 高，

大部分的资料都没有详细说明是为什么，所以这篇文章我们从源码的角度看看是为什么

在源码 vue/src/compiler/codegen/index.js 中我们可以看到

部分代码

```js
export function genElement(el: ASTElement, state: CodegenState): string {
  if (el.parent) {
    el.pre = el.pre || el.parent.pre;
  }

  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state);
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state);
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state);
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state);
  } else if (el.tag === "template" && !el.slotTarget && !state.pre) {
    return genChildren(el, state) || "void 0";
  } else if (el.tag === "slot") {
    return genSlot(el, state);
  } else {
    // component or element
    let code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      let data;
      if (!el.plain || (el.pre && state.maybeComponent(el))) {
        data = genData(el, state);
      }

      const children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = `_c('${el.tag}'${
        data ? `,${data}` : "" // data
      }${
        children ? `,${children}` : "" // children
      })`;
    }
    // module transforms
    for (let i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code;
  }
}
```

- 在模板渲染解析 ast 的时候 可以看到 for 的解析判断是在 if 之前的，所以有更高的优先级被解析
- 如果同时出现就会先循环再判断，无论如何都不能避免循环，浪费性能
- 如果同时出现，我们可以再外层添加 template 模板 进行 v-if 判断然后在内部进行 v-for 循环
