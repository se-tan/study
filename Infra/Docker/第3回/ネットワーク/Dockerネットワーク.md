# ネットワークを新規作成して通信を分ける
## Dockerネットワーク
Dockerでは任意のネットワーク作成ができる。  
br-XXXXXXX(DockerのネットワークIDの先頭)という名前のネットワークI/Fが作られる。

### 1-1. Dockerネットワークの作成
1. docker network createコマンド
    ```docker 
    C:\Users\yuki_ueno>docker network create mydockernet

    C:\Users\yuki_ueno>docker network ls
    6be0562cfa2f        mydockernet           bridge         local
    ```

2. docker network inspectコマンドで設定を確認する
    ```json
    [
        {
            "Name": "mydockernet",
            "Id": "6be0562cfa2f600be2793ad95afa69565b7950d2a26f95e9f8fd5697acdad209",
            "Created": "2021-09-08T05:00:55.6694564Z",
            "Scope": "local",
            "Driver": "bridge",
            "EnableIPv6": false,
            "IPAM": {
                "Driver": "default",
                "Options": {},
                "Config": [
                    {
                        "Subnet": "172.19.0.0/16",
                        "Gateway": "172.19.0.1"
                    }
                ]
            },
            "Internal": false,
            "Attachable": false,
            "Ingress": false,
            "ConfigFrom": {
                "Network": ""
            },
            "ConfigOnly": false,
            "Containers": {},
            "Options": {},
            "Labels": {}
        }
    ]
    ```
    IPアドレスは**172.19.0.0/16**が設定されている  
    また、明示的にIPアドレス範囲を指定するときは、--subnetと--gatewayを指定する

### 1-2. Dockerネットワークにコンテナを作成する
1. 現在のコンテナを停止・破棄する
    ```docker
    C:\Users\yuki_ueno>docker stop web01 web02
    C:\Users\yuki_ueno>docker rm web01 web02
    ```

2. mydockernetに接続してコンテナを作成
    ```docker
    C:\Users\yuki_ueno>docker run -dit --name web01 -p 8080:80 --net mydockernet httpd
    C:\Users\yuki_ueno>docker run -dit --name web02 -p 8081:80 --net mydockernet httpd
    ```

3. ネットワーク接続を確認する
    ```json
    C:\Users\yuki_ueno>docker network inspect mydockernet
    [
        {
            "Name": "mydockernet",
            "Id": "6be0562cfa2f600be2793ad95afa69565b7950d2a26f95e9f8fd5697acdad209",
            "Created": "2021-09-08T05:00:55.6694564Z",
            "Scope": "local",
            "Driver": "bridge",
            "EnableIPv6": false,
            "IPAM": {
                "Driver": "default",
                "Options": {},
                "Config": [
                    {
                        "Subnet": "172.19.0.0/16",
                        "Gateway": "172.19.0.1"
                    }
                ]
            },
            "Internal": false,
            "Attachable": false,
            "Ingress": false,
            "ConfigFrom": {
                "Network": ""
            },
            "ConfigOnly": false,
            "Containers": {
                "0db54640fde6ad98d6bcb93bc41764b03ac40b323f4d7806bfa8d54ec3a72648": {
                    "Name": "web02",
                    "EndpointID": "614236a8a03b6736bb4f8bff625efe16a8e297ca5bf35c481a2b2efc01f885b5",
                    "MacAddress": "02:42:ac:13:00:03",
                    "IPv4Address": "172.19.0.3/16",
                    "IPv6Address": ""
                },
                "f031c6e96ec3ffbfb33e2789da179d9e62d5cb005db5984ed53130a0c4d4dc86": {
                    "Name": "web01",
                    "EndpointID": "1f0b868d3368a2ec1e475d29d4ddaf85c0445723720735deebcd240c726fd81c",
                    "MacAddress": "02:42:ac:13:00:02",
                    "IPv4Address": "172.19.0.2/16",
                    "IPv6Address": ""
                }
            },
            "Options": {},
            "Labels": {}
        }
    ]
    ```
    web01が172.19.0.2/16、web02が172.19.0.3/16となっている。

### 1-3. 名前を使った通信ができることを確認する
1. 第3のコンテナを作る
    ```docker
    C:\Users\yuki_ueno>docker run -it --rm --net mydockernet centos /bin/bash
    ```

2. 名前で疎通確認する
    ```docker
    [root@da235613ee73 /]# ping -c 4 web01
    PING web01 (172.19.0.2) 56(84) bytes of data.
    64 bytes from web01.mydockernet (172.19.0.2): icmp_seq=1 ttl=64 time=0.108 ms
    64 bytes from web01.mydockernet (172.19.0.2): icmp_seq=2 ttl=64 time=0.201 ms
    64 bytes from web01.mydockernet (172.19.0.2): icmp_seq=3 ttl=64 time=0.203 ms
    64 bytes from web01.mydockernet (172.19.0.2): icmp_seq=4 ttl=64 time=0.083 ms

    --- web01 ping statistics ---
    4 packets transmitted, 4 received, 0% packet loss, time 161ms
    rtt min/avg/max/mdev = 0.083/0.148/0.203/0.056 ms
    ```

    IPアドレス指定ではなく、コンテナ名で疎通確認がとれている。

3. コンテンツの取得ができるか確認する
    ```docker
    [root@da235613ee73 /]# curl http://web01/
    ```
    ```html
    <html><body><h1>It works!</h1></body></html>
    ```

*column Dockerネットワークがコンテナ名でアクセスできる仕組み*

*Dockerネットワークを使って通信する際、コンテナ名でアクセスできる仕組みはDNSによって構成されている。  
Dockerネットワークに参加しているコンテナでは、Dockerが用意するDNSサーバーが使用される。  
/etc/resolv.confを確認すると、127.0.0.11というIPアドレスのDNSサーバーが起動している。  
このDNSサーバーは、コンテナ名とIPアドレスの紐づけを返すように構成されているため、  
コンテナ名を通信相手として指定できる。*

### 1-3. Dockerネットワークの削除
利用中のコンテナが稼働中の場合はネットワークを削除できないので、先にコンテナを削除する。
