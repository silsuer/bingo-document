# 响应


## 简介

前面介绍过, `bingo-router`的上下文结构体封装了`ResponseWriter`/`Request`/`Params`，所有的操作都可以通过这三个字段延展出来

`bingo-router`提供了一些工具方法封装了 其中的一部分操作，前面介绍了对表单请求封装的方法，而这里要介绍的就是对响应封装的一些工具方法

##  方法

1. 重定向

   通过`Redirect()` 方法，传入一个路由路径，将重定向到这个路由中

   > 此处为 `302` 重定向

2. 响应字符串

   通过 `String()`  方法，传入要打印在浏览器中的字符串

3. 响应`JSON`

   通过 `ResponseJson()`  方法 ，传入一个指针或结构体实例，将会返回json格式的数据

   - 传入一个字符串，将直接打印这个字符串

   - 传入一个结构体指针 或 结构体实例，将打印  `json`格式的数据，键为结构体中 `json`标签的值

   - 传入一个 `map`，将打印`json`格式的数据，值和键 与 `map`的键和值对应

   >  `bingo`的`json`序列化使用 [github.com/json-iterator/go](https://github.com/json-iterator/go/) 包，以反射偏移量来替代反射包中的 `ValueOf()`操作，优化反射性能，当然，`map`类型 的数据是通过偏移量拿不到的，只能 通过`ValueOf`进行反射，所以不推荐向 `ResponseJson()` 方法 中传入`map`类型的值，会有[效率问题](https://zhuanlan.zhihu.com/p/25474088)

