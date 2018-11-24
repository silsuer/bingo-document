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

   首先看一下控制器的组成,在项目根目录下输入 `bingo sword make:controller ExampleController`,在 `http/controllers`目录下将会出现一个 `example_controller` 文件:

   ```
     package controllers

     import (
	     "github.com/silsuer/bingo-router"
      )

     type ExampleController struct {
	     bingo_router.Controller
     }

   ```

   > 可以试试在这条命令上添加 `--resource` 参数是什么情况~

   此时可以直接在控制器上添加方法了,例如在这个控制器上添加一个打印`hello`的路由，首先编写控制器方法

   ```
     func (e *ExampleController) Index(c *bingo_router.Context) {
         c.String("hello")
     }
   ```
  
   然后在 `Api()` 函数中 注册这个路由：

   ```
    b.NewRoute().Get("/hello").Target(controllers.ExampleController{}.Index)
   ```

   然后启动服务，浏览器访问 `http://localhost:8080/hello`，浏览器打印出 `hello`

#### 路由参数

  1. 在路由中设置参数

     上面说过，添加路由时使用 `NewRoute().Get("/").Target()` 来注册路由，有时我们需要在程序中获取`URL`中传入参数，可以在方法中这样注册:

     ```
       // 以冒号加参数名的形式作为Get参数
       NewRoute().Get("/:id").Target()
     ```
   
  2. 在程序中使用上下文的`Params`属性获取参数:

     ```
       func Index(c *bingo_router.Context) {
       	c.String(c.Params.ByName("id"))
        }
     ```
     其中,函数的参数 `*bingo_router.Context` 是 `bingo-router`的上下文结构体，封装了`httprouter`的一些参数,`Writer`/`Request`/`Params`,并添加了一些函数作为工具方法，`c.String()`，就是响应字符串的方法，将获取的参数打印到浏览器中，

     此时在浏览器中输入 `http://localhost:8080/233`,在浏览器中将会打印输出： `233`

#### 中间件

  1. 简介

     `bingo` 参考了 `Laravel` 的中间件实现原理，实现了一个中间件结构体 `Pipeline`,它可以将一些单一操作连接起来，并在其中随时进行拦截，

     中间件实际上就是一个 `func(c *bingo_router.Context, next func(c *bingo_router.Context))` 类型的函数，可以将一个请求过程看做一个管道，上下文指针经过层层中间件后，最终到达目标方法，在这个过程中，可以随时终止这个管道（即拦截）或者修改上下文数据，其中第一个参数就是上面讲到的上下文结构体`Context`的指针,可以直接修改指针指向的数据，第二个参数是一个回调函数，当调用第二个参数方法后，会将上下文指针送入下一个中间件中，依赖于调用栈的后进先出特性，当执行完目标函数后，会持续弹出调用栈，继续运行`next()`函数后的代码。

  2. 创建中间件
     
     在项目根目录执行 `bingo sword make:middleware <middleware-name>`,将会在 `http/middlewares` 目录下创建一个中间件文件,例如:

     ```
      bingo sword make:middleware ExampleMiddleware
     ```

     将会在 `http/middlewares`目录下出现一个`ExampleMiddleware.go`文件，内容如下:

     ```
       func ExampleMiddleware(c *bingo_router.Context, next func(c *bingo_router.Context)) {
         next(c)
       }
     ```
     
  3. 注册中间件

     在 `Api()` 方法中使用`Middleware()`为注册的路由添加中间件:

     ```
       return bingo_router.NewRoute().Middleware(middlewares.ExampleMiddleware).Get("/").Target(controllers.Index)
     ```

  4. 使用

     中间件可以为前置中间件和后置中间件，如果修改代码如下:

     ```
       func ExampleMiddleware(c *bingo_router.Context, next func(c *bingo_router.Context)) {
         c.String("hello")
         next(c)
       }
     ```

     将会在目标函数之前打印 `hello`

     这样就可以在进入路由逻辑之前做一些准备工作，比如说权限验证、数据拦截等功能，这样的中间件称为前置中间件，

     如果代码如下:

     ```
       func ExampleMiddleware(c *bingo_router.Context, next func(c *bingo_router.Context)) {
         c.String("hello")
         next(c)
       }
     ```

     将会在目标函数之后打印 `hello`

     这样就可以在执行完业务逻辑之后做一些收尾工作，比如日志记录等，这样的中间件称为后置中间件。

     > 可以看出 `next()` 函数就是进入下一个路由的入口，可以控制何时进入下一个中间件，所以在一个中间件中，务必要记得调用一次 `next()` 方法，如果不调用，逻辑将会在此处停止，不会继续向下传递


