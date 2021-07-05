之前有遇到长列表渲染的问题，当时使用的是别人造好的轮子，现在自己从零学习实现一个简单版本的

当数据过多，一次性渲染太多数据，渲染比较慢，用户体验较差，而且会有过多的 dom 元素
看看有哪些优化方式

## 分片渲染

分片渲染可以让我们对数据一段一段的渲染，而不是一次全部渲染完毕，优化了渲染时间，但是 dom 元素过多的问题没有解决

源码中 shard-list 组件就时分片渲染
主要时利用宏任务的机制 因为 宏任务和 GUI 渲染是不能同时存在的

开始执行代码 ，清空微任务队列，开始 GUI 渲染，渲染完毕 开始宏任务

再次执行宏任务的代码 清空微任务的队列 再次开始 GUI 渲染 往复循环

具体实现看代码 ，比较简单 递归调用即可

```vue
<template>
  <div class="shard-list" ref="shard"></div>
</template>

<script>
export default {
  name: "shard-list",
  data() {
    return {
      total: 1000,
      index: 0,
      id: 0,
    };
  },
  created() {
    this.$nextTick(() => {
      this.load();
    });
  },
  methods: {
    load() {
      this.index += 50;
      if (this.index < this.total) {
        const that = this;
        setTimeout(() => {
          for (let i = 0; i < 50; i++) {
            let li = document.createElement("li");
            li.innerHTML = that.id++;
            that.$refs.shard.appendChild(li);
          }
        }, 0);
        this.load();
      }
    },
  },
};
</script>

<style lang="scss"></style>
```

## 固定高度虚拟列表渲染

分片渲染只能解决渲染时间的问题，dom 节点过多问题没有解决，虚拟列表就可以解决这个问题

虚拟列表，只显示可视区域的内容

创建组件 virtual-list.vue

App.vue 引入组件

```vue
<template>
  <div id="app">
    <!-- 虚拟列表 固定列表高度 size是固定每行高度 remain 是固定显示条数-->
    <VirtualList :size="40" :remain="8" :dataList="items">
      <!-- 
        使用插槽我们可以随意改变渲染结构的样式
        如果不适用插槽，那么数据在子组件渲染，这个时候如果我们多出地方使用并且样式不一样，可扩展性不高，所以使用插槽
        固定高度的 虚拟列表 主要思路时，每次滑动根据滚动距离 去计算开始位置和结束位置的数据，重新渲染数据
       -->
      <template #default="{ item }">
        <div style="height: 40px; border: 1px solid red">
          {{ item.id }}
        </div>
      </template>
    </VirtualList>
  </div>
</template>

<script>
import VirtualList from "./components/virtual-list.vue";
let items = [];
for (let i = 0; i < 10000; i++) {
  items.push({ id: i, value: i });
}
export default {
  name: "App",
  components: {
    VirtualList,
  },
  data() {
    return {
      isVirtualList: false,
      items,
    };
  },
};
</script>

<style lang="scss"></style>
```

virtual-list.vue 中的代码

```vue
<template>
  <div id="virtual-list" ref="warp" @scroll="handScroll">
    <!-- 显示滚动条高度-->
    <div ref="scrollHeight"></div>
    <div class="visibleWarp" :style="{ transform: `translateY(${offset}px)` }">
      <div v-for="item in visibleList" :key="item.id" :id="item.id">
        <slot :item="item"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "virtual-list",
  props: {
    size: Number,
    remain: Number,
    dataList: Array,
  },
  data() {
    return {
      start: 0,
      end: this.remain,
      offset: 0,
    };
  },
  computed: {
    visibleList() {
      return this.dataList.slice(this.start, this.end);
    },
  },
  mounted() {
    this.$refs.scrollHeight.style.height =
      this.size * this.dataList.length - 1 + "px";
    this.$refs.warp.style.height = this.remain * this.size + "px";
  },
  methods: {
    handScroll() {
      // 获取滚动条的滚动的距离
      const scrollTop = this.$refs.warp.scrollTop;
      this.start =
        Math.floor(scrollTop / this.size) - 1 >= 0
          ? Math.floor(scrollTop / this.size)
          : 0;
      this.end = this.start + this.remain;
      // 计算列表移动的偏移值   滚动的时后我们需要移动 visibleWarp
      this.offset = this.start * this.size;
    },
  },
};
</script>

<style lang="scss">
#virtual-list {
  position: relative;
  overflow-y: auto;
}
.visibleWarp {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 2;
}
</style>
```

因为是固定高度列表 所以计算是比较方便的

## 不定高度虚拟列表渲染

固定高度使用场景比较有局限性，大部分我们是不确定每行的高度的

不确定的高度计算相对是比较麻烦的 看一下实现过程

App.vue

```vue
<template>
  <div id="app">
    <!-- 虚拟列表 列表高度不固定 size是预估的高度 remain 显示的条数-->
    <VirtualListNoHeight :size="80" :remain="8" :dataList="dataList">
      <template #default="{ item }">
        <div style="padding: 20px; border: 1px solid red">
          {{ item.value }}
        </div>
      </template>
    </VirtualListNoHeight>
  </div>
</template>

<script>
import VirtualListNoHeight from "./components/virtual-list-no-height.vue";
import Mock from "mockjs"; // 模拟数据
let dataList = [];
for (let i = 0; i < 10000; i++) {
  // 随机生成 5 - 10个句子的中文段落
  dataList.push({ id: i, value: Mock.Random.cparagraph(5, 15) });
}
export default {
  name: "App",
  components: {
    VirtualListNoHeight,
  },
  data() {
    return {
      dataList,
    };
  },
};
</script>

<style lang="scss"></style>
```

