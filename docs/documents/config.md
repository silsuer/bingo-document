# 配置文件

`bingo` 存在两种配置使用方式，一种是 `.go`配置文件，另一种是`.yml`配置文件

市面上常用的配置文件格式大概有 `.ini`/`.yml`/`.env`/`.json`/`.xml` 几种，

而为了让部署方便一点，我的选择是将与环境无关的配置统一放置在一个`config`包里,直接将 `配置`作为包里的全局变量进行调用

与环境相关的配置(例如有些第三方服务: 通讯、图片上传等的生产环境和测试环境的`AppID`不同),放在项目目录下的 `.env.yaml`文件中，

当然，也可以不放在项目根目录下，而是在 `main.go` 文件里指定`env`文件的路径，默认值可以在 `main.go`文件中看到，就是和当前程序在同一目录下.

## yml配置文件的使用

`bingo` 对 `yaml`格式的文件操作用的是 [github.com/kylelemons/go-gypsy](https://github.com/kylelemons/go-gypsy) 包，使用文档可以在其`README.md`中找到

在每个应用实例下都有一个 `Env` 属性，所有`.env.yml`配置都可以从此处获取。

例子:

```
  // 把env文件路径传入进去
  p, _ := os.Getwd()
  app := core.NewApp(p + "/.env.yml")
  // 获取配置，不存在时将会抛出错误
  name := app.Env.Get("APP_NAME")
  fmt.Println(name) // output: bingo

  // 获取配置，不存在时会返回默认值
  name = app.Env.GetWithDefault("APP_NAME","example_name")
  fmt.Println(name) // output: bingo
```

可以对`Env`字段使用 `Get` 方法，获取 `.env.yaml` 文件中的对应字段，当字段不存在时会报错，代码在 `utils/env.go`文件中，可以根据你的需要自行修改

可以对`Env`字段使用 `GetWithDefault` 方法，为不存在的字段赋予一个默认值

## Q&A

1. 当在控制器中调用 `main.go`中创建的应用实例 `App` 的时候，会造成循环引用，在编译阶段报错:

   解决办法: 针对循环引用的问题，可以在 `config` 包下添加一个变量，将创建好的应用指针注入这个变量中，在控制器中使用的时候只需要使用配置包下的变量即可。


