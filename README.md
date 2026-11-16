# Saku²｜yokoyama-dev.com

Web制作をしている Yuki Yokoyama（屋号 Saku²）のポートフォリオサイトと、架空のクライアントを想定した制作サンプル10件のソースコードです。

**サイト：** https://yokoyama-dev.com/

## 制作サンプル

業種ごとに、情報設計・デザイン・コーディングまでを1人で作っています。会社・店舗・人物はすべて架空です。

| サンプル | 業種 | 内容 |
|---|---|---|
| [ASAGI](https://yokoyama-dev.com/portfolio/ec/) | アパレル通販 | 一覧・商品・カート・注文手続き・マイページ・管理画面まで、ECの画面をひととおり |
| [ひだまり歯科クリニック](https://yokoyama-dev.com/portfolio/dental/) | 歯科医院 | 診療案内と、空き枠から選ぶ予約フォーム |
| [株式会社ミナト精機](https://yokoyama-dev.com/portfolio/corp/) | 部品メーカー | 会社案内と、図面を添える見積もり・工場見学の申し込み |
| [KUMO ROASTERY](https://yokoyama-dev.com/portfolio/coffee/) | コーヒー豆の通販 | 焙煎度で並ぶ商品と、定期便を選べる注文手続き |
| [土と火](https://yokoyama-dev.com/portfolio/ceramic/) | 器の店 | 一点ものの商品ページと、のし・包装を選べる注文手続き |
| [税理士法人あさひ会計](https://yokoyama-dev.com/portfolio/tax/) | 税理士事務所 | 料金の目安と、日時を選ぶ初回相談の申し込み |
| [杉浦工務店](https://yokoyama-dev.com/portfolio/house/) | 工務店 | 施工事例と、見学会の予約 |
| [湯宿 ゆらぎ](https://yokoyama-dev.com/portfolio/ryokan/) | 温泉旅館 | スクロールで時間が進むトップと、宿泊の予約 |
| [SOU.hair](https://yokoyama-dev.com/portfolio/salon/) | 美容室 | メニューと、スタイリスト・日時を選ぶ予約 |
| [VOID/FORM](https://yokoyama-dev.com/portfolio/motion/) | Web制作会社 | three.js の3Dと、スクロールに合わせた動き |

## 技術的なポイント

- **全ページを静的に出す：** React Router のフレームワークモードで、全ページ（サンプルの商品ページを含む）をビルド時にHTMLにしてから、ブラウザで動かしています
- **1つのアプリに11のサイト：** サイト本体と10のサンプルを1つのアプリで持ち、CSS・フォントはルートごとに読み込むので、ほかのサイトの見た目が混ざりません
- **画像はビルドで最適化：** vite-imagetools で縮小し、`srcset` と幅・高さを自動で付けています
- **値は1か所で管理：** 色・文字・余白はデザイントークン（Tailwind CSS v4 の `@theme`、サンプルは CSS 変数）に、文言は `data/`・`content/` にまとめ、部品には書きません
- **動くフォーム：** 入力チェック、空き枠、合計金額の計算まで動きます。ECはカート・会員・注文・在庫・管理画面をブラウザの中（localStorage）だけで動かしています
- **トップの動き：** Canvas 2D で描いています。数式・場面・時間割り・描画をファイルごとに分けています
- **CI/CD：** プルリクエストごとに Biome・型チェック・ビルドを通し、`staging` と `main` に入れると Cloudflare Pages に公開します

## 技術スタック

| 用途 | 使っているもの |
|---|---|
| フレームワーク | React 19.1.10・React Router 7.18.5（フレームワークモード・プリレンダー） |
| ビルド | Vite 7.3.7・vite-imagetools 10.0.1 |
| 見た目 | Tailwind CSS 4.3.3（サイト本体）・CSS（サンプル）・Fontsource |
| 動き | GSAP 3.15.0・Lenis 1.3.27・three.js 0.187.0・Canvas 2D |
| 言語・品質 | TypeScript 5.8.3（strict）・Biome 2.5.1 |
| 公開 | Cloudflare Pages・wrangler 4.156.1・GitHub Actions |

## はじめかた

Node.js 22.18 以上が要ります（`web/.node-version`）。

```sh
cd web
npm ci
npm run dev
```

| コマンド | すること |
|---|---|
| `npm run dev` | 開発サーバーを起動する |
| `npm run check` | Biome で整形とリントを確かめる |
| `npm run format` | Biome で整形と修正をかける |
| `npm run typecheck` | 型を確かめる |
| `npm run build` | 全ページをプリレンダーし、サイトマップ・`_headers`・`_redirects` を作る（`web/build/client`） |
| `npm run deploy -- --branch=<ブランチ>` | Cloudflare Pages に公開する（`CLOUDFLARE_API_TOKEN`・`CLOUDFLARE_ACCOUNT_ID` が要る） |

## ディレクトリ構成

```
web/
├── app/
│   ├── config.ts          サイト名・URL・パス・アイコンなど、全体の設定
│   ├── root.tsx           HTMLの骨組みとエラー画面
│   ├── routes.ts          ルートの一覧
│   ├── site/              サイト本体
│   │   ├── app.css        デザイントークンと独自のユーティリティ
│   │   ├── components/    部品（orbit/ はトップの動き）
│   │   ├── data/          文言・パス・画像
│   │   └── routes/        トップ・制作事例・サービス・運営者情報
│   ├── samples/           制作サンプル
│   │   ├── <id>/          case.json・content/・styles/・pages/・routes.ts・assets/・media/
│   │   └── shared/        サンプルどうしで使う部品・フォーム・入力チェック
│   └── shared/            meta とアクセス解析
├── scripts/               ビルドの後処理（サイトマップ・_headers・_redirects）
└── public/                そのまま配るファイル
```

## 開発の流れ

| ブランチ | 役割 | 公開先 |
|---|---|---|
| `feature/*` | 作業 | なし |
| `develop` | まとめる | なし |
| `staging` | 本番の前の確認 | https://staging.yokoyama-dev-portfolio.pages.dev/ |
| `main` | 本番 | https://yokoyama-dev.com/ |

`feature/*` → `develop` → `staging` → `main` の順に、プルリクエストでマージします。

## コーディング規約

- 色・大きさ・余白はトークンを使い、Tailwind の任意値（`[...]`）は使わない。足りないときはトークンか `@utility` を足す
- 文言・パス・画像は部品に書かず、`data/`・`content/`・`config.ts` に置く
- コードにコメントを書かない。名前で意味が分かるようにする
- パッケージの版は完全に固定し、公開から2週間以上たったものを使う
- `npm run check` と `npm run typecheck` を通してからプルリクエストを出す

## サンプルを足すとき

1. `web/app/samples/<id>/` に、`case.json`・`media/`（`thumb.jpg`・`desktop.png`・`mobile.png`）・`routes.ts`・`layout.tsx`・`pages/`・`content/`・`styles/` を置く
2. `web/app/routes.ts` にサンプルのルートを足す
3. 制作事例の一覧・フッター・ページ数・サイトマップ・旧URLの転送は、`case.json` と `pages/` から自動で作られる

## 写真について

サンプルの写真はフリー素材（ぱくたそ・Unsplash・Pexels・Pixabay）で、人物はモデルです。出典は各サンプルの `assets/CREDITS.txt` に書いています。
