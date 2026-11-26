# 古美術 青月

古美術店の静的なコンセプトサイト。掲載作品は美術館所蔵の参考画像であり販売品ではありません。

## 表示

`seigetsu/dist/index.html` をブラウザで開いてください。サインイン・ビルドは不要です。
HTTPで確認する場合は `python3 -m http.server 8765 --bind 127.0.0.1 --directory seigetsu/dist` を実行し、http://localhost:8765 を開きます。

## テスト

Node.js 22以降で `npm ci`、`npm test` を実行します。

## 開発

機能ごとにブランチとPRを作成し、レビュー後にマージします。PR作成による公開サイトへの自動デプロイはありません。
