# 更新日志

`Bingo` 在编写过程中经历过几次大的重构，甚至几次更改了开发思路，这里列出来曾经记录下来的变更，不是很全，也当做个纪念吧!


### 2018-04-08更新
   
   - 添加glide包管理工具，并且修复glide在win10上报错的bug
   
     重新编译glide.exe ,可直接使用
     
   - 把env文件使用yaml格式重写
   
### 2018-04-09更新
    
   - 初步完成仿照Laravel的ORM（可查询全部，可建表）
   
   - 初步完成命令行（bingo run -port=12345 [默认是8088端口] ; bingo init）
   
### 2018-04-15更新

   - 重写路由结构体，使用httprouter代替原来自己写的多路路由器
   
   - 使用方式：
       
       1. bingo init   // 创建env glide的yaml文件，以及其他的文件夹，并且初始化一个简易路由
       2. go run start.go // 执行自动生成的start.go，即可跑通localhost:12345,看到欢迎界面，证明安装完成
       
### 2018-04-16更新

   - 单纯使用httprouter在其他项目中会出现不可预知的错误，所以把httprouter的代码拷贝到项目中去，成为bingo.router
   
   - ORM可以进行插入、批量插入、忽略多余值插入、缓存表结构信息
   
      
### 2018-04-17 更新

   - ORM新增更新功能，可批量更新数据（目前只能使用Casual进行批量更新，即执行多条语句并忽略多余字段，比较耗时，性能低下）
   
   - ORM新增Where功能，可Where，可OrWhere
   
     ```go
        // 更新数据
        a := make(map[string]interface{})
        //a["id"] = 1
        a["name"] = "ddd"
        a["age"] = 11
        // 更新一行
        rr:= bingo.DB().(*mysql.Mysql).Table("test").Where("id",1).OrWhere("id",6).UpdateOneCasual(a)
        rr:= bingo.DB().(*mysql.Mysql).Table("test").Where("id",1).OrWhere("id",6).UpdateOne(a)
        fmt.Fprint(w,rr)
     ```
       
    - ORM增删改查全部完成，还差关联查询和分页查询~se
    
    
### 2018-07-24 更新

    - 程序开发时优雅重启（未完成）
    
    
### 2018-08-10 更新

  - bingo sword 命令简易实现
    
     主要使用 `go shell` 编程来实现，使用 bingo sword make:controller 
     
     可以执行Console/Commands文件中的脚本
     
     接下来将实现一些内置命令
     
### 2018-08-11 更新

  - bingo sword 内置命令实现
    
  - bingo sword make:command --name=CommandName 创建一个外部命令
    
  - bingo sword make:origin:command --name=CommandName 创建一个内置命令
    
### 2018-08-12 更新

  - 更新readme文件
    
  - 更新init方法
    
  - 将dev并入master并发布新版
    
### 2018-08-13 更新

  - 程序的平滑重启与关闭(关闭时将会自动关闭所有相关进程，重启时首先开启另一个进程接管当前进程，实现热更新)
    
      弃用 `bingo run` 方法
    
      使用 `bingo run dev` 运行开发环境程序
      
      使用 `bingo run daemon` 以守护进程运行程序
      
      使用 `bingo run daemon start` 以守护进程运行程序
      
      使用 `bingo run daemon restart` 平滑重启守护进程
      
      使用 `bingo run daemon stop` 平滑关闭重启
      
      （平滑关闭与重启: 由于使用了syscall包，所以不支持windows系统）
      
### 2018-08-14 更新

  - bingo run watch 监听当前工程目录下所有文件内容，当发现有修改时，平滑重启程序，加速开发
         
### 2018-08-19 更新

  - 添加配置文件解析
        
  - 修改了路由规则
    
  - 路由支持中间件、中间件组、路由组、别名路由
    
  - github上添加wiki页面，重新组织文档
    
### 2018-08-20 更新

  - 完成整个wiki文档,精简readme
    
  - 支持异步执行中间件

  - 路由组支持公共前缀

### 2018-08-27 更新

  - 初步完成模版引擎的设计 [bingo_tpl](https://github.com/silsuer/bingo_tpl)

  - 构建模版引擎环境变量，将解析文本流为词法链

### 2018-08-29 更新

  - 模版引擎所有标签、操作符全部解耦，单独添加配置，单独解析，接下来需要将词法链解析成token流

### 2018-10-10 添加单元测试

  - 测试脚手架
  - 测试访问

### 2018-10-11 更新

  1. 继续完善单元测试和压力测试

  2. 更改运行方式，通过打包直接运行，而不是通过go shell运行


### 2018-10-11 支持log

  1. 配置持续集成

  2. 配置docker

  3. sword脚手架参数传递的时候有问题


### 2018-10-12 更新

  1. 移除依赖注入包dig

### 2018-10-18 更新

  1. 写了一个日志包 bing-log
  2. 准备将这个日志包整合进bingo中


### 2018-11-19 更新

  1. 这一个月完成了 bingo-router,bingo-orm,bingo-events 三个模块，并初步整合进bingo框架中

### 2018-11-20 更新

  - 在本地创建文档目录，申请域名准备上线Bingo文档

  - 完善安装文档

### 2018-11-21 更新

  - 创建 `bingo` 的 `create` 命令
  - 压力测试并和gin、beego进行对比
  - 完善文档

### 2018-11-22 更新

  - 创建 `bingo` 的 `run dev`命令