## 扩展应用

#### 中间件组

  上面讲到，当创建了一个中间件后，需要使用 `Middleware()` 方法将中间件注册到路由上，但是经常需要用到多个中间件，虽然可以链式调用多次 `Middleware()` 来注册多个路由，但是这样的代码看起来也较为冗余，所以 `bingo` 提供了 `MiddlewareGroup()` 方法可以一次性注册多个路由，
  这个路由接受一个中间件数组，所以可以用一个方法返回一个中间件数组，来统一注册，而如何让一个中间件数组同时应用到多个路由上呢？ 这就需要使用最后要介绍的子路由啦！

#### 路由前缀

  有时候我们的多个路由存在一个统一的前缀，例如，有些公司经常将所有的 `API` 接口设置为: `http://example.com/api/xxx`

  该公司的所有 `API` 都有一个 `/api`前缀，如果每个路由都写一次`/api`再跟上真正的`api`路径的话，会出现大量重复的路由，当需要修改的时候，也要更改每一个位置，十分繁琐，所以可以使用 `Prefix()` 方法为某个路由的所有子路由添加一个统一前缀:

  ```
    func Api() *bingo_router.Route {
    	  return bingo_router.NewRoute().Prefix("/api/").Mount(func(b *bingo_router.Builder) {
		    b.NewRoute().Get("test").Target(controllers.Index)
        b.NewRoute().Get("test2").Target(controllers.Show)
	    })
    }
  ```

  上面的代码就添加了两个路由并为这两个路由添加了同样的前缀`/api`,所以此时的两个路由的路径为:

  `/api/test`

  `/api/test2`
 
  其中，路由前缀只对该路由的子路由有效，对当前路由无效

  上面还用到了 `Mount()`方法，这就是前面提过好多次的子路由的挂载方式，接下来就该它出场了...


#### 子路由

 1. 简介

    在其他的 `web`框架中，经常会出现一个路由组的概念，即将一组功能相近的路由统一放入一个路由组中进行管理，而在 `bingo` 中，并没有路由组的概念，而是用 **子路由** 来完成路由组的功能.

    在 `bingo-router`中，一共存在两个 `Mount()` 方法，一个是路由器结构体`Router`，另一个是路由结构体`Route`,都存在 `Mount()` 方法

    - 路由器结构体`Router`下的 `Mount()` 方法的用处：

      遍历路由以及这个路由下的所有子路由，将一些父路由的信息（如前缀、中间件等）补充进子路由中，并将所有的路由注册进路由器中，即挂载到`Router`结构体的 [前缀树](http://www.okyes.me/2016/05/08/httprouter.html) 上

    - 路由结构体 `Route` 下的`Mount()` 方法的用处:

      将一些功能类似的路由放置在同一个父路由下，共享父路由的前缀、中间件等信息，而且还保留着父路由可被访问的特性 

 2. 使用

    在默认的项目中,就是使用一个简单父路由下面挂载多个子路由的:

    ```
      func Api() *bingo_router.Route {
	        return bingo_router.NewRoute().Prefix("/api/").Middleware(middlewares.Log).Mount(func(b *bingo_router.Builder) {
		      b.NewRoute().Get("/").Target(controllers.Index)
	      })
      }
    ```

    上面的代码，`Mount()` 方法中传入一个回调函数，这个回调函数的参数是一个`Builder`类型的指针，所有从这个指针上使用`NewRoute()`方法创建的路由，将 都会被挂载到父路由中，这样我们就可以方便的实现路由组的功能了

      
