## 起因

项目需求

## 官网

[官网文档](https://www.echartsjs.com/zh/option.html#yAxis.splitNumber)

## 方案

开始用到的 splitNumber 属性，但是这个属性或根据数据进行调整，无法控制分割线数。
后发现有强制设置坐标轴分割间隔的 api ： “interval”，因为  [splitNumber](https://www.echartsjs.com/zh/option.html#yAxis.splitNumber)  是预估的值，实际根据策略计算出来的刻度可能无法达到想要的效果，这时候可以使用 interval 配合  [min](https://www.echartsjs.com/zh/option.html#yAxis.min)、[max](https://www.echartsjs.com/zh/option.html#yAxis.max)  强制设定刻度划分，一般不建议使用。
虽不建议使用，但想要固定条数必须使用。

代码如下

```js
  // 获取最大值和最小值 这个函数只是自己处理最大值最小值的方案，只作为参考
  getNumber(data: any) {
    this.maxValue = Math.ceil(Math.max.apply(null, data));
    const minData = Math.min.apply(null, data);
    const minfloor = Math.floor(Math.min.apply(null, data));
    this.minValue = minfloor === minData ? minData - 1 : minfloor;
  }
// 计算间隔，返回最大值，最小值 ，间隔
  getLeftData(min: any, max: any) {
  // 控制分割条数，
    const distance = parseInt(((max - min) / 3).toString(), 10);
    return {
      max: 3 * distance + min + 3,
      min,
      interval: distance + 1,
    };
  }
// 部分代码
 initChart() {
    const id = document.getElementById('lineChart');
    const interval = this.getLeftData(this.minValue, this.maxValue);
    const myChart = echarts.init(id);
    const option = {
           yAxis: {
        type: 'value',
        // splitNumber: 2,
        min: interval.min,
        max: interval.max,
        interval: interval.interval,
        scale: true,
        }
      }
}
```
