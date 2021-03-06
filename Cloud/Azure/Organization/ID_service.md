# 安全なシステム

- ID (識別情報)  
  セキュリティにおいて、「必要な情報を、必要な時に、必要な人にだけ、完全な状態で公開する」ことが重要。
  > ***CIA***  
  > **C**onfidentiality:機密性、**I**ntergrity:完全性、**A**vailability:可用性

- ガバナンス (Governance)  
  ITシステムが適切に管理されていること。

- コンプライアンス  
  法令や社会規範を守ること。法令遵守。

- プライバシー  
  個人に結びつく情報のこと。

- 信頼性 (Trust)  
  適切なセキュリティ対策とプライバシー管理が行われ、コンプライアンスに従った運用がなされていれば、「信頼性(Trust)」が担保されていると見なされる。

***

## ■ 認証と承認の違い

### - **認証 (Authentication)**

ユーザーの身元を証明する行為。

- 知っていることを使う
- 持っているものを使う
- その人自身を使う
  
<br>

### - **承認 (Authorization)**

認証された利用者に対して、何かを実行する権限を付与する行為

***

## ■ Azure Active Directory

認証の結果としてIDが与えられるため、認証機能を**ID管理**と呼ぶ。また、承認機能はアクセス許可を与えたり拒否したりするため、**アクセス管理サービス**と呼ぶ。

Azure ADは、サブスクリプションとは別に契約できる。

### - **リソースに対する認証と承認**

- 外部リソース  
  Microsoft 365、Azureポータルやその他多くのSaaSアプリケーション

- 内部リソース  
  企業NWとイントラネット上のアプリケーションや自社開発のクラウドアプリケーション

<br>

### - **具体的にできること**

- アプリケーション管理  
  複数のアプリケーションに対して、同じ認証情報でサインインする**シングルサインオン**を実現する

- 認証管理  
  Azure ADの**セルフサービスパスワードリセット**(パスワードを忘れた場合、電子メールなどで情報を通知して自分でパスワードをリセットする機能)、**多要素認証**

- Microsoft IDプラットフォーム  
  アプリケーションに、Azure ADによる認証を追加するためのツールやサービスを提供する

- B2B連携  
  自社のAzure ADと、ビジネスパートナーのAzure ADを連携させたアプリケーションを構築できる

- B2C連携  
  自社のAzure ADとTwitterやFacebookなどのIDを連携させたアプリケーションを構築できる

- 条件付きアクセス  
  認証機能を利用するための条件を設定

- デバイスの管理  
  デバイスが会社のデータにアクセスする方法を管理  
  例えば、未登録スマートフォンからのアクセスを拒否するなど

<br>

**Aztive Directoryドメインサービス (ADDS)**はオンプレミスで広く使われている。Azure ADとは互換性が無い。

Azure ADは以下の方法で、ADDSと情報を同期または連携する。

- **パスワードハッシュ同期 (PHS)**  
  ADDSからAzure ADへ、パスワードハッシュを複製する。Azure ADに保存されたパスワードで認証する

- **パススルー認証 (PTA)**  
  Azure ADへの認証を、オンプレミスADDSに直接転送する。パスワードはAzure ADには保存されず、オンプレミスADDSで認証する

- **ADFS (Azutive Directory Federation Services)**  
  Azure ADへの認証を、オンプレミスADFSにリダイレクトし、必要なデータ変換をしてからADFS認証を要求する。パスワードはAzure ADに保存されない。  
  異なる組織間での連携などで、社内の情報をそのまま後悔したくない場合に使用する

上記いずれの場合も、オンプレミス側には***Azure AD Connect***をインストールする必要があり、ADFSを使う場合は、オンプレミスサーバーにADFSサーバーが必要になる。