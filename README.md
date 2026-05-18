# Textbook DS

長文読み物・教科書のためのデザインシステム。古典書の佇まいに、現代的な学習体験 (読了進捗、目次ドロワー、フェードイン) を組み合わせた CSS / JS ライブラリ。

```
textbook-ds/
├── css/
│   ├── textbook.css       ← これ1つを読めば全部入る (エントリポイント)
│   ├── tokens.css         ← 色・フォント・寸法 (テーマ差し替えはここ)
│   ├── base.css           ← リセット
│   ├── layout.css         ← ヒーロー / 章 / ナビ
│   ├── prose.css          ← 本文タイポグラフィ
│   ├── components.css     ← Key Concept / Summary / Sidenote / Callout
│   ├── figure.css         ← 図解
│   └── motion.css         ← 進捗バー / フェードイン
├── js/
│   └── textbook.js        ← 進捗バー・目次ドロワー・フェードインの動作
├── examples/
│   └── minimal.html       ← 最小構成の動くサンプル
├── docs/
│   └── showcase.html      ← 全コンポーネントのカタログ
└── README.md
```

---

## 5分で始める

新しい教科書を作るときは、これだけ:

1. `examples/minimal.html` をコピー
2. タイトル・本文を書き換える
3. ブラウザで開く

CSS/JS への参照は相対パスで `../css/textbook.css` `../js/textbook.js` になっている。プロジェクトのルートに置く場合は適宜書き換える。

---

## デザインの哲学

### 何を狙っているか

- **古典書の重厚さ** ── 雁皮色の地に墨と辰砂、欧文セリフ体の章番号
- **現代的な読書体験** ── 読了進捗バー、スライドイン目次、フェードイン
- **学習科学への配慮** ── Dual Coding (本文 + Key Concept ボックス)、Chunking (章末まとめ)、サイドノートによる Marginalia

### 何を狙っていないか

- ブログ、ランディングページ、ダッシュボード
- 短い記事 (1,000 字未満)
- 動画やインタラクティブ要素が中心のコンテンツ

長い読み物 (5,000 字以上)、章立てがあり、読者に通読を期待する文書に最適化されている。

---

## コンポーネント一覧

すべてのコンポーネントの実物は [`docs/showcase.html`](./docs/showcase.html) で見られる。

### レイアウト

| コンポーネント | 用途 |
|---|---|
| `.hero` | 表紙 (タイトル・サブタイトル・メタ情報) |
| `.top-nav` | 固定上部ナビ (タイトル略 + 目次ボタン) |
| `.toc-drawer` | 右側スライドイン目次 |
| `.chapter` | 章コンテナ |
| `.chapter__header` | 章ヘッダー (中央配置の章番号・タイトル・リード) |
| `.chapter-nav` | 章間 PREV/NEXT ナビ |
| `.footer` | フッター |

### 本文

| コンポーネント | 用途 |
|---|---|
| `.prose` | 本文ラッパー。配下の `<p>`, `<h3>`, `<ul>`, `<pre>`, `<table>` 等を自動スタイリング |
| ドロップキャップ | `.prose` 内の最初の段落の最初の文字に自動で適用 |

### 強調・補足

| コンポーネント | 用途 | 推奨頻度 |
|---|---|---|
| `.key-concept` | 重要概念ボックス (黒地・金ラベル) | 1章につき 1〜2 個 |
| `.summary` | 章末まとめ | 各章に 1 個 |
| `.sidenote` | サイドノート (Tufte の Marginalia) | 章全体で 2〜4 個 |
| `.callout` | 軽い注釈 (`--info` / `--warn` / `--note`) | 必要に応じて |
| `.figure` | 図解 (SVG + キャプション) | 章につき 0〜2 個 |

### 動的UI

| コンポーネント | 動作 |
|---|---|
| `.progress-bar` | スクロール位置に応じた進捗バー (上部固定) |
| `.toc-drawer` | 目次トグル (右側スライドイン) |
| `.fade-in` | スクロール時のフェードイン (Intersection Observer) |

---

## 典型的な章の構造

```html
<section class="chapter" id="ch1">
  <div class="chapter__inner">

    <!-- 1. 章ヘッダー (中央配置) -->
    <header class="chapter__header">
      <span class="chapter__number">CHAPTER ONE</span>
      <h2 class="chapter__title">章タイトル<br>── サブタイトル</h2>
      <div class="chapter__rule"></div>
      <p class="chapter__intro">章のリード(導入の一文)</p>
    </header>

    <!-- 2. 本文 (.prose の中に全部入れる) -->
    <div class="prose">
      <p>導入段落...</p>

      <h3>セクション見出し</h3>
      <p>本文...</p>

      <!-- 3. Key Concept (1章につき1〜2個) -->
      <div class="key-concept">
        <span class="key-concept__label">章の核心</span>
        <p class="key-concept__text">最も重要なメッセージ</p>
      </div>

      <p>本文の続き...</p>

      <!-- 4. サイドノート (必要に応じて) -->
      <div class="sidenote">
        <span class="sidenote__label">補 ── タイトル</span>
        補足情報...
      </div>

      <!-- 5. 章末まとめ (必須) -->
      <div class="summary">
        <span class="summary__label">CHAPTER SUMMARY</span>
        <h4 class="summary__title">この章で押さえたこと</h4>
        <ul>
          <li>ポイント1</li>
          <li>ポイント2</li>
        </ul>
      </div>
    </div>

    <!-- 6. 章間ナビ -->
    <nav class="chapter-nav">
      <a href="#prev" class="chapter-nav__prev">
        <span class="chapter-nav__label">── PREV</span>
        <span class="chapter-nav__title">前の章</span>
      </a>
      <a href="#next" class="chapter-nav__next">
        <span class="chapter-nav__label">NEXT ──</span>
        <span class="chapter-nav__title">次の章</span>
      </a>
    </nav>
  </div>
</section>
```

