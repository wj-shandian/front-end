## onEndReached 重复请求

在某些情况下 如果不设置 height 那么可能会导致 不能正确的监听滚动条 导致 一直在重复的请求 函数 handleEndReach

```js
<FlatList
  data={data}
  keyExtractor={(item, index) => `reg-${index}`}
  style={{
    overflow: "auto",
    backgroundColor: "rgb(240,240,240)",
    paddingBottom: 10,
    paddingTop: 4,
    height: rankingHeight,
  }}
  renderItem={({ item, index }) => renderItem(item, index)}
  onEndReached={handleEndReach}
  onEndReachedThreshold={0.2}
/>
```
