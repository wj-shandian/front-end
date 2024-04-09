# 长列表渲染的终极方案

首先长列表数据渲染 首选的应该是分页，但是基于一些业务无法做成分页。那么其次就是之前提到的 虚拟列表。

但是虚拟列表也是有一定的缺陷。例如滚动过快 渲染空白 等一些问题。

那么终极方案来了 canvasTable，用 canvas 来绘制表格，我们都是 canvas 的性能是非常好的。那么就跟随着一起实现 一个简单的 canvasTable 吧

## 使用 vite 搭建一个简单的 vue 项目即可

```js
pnpm create vite my-vue-app --template vue
```

可以去 vite 官网随便下载一个模版即可

## 新建一个 canvasTable.vue 组件

看下实现的代码 这个以 注释的形式 去分析

```vue
<template>
  <h1>长列表渲染的终极方案 canvasTable</h1>
  <div class="container">
    <input @input="handleSearch" />
    <canvas ref="canvas" id="canvas" width="600" height="600"
      >对不起，您的浏览器不支持</canvas
    >
  </div>
</template>

<script setup>
// 第一步
import { onMounted, onUnmounted, reactive, ref, watch } from "vue";

// 第二步
let startRow = 0;
// 视图可见的行数
const visibleRows = 10;

/* 在 Vue 中，`defineEmits` 是一个用于定义组件所触发的事件的函数。
  通过使用 `defineEmits('click')`，可以在组件中定义一个名为 `click` 的事件。
  这样，在组件中就可以通过 `$emit('click')` 来触发这个事件，
  从而通知父组件或其他监听了该事件的地方做出相应的处理。
  这种方式可以让组件更加灵活和可复用。
*/

defineEmits("click");

// 获取 canvas dom 引用
// 注意一定不要用 dom 操作
const canvas = ref(null);

// 表格的 宽 和 这里可以按照自己的需要设置
const cellWidth = 100 * 2;
const cellHeight = 30 * 2;

// 选中单元格的位置 这个是在点击的时候去更新 点击的是那一行 那一列
const selectedCell = reactive({ row: -1, column: -1 });

// 模拟数据
const tableData = {
  columns: [
    {
      title: "姓名",
      key: "name",
      width: 100,
    },
    {
      title: "姓别",
      key: "sex",
      width: 100,
    },
    {
      title: "年龄",
      key: "age",
      width: 100,
    },
  ],
  dataSource: Array.from({ length: 10000 }).map((item, index) => ({
    key: index,
    name: `name-${index}`,
    age: Math.floor(Math.random() * 100),
    sex: index % 2 === 0 ? "男" : "女",
  })),
};

// 第三步
// 响应式数据
// 数据跟 UI 本身没有关系
// 我们做筛选，影响的是数据
const data = reactive({
  ...tableData,
  tempDataSource: tableData.dataSource,
});

// 第四步
// 画表格
function drawTable() {
  canvas.value.addEventListener("click", handleClick);
  const ctx = canvas.value.getContext("2d");

  const { columns, dataSource } = data;
  const padding = 20;
  const pixelRatio = window.devicePixelRatio;

  ctx.clearRect(0, 0, 600, 600);

  ctx.beginPath();

  // 画表头内容
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];
    ctx.font = `bold ${16 * pixelRatio}px serif`;
    ctx.fillText(column.title, i * cellWidth + padding, cellHeight / 2 + 10);
  }
  // 画横线
  for (let i = 0; i <= visibleRows; i++) {
    ctx.moveTo(0, i * cellHeight);
    ctx.lineTo(600, i * cellHeight);
    ctx.stroke();
  }
  // 画竖线
  for (let j = 0; j <= columns.length; j++) {
    ctx.moveTo(j * cellWidth, 0);
    ctx.lineTo(j * cellWidth, 600);
    ctx.stroke();
  }

  // 画表格内容
  for (let i = startRow; i < startRow + visibleRows; i++) {
    const record = dataSource[i];
    for (let j = 0; j < columns.length; j++) {
      if (selectedCell.row === i && selectedCell.column === j) {
        // 点击选中给出颜色
        ctx.fillStyle = randomColor();
        ctx.fillRect(
          j * cellWidth,
          (i - startRow + 1) * cellHeight,
          cellWidth,
          cellHeight
        );
        ctx.fillStyle = "black";
      }
      const column = columns[j];
      ctx.font = `${16 * pixelRatio}px serif`;
      if (j !== columns.length) {
        ctx.fillText(
          record[column.key],
          j * cellWidth + padding,
          (i - startRow + 1) * cellHeight + cellHeight / 2 + 10
        );
      }
    }
  }
  ctx.closePath();
}
// 第五步
// 监听滚动
function handleWheel() {
  document.addEventListener(
    "wheel",
    (ev) => {
      const { deltaY } = ev;
      console.log(deltaY, "deltaY");
      if (deltaY < 0) {
        startRow = Math.max(0, startRow - 1);
      } else {
        startRow = Math.min(data.dataSource.length, startRow + 1);
      }

      drawTable();
    },
    false
  );
}

onMounted(() => {
  drawTable();
  handleWheel();
});

watch(
  // 监听 data 中的 dataSource
  () => data.dataSource,
  () => {
    drawTable();
  }
);

// 第六步
// 点击时触发的函数
function handleClick(ev) {
  // 当前点了哪里
  const { left, top } = canvas.value.getBoundingClientRect();
  const x = ev.clientX - left;
  const y = ev.clientY - top;

  // 判断我点的 xy，落到了哪个单元格下
  const rowIndex = Math.floor(y / cellHeight) - 1 + startRow;
  const colIndex = Math.floor(x / cellWidth);
  console.log(
    "🚀 ~ file: CanvasTable3.vue:47 ~ handleClick ~ colIndex:",
    rowIndex,
    colIndex
  );

  // 我只需要判断 rowIndex >=0 rowIndex < data.length 说明被选中
  console.log(
    "🚀 ~ file: CanvasTable3.vue:52 ~ handleClick ~ rowIndex:",
    rowIndex
  );
  if (rowIndex >= 0 && rowIndex < data.dataSource.length) {
    // 说明有单元格被选中
    selectedCell.row = rowIndex;
    selectedCell.column = colIndex;
    console.log(
      "🚀 ~ file: CanvasTable3.vue:55 ~ handleClick ~ selectedCell:",
      selectedCell
    );
    // 触发点击事件
    // this.$emit('click')
    // 重绘表格
    drawTable();
  }
}
const randomColor = () => {
  // 随机颜色
  const randomNum = Math.random();
  console.log(
    "🚀 ~ file: CanvasTable3.vue:62 ~ randomColor ~ randomNum:",
    randomNum
  );

  if (randomNum > 0 && randomNum < 0.3) {
    return "red";
  } else if (randomNum > 0.3 && randomNum < 0.6) {
    return "blue";
  } else {
    return "yellow";
  }
};
// 第七步
const handleSearch = (ev) => {
  const { value } = ev.target;
  // data.dataSource.filter((item) => item.name.includes(value))
  // vue 中间数组的操作，一定要注意
  // 太大变动会导致 rerender

  // 但是我们现在不同，因为我们使用的 canvas table 的方案
  data.dataSource = data.tempDataSource.filter((item) =>
    item.name.includes(value)
  );
};
// 第八步
onUnmounted(() => {
  canvas.value?.removeEventListener("click", handleClick);
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
canvas {
  background-color: #fff;
  cursor: pointer;
}
</style>
```

按照步骤分析一下 都不是很容易理解的部分
