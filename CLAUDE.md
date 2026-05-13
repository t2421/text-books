# text-books プロジェクト ── 運用ルール

このリポジトリは textbook-ds デザインシステムを使った長文教科書の置き場。

```
text-books/
├── published/
│   ├── index.html                          ← 全教科書のコレクション目録
│   └── <textbook-slug>.html                ← 各教科書 (1冊1ファイル)
├── single-file-demo.html                   ← デザインシステムのデモ
└── README.md                               ← textbook-ds の仕様
```

---

## 新しい教科書を作るときの手順

**必ず以下の3ステップを全部やること。途中で止めない。**

### 1. 教科書本体を作る

`published/<slug>.html` として作成する。

- スラグは英小文字とハイフンのみ (例: `web-service-defacto-standard-textbook.html`)
- `single-file-demo.html` または `published/web-service-defacto-standard-textbook.html` をベースにする
- デザイントークン (`--color-paper`, `--color-accent`, `--font-serif-jp` など) は基本いじらない。テーマを変える場合のみ `tokens.css` 相当の変数を上書きする
- `<title>`, `.hero__title`, `.hero__subtitle`, `.hero__meta` を必ず埋める

### 2. `published/index.html` にエントリを追加する **(忘れない)**

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

- `published/index.html` ── エントリが追加されているか、レイアウトが崩れていないか
- `published/<slug>.html` ── タイトル/メタが index と一致しているか、リンクから飛べるか

---

## やってはいけないこと

- **index.html の追加を忘れる** ── 教科書本体だけ作って終わるのは作業未完了。必ずセットで更新する
- **古い順に並べる** ── 新しい巻が下に埋もれると、訪問者が最新作を見つけにくい。常に新しい巻が一番上
- **巻番号をスキップ・重複させる** ── ローマ数字は連番 (I, II, III, IV, V, VI, VII, VIII, IX, X)
- **デザインを毎回作り直す** ── index.html と教科書本体は同じデザイントークンで統一されている。一冊だけ別テイストにしたくなっても、まず既存トークンの範囲で表現できないか検討する
- **published/ の外に教科書を置く** ── 公開教科書はすべて `published/` 配下。下書きやWIPは別ディレクトリ (例: `drafts/`) を切る

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
