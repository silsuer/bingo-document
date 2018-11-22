# 快速开始

### 安装

```
go get github.com/silsuer/bingo
```


> 可以在 `get` 命令后加上 `-v` 参数来显示下载详情

### 创建项目

```
bingo create demo
```

  该命令将会在当前目录下创建一个名为demo项目，并初始化，如果没有出现错误的话会出现下面的界面

  ![](http://qiniu-cdn.zhiguanapp.com/24a006d2c7f2f52d9a345e4c2454cd7b)

### 启动项目的开发服务器

```
cd demo
make dev
```

`bingo` 为项目生成了一个`Makefile` 文件，并填充了一些基本的脚本进行自动化构建

此时在控制台中显示下图，证明开启成功:

![](http://qiniu-cdn.zhiguanapp.com/ca12fa181c4d494640a72055a7af4cf4)

### 访问网站

在浏览器中输入`http://localhost:8080`,若安装成功，会出现一个小狮子...

> 这个吹风扇的小狮子是我偶然间看到的，觉得很有趣就存下来了,原文章显示已开源可商用，源码链接 [codepen](https://codepen.io/Yakudoo/pen/YXxmYR)

![](http://qiniu-cdn.zhiguanapp.com/a076a9134a5294317c3889506c667345)

### 更多内容，且听下回分解