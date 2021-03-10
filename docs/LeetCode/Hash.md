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
