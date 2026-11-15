# yokoyama-dev.com

Yuki Yokoyama のWeb制作のサイト。外側のページ（ホーム・事例一覧・サービス）と、事例（10のサイト）でできている。

## 構成
| 場所 | 中身 | 決まり |
|---|---|---|
| `cases/<id>/` | 事例1つ分のサイト（HTML・CSS・JS・画像）、`case.json`（事例の情報）、`case/thumb.jpg` | 自分のフォルダの中だけで完結する。外側やほかの事例を参照しない |
| `site/templates/` | 外側のページのひな形（`layout.html`、各ページ、部品 `_*.html`） | `{{key}}` `{{{key}}}` `{{> 部品}}` だけを使う |
| `site/assets/css/` | 見た目。`tokens.css`（色・書体・間隔）→ `base` → `layout` → `components` → `pages` | 色や大きさは `tokens.css` の変数を使う |
| `site/assets/js/` | 動き。`main.js` が入口、`modules/` に1つの役割ずつ | 各モジュールは自分の要素がなければ何もしない。動きを減らす設定では動かさない |
| `tools/` | 組み立てと公開。`build.py` → `og.py` → `seo.py`（`deploy.sh` が順に呼ぶ） | 全ページ共通のこと（検索向けのタグ・アクセス解析・制作サンプルの帯）は `seo.py` が公開用にだけ入れる |
| `archive/` | 前の版 | 公開しない |

## 事例を足す・消す
- 足す：`cases/<id>/` にサイトを置き、`case.json` と `case/thumb.jpg` を作る。外側のコードは直さない
- 消す：`cases/<id>/` を消す

## 公開
`tools/deploy.sh`（Cloudflare Pages。トークンは `~/.config/cloudflare/`）。`--dry` で `dist/` を作るだけ。
