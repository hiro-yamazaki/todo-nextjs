# Todo App (Next.js)

シンプルなTodoアプリケーション。Next.js App Router + TypeScript + LocalStorageで構築。

## 作成背景

本アプリは書籍「**Claude Code AI駆動開発**」を読みながら、Claude Codeを使用して作成しました。

### 開発の流れ

1. 書籍の手順に沿ってClaude Codeにプロンプトを入力
2. Claude Codeがコード生成・ファイル作成を実行
3. 動作確認しながら調整
4. Vercelへデプロイ

## 機能

- タスクの追加・削除・完了切り替え
- フィルタリング（すべて / 未完了 / 完了済み）
- 完了済みタスクの一括削除
- LocalStorageによるデータ永続化
- レスポンシブデザイン

## 技術スタック

| 技術 | バージョン |
|------|-----------|
| Next.js | 16.1.1 |
| React | 19.2.3 |
| TypeScript | 5.9.3 |
| CSS (Vanilla) | - |

## セットアップ

```bash
# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 本番サーバー起動
npm run start
```

## ディレクトリ構成

```
src/
└── app/
    ├── layout.tsx    # ルートレイアウト
    ├── page.tsx      # Todoコンポーネント
    └── globals.css   # スタイル
```

## 参考

- 書籍: Claude Code AI駆動開発
- デプロイ先: Vercel
