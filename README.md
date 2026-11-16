# yokoyama-dev.com

Saku² の Web サイトと、制作サンプル10件。React Router（フレームワークモード・プリレンダー）で作り、Cloudflare Pages で公開している。

## 構成
| 場所 | 中身 |
|---|---|
| `web/app/config.ts` | サイト名・URL・パス・プロフィール・アイコンなど、サイト全体の設定 |
| `web/app/root.tsx` | HTML の骨組み、エラー画面 |
| `web/app/routes.ts` | ルートの一覧（サイト本体と各サンプル） |
| `web/app/site/` | サイト本体（トップ・制作事例・サービス・運営者情報） |
| `web/app/site/app.css` | サイトのデザイントークン（色・文字・字間・行間・幅・影など）と独自のユーティリティ |
| `web/app/site/data/` | サイトの文言・パス・画像など、部品に書かない値 |
| `web/app/site/components/` | 部品。`orbit/` はトップの動き（数式・場面・時間割り・描画） |
| `web/app/samples/<id>/` | 制作サンプル。`content/`（文言）・`styles/`（トークンとページのCSS）・`pages/`・`routes.ts`・`case.json`（一覧用の情報）・`media/`（一覧用の画像） |
| `web/app/samples/shared/` | サンプルどうしで使う部品・フォーム・日付と入力チェック |
| `web/app/shared/` | サイトとサンプルで使う meta・アクセス解析 |
| `web/scripts/` | ビルドの後処理（サイトマップ・`robots.txt`・`_headers`・`_redirects`） |
| `web/public/` | そのまま配る画像・アイコン |

## 決まり
- 値は部品に直書きしない。色・大きさ・余白はトークン（`app.css`、サンプルは `styles/base.css`）に、文言とパスは `data/`・`content/`・`config.ts` に置く
- Tailwind の任意値（`[...]`）は使わない。トークンか `@utility` を足す
- コードにコメントを書かない
- パッケージの版は完全に固定し、公開から2週間以上たったものを使う
- 整形とリントは Biome。`npm run check` を通す

## 開発
Node 22.18 以上（`web/.node-version`）。

```sh
cd web
npm ci
npm run dev        # 開発サーバー
npm run check      # Biome
npm run typecheck  # 型
npm run build      # プリレンダーと後処理（build/client）
```

## ブランチと公開
| ブランチ | 役割 | 公開先 |
|---|---|---|
| `feature/*` | 作業 | なし |
| `develop` | まとめる | なし |
| `staging` | 本番の前の確認 | `https://staging.yokoyama-dev-portfolio.pages.dev/` |
| `main` | 本番 | `https://yokoyama-dev.com/` |

- `feature/*` → `develop` → `staging` → `main` の順に、プルリクエストでマージする
- すべてのプルリクエストと `develop`・`staging`・`main` への push で、`check`（Biome・型・ビルド）が動く（`.github/workflows/check.yml`）
- `staging` と `main` への push で、確認のあと Cloudflare Pages に公開する（`.github/workflows/deploy.yml`）
- 公開には、リポジトリのシークレット `CLOUDFLARE_API_TOKEN`（Pages の編集権限）と `CLOUDFLARE_ACCOUNT_ID` が要る
- 手元から公開するときは、同じ2つを環境変数にして `npm run deploy -- --branch=<ブランチ>`

## サンプルを足すとき
1. `web/app/samples/<id>/` に `case.json`・`media/`（`thumb.jpg`・`desktop.png`・`mobile.png`）・`routes.ts`・`layout.tsx`・`pages/`・`content/`・`styles/` を置く
2. `web/app/routes.ts` にサンプルのルートを足す
3. 一覧・フッター・ページ数・サイトマップ・旧URLの転送は、`case.json` と `pages/` から自動で作られる
