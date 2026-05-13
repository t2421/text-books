# text-books プロジェクト ── 運用ルール

このリポジトリは textbook-ds デザインシステムを使った長文教科書の置き場。
`docs/` 配下を GitHub Pages でそのまま配信している (Settings → Pages → Source: `main` / `/docs`)。

```
text-books/
├── docs/                                   ← GitHub Pages の公開ルート
│   ├── textbook-ds.css                     ← 共通デザインシステム (single source of truth)
│   ├── textbook.js                         ← 共通スクリプト (進捗バー/目次/フェード)
│   ├── index.html                          ← 全教科書のコレクション目録
│   └── <textbook-slug>.html                ← 各教科書 (1冊1ファイル)
├── single-file-demo.html                   ← デザインシステムのデモ (自己完結)
└── README.md                               ← textbook-ds の仕様
```

**重要:** `textbook-ds.css` と `textbook.js` はすべての教科書 + index.html が共有する単一ソース。教科書を増やしても、デザインを揃えるための変更は常に**この 2 ファイルだけ**を編集する。各教科書 HTML には CSS/JS をインライン化しない。

---

## 新しい教科書を作るときの手順

**必ず以下の3ステップを全部やること。途中で止めない。**

### 1. 教科書本体を作る

`docs/<slug>.html` として作成する。

- スラグは英小文字とハイフンのみ (例: `web-service-defacto-standard-textbook.html`)
- 既存の `docs/karpathy-ai-era-development-textbook.html` か `docs/web-service-defacto-standard-textbook.html` をベースにコピーして始める
- `<head>` 内には次の 2 行だけ書く (CSS をインライン化しない):

  ```html
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Noto+Serif+JP:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="./textbook-ds.css">
  ```

- 末尾の `</body>` 直前に共通スクリプトを 1 行で読み込む:

  ```html
  <script src="./textbook.js" defer></script>
  ```

- デザイントークン (`--color-paper`, `--color-accent`, `--font-serif-jp` など) は基本いじらない。テーマを変える必要があるときも、`textbook-ds.css` の `:root` を変更する (= 全教科書に波及する) 方を優先する
- `<title>`, `.hero__title`, `.hero__subtitle`, `.hero__meta` を必ず埋める
- 利用できる主要コンポーネント (詳細は `textbook-ds.css` 内のコメント参照):
  - `.chapter` / `.chapter__header` / `.chapter__number` / `.chapter__title` / `.chapter__intro`
  - `.prose` ── 本文。中で `<h3>` (装飾あり)、リスト、表、コードブロックが使える
  - `.prose h3.h3--thought` / `.h3--practice` ── 二段構え用見出しバリアント
  - `.key-concept` ── 墨色の要点カード (Dual Coding)
  - `.sidenote` / `.sidenote--quote` ── 補足 / 英語原文引用
  - `.summary` ── 章末まとめ (Chunking)
  - `.figure` ── SVG 図解
  - `.chapter-nav` ── 前後章ナビ
  - `.bibliography` ── 参考文献リスト

### 2. `docs/index.html` にエントリを追加する **(忘れない)**

`<main class="catalog">` の中、**`<!-- ↓ ここに新しい教科書を追加していく (新しいものほど上) -->`** コメントの直後に新しい `<article class="entry">` を挿入する。**新しい巻ほど上**に置く (Vol番号は降順)。

エントリのテンプレート:

```html
<article class="entry">
  <div class="entry__volume">
    <span class="entry__volume-roman">II</span>          <!-- ローマ数字 -->
    <span class="entry__volume-label">Vol.</span>
  </div>
  <div class="entry__body">
    <h3 class="entry__title">
      <a href="./<slug>.html">教科書のタイトル</a>
    </h3>
    <p class="entry__subtitle">サブタイトル / 一行紹介。</p>
    <div class="entry__meta">
      <span class="entry__meta-item">読了 <span class="entry__meta-value">XX MIN</span></span>
      <span class="entry__meta-item">構成 <span class="entry__meta-value">N CHAPTERS</span></span>
      <span class="entry__meta-item">想定 <span class="entry__meta-value">読者層</span></span>
    </div>
    <a class="entry__cta" href="./<slug>.html">Read</a>
  </div>
</article>
```

メタ情報の元ネタは、教科書本体の `<section class="hero">` 内 `.hero__meta-value` から取る (3つとも揃える)。値が揃わない場合は教科書本体側の hero メタも修正して整合させること。

### 3. ブラウザで両方を開いて確認する

- `docs/index.html` ── エントリが追加されているか、レイアウトが崩れていないか
- `docs/<slug>.html` ── タイトル/メタが index と一致しているか、リンクから飛べるか
- push 後は GitHub Pages のデプロイ完了を待ってから本番URLでも確認 (Actions タブの `pages-build-deployment` で確認できる)

---

## やってはいけないこと

- **index.html の追加を忘れる** ── 教科書本体だけ作って終わるのは作業未完了。必ずセットで更新する
- **古い順に並べる** ── 新しい巻が下に埋もれると、訪問者が最新作を見つけにくい。常に新しい巻が一番上
- **巻番号をスキップ・重複させる** ── ローマ数字は連番 (I, II, III, IV, V, VI, VII, VIII, IX, X)
- **デザインを毎回作り直す** ── index.html と教科書本体は同じデザイントークンで統一されている。一冊だけ別テイストにしたくなっても、まず既存トークンの範囲で表現できないか検討する
- **教科書 HTML に CSS/JS をインライン化する** ── 共通デザインシステムから切り離れる原因になる。必ず `textbook-ds.css` / `textbook.js` を外部参照する。スタイルを増やしたくなったら、`textbook-ds.css` 側に追加して全教科書が使える形にする
- **docs/ の外に教科書を置く** ── 公開教科書はすべて `docs/` 配下 (= GitHub Pages の公開ルート)。下書きやWIPは別ディレクトリ (例: `drafts/`) を切る
- **`docs/` をリネームする** ── GitHub Pages の Source 設定が `/docs` 固定なので、ディレクトリ名を変えると即座にサイトが落ちる
- **`textbook-ds.css` / `textbook.js` をリネーム・移動する** ── すべての HTML が `./textbook-ds.css` のような相対パスで参照しているので、リネームすると即座にデザインが崩れる

---

## デザイン原則 (textbook-ds)

詳細は [README.md](./README.md) を参照。要点だけ:

- 古典書の佇まい (雁皮色の地、墨と辰砂、欧文セリフ章番号)
- 読了進捗バー、スライドイン目次、フェードイン
- Dual Coding (本文 + Key Concept)、Chunking (章末まとめ)、Marginalia (サイドノート)
- 長い読み物 (5,000字以上、章立てあり、通読期待) に最適化

ブログ・ランディング・ダッシュボード・短文には使わない。

---

## レイアウトに関する固有ルール

- **新聞・教科書系の見出し** には `text-wrap: balance` を使う (折り返しを視覚的に均等化)
- **タイトルは1つだけ** ── 表紙の大見出しは1つ、サブタイトルで補足。装飾的な副タイトルを並列に並べない
