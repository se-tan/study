# 3つのネットワーク
Dockerでは様々なネットワークを作り、Dockerホストとコンテナ、コンテナ間で通信するよう構成できる。  
Dockerが管理するネットワークはDocker network lsコマンドで確認できる。  

既定では「bridge」「host」「none」の3つ

```docker 
C:\Users\yuki_ueno>docker network ls
NETWORK ID          NAME                   DRIVER              SCOPE
be91f6b96077        bridge                 bridge              local
169afe5432cd        host                   host                local
dfee05ae78d4        none                   null                local
```

## 1. bridgeネットワーク
既定のネットワーク。docker run(またはdocker create)するときに、  
ネットワークのオプションを指定しなかった場合に使用される。
bridgeネットワークにおいては、コンテナごとのネットワークは独立しており、
-pオプションで、どのコンテナと通信するのかを決める。

### 1-1. コンテナに割り当てられるIPアドレスを確認する
* コンテナ内でipコマンドやuipconfigコマンドなどを実行して確認する  
    httpdコンテナ内にはどちらのコマンドもないため使用不可


* docker container inspectコマンドを使う方法  
    ``` json 
    C:\Users\yuki_ueno>docker container inspect web01
    [
        {
            "Id": "dd56e3329823a861deb4c84ce6f05119daa1b334a1286d077b0f49abb98bc633",
            "Created": "2021-09-08T02:37:36.2485039Z",
            "Path": "httpd-foreground",
            "Args": [],
    ---略---
        "NetworkSettings": {
                "Bridge": "",
                "SandboxID": "7cc32ce80bad91a73dcae15c9f4190ce1ad63ebd0a1eed7ccafc8c7ddb1cd149",
                "HairpinMode": false,
                "LinkLocalIPv6Address": "",
                "LinkLocalIPv6PrefixLen": 0,
                "Ports": {
                    "80/tcp": [
                        {
                            "HostIp": "0.0.0.0",
                            "HostPort": "8080"
                        }
                    ]
                },
                "SandboxKey": "/var/run/docker/netns/7cc32ce80bad",
                "SecondaryIPAddresses": null,
                "SecondaryIPv6Addresses": null,
                "EndpointID": "dc92a9c8e33315e0048195a6c5334620828929b48f3a83ff94b6bad0877cb083",
                "Gateway": "172.17.0.1",
                "GlobalIPv6Address": "",
                "GlobalIPv6PrefixLen": 0,
                "IPAddress": "172.17.0.2",
    ```
    このNetworkSettingにIPアドレスが記載される。  
    →一番下のIPAddress

    オプション指定で特定項目の値を取得できる
    ```docker 
    C:\Users\yuki_ueno>docker container inspect --format="{{.NetworkSettings.IPAddress}}" web01
    172.17.0.2
    ```

    docker newtwork inspect bridgeコマンドでは、全コンテナのIPアドレスを確認できる。  
    [Containers]の項目が、コンテナとIPアドレスの対応
    ```json
    "Containers": {
        "6382a4578f640eb8037c1ee1a33a2f6dbedc2f3fac9fc10c0bd41e12ba68b82e": {
            "Name": "web02",
            "EndpointID": "88150d7d97a10e435fb083606af83e3c348a968b241ceab186554279cfde8df1",
            "MacAddress": "02:42:ac:11:00:03",
            "IPv4Address": "172.17.0.3/16",
            "IPv6Address": ""
        },
        "dd56e3329823a861deb4c84ce6f05119daa1b334a1286d077b0f49abb98bc633": {
            "Name": "web01",
            "EndpointID": "dc92a9c8e33315e0048195a6c5334620828929b48f3a83ff94b6bad0877cb083",
            "MacAddress": "02:42:ac:11:00:02",
            "IPv4Address": "172.17.0.2/16",
            "IPv6Address": ""
        }
    ```

### 1-2. bridgeネットワークの正体
IPマスカレードを使って構成されている。  
(1つのグローバルIPアドレスに2つのプライベートIPアドレスを割り当てるイメージ)  
docker run nの　-pオプションは、IPマスカレードのポート転送設定をしていたにすぎない。  

1. コンテナ同士の疎通確認
    ```docker
    C:\Users\yuki_ueno>docker run --rm -it centos /bin/bash

    [root@145feba0680f /]# ip addr
    1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1
        link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
        inet 127.0.0.1/8 scope host lo
        valid_lft forever preferred_lft forever
    2: tunl0@NONE: <NOARP> mtu 1480 qdisc noop state DOWN group default qlen 1
        link/ipip 0.0.0.0 brd 0.0.0.0
    3: ip6tnl0@NONE: <NOARP> mtu 1452 qdisc noop state DOWN group default qlen 1
        link/tunnel6 :: brd ::
    56: eth0@if57: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default
        link/ether 02:42:ac:11:00:04 brd ff:ff:ff:ff:ff:ff link-netnsid 0
        inet 172.17.0.4/16 brd 172.17.255.255 scope global eth0
        valid_lft forever preferred_lft forever
    ```

    56:より新規作成したコンテナのIPアドレスは172.17.0.4

    ```docker
    [root@145feba0680f /]# ping -c 4 172.17.0.2
    PING 172.17.0.2 (172.17.0.2) 56(84) bytes of data.
    64 bytes from 172.17.0.2: icmp_seq=1 ttl=64 time=0.072 ms
    64 bytes from 172.17.0.2: icmp_seq=2 ttl=64 time=0.169 ms
    64 bytes from 172.17.0.2: icmp_seq=3 ttl=64 time=0.167 ms
    64 bytes from 172.17.0.2: icmp_seq=4 ttl=64 time=0.181 ms

    --- 172.17.0.2 ping statistics ---
    4 packets transmitted, 4 received, 0% packet loss, time 156ms
    rtt min/avg/max/mdev = 0.072/0.147/0.181/0.044 ms
    ```

    web01コンテナにpingを送り、「0% packet loss」とあるので疎通できている。

2.　コンテンツの取得  
```docker
[root@145feba0680f /]# curl http://172.17.0.2/
```

```html
<html><body><h1>It works!</h1></body></html>
```

Dockerホスト側からコンテナに対してポート8080，8081でマッピングされているが、  
コンテナ自体はどちらもポート80で待ち受けしているので、URLにポート番号は不要