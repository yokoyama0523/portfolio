# yokoyama-dev.com

Saku² の Web サイト。React Router（フレームワークモード・プリレンダー）で作っている。

## 構成
| 場所 | 中身 |
|---|---|
| `web/` | サイト本体（React Router・Tailwind CSS・Vite） |
| `cases/<id>/` | 制作サンプルのサイト（静的な HTML。React Router へ移し替え中） |
| `tools/` | 公開用の後処理（`og.py`・`seo.py`・`squeeze.py`）と公開（`deploy.sh`） |

## 開発
```sh
cd web
npm ci
npm run dev
npm run check
npm run typecheck
npm run build
```