创建 子组件 virtual-list-no-height.vue

```vue
<template>
  <div id="virtual-list-no-height" ref="warp" @scroll="handScroll">
    <div ref="scrollHeight"></div>
    <div class="visibleWarp" :style="{ transform: `translateY(${offset}px)` }">
      <div v-for="item in visibleList" :key="item.id" :id="item.id" ref="items">
        <slot :item="item"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "virtual-list-no-height",
  props: {
    size: Number,
    remain: Number,
    dataList: Array,
  },
  data() {
    return {
      start: 0,
      end: this.remain,
      offset: 0,
    };
  },
  computed: {
    visibleList() {
      // 防止前面渲染空白 预留部分数据
      const prveCount = Math.min(this.start, this.remain);
      const reallyStart = this.start - prveCount;
      // 防止后面渲染空白 预留部分数据
      const nextCount = Math.min(this.dataList.length - this.end, this.remain);
      const reallyEnd = this.end + nextCount;
      return this.dataList.slice(reallyStart, reallyEnd);
    },
  },
  mounted() {
    // 预估计算全局区域的高度
    this.$refs.scrollHeight.style.height =
      this.size * this.dataList.length - 1 + "px";
    // 计算可视区域的高度
    this.$refs.warp.style.height = this.remain * this.size + "px";
    // 缓存全部数据的高度
    this.cacheList();
  },
  updated() {
    // dom 更新后开始计算
    this.$nextTick(() => {
      const dom = this.$refs.items;
      if (!(dom && dom.length > 0)) return; //没有dom 就返回
      dom.forEach((item) => {
        const { height } = item.getBoundingClientRect(); // 获取每个节点的真实dom 高度
        // 更新缓存里面的数据
        const id = item.getAttribute("id"); // 拿到节点id
        const oldHeight = this.positionData[id].height; // 获取缓存数据高度
        const diffence = oldHeight - height;
        if (diffence) {
          //如果高度改变 更新bottom height  top不需要改动
          this.positionData[id].height = height;
          this.positionData[id].bottom =
            this.positionData[id].bottom - diffence;
          // 后面的 top   bottom 都需要改变
          for (let i = id + 1; i < this.positionData.length; i++) {
            if (this.positionData[i]) {
              this.positionData[i].top = this.positionData[i - 1].bottom;
              this.positionData[i].bottom =
                this.positionData[i - 1].bottom - diffence;
            }
          }
        }
      });

      this.$refs.scrollHeight.style.height =
        this.positionData[this.positionData.length - 1].bottom + "px";
    });
  },
  methods: {
    // 缓存数据
    cacheList() {
      // 保存数组中每一项的高度  top  和 bottom
      this.positionData = this.dataList.map((item, index) => {
        return {
          height: this.size,
          top: this.size * index,
          bottom: (index + 1) * this.size,
        };
      });
    },
    handScroll() {
      // 获取滚动条的滚动的距离 以为每一项的高度是不定 所以计算方式要改变
      const prveCount = Math.min(this.start, this.remain);
      const scrollTop = this.$refs.warp.scrollTop;
      //   this.start =
      //     Math.floor(scrollTop / this.size) - 1 >= 0
      //       ? Math.floor(scrollTop / this.size)
      //       : 0;
      //   this.end = this.start + this.remain;
      //   // 计算列表移动的偏移值
      //   this.offset = this.start * this.size;
      // 获取滚定到那条数据
      this.start = this.getStartIndex(scrollTop);
      this.end = this.start + this.remain;
      this.offset = this.positionData[this.start - prveCount]
        ? this.positionData[this.start - prveCount].top
        : 0;
    },
    getStartIndex(scrollTop) {
      // 二分查找 移动距离是 哪一项 的bottom
      let start = 0; // 第一个选项
      let end = this.positionData.length - 1; // 最后一个选项
      let temp = null;
      while (start <= end) {
        let midIndex = (start + end) >> 1;
        // 中间一项的bootom 值
        let midVal = this.positionData[midIndex].bottom;
        if (scrollTop === midVal) {
          return midIndex + 1;
        } else if (scrollTop < midVal) {
          end = midIndex - 1;
          if (temp === null || temp > midIndex) {
            temp = midIndex;
          }
        } else if (scrollTop > midVal) {
          start = midIndex + 1;
          if (temp === null || temp < midIndex) {
            temp = midIndex;
          }
        }
      }
      return temp;
    },
  },
};
</script>

<style lang="scss" scoped>
#virtual-list-no-height {
  position: relative;
  overflow-y: auto;
}
.visibleWarp {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 2;
}
</style>
```

不固定高度的关键思想是二分查找，利用二分查找 找到滚动位置的数据是多少条，

在此之前还要 缓存数据 获取真实节点的高度 修改缓存数据 保证查找的值的正确性

最后还可以给滚动加个节流函数

## 源码

[代码地址](https://gitee.com/yufengJie/virtual-list.git)
