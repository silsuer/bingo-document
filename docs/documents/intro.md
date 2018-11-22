# 框架简介

`Bingo` 是一个简单开源的 go web 框架，受到 `Laravel` 的启发，将开发中常用的功能拆分成一个一个的模块，秉承着 go 语言 **小而美** 的特性，可由事件解耦逻辑，需要的其他功能可以随时由其他第三方包提供

`Bingo` 提供一个简单的项目目录结构，可以使用 `init`或`create`命令创建，当然也可以自行选择

## 压力测试

因为当前go框架实在是有点太多... 所以这里就找两个在国内最出名的框架: gin和beego

由于本人时间有限，取两个样本吧:

`/`: 显示`Bingo`框架demo首页

`/ping`: 返回`hello!` 

**环境**: 

  - 前些天腾讯云做活动买的最便宜的AMD服务器
  
  - 1核1G1M带宽

**压测工具**: *ab*

**压测客户端**: *Macbook Pro 2018*
**客户端系统**:*MacOS 10.14 (Mojave)*

#### 结果对比:

1. `/`: 压测命令:`ab -n 100 -c 30 http://118.24.202.232:8080/`(100次请求，并发数为30)
  
   1. Bingo
 
      ```
            This is ApacheBench, Version 2.3 <$Revision: 1826891 $>
            Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
            Licensed to The Apache Software Foundation, http://www.apache.org/

            Benchmarking 118.24.202.232 (be patient).....done


            Server Software:
            Server Hostname:        118.24.202.232
            Server Port:            8080

            Document Path:          /
            Document Length:        26962 bytes

            Concurrency Level:      30
            Time taken for tests:   33.321 seconds
            Complete requests:      100
            Failed requests:        0
            Total transferred:      2705800 bytes
            HTML transferred:       2696200 bytes
            Requests per second:    3.00 [#/sec] (mean)
            Time per request:       9996.359 [ms] (mean)
            Time per request:       333.212 [ms] (mean, across all concurrent requests)
            Transfer rate:          79.30 [Kbytes/sec] received

            Connection Times (ms)
                        min  mean[+/-sd] median   max
            Connect:       45   51   6.7     50     111
            Processing:    99 6495 7304.7   4011   33163
            Waiting:       45 2485 7228.1    318   32809
            Total:        150 6546 7305.8   4060   33220

            Percentage of the requests served within a certain time (ms)
            50%   4060
            66%   6015
            75%   6811
            80%   8068
            90%  13559
            95%  32988
            98%  33218
            99%  33220
            100%  33220 (longest request)
         
      ```


   2. Gin

      ```
        This is ApacheBench, Version 2.3 <$Revision: 1826891 $>
        Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
        Licensed to The Apache Software Foundation, http://www.apache.org/

        Benchmarking 118.24.202.232 (be patient)...^C

        Server Software:
        Server Hostname:        118.24.202.232
        Server Port:            8080

        Document Path:          /ping
        Document Length:        26962 bytes

        Concurrency Level:      30
        Time taken for tests:   51.345 seconds
        Complete requests:      99
        Failed requests:        0
        Total transferred:      2699638 bytes
        HTML transferred:       2690038 bytes
        Requests per second:    1.93 [#/sec] (mean)
        Time per request:       15558.989 [ms] (mean)
        Time per request:       518.633 [ms] (mean, across all concurrent requests)
        Transfer rate:          51.35 [Kbytes/sec] received

        Connection Times (ms)
                    min  mean[+/-sd] median   max
        Connect:       45   53   5.8     51      71
        Processing:    93 6887 9555.0   3268   34848
        Waiting:       46 3890 9763.9    225   33517
        Total:        140 6939 9555.8   3315   34902

        Percentage of the requests served within a certain time (ms)
        50%   3306
        66%   4558
        75%   5684
        80%   7361
        90%  26032
        95%  34748
        98%  34900
        99%  34902
        100%  34902 (longest request)
      ```

   3. Beego

      ```
        This is ApacheBench, Version 2.3 <$Revision: 1826891 $>
        Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
        Licensed to The Apache Software Foundation, http://www.apache.org/

        Benchmarking 118.24.202.232 (be patient)...^C

        Server Software:
        Server Hostname:        118.24.202.232
        Server Port:            8080

        Document Path:          /
        Document Length:        26962 bytes

        Concurrency Level:      30
        Time taken for tests:   58.683 seconds
        Complete requests:      99
        Failed requests:        0
        Total transferred:      2703838 bytes
        HTML transferred:       2694238 bytes
        Requests per second:    1.69 [#/sec] (mean)
        Time per request:       17782.688 [ms] (mean)
        Time per request:       592.756 [ms] (mean, across all concurrent requests)
        Transfer rate:          45.00 [Kbytes/sec] received

        Connection Times (ms)
                    min  mean[+/-sd] median   max
        Connect:       46   64  36.6     58     289
        Processing:   112 5772 5955.6   3669   33507
        Waiting:       50 2250 5478.2    401   33096
        Total:        168 5836 5952.9   3738   33564

        Percentage of the requests served within a certain time (ms)
        50%   3733
        66%   4809
        75%   6299
        80%   7861
        90%  17539
        95%  19988
        98%  21297
        99%  33564
        100%  33564 (longest request)
      ```

2. `/ping`: 压测命令:`ab -n 1000 -c 300 http://118.24.202.232:8080/ping` (1000连接数,300并发数)

   1. Bingo

      ```
        This is ApacheBench, Version 2.3 <$Revision: 1826891 $>
        Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
        Licensed to The Apache Software Foundation, http://www.apache.org/

        Benchmarking 118.24.202.232 (be patient)
        Completed 100 requests
        Completed 200 requests
        Completed 300 requests
        Completed 400 requests
        Completed 500 requests
        Completed 600 requests
        Completed 700 requests
        Completed 800 requests
        Completed 900 requests
        Completed 1000 requests
        Finished 1000 requests


        Server Software:
        Server Hostname:        118.24.202.232
        Server Port:            8080

        Document Path:          /test
        Document Length:        6 bytes

        Concurrency Level:      300
        Time taken for tests:   4.958 seconds
        Complete requests:      1000
        Failed requests:        0
        Total transferred:      122000 bytes
        HTML transferred:       6000 bytes
        Requests per second:    201.70 [#/sec] (mean)
        Time per request:       1487.326 [ms] (mean)
        Time per request:       4.958 [ms] (mean, across all concurrent requests)
        Transfer rate:          24.03 [Kbytes/sec] received

        Connection Times (ms)
                    min  mean[+/-sd] median   max
        Connect:       44  176 233.5     82    1710
        Processing:    45  708 898.2    361    4717
        Waiting:       45  658 915.1    214    4717
        Total:         92  884 936.8    530    4843

        Percentage of the requests served within a certain time (ms)
        50%    530
        66%    859
        75%   1055
        80%   1324
        90%   2172
        95%   3021
        98%   4090
        99%   4476
        100%   4843 (longest request)
      ```
  
   2. Gin

      ```
        This is ApacheBench, Version 2.3 <$Revision: 1826891 $>
        Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
        Licensed to The Apache Software Foundation, http://www.apache.org/

        Benchmarking 118.24.202.232 (be patient)
        Completed 100 requests
        Completed 200 requests
        Completed 300 requests
        Completed 400 requests
        Completed 500 requests
        Completed 600 requests
        Completed 700 requests
        Completed 800 requests
        Completed 900 requests
        Completed 1000 requests
        Finished 1000 requests


        Server Software:
        Server Hostname:        118.24.202.232
        Server Port:            8080

        Document Path:          /ping
        Document Length:        6 bytes

        Concurrency Level:      300
        Time taken for tests:   5.262 seconds
        Complete requests:      1000
        Failed requests:        0
        Total transferred:      122000 bytes
        HTML transferred:       6000 bytes
        Requests per second:    190.04 [#/sec] (mean)
        Time per request:       1578.640 [ms] (mean)
        Time per request:       5.262 [ms] (mean, across all concurrent requests)
        Transfer rate:          22.64 [Kbytes/sec] received

        Connection Times (ms)
                    min  mean[+/-sd] median   max
        Connect:       44  129 139.0     67    1693
        Processing:    46  773 943.4    362    5020
        Waiting:       45  707 965.1    207    5020
        Total:         91  903 966.5    517    5148

        Percentage of the requests served within a certain time (ms)
        50%    517
        66%    878
        75%   1146
        80%   1417
        90%   2417
        95%   3037
        98%   3923
        99%   4237
        100%   5148 (longest request)
      ```
   3. Beego
     
      ```
        This is ApacheBench, Version 2.3 <$Revision: 1826891 $>
        Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
        Licensed to The Apache Software Foundation, http://www.apache.org/

        Benchmarking 118.24.202.232 (be patient)
        Completed 100 requests
        Completed 200 requests
        Completed 300 requests
        Completed 400 requests
        Completed 500 requests
        Completed 600 requests
        Completed 700 requests
        Completed 800 requests
        Completed 900 requests
        Completed 1000 requests
        Finished 1000 requests


        Server Software:
        Server Hostname:        118.24.202.232
        Server Port:            8080

        Document Path:          /ping
        Document Length:        6 bytes

        Concurrency Level:      300
        Time taken for tests:   3.994 seconds
        Complete requests:      1000
        Failed requests:        0
        Total transferred:      122000 bytes
        HTML transferred:       6000 bytes
        Requests per second:    250.36 [#/sec] (mean)
        Time per request:       1198.267 [ms] (mean)
        Time per request:       3.994 [ms] (mean, across all concurrent requests)
        Transfer rate:          29.83 [Kbytes/sec] received

        Connection Times (ms)
                    min  mean[+/-sd] median   max
        Connect:       45  175 168.8    121    1713
        Processing:    46  629 699.3    349    3765
        Waiting:       45  563 701.1    190    3764
        Total:         91  804 742.5    476    3890

        Percentage of the requests served within a certain time (ms)
        50%    476
        66%    830
        75%   1102
        80%   1223
        90%   1951
        95%   2558
        98%   2940
        99%   3227
        100%   3890 (longest request)
      ```


     `Bingo` 的路由模块基于 `httprouter` ，并不会弱于市面上常见的任何框架，上面的结果是我多次测试后取出的最好成绩，选择哪种框架，开发者只需要根据自己的需要进行取舍即可.


## 子模块

- 路由模块(核心模块)

- 日志模块

- ORM模块

