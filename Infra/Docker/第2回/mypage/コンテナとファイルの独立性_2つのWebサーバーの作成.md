# コマンド

`C:\Users\yuki_ueno\myProject\Docker\第2回\mypage>docker run -dit --name web01 -p 8080:80 httpd`

c54ac941837b7d0c33b36e8ea3bb0c8bc3d3e716c8c8bfef8fd949051333b7e3

`C:\Users\yuki_ueno\myProject\Docker\第2回\mypage>docker run -dit --name web02 -p 8081:80 httpd`

68fce0ac7bf9a098f2431785025e341ab2078ccfd085c5d987bd0fedb068b212

`C:\Users\yuki_ueno\myProject\Docker\第2回\mypage>docker ps`

```shell
CONTAINER ID        IMAGE               COMMAND              CREATED             STATUS              PORTS                  NAMES

68fce0ac7bf9        httpd               "httpd-foreground"   4 minutes ago       Up 4 minutes        0.0.0.0:8081->80/tcp   web02

c54ac941837b        httpd               "httpd-foreground"   4 minutes ago       Up 4 minutes        0.0.0.0:8080->80/tcp   web01
```
