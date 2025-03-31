# Kyosohub
「誰かと〇〇をしたい、始めたい！」を支援するプラットフォームです。  
ユーザーはプロジェクトを投稿し、協力者を募集することができます。  
レスポンシブ対応しているため、スマホやタブレットからも快適に利用できます。

<img width="1400" alt="Kyosohub メイン画面" src="https://github.com/user-attachments/assets/18f2dbc4-cafc-4f65-9efd-a19543fad403">

# URL
https://kyosohub.com

右上のナビバーにあるゲストログインからゲストユーザーとしてログインし、<br>
機能をご確認いただくことが可能です。<br>

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
    - CloudFront
    - ECS
    - S3
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
  - 実際の画面(ログイン/ログアウト)
    <img width="1400" src="https://github.com/user-attachments/assets/596035a2-042a-444f-b775-7f52f02d2a6d">  
- **プロジェクト投稿機能**
  - プロジェクトの作成・編集・削除
  - 実際の画面(プロジェクトの作成)
    <img width="1400" src="https://github.com/user-attachments/assets/b7a67182-07b9-4bf1-8b24-d1e090a9e1fe"> 
- **参加申請機能**
  - プロジェクトに対する参加申請
  - 申請の承認 / 拒否
  - 申請中 / 参加中のステータス管理
  - 実際の画面(参加申請)
    <img width="1400" src="https://github.com/user-attachments/assets/dd4c6f1d-41c0-41a5-8800-a90f0d7f50ab"> 
  - 実際の画面(参加申請の確認) 
  - 「参加申請確認」をクリックすると申請確認用のモーダルが表示されます
    <img width="1400" src="https://github.com/user-attachments/assets/31a81530-449c-4053-ae5d-10858306e8b2"> 
- **検索・フィルター**
  - タイトル・説明・カテゴリで検索
  - ひらがな・カタカナ対応（例.「さうな」→「サウナ」でも検索可能）
  - 実際の画面(プロジェクトの検索) 
    <img width="1400" src="https://github.com/user-attachments/assets/bc41a16e-5e75-48be-b113-3deec16f9ea5"> 
- **プロフィール機能**
　- 自身のプロフィールを設定できる
  - 名前、生年月日、自己紹介、プロフィール画像の登録が可能
  - プロジェクトを募集している人、参加申請した人のプロフィールを閲覧可能
  - 実際の画面(プロフィール編集) 
    <img width="1400" src="https://github.com/user-attachments/assets/2db150cf-1414-4802-9d7d-c661cb816865"> 
  - 実際の画面(他ユーザーのプロフィール閲覧) 
    <img width="1400" src="https://github.com/user-attachments/assets/89029b56-4b3c-49a0-b257-bcecc825a77f">
- **ページネーション**
  - プロジェクト一覧のページネーション
- **レスポンシブデザイン**
  - スマホ・タブレット・PC 最適化