■ 概要

Windows 上の Docker Server を Docker Desktop から WSL2 (Ubuntu-20.04)上のネイティブな Docker Server へ切り替えます。

■ 前提

- WSL2 を利用可能な状況であること。
    - 利用する OS イメージは Ubuntu-20.04 を想定
- Windows Terminal をインストールして利用可能な状況であること。
- Docker Desktop がインストールされていないこと。
    - インストールされている時は削除してOS再起動しておく

■ 構築手順

1. PowerShell を起動し「wsl」 を実行して Ubuntu-20.04 内へ入る。
2. 以下のコマンドを実行してライブラリの更新及び必要ライブラリを追加する。
    - 「sudo apt update」
    - 「sudo apt install -y apt-transport-https」
3. 以下のコマンドを実行して docker-ce をインストールする。
    - 「curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg」
    - 「echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null」
    - 「sudo apt update」
    - 「sudo apt install docker-ce」
4. 以下のコマンドを実行して  Docker Server を起動し、簡単なコンテナ実行確認をおこなう。
    - 「sudo service docker start」
    - 「sudo docker run --rm hello-world」
5. 以下のコマンドを実行して一般ユーザでも sudo 無しで Docker Server を利用可能にする。
    - 「sudo usermod -aG docker ${USER}」
6. 以下のコマンドを実行して Docker Compose v2 をインストールする。
    - 「mkdir -p ~/.docker/cli-plugins/」
    - 「curl -SL https://github.com/docker/compose/releases/download/v2.2.3/docker-compose-linux-x86_64 -o ~/.docker/cli-plugins/docker-compose」
        - バージョンは基本最新で
    - 「chmod +x ~/.docker/cli-plugins/docker-compose」
    - 「docker compose version」を実行してコマンドが通るか確認する。

参考となったサイト
https://blog1.mammb.com/entry/2021/10/22/090000


■ 自動起動構築手順

以下の手順でWSLへの初回アクセス時に Docker Server が自動起動されるようにします。
 
1. 「sudo visudo」を実行して末尾に以下の要素を追加して、 Docker Server 起動時にパスワードの要求を出なくする。
    - 「%docker ALL=(ALL)  NOPASSWD: /usr/sbin/service docker start」
    - 編集後は Ctrl + X してY
2. 「vi ~/.bashrc」で以下の内容を末尾に追加する。

```
if [ $(service docker status | awk '{print $4}') = "not" ]; then
  sudo service docker start > /dev/null
fi
```

ここまでの対応を行うことで wsl 実行時に Docker Server が起動するようになりますが、Windows再起動直後などでは Docker が立ち上がってない状態となります。
以下の対応を追加で行うことで Windows 起動直後に Docker Server を利用可能にできます。

1. Windows Terminal を起動して「設定」から「スタートアップ」を選択
2. 「既定のプロファイル」で 「Ubuntu-20.04」を選択後、「コンピューターのスタートアップ時に起動」をオンにする。
3. ついでに Windows Terminal 利用時の Ubuntu の開始ディレクトリを自身の home に来るよう変更する。（Windows と WSL でhome概念が混乱するため）
    - 「設定」から「Ubuntu-20.04」を選択
    - 「開始ディレクトリ」に以下を指定して保存
        - 「\\wsl$\Ubuntu-20.04\home\[yourUserName]」

■ リモートサーバ構築手順

ここまでの対応を実行すると「wsl docker」で Windows から docker コマンドを実行できるようになりますが、Docker Desktop 同様に「docker」で Docker Server を叩けるようにするには Docker CLI 経由でリモート要求を受け付けるようにする必要があります。
リモート要求を受け付ける手順は次の通りです。

1. Docker デーモン設定で TCP 経由でのリモート要求を許容します。
    - 「sudo vi /etc/docker/daemon.json」
    - 次の内容を入力します。

```
{
  "debug": false,
  "tls": false,
  "hosts": ["tcp://127.0.0.1:2375", "unix:///var/run/docker.sock"]
}
```

> ポートは 2375 以外でも構いません。

ファイル作成後は「sudo service docker restart」で Docker Server を再起動してください。

■ Docker CLI構築手順

Docker CLI は Windows 上で docker コマンドを利用するためのツールです。本手順では Docker CLI 経由でこれまでに作った Docker Server へアクセスすることで、 Docker Desktop 相当の振る舞いをできるようにします。

> Docker CLI の構築手順については「docker-cli/README.md」を参照してください。

