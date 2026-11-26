# 古美術 青月

古美術店の静的なコンセプトサイト。掲載作品は美術館所蔵の参考画像であり販売品ではありません。

## 表示

`seigetsu/dist/index.html` をブラウザで開いてください。サインイン・ビルドは不要です。
HTTPで確認する場合は `python3 -m http.server 8765 --bind 127.0.0.1 --directory seigetsu/dist` を実行し、http://localhost:8765 を開きます。

## テスト

Node.js 22以降で `npm ci`、`npm test` を実行します。

## 開発

機能ごとにブランチとPRを作成し、レビュー後にマージします。PR作成による公開サイトへの自動デプロイはありません。

## GitHubでサイトを確認する

このリポジトリでGitHub Pagesを有効にすると、サインイン不要の公開サイトになります。
初期状態では公開しません。PRではテストのみを実行します。

公開する場合:

1. サイトの変更と本ワークフローをmainにマージします。
2. リポジトリの Settings → Pages → Build and deployment → Source で **GitHub Actions** を選びます。
3. Settings → Secrets and variables → Actions → Variables に `ENABLE_GITHUB_PAGES` を追加し、値を `true` にします。
4. Actions → Website checks and GitHub Pages → Run workflow をmainに対して実行します。
5. 成功したdeployジョブのURLからサイトを開きます。以降はmainへの変更がテスト成功後に反映されます。

予定URL: https://kimiting.github.io/gittest1/ （公開設定と初回デプロイ完了後に有効）

PRごとの独立したプレビューは作成しません。PRのChecksでテスト結果、Actionsでデプロイ結果を確認できます。
`ENABLE_GITHUB_PAGES` を無効にしても公開済みサイトは残ります。公開を停止するにはSettings → PagesからUnpublish siteを実行してください。
