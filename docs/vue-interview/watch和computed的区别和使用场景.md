## computed 的实现原理

computed 本质上是一个惰性求值的观察者 computed watcher(每使用一个 computed 会分发一个 watcher(观察者))

- computed 在创建