---

## テーマを変える

`tokens.css` の `:root` 内の変数を書き換える。たとえば現代的なミニマルテーマにするなら:

```css
:root {
  --color-paper: #ffffff;
  --color-paper-deep: #f5f5f5;
  --color-ink: #0a0a0a;
  --color-accent: #2563eb;
  --color-gold: #6b7280;
  --font-serif-jp: 'Noto Sans JP', sans-serif;
  --font-display: 'Inter', sans-serif;
}
```

もしくは、テーマクラスを付ける形にすれば、複数テーマを並行管理できる:

```css
:root.theme-modern {
  --color-paper: #ffffff;
  /* ... */
}
```

```html
<html class="theme-modern">
```

---

## 設計上の制約と判断

### なぜ Web Components や React コンポーネントでないのか

ピュアな CSS + バニラ JS で書いてある。理由:

- **長い読み物** はランタイムを必要としない。HTMLを書けば十分
- **依存ゼロ** なので、20年後も動く可能性が高い
- **どこにでも貼り付けられる** (ブログ、Notion、自前サイト、PDF出力など)

将来 React コンポーネント化したい場合は、HTML 構造をそのまま JSX に移すだけで済む。

### なぜ BEM 風命名なのか

`.key-concept__label` のような命名は CSS の旧スタイルだが、

- **ファイル全体を grep しやすい**
- **CSS 詳細度が常に均一** (`.block__elem`) で、上書きが予測可能
- **Tailwind の utility 地獄を避ける**

`.prose` を除き、ほぼすべてのコンポーネントが「ブロック + 要素」の階層しか持たない。Modifier (`--variant`) が必要な場合だけ追加 (例: `.callout--warn`)。

### なぜ JS は IIFE のバニラなのか

- **モジュールバンドラ不要** で `<script src="...">` で動く
- **「あれば動く、なくても黙る」** ── 必要な要素が DOM になくてもエラーにならない
- **コードが短い** (約 60 行)

---

## ライセンスと帰属

個人プロジェクトなので、お好きにどうぞ。
将来 OSS 化する際は、フォントだけは個別ライセンスを確認のこと:
- Noto Serif JP, Noto Sans JP, Inter (Google Fonts, OFL)
- Cormorant Garamond (Google Fonts, OFL)
- JetBrains Mono (OFL)

すべて OFL なので自由に使える。

---

## 公開教科書一覧

GitHub Pages で公開中。

| Vol. | タイトル | URL |
|------|---------|-----|
| I | フロントから来たあなたのための、フルスタック越境地図 | https://t2421.github.io/text-books/web-service-defacto-standard-textbook.html |
| II | AI時代の開発手法 ── Karpathyの地図 | https://t2421.github.io/text-books/karpathy-ai-era-development-textbook.html |
| III | 関係の引き方 ── データベース設計の原典と現代 | https://t2421.github.io/text-books/database-design-textbook.html |
| IV | 手を放す ── Claude Code で築く自律開発の工程 | https://t2421.github.io/text-books/claude-code-autonomous-development-textbook.html |
| V | 目の前の他者 ── UX 設計の根源と、iOS / Web の細部 | https://t2421.github.io/text-books/ux-design-principles-textbook.html |
| VI | 小さな商いのための、Webサイト制作全工程 | https://t2421.github.io/text-books/small-business-website-textbook.html |
| VII | 一人軍団 ── AIと組んで、チームを超えるWeb制作 | https://t2421.github.io/text-books/solo-ai-web-creation-textbook.html |
| VIII | 指示の逆流 ── AIが人間に頼む時代のラストワンマイル設計 | https://t2421.github.io/text-books/ai-to-human-last-mile-textbook.html |

所蔵目録（トップ）: https://t2421.github.io/text-books/

---

## 「最初の1冊」になった元教科書

このデザインシステムは、ある教科書 (「フロントから来たあなたのための、フルスタック越境地図」) のために設計され、その後ライブラリとして抽出された。元の教科書での実例は、各コンポーネントの「実戦での使われ方」の参考になる。

設計思想を一言でいえば:

> **古典書の佇まいに、現代の読書体験を組み合わせる。**
> 長い文章を、最後まで読みたくさせる装置として。
