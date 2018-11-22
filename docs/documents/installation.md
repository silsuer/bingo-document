# 安装


### 安装方式

一般来说go程序的安装有三种方式:

1. `go get`

    这是go程序一直以来用来安装包的命令，go开发组为其提供了一些参数来定制安装，例如使用 `-u` 参数强制刷新所有依赖,使用 `-v` 参数显示安装过程, `go get` 的过程相当于，将项目
    `clone` 到工程目录下，然后使用 `go install` 安装。

    `Bingo` 可以使用 `go get` 进行安装:

    ```
      go get github.com/silsuer/bingo
    ```

    > go 语言的依赖管理始终是一个饱受诟病的问题，这是历史遗留问题，目前已经开始着手在改善，例如下面要介绍的 `go mod`,所以 `go get` 这个命令将来会消失...

2. 第三方依赖管理工具

   作者最常用的是 `glide`，除此之外还有`Godep`,`gvp`等等，以 `glide` 为例，在项目根目录中使用 `glide init` 初始化一个`glide`项目，然后使用 `glide get github.com/silsuer/bingo` 添加依赖.

   但是并不推荐使用这种方式添加，因为 `bingo` 实际上是一个脚手架，不应该耦合在业务项目中，而且有些包管理工具不会自动执行 `go install` 操作，有可能需要开发者自己进入`vendor`目录进行手动 `go install`.

3. `go mod`

    `go mod` 是 `go` 在 `1.11` 版本中添加的新特性，在使用前要确保自己的go版本高于`1.11`,安装时可以使用 `GO111MODULE=on go get -v github.com/silsuer/bingo` 进行安装,如果有兴趣可以自己去搜一下，这里不再多说

### 常见问题

1. 在 `golang.org/x` 下的一些包有可能无法安装，需要在命令行中科学上网

2. 如果没有科学上网的工具，可以将项目从 `github.com`上 `clone` 下来，按照上面 `go get` 的原理放置在正确的 `$GOPATH` 目录中，然后手动 `go install`



