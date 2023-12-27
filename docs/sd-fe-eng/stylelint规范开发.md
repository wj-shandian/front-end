# 关于stylelint规范开发

可以阅读以下官网 [stylelint官网](https://stylelint.io/user-guide/configure) 了解一下 stylelint的功能 以及能实现哪些东西

## 首先在项目 sd-fe-eng 初始化文件

learn create stylelint-config

然后learn会在 packages 生成一个文件夹 里面有一些初始化的文件创建在根目录下创建index.js
package.json的main入口 改为index.js

```js
module.exports = {
    // 默认错误级别
    defaultSeverity: 'warning',
    // 插件
    plugins: ['stylelint-scss'],
    // 规则
    rules: {
      /**
       * Possible errors
       * @link https://stylelint.io/user-guide/rules/#possible-errors
       */
      'at-rule-no-unknown': null,
      'scss/at-rule-no-unknown': true,
      'block-no-empty': null,
      'color-no-invalid-hex': true,
      'comment-no-empty': true,
      'declaration-block-no-duplicate-properties': [
        true,
        {
          ignore: ['consecutive-duplicates-with-different-values'],
        },
      ],
      'declaration-block-no-shorthand-property-overrides': true,
      'font-family-no-duplicate-names': true,
      'function-calc-no-unspaced-operator': true,
      'function-linear-gradient-no-nonstandard-direction': true,
      'keyframe-declaration-no-important': true,
      'media-feature-name-no-unknown': true,
      'no-descending-specificity': null, // @reason 实际有很多这样用的，且多数人熟悉 css 优先级
      'no-duplicate-at-import-rules': true,
      'no-duplicate-selectors': true,
      'no-empty-source': null,
      'no-extra-semicolons': true,
      'no-invalid-double-slash-comments': true,
      'property-no-unknown': true,
      'selector-pseudo-class-no-unknown': [
        true,
        {
          ignorePseudoClasses: ['global', 'local', 'export'],
        },
      ],
      'selector-pseudo-element-no-unknown': true,
      'string-no-newline': true,
      'unit-no-unknown': [
        true,
        {
          ignoreUnits: ['rpx'],
        },
      ],
  
      /**
       * Stylistic issues
       * @link https://stylelint.io/user-guide/rules/list#stylistic-issues
       */
      indentation: 2,
      'block-closing-brace-newline-before': 'always-multi-line',
      'block-closing-brace-space-before': 'always-single-line',
      'block-opening-brace-newline-after': 'always-multi-line',
      'block-opening-brace-space-before': 'always',
      'block-opening-brace-space-after': 'always-single-line',
      'color-hex-case': 'lower',
      'color-hex-length': 'short',
      'comment-whitespace-inside': 'always',
      'declaration-colon-space-before': 'never',
      'declaration-colon-space-after': 'always',
      'declaration-block-single-line-max-declarations': 1,
      'declaration-block-trailing-semicolon': [
        'always',
        {
          severity: 'error',
        },
      ],
      'length-zero-no-unit': [
        true,
        {
          ignore: ['custom-properties'],
        },
      ],
      'max-line-length': 100,
      'selector-max-id': 0,
      'value-list-comma-space-after': 'always-single-line',
  
      /**
       * stylelint-scss rules
       * @link https://www.npmjs.com/package/stylelint-scss
       */
      'scss/double-slash-comment-whitespace-inside': 'always',
    },
    // 忽略文件
    ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
  };

/**
* 部分规则上释义
1. `at-rule-no-unknown`: 检查是否有未知的 at-rule。如果存在这样的 at-rule，则会在 CSS Lint 中显示错误。该规则被禁用了，因为您在配置对象中将其设置为 `null`。
2. `scss/at-rule-no-unknown`: 检查 SCSS（嵌套的 CSS）代码中的未知的 at-rule。该规则被设置为 `true`，表示应该检查该规则。
3. `block-no-empty`: 检查块级选择器是否为空。如果存在空的块级选择器，则会在 CSS Lint 中显示错误。该规则被设置为 `null`，表示该规则被禁用了。
4. `color-no-invalid-hex`: 检查颜色值是否为有效的十六进制颜色。如果颜色值无效，则会在 CSS Lint 中显示错误。该规则被设置为 `true`，表示应该检查该规则。
5. `comment-no-empty`: 检查注释是否为空。如果存在空的注释，则会在 CSS Lint 中显示错误。该规则被设置为 `true`，表示应该检查该规则。
6. `declaration-block-no-duplicate-properties`: 检查声明块中是否有重复的属性。如果存在重复的属性，则会在 CSS Lint 中显示错误。该规则被设置为 `[true, {ignore: ['consecutive-duplicates-with-different-values']}]`，表示应该检查该规则，并且允许连续重复的属性，只要它们的值不同。
7. `declaration-block-no-shorthand-property-overrides`: 检查声明块中是否存在简写属性被覆盖的情况。如果存在简写属性被覆盖，则会在 CSS Lint 中显示错误。该规则被设置为 `true`，表示应该检查该规则。
8. `font-family-no-duplicate-names`: 检查字体的名称是否重复。如果存在重复的字体名称，则会在 CSS Lint 中显示错误。该规则被设置为 `true`，表示应该检查该规则。
9. `function-calc-no-unspaced-operator`: 检查 calc() 函数中的操作符是否包含空格。如果包含空格，则会在 CSS Lint 中显示错误。该规则被设置为 `true`，表示应该检查该规则。
10. `function-linear-gradient-no-nonstandard-direction`: 检查 linear-gradient() 函数的方向是否为标准方向。如果不为标准方向，则会在 CSS Lint 中显示错误。该规则被设置为 `true`，表示应该检查该规则。
11. `keyframe-declaration-no-important`: 检查关键帧声明中的 !important 关键字是否有效。如果存在无效的 !important，则会在 CSS Lint 中显示错误。该规则被设置为 `true`，表示应该检查该规则。
12. `media-feature-name-no-unknown`: 检查媒体特性名称是否为已知名称。如果存在未知的媒体特性名称，则会在 CSS Lint 中显示错误。该规则被设置为 `true`，表示应该检查该规则。
13. `no-descending-specificity`: 检查选择器是否具有降级specificity。如果存在降级specificity，则会在 CSS Lint 中显示警告。该规则被设置为 `null`，表示该规则被禁用了。
14. `no-duplicate-at-import-rules`: 检查 at-import 规则是否重复。如果存在重复的 at-import 规则，则会在 CSS Lint 中显示错误。该规则被设置为 `true`，表示应该检查该规则。
15. `no-duplicate-selectors`: 检查选择器是否重复。如果存在重复的选择器，则会在 CSS Lint 中显示错误。该规则被设置为 `true`，表示应该检查该规则。
16. `no-empty-source`: 检查源代码文件是否为空。如果文件为空，则会在 CSS Lint 中显示错误。该规则被设置为 `null`，表示该规则被禁用了。
17. `no-extra-semicolons`: 检查代码中是否有多余的分号。如果存在多余的分号，则会在 CSS Lint 中显示错误。
1. `indentation`: 设置缩进的空格数。该规则被设置为 2，表示应该使用 2 个空格进行缩进。
2. `block-closing-brace-newline-before`: 设置块级属性的关闭括号前的换行情况。如果该规则设置为 `always-multi-line`，则在多行情况下需要换行；如果该规则设置为 `always-single-line`，则在单行情况下需要换行。该规则被设置为 `always-multi-line`，表示应该在多行情况下换行。
3. `block-closing-brace-space-before`: 设置块级属性的关闭括号前的空格情况。如果该规则设置为 `always-single-line`，则在单行情况下需要添加空格；如果该规则设置为 `never`，则在所有情况下都不需要添加空格。该规则被设置为 `always-single-line`，表示应该在单行情况下添加空格。
4. `block-opening-brace-newline-after`: 设置块级属性的开始括号后的换行情况。如果该规则设置为 `always-multi-line`，则在多行情况下需要换行；如果该规则设置为 `always-single-line`，则在单行情况下需要换行。该规则被设置为 `always-multi-line`，表示应该在多行情况下换行。
5. `block-opening-brace-space-before`: 设置块级属性的开始括号前的空格情况。如果该规则设置为 `always`，则在所有情况下都需要添加空格；如果该规则设置为 `never`，则在所有情况下都不需要添加空格。该规则被设置为 `always`，表示应该在所有情况下添加空格。
6. `block-opening-brace-space-after`: 设置块级属性的开始括号后的空格情况。如果该规则设置为 `always-single-line`，则在单行情况下需要添加空格；如果该规则设置为 `always`，则在所有情况下都需要添加空格。该规则被设置为 `always-single-line`，表示应该在单行情况下添加空格。
7. `color-hex-case`: 设置十六进制颜色的大小写。如果该规则设置为 `lower`，则在所有情况下都使用小写字母；如果该规则设置为 `upper`，则在所有情况下都使用大写字母。该规则被设置为 `lower`，表示应该在所有情况下使用小写字母。
8. `color-hex-length`: 设置十六进制颜色字符的长度。如果该规则设置为 `short`，则在所有情况下都允许使用短格式（例如，`#123456`）；如果该规则设置为 `long`，则在所有情况下都允许使用长格式（例如，`#1234567890123456`）。该规则被设置为 `short`，表示应该在所有情况下都允许使用短格式。
9. `comment-whitespace-inside`: 设置注释中的空格情况。如果该规则设置为 `always`，则在所有情况下都允许注释中的空格；如果该规则设置为 `never`，则在所有情况下都不允许注释中的空格。该规则被设置为 `always`，表示应该在所有情况下允许注释中的空格。
10. `declaration-colon-space-before`: 设置声明中的冒号前的空格情况。如果该规则设置为 `never`，则在所有情况下都不允许冒号前的空格；如果该规则设置为 `always`，则在所有情况下都允许冒号前的空格。该规则被设置为 `never`，表示应该在所有情况下都不允许冒号前的空格。
11. `declaration-colon-space-after`: 设置声明中的冒号后的空格情况。如果该规则设置为 `always`，则在所有情况下都允许冒号后的空格；如果该规则设置为 `never`，则在所有情况下都不允许冒号后的空格。该规则被设置为 `always`，表示应该在所有情况下允许冒号后的空格。
12. `declaration-block-single-line-max-declarations`: 设置单行声明的最大数量。
   */
```

在插件中 stylelint stylelint-scss 在插件中添加 peerDependencies 避免插件的重复安装

## 在 sd-fe-eng项目中调试

创建文件 .stylelintrc 然后引入插件包

```js
{
  "extends": "./packages/stylelint-config/index.js"
}
```

根目录下安装 stylelint stylelint-scss

添加测试文件 index.css

```css
.a {
  font-weight: '400';
  color: #fff1az;
  padding-left: 10px;
  padding: 20px;
}
```

在package.json 添加命令 `"style": "stylelint \"*.(scss|css)\" --fix"`

然后执行 可以发现 一些报错 并且文件也做了一些修复 这里只能自动修复一些 不是所有的错误都能被修正，所以还需要自己手动修改

然后发布 npm包即可

当然里面的规则 可以根据自己或者团队形成自己的规范。上面的规范只是参考。
