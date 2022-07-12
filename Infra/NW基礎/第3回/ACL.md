# ACL (Access Control List)
通信アクセスを制御するためのリストのこと。  
NW管理者は通信要件に従ってACLを定義して、ルータを通過するパケットに対して、通過を許可するパケット、  
通信を拒否するパケットを決めることができる。  

ルータに着信したパケットは、ACLの1行絵から順番に条件に合致するかを確認し、  
*最初に*合致した条件に従ってパケット通過が「許可」「拒否」される。合致後は以降のACLは適用されない。  

***

## 標準ACL
パケットの送信元IPアドレスをチェックしてフィルタリングするACLのこと。

### 番号付き標準ACL
* 番号付き標準ACLの作成  
`(config)# access-list [number] [permit | deny] [source] [wildcard]`

|   argument    |                 description                     |
|:-------------:|:-----------------------------------------------:|
|    number     |   標準ACLの番号を1~99、1300~1999の範囲で指定    |
| permit | deny |                 許可または拒否                  |
|    source     |           送信元IPアドレスを指定する            |
|    wildcard   |ワイルドカードマスクを指定する。省略で「0.0.0.0」|


* ACLのI/Fへの適用  
`(config)# ip access-group [number] [in | out]`


### 名前付きACL
* 名前付きACL標準ACLの作成  
`(config)# ip access-list standard [name]`  
`(config-std-nacl)# [number] [ permit | deny ] [source] [wildcard]` 

|   argument    |                            description                          |
|:-------------:|:---------------------------------------------------------------:|
|     name      |               I/Fに適用する標準ACLの名前を指定する              |
|    number     |条件文のシーケンス番号。省略すると1行目は「10」、以降10ずつ増える|

***

## 拡張ACL
送信元IPアドレス、宛先IPアドレス、プロトコル番号、送信元ポート番号、宛先ポート番号等をチェックするACL。  
* 番号付き拡張ACLの作成  
`
(config)# access-list [number] [permit | deny] [protocol] [source] [wildcard] [port] [dest] [wildcard] [port] [established | log | log-input]
`

* ACLのI/Fへの適用  
`(config)# ip access-group [number] [in | out]`

* 名前付き拡張ACLの作成  
`(config)# ip access-list extended [name]`  
`
(config-ext-nacl)# [number] [ permit|deny ] [protocol] [source] [wildcard] [port] [established|log|log-input]
`

***

## ACLの適用方向(インバウンドとアウトバウンド)
ACLはインバウンドで適用するか、アウトバウンドで適用するかで動作が異なる。

* インバウンドで適用した場合  
    1. I/Fに*着信してくる*パケットにACLが適用される。
    2. ACLで許可された場合はパケットがルーティングされる。拒否された場合は破棄される。

* アウトバウンドで適用した場合  
    1. I/Fに着信してくるパケットがルーティングテーブルに従ってルーティングされる。
    2. I/Fから*発信していく*パケットにACLが適用される。

## ACLの処理順序
ACLに書かれた条件文(ステートメント)は、1行目から順番にチェックされていく。  
条件に合致した時点でパケットは「許可」「拒否」されて*以降のACLステートメントはチェックされない*。

## 暗黙のdeny any
ACLの最終行には自動的に「暗黙のdeny any」という全てのパケットを拒否する条件文が追加される。  
最低1行の許可するステートメントがなければ、全パケットが拒否されることになる。

## ACLの適用数
ACLは1つのI/Fにインバウンドとアウトバウンドの1つずつの***合計2つ***を適用できる。  
従って、1つのI/FのIN(OUT)に対して、標準ACLと拡張ACLの2つを適用することはできない。  
>NW層プロトコルが異なれば、適用できるACLは1つずつというルールは適用されない

## 適用するI/Fの場所
ACLはルータ上で作成しただけでは動作しない。作成したACLをI/FにIN(OUT)で適用することにより動作する。  
場所は通信要件に従い、管理者が決定するが、以下のような推奨ルールがある。
1. 標準ACLは宛先に近い場所に適用  
    送信元IPアドレスしか見ないので、拒否したい宛先の手前でトラフィックが止まるようにする。

2. 拡張ACLは送信元に近い場所に適用  
    宛先IPアドレス等も見るので、最初のチェックで判断させる=トラフィックを最小限にできる

## アウトバウンドでフィルタリングの対象となるパケット
標準ACLでも拡張ACLでも、アウトバウンドにおけるフィルタリングはルータを通過するトラフィックをフィルタリング対象とする。  
従って*ルータから発生する*トラフィックはACL対象としない。
> ルータから発生するトラフィックにRIPのアップデート、EIGRP/OSPFのHelloパケット等があるが、  
これらはルータのI/FにOUTでACLが適用されても、チェックされずに送信されていく。

***

## ACLのステータス確認
### 全てのACLステータスを表示
`# show access-lists`

### 特定の番号(名前)のACLステータスを表示
`# show access-lists [ number | name ]`

### 特定のプロトコルのACLステータスを表示
`# show [protocol] access-lists`

### シーケンス番号を利用したACLの編集
* 条件文の追加  
`(config)# ip access-list extended [ number | name ]`  
`
(config)# [sequence-number] [permit|deny] [protocol] [source] [wildcard] [post] [dest] [wildcard] [port] [established|log|log-input]
`

* 条件文の削除  
1. 標準ACLの削除  
    `(config)# ip access-list standard number | name`  
    `(config-std-nacl)# no sequence-number`

2. 拡張ACLの削除  
    `(config)# ip access-list extended number | name`  
    `(config-ext-nacl)# no sequence-number`

***

## VTY (Virtual Type Terminal) へのアクセス制御
ACLはルータを通過するパケットフィルタリング以外に、ルータへの管理アクセスに対するフィルタリングにも利用する。  
Ciscoルータには*VTY*ポートが最低でも5つ以上あり、NW管理者はtelnetやSSH接続でこのVTY回線にアクセスし、ルータを管理する。  
>3つのI/Fがあるルータなら、全てに拡張ACLを適用して、ルータに着信するtelnet/SSH接続パケットを「許可/拒否」すればよいが、  
VTYにだけ標準ACLを適用すれば1つのACLだけでルータへのアクセスを制御できる。

### VTYへのアクセス制御の設定
1. 番号付き標準ACLの作成  
    `(config)# access-list number [ permit | deny] source wildcard`

2. VTY回線へのACLの適用  
    `(config)# line vty 0 15`  
    `(config)# access-class [ number | name ] [ in | out ]`

ルータへの管理アクセス(telnet/SSH接続)の制御という点でインバウンドで適用する制御が一般的だが、  
アウトバウンドでの適用も可能。  

アウトバウンドで適用した場合、そのルータから別のNW機器へ管理アクセス(telnet/SSH接続)する際の宛先への通信を制御することができる。  
>VTYからのアクセス制御(アウトバウンド)においては、この標準ACLは「*宛先アドレスのチェック*」で使用される。

>VTYからのアクセス制御は「ルータ自身から発生するトラフィック」が対象となる。