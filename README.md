# yokoyama-dev.com

Saku² の Web サイト。React Router（フレームワークモード・プリレンダー）で作っている。

## 構成
| 場所 | 中身 |
|---|---|
| `web/` | サイト本体（React Router・Tailwind CSS・Vite） |
| `web/app/samples/<id>/` | 制作サンプルのサイト（React Router のルート） |
| `tools/` | 公開用の後処理（`og.py`・`seo.py`）と公開（`deploy.sh`） |

## 開発
```sh
cd web
npm ci
npm run dev
npm run check
npm run typecheck
npm run build
```
