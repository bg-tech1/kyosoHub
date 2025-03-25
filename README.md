# Kyosohub
「誰かと〇〇をしたい、始めたい！」を支援するプラットフォームです。  
ユーザーはプロジェクトを投稿し、協力者を募集することができます。  
レスポンシブ対応しているため、スマホやタブレットからも快適に利用できます。

<img width="1400" alt="Kyosohub メイン画面" src="https://github.com/user-attachments/assets/c268086b-80ae-4a91-8525-1d0615013194">

# URL
https://kyosohub.com/  
下記のゲストユーザーでログインして機能をご確認いただくことが可能です。
メールアドレス：testUser@test.com
パスワード:testUserPass

# 使用技術
### **フロントエンド**
- React 18
- React Router
- Tailwind CSS 3.4.17
- Axios

### **バックエンド**
- **Go 1.23**
- **Gin（Web フレームワーク）**
- GORM（ORM）
- PostgreSQL
- JWT（認証）

### **インフラストラクチャ**
- **Docker / Docker-compose**
- AWS
    - ACM
    - ALB
    - Amplify
    - ECS
    - RDS
    - Route53

### **CI/CD**
- GitHub Actions

# AWS構成図
<img width="995" alt="Kyosohub AWS構成" src="https://github.com/user-attachments/assets/c27c1295-c61c-48c6-a5a9-58b5e90878a4">

## CI/CD
- GitHub への push 時に、**ECRへのイメージpush、タスク定義の更新、ECSのデプロイ** が自動で実行されます。

# 機能一覧
- **ユーザー登録 / ログイン機能**
  - JWT を利用した認証
  - 新規登録/ログイン/ログアウト
  - 実際の画面(ログイン)
    <img width="1400" src="https://github.com/user-attachments/assets/1b2eec00-2c5e-4ae0-a638-0e22a45f7be2">  
- **プロジェクト投稿機能**
  - プロジェクトの作成・編集・削除
  - 実際の画面(プロジェクトの作成)
    <img width="1400" src="https://github.com/user-attachments/assets/7eaa6e53-4c53-4e63-8e9f-fb0d2027ce44"> 
- **参加申請機能**
  - プロジェクトに対する参加申請
  - 申請の承認 / 拒否
  - 申請中 / 参加中のステータス管理
  - 実際の画面(参加申請)
    <img width="1400" src="https://github.com/user-attachments/assets/8f54663c-cc0f-4e2a-8c84-2968ecf4ab6f"> 
  - 実際の画面(参加申請の確認) 
    <img width="1400" src="https://github.com/user-attachments/assets/281ffd47-bcbf-479b-8f0d-35346132bbec"> 
  - 「参加申請確認」をクリックすると申請確認用のモーダルが表示されます
    <img width="1400" src="https://github.com/user-attachments/assets/4335e574-1e03-4848-8b5b-2dd99ff831e7"> 
- **検索・フィルター**
  - タイトル・説明・カテゴリで検索
  - ひらがな・カタカナ対応（例.「さうな」→「サウナ」でも検索可能）
  - 実際の画面(プロジェクトの検索) 
    <img width="1400" src="https://github.com/user-attachments/assets/d739498d-0729-4a36-8f59-d2b6650533f3"> 
- **プロフィール機能**
　- 自身のプロフィールを設定できる
  - プロジェクトを募集している人、参加申請した人のプロフィールを閲覧可能
  - 名前、生年月日、Bio、募集中/参加中のプロジェクトが閲覧できる
  - 実際の画面(他ユーザーのプロフィール閲覧) 
    <img width="1400" src="https://github.com/user-attachments/assets/4feab617-b138-4b51-990e-10759c79416d"> 
- **ページネーション**
  - プロジェクト一覧のページネーション
- **レスポンシブデザイン**
  - スマホ・タブレット・PC 最適化