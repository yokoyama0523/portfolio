# yokoyama-dev.com

Saku² の Web サイト。React Router（フレームワークモード・プリレンダー）で作っている。

## 構成
| 場所 | 中身 |
|---|---|
| `web/` | サイト本体（React Router・Tailwind CSS・Vite） |
| `web/app/samples/<id>/` | 制作サンプルのサイト（React Router のルート） |
| `web/scripts/` | ビルドの後処理（サイトマップ・`_headers`・`_redirects`。TypeScript） |

## 開発
```sh
cd web
npm ci
npm run dev
npm run check
npm run typecheck
npm run build
```
