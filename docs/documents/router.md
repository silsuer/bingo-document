# 路由控制

`bingo-router`是`bingo`的核心模块，基于`httprouter`，负责路由和控制器相关功能

## 简介

特性:

 - 路由快速查找

 - 动态路由传参

 - 子路由支持(路由组)

 - 中间件支持


`bingo-router` 基于 [httprouter](https://github.com/julienschmidt/httprouter) , 性能强劲， `httprouter` 拥有的特性，`bingo-router`也有，并且参考 [Laravel](https://github.com/laravel/laravel) 的 [Pipeline](https://laravel-china.org/articles/2769/laravel-pipeline-realization-of-the-principle-of-single-component) 功能，为 `bingo-router` 添加中间件支持，可以快速实现拦截器等常见功能

> 如果希望单独使用路由模块，请查看 `bingo-router` 的 [使用文档](https://github.com/silsuer/bingo-router)

## 启动过程

在讲解如何使用路由之前，我们需要看一下，`bingo-router` 的组成和启动过程:

1. 在项目的`main.go` 文件中，可以看见项目的初始化过程，首先使用 `NewApp()`函数，创建一个应用实例

   ```
   app := core.NewApp(p + "/.env.yml")
   ```

   应用结构体中，包含一个 `Cli`字段和一个 `Router` 字段，其中 `Cli` 字段用来处理自定义的项目命令，`Router`字段就是 `bingo-router`包中的路由器 `Router` 了

2. 在应用实例的路由器字段上挂载外部路由

   ```
   app.Router.Mount(routes.Api())
   ```

   其中，`routes.Api()` 就是我们在`routes/api.go` 文件中 `Api()` 函数中返回的路由,

   默认的 `Api()` 方法返回的是一个空的单一路由，通过子路由的方式挂载多个路由，子路由的使用方式会在下面介绍

3. 从 `Cli` 字段中加载定义的命令

   ```
   app.Cli.Run(os.Args)
   ```

   `bingo`的命令注册使用了 [urfave/cli](https://github.com/urfave/cli),提供了`Run()`方法用来传入命令行的参数
   
   在最开始`NewApp()` 的时候，添加了两个最基本的命令，可以进入 `core/core.go` 文件中查看源代码，添加了`run`,`sword`两个最基本的命令,

   而 `run` 命令就是启动监听端口服务的方法了,`sword` 用处下面会讲到，稍安勿躁...

4. 此时使用 `go build` 构建完项目后（例如项目名叫 `demo` ）

   然后在当前目录下将出现一个`demo`文件，这就是构建好的项目文件了,

   执行 `./demo run`

   就会启动一个进程来监听`.env.yaml`中指定的端口了（默认是`8080`）


5. 上面就是整个的项目启动过程，所以当我们要添加路由文件或者改造项目的时候，就可以直接更改源代码了

## 组成

  上面讲到的 `Router` 路由器结构体，是由多个 `Route`结构体组成的，而每存在一个 `Route`,就代表存在一个`URL`路由,

  `Route` 结构体中的所有方法，都可以使用链式操作，例如:

  |方法          | 备注  |
  |-----------|------ |
  |Get()             | 将当前路由 `method` 设置为 `GET`                                         |
  |Post()            | 将当前路由 `method` 设置为 `POST`                                        |
  |Patch()           | 将当前路由 `method` 设置为 `PATCH`                                       |
  |Put()             | 将当前路由 `method` 设置为 `PUT`                                         |
  |Delete()          | 将当前路由 `method` 设置为 `DELETE`                                      |
  |Request()         | 为当前路由设置路径和目标函数                                               |
  |Target()          | 将当前路由的 `targetMethod` 设置为一个函数                                 |
  |Middleware()      | 为当前路由添加一个中间件                                                  |
  |MiddlewareGroup() | 为当前路由添加一个中间件组                                                 |
  |Mount()           | 为当前路由添加子路由                                                      |
  |Name()            | 为当前路由设定一个名字                                                    |
  |Prefix()          | 为当前路由的所有子路由添加路由前缀                                          |
  |Resource()        | 为当前路由添加一组兼容 `RESTFUL API` 的子路由（目前还有一些问题，正式版会解决）  |



## 使用

#### 添加路由


1. 方式1: 通过匿名函数添加

   将 `routes/api.go` 文件中的`Api()`函数，改为如下代码:

   ```
      func Api() *bingo_router.Route {
       	return bingo_router.NewRoute().Get("/").Target(func(c *bingo_router.Context) {
		         c.String("hello world!")
	      })
     }
   ```

   首先使用 `NewRoute()` 方法新建一个 `Route`,然后使用 `Get()`和 `Target()` 方法设定路径和目标函数，例如上述代码，

   使用 `bingo run dev` 或 `make run` 命令启动服务后，浏览器访问 `http://localhost:8080/`,可以看到浏览器打印出了

   `hello world!`

2. 方式2: 通过控制器添加

   首先看一下控制器的组成,在项目根目录下输入 `bingo sword make:controller example_controller`,在 `http/controllers`目录下将会出现一个 `example_controller` 文件:

添加路由
1. 匿名函数添加
2. 控制器添加

获取路由参数
获取method传过来的参数

中间件
1. 介绍
2. 使用







## 扩展应用

子路由
路由前缀
中间件组


