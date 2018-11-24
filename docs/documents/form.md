# 表单操作

## 介绍

`bingo-router`的上下文结构体，封装了三个字段:

  - `ResponseWriter` 响应
 
  - `Request` 请求

  - `httprouter.Params` 动态参数

所以我们对请求的所有操作，都可以从这三个字段中进行获取，为了方便，`bingo-router`对上下文封装了几个简单的方法进行获取

## 获取GET表单

  
  |方法          | 备注  |
  |-----------|------ |
  |Get()             | 相当于`c.Request.FormValue(key)`,获取当前的路由通过`GET`方法提交上来的表单参数  |
  |GetWithDefault()  | 相当于`c.Request.FormValue(key)`,当不存在这个表单项时，会返回传入的默认值       |

  值得一提的是，通过上面的方法获取的参数均为`string` 类型

## 获取POST表单

  |方法          | 备注  |
  |-----------|------ |
  |Post()             | 相当于`c.Request.PostFormValue(key)`,获取当前的路由通过`POST`方法提交上来的表单参数  |
  |PostWithDefault()  | 相当于`c.Request.PostFormValue(key)`,当不存在这个表单项时，会返回传入的默认值       |

  
## 文件上传