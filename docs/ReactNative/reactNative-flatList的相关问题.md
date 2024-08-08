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

## 在 Modal 中使用 FlatList 无法滑动

使用 TouchableWithoutFeedback 包裹 FlatList 的 renderItem

如果行之间有间隔 那么 ItemSeparatorComponent 也需要 TouchableWithoutFeedback 包裹

示例

```js
<FlatList
  style={{ flex: 1, height: "100%" }}
  initialNumToRender={20}
  data={result?.data}
  onEndReachedThreshold={0.2}
  onEndReached={loadMore}
  ListFooterComponent={renderFooter}
  keyExtractor={(item, index) => `OM-${item.id}-${index}`}
  ItemSeparatorComponent={() => (
    <TouchableWithoutFeedback>
      <View style={{ height: 12 }} />
    </TouchableWithoutFeedback>
  )}
  renderItem={({ item }) => {
    return (
      <TouchableWithoutFeedback>
        <View style={goodStyles.newGood}>
          <Text>测试</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }}
/>
```
