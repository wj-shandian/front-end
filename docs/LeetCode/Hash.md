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

## 第一个只出现一次的字符（简单题目）

在字符串 s 中找出第一个只出现一次的字符。如果没有，返回一个单空格。 s 只包含小写字母。  
s = "abaccdeff"
返回 "b"

s = ""
返回 " "

题目意思很清晰明了，不需要分析

开始做的时候以为很简单，首先把字符串转成数组，存 hash 表，重复的删除，最后返回 hash 表的第一位即可，后面提交发现不通过，没有考虑到一些边界问题，字符串里面没有符合的字符串，以及如果出现了奇数位的字符串就会出现问题了，于是看了官方题解。

很是巧妙，
第一次遍历 重复的 保存 value -1 不重复的 存索引值
第二次遍历判断 是否为 -1 以及 目标值索引是否大于当前索引值

看代码

```js
/**
 * @param {string} s
 * @return {character}
 */
var firstUniqChar = function (s) {
  if (s === "") return " ";
  var nums = s.split(""); // 转化成数组
  var map = new Map(); // 创建hash结构
  for (var i = 0; i < nums.length; i++) {
    // 第一次循环遍历
    if (map.has(nums[i])) {
      map.set(nums[i], -1);
    } else {
      map.set(nums[i], i);
    }
  }
  let first = nums.length;
  for (let value of map.values()) {
    if (value !== -1 && first > value) {
      first = value; // 当遇到第一个符合的字符串 first 被赋值了当前的索引，后面再有符合的值 first > value 判断就不会通过 ，所以这个就是第一个符合条件的
    }
  }
  return first === nums.length ? " " : nums[first];
};
```

次数 （1）

## 快乐数

编写一个算法来判断一个数 n 是不是快乐数。

「快乐数」定义为：

对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和。
然后重复这个过程直到这个数变为 1，也可能是 无限循环 但始终变不到 1。
如果 可以变为   1，那么这个数就是快乐数。
如果 n 是快乐数就返回 true ；不是，则返回 false 。

示例 1：

输入：19
输出：true
解释：
12 + 92 = 82
82 + 22 = 68
62 + 82 = 100
12 + 02 + 02 = 1

示例 2：

输入：n = 2
输出：false

题意很简单
思路：用 hash 表记录每一次的计算结果值 如果遇到有重复的结果，则返回 false

```js
/**
 * @param {number} n
 * @return {boolean}
 */
function next(value) {
  let total = 0;
  while (value > 0) {
    let d = value % 10;
    value = parseInt(value / 10); // 这里每次都要取整，不然计算会有小数，时间超时
    total += d * d;
  }
  return total;
}
var isHappy = function (n) {
  var map = new Map();
  while (n !== 1 && !map.has(n)) {
    // 注意这里的判断不要写错 写错无法进入循环
    map.set(n);
    n = next(n);
  }
  return n === 1;
};
```

次数 （1）

## 两个数组的交集 II (简单)

给定两个数组，编写一个函数来计算它们的交集。

示例 1：

输入：nums1 = [1,2,2,1], nums2 = [2,2]
输出：[2,2]

刚看这个题目，我以为我理解题意了，后来看了题解发现我理解错了。

开始我理解是要连续的交集，受到了示例的误导，导致没有思路。

这题是只要是交集就行，没有顺序问题

最容易想到的可能就是 hash（虽然我一开始也没想到）

两次遍历，第一把所有值存到 hash 表中，遇到相同的数+1

第二次遍历，查找 hash 表，存在并且值不为 0 的 就放到交集数组中

最后返回结果

这题还有一道排序双指针的解法，后续在双指针中在研究

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function (nums1, nums2) {
  let n1 = nums1.length,
    n2 = nums2.length;
  if (n1 === 0 || n2 === 0) return [];
  let i = 0,
    j = 0,
    num = new Map(),
    result = [];
  for (; i < n1; i++) {
    let nums = num.get(nums1[i]) ? num.get(nums1[i]) + 1 : 1;
    num.set(nums1[i], nums);
  }
  for (; j < n2; j++) {
    if (num.has(nums2[j]) && num.get(nums2[j]) !== 0) {
      result.push(nums2[j]);
      num.set(nums2[j], num.get(nums2[j]) - 1);
    }
  }
  return result;
};
```

次数（1）
