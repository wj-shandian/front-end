## ES6 Map 的基本操作（hash）

```js
var map = new Map();

map.set("name", 1);
map.set(key, value); //设置成员属性
map.size; // 返回成员数量

map.get("name"); // 获取到1 如果找不到则返回undefined

map.has("name"); // 返回布尔值 表示某个键值是否存在

map.delete("name"); //删除某个键值对

map.clear(); // 清除所有成员 没有返回值
```

## Map 的遍历

- Map.prototype.keys()：返回键名的遍历器。
- Map.prototype.values()：返回键值的遍历器。
- Map.prototype.entries()：返回所有成员的遍历器。
- Map.prototype.forEach()：遍历 Map 的所有成员。

```js
const map = new Map([
  ["F", "no"],
  ["T", "yes"],
]);

for (let key of map.keys()) {
  console.log(key);
}
// "F"
// "T"

for (let value of map.values()) {
  console.log(value);
}
// "no"
// "yes"

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

// 等同于使用map.entries()
for (let [key, value] of map) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"
```

Map 转化成数组

```js
const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

[...map.keys()]
// [1, 2, 3]

[...map.values()]
// ['one', 'two', 'three']

[...map.entries()]
// [[1,'one'], [2, 'two'], [3, 'three']]

[...map]
// [[1,'one'], [2, 'two'], [3, 'three']]
```

Map 转化成对象

```js
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k, v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

const myMap = new Map().set("yes", true).set("no", false);
strMapToObj(myMap);
// { yes: true, no: false }
```

更多操作内容参考阮一峰 es6：https://es6.ruanyifeng.com/#docs/set-map

## 两数之和

这是一道简单题目，也是做的第一 leetcode ,第一遍做的时候没记录，现在记录一下，后面经常复习

给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 的那 两个 整数，并返回它们的数组下标。
你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。
你可以按任意顺序返回答案。
示例 1：

输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

题目分析
一个数组和一个目标值，找出数组中符合数组的目标值的索引，并且只会有一个数据符合要求

题解

暴力求解（最容易想到的，两次循环）

代码不再描述 时间复杂度 O(n2 n 平方)

Hash 表

```js
var twoSum = function (nums, target) {
  let map = new Map();
  for (var i = 0; i < nums.length; i++) {
    // 判断hash表里有没有目标值减去当前值，如果有则返回 两个index
    // 否则把目标值以及index存储进hash表中
    if (!map.has(target - nums[i])) {
      map.set(nums[i], i);
    } else {
      return [map.get(target - nums[i]), i];
    }
  }
};
```

次数
已做两次

## 只出现一次的数字 （简单题目）

给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？

简单题目 一下就想到用 hash 来做（haha 因为我选的就是 hash 标签）

解题思路：因为只有一个元素只出现一次，那么使用 hash 出现两次的则删除 hash 表中的数据，最后只有一个数据，取出数据返回即可

看下代码

```js
// 过于简单就不再赘述
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  var map = new Map();
  for (var i = 0; i < nums.length; i++) {
    if (map.has(nums[i])) {
      map.delete(nums[i]);
    } else {
      map.set(nums[i]);
    }
  }
  var res = [...map.keys()];
  return res[0];
};
```

题目还要增加需求，O(1)的空间复杂度可以做到吗？看了解题用到了位运算 有时间再研究

做过一遍
