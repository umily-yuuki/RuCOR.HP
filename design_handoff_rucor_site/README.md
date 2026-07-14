# Handoff: RuCOR. Group サイト（トップページ + ReFa Onlineページ）

## Overview
RuCOR.グループ（RuCOR. / umily by RuCOR. / ヒトトイロ、川崎市多摩区・登戸/向ヶ丘遊園の3サロン）の紹介サイト。トップページ（3ブランド入口）と、ReFa公式オンラインサイト"Bhappy"への登録案内ページの2画面。

## About the Design Files
このバンドルに含まれるHTMLファイルは **デザインリファレンス（プロトタイプ）** です。見た目・レイアウト・アニメーションの意図を示すためにHTMLで作成したものであり、そのまま本番コードとして流用するものではありません。実装時は、対象コードベースの既存環境（React/Vue/静的HTML＋CMS等、既にある場合はその構成）の作法に沿って再構築してください。まだ環境がない場合は、このサイトの要件（軽量な複数ページ静的サイト、スクロールアニメーション、レスポンシブ）に適したフレームワーク・構成を選定してください。

## Fidelity
**Hi-fi（高忠実度）**：配色・タイポグラフィ・余白・アニメーションのタイミングまで確定値で指定されています。ピクセルパーフェクトに近い形で再現してください。ただし、以下は未確定のプレースホルダーです：
- 本文コピー（見出し・説明文の多くは仮テキストで、後日クライアントから正式なコピーが提供される想定）
- 一部リンク先（`href="#"` のもの。ex: 10のこだわり、Home Care、ReFa VEENA、採用情報）
- 写真素材（すべてプレースホルダー枠。実写真は別途提供）

## Screens / Views

### 1. RuCOR Group Hub（トップページ）

**Purpose**: サイト訪問者を3ブランド（RuCOR. / umily by RuCOR. / ヒトトイロ）のいずれかへ誘導する入口ページ。あわせてレビュー・アクセス・SNS・採用情報を掲載。

**Layout**: 単一カラム、縦スクロール。コンテンツ幅は `max-width: 1040px`、左右パディング `28px`、中央寄せ。

**セクション構成（上から順）**:

1. **Intro 1（ファーストビュー）** — `height:100vh`（最小560px）、背景 `#FAF9F5`。中央にロゴ画像（`assets/rucor-logo.png`、幅 `min(70vw, 420px)`）とキャッチコピー「お客様の10年先も綺麗への実現」（明朝体、`clamp(17px,2.4vw,22px)`、色 `#6B655A`）。画面下部中央に「Scroll ↓」（モノスペース、11px、上下バウンドアニメーション）。
   - ロゴは0.2秒遅延でフェードイン+上昇（`introUp` 1s）、コピーは1秒遅延、Scrollインジケータは2.2秒遅延でフェードイン後、2秒周期で上下バウンド。

2. **Intro 2（ブランドステートメント + 写真）** — `min-height:100vh`、背景 `#FAF9F5`、上下パディング80px。横並び2カラム（`flex-wrap:wrap`、gap 56px）：
   - 左カラム（`flex:1 1 320px`）：
     - キッカー「RuCOR. GROUP」（モノスペース12px、letter-spacing 0.18em、色 `#6B655A`）
     - 見出し（明朝体、`clamp(26px,4.6vw,38px)`、line-height 1.5）：1行目「髪から引き出す、」色 `#48584F`、2行目「可能性。」色 `#B07C48`。各行は個別にフェードイン+上昇（`lineUp` 1.1s、0.3s/0.65s遅延）
     - 本文2段落（15px、色 `#6B655A`、max-width 560px）
     - 装飾用SVG波線（4色のパスが順番に配置され、各色で破線が流れるアニメーション`dash` 3.2s linear infinite）
   - 右カラム：写真スロット（幅 `min(220px,55vw)`、`aspect-ratio:3/4`、背景 `#DDE3DE`、角丸2px）
   - このセクション全体の子要素アニメーションは、スクロールでビューポートに入った時点（IntersectionObserver, threshold 0.12）で一括再生開始（`animation-play-state: paused → running`）。

3. **Brand Panels（3ブランド紹介）** — 各ブランド1枠、写真+テキストの2カラム（`grid-template-columns:repeat(auto-fit,minmax(320px,1fr))`、gap 28px）。スクロールで下から18pxフェードイン（IntersectionObserver、`opacity 1.1s`, `transform 1.1s`, easing `cubic-bezier(0.16,1,0.3,1)`）。
   - **RuCOR.**: 写真背景 `#DDE3DE`、見出し「RuCOR.」（明朝体、`clamp(38px,6.4vw,60px)`）、CTAボタン背景 `#48584F`（グリーン）「HPBで予約・詳細を見る →」→ `https://beauty.hotpepper.jp/slnH000452481/`
   - **umily by RuCOR.**: 写真背景 `#EEE1CD`、CTAボタン背景 `#B07C48`（ゴールド）→ `https://beauty.hotpepper.jp/slnH000532565/`
   - **ヒトトイロ**: 写真背景 `#E4DCE9`、上部に「ヘッドスパ専門店」ラベル（モノスペース12px）、CTAボタン背景 `#6C577C`（パープル）→ `https://beauty.hotpepper.jp/kr/slnH000774133/`
   - 各CTAボタン: `padding:12px 22px`、`border-radius:2px`、白文字（`#F5F2EC`）、hover時 `opacity:0.85` + 右へ2px移動。
   - 各ブランド枠の間・下に `1px solid #D9D2C2` の罫線。

4. **Contents（コンテンツ一覧）** — 帯背景 `#FAF9F5`（左右フルブリード、`margin:0 -28px`、内側 `padding:56px 28px`）、上下に破線 `1px dashed #D9D2C2`。4枚のカード（`repeat(auto-fit,minmax(220px,1fr))`、gap 16px）、各カード `border:1px solid #D9D2C2`、`border-radius:4px`、`padding:20px`、背景 `#F5F2EC`：
   - 10のこだわり／Home Care／ReFa Online（`RuCOR ReFa Online` ページへの内部リンク）／ReFa VEENA
   - 各カード：見出し（明朝体16px）、説明文（14px, `#6B655A`）、「詳しく見る →」リンク（モノスペース12px）

5. **Review（口コミ）** — 白背景、上部破線区切り。3カードグリッド、各カードにHPB/Googleの★評価（現在の数値: RuCOR. HPB★4.91/Google★4.6、umily HPB★4.8/Google★4.7、ヒトトイロ HPB★4.92/Google★4.8）と、各口コミページへのリンク2本。

6. **Access（アクセス）** — Contentsと同じベージュ帯デザイン。3カード、店舗ごとの住所・電話番号・最寄駅・定休日。

7. **Instagram** — テキストリンク2本（RuCOR. / umily、下線ホバー演出）。

8. **Recruit（採用）** — ゴールド背景（`#EEE1CD`）の横長バナー、見出し「スタイリスト募集中」+ CTAボタン「採用情報を見る →」。

9. **Footer** — 罫線区切り、左に「RuCOR. Group」ロゴテキスト、右に住所・ブランド名一覧。

### 2. RuCOR ReFa Online（Bhappy登録ページ）

**Purpose**: MTG公式オンラインサイト"Bhappy"への会員登録、およびLINE連携によるクーポン取得を訴求・誘導する。

**Layout**: 単一カラム、`max-width:1040px`。

**セクション構成**:

1. **Header** — 「← RuCOR. Group TOP」リンク（トップページへ戻る）。

2. **Hero** — 全幅バナー画像（`aspect-ratio:16/7`、`object-fit:cover`、フルブリード）。その下、中央寄せテキストブロック（`max-width:760px`）：
   - キッカー「ReFa Online｜Bhappy」（モノスペース12px、色 `#B07C48`）
   - 見出し「登録者数50万人突破。ReFa公式サイトで5,000円分のクーポンを。」（明朝体、`clamp(26px,4.6vw,40px)`、「5,000円分」部分のみ `#B07C48`）
   - 説明文（14.5px、`#6B655A`）
   - CTAボタン「Bhappyに無料登録する →」（背景 `#B07C48`、`padding:15px 34px`）→ Bhappy登録URL
   - 各要素、0.15s刻みで順にフェードイン+上昇

3. **Benefits（特典バー）** — 上下罫線区切りの1行、4分割グリッド（区切り線 `border-right:1px solid #D9D2C2`）：
   - ¥5,000分／5年保証／下取／先行案内（各見出し明朝体17px `#B07C48` + 説明12.5px `#6B655A`）

4. **Lineup（商品ラインナップ）** — 正方形写真3枚グリッド（プレースホルダー背景色 `#DDE3DE` / `#EEE1CD` / `#E4DCE9`）。

5. **Registration（登録案内）** — 中央寄せの見出しブロック：
   - バッジ「For RuCOR. Guests Only」（アウトライン、モノスペース11px）
   - 見出し「登録は無料、1分で完了します。」
   - クーポン条件の説明文 + 注釈（`#9B9385`）
   - QRコード枠（200×200px）+ 説明テキストの2カラム
   - CTAボタン（同上ゴールド、大きめ `padding:16px 40px`）
   - 箇条書き特典リスト（✦マーカー、12.5px、line-height 2）

6. **LINE Steps（Bonus Step）** — 「LINE連携でさらにお得に」の4ステップ手順。各ステップは番号バッジ（36×36px、円ではなく角丸2pxの正方形枠、明朝体）+ タイトル（14px bold）+ 説明文（13px）の2カラムグリッド。Step2には電話番号「0445438555」を表示するコピー用ボックス（背景 `#F0EDE5`、明朝体20px）。末尾にアウトラインボタン「LINE公式アカウントを友達追加 →」→ LINE LIFF URL。

7. **Footer** — トップページと同一パターン、中央寄せ。

## Interactions & Behavior
- **スクロールリビール**: `[data-reveal]` 属性を持つセクション/カードは、初期状態 `opacity:0; transform:translateY(18px)`。`IntersectionObserver`（threshold 0.12）でビューポートに入ったら `opacity:1; transform:translateY(0)` に変化（`transition: 1.1s cubic-bezier(0.16,1,0.3,1)`）。一度発火したら `unobserve` して繰り返さない。
- **Intro 2の子要素アニメーション**: 個別の `@keyframes` アニメーションは最初 `paused` 状態。セクションがビューポートに入った時点で `animationPlayState = 'running'` に切り替えて一斉再生。
- **ボタンhover**: 全CTAボタン共通で `opacity:0.85` + `transform:translateX(2px)`（`transition:0.2s ease`）。
- **リンクhover**: デフォルト文字色 `#B07C48`、hover時 `#1D1B17`。Instagramリンクは下線色がhoverで濃くなる。
- **`prefers-reduced-motion: reduce`**: アニメーションをスキップし、最終状態（`opacity:1`, `transform:none`）を即座に適用。
- **レスポンシブ**: Flexboxの `flex-wrap:wrap` とCSS Gridの `auto-fit / minmax()` で、画面幅に応じて自動的に1カラムへ折り返す。文字サイズは `clamp()` を多用。

## State Management
インタラクティブな状態は基本的にCSSアニメーション/トランジションのみで完結しており、JS側の状態管理は最小限：
- スクロール位置に応じた `IntersectionObserver` のトリガー状態（各要素1回のみ発火、以後リセットなし）
- ページ間遷移は通常の `<a href>` リンク（SPA的な状態管理なし）

## Design Tokens

### Colors
- 背景（メイン）: `#F5F2EC`
- 背景（セクション帯・淡）: `#FAF9F5`
- テキスト（本文見出し）: `#1D1B17`
- テキスト（サブ・キャプション）: `#6B655A`
- テキスト（注釈・薄）: `#9B9385`
- �JsRuCOR.ブランドカラー（グリーン）: `#48584F`
- umilyブランドカラー（ゴールド／アクセント共通）: `#B07C48`
- ヒトトイロブランドカラー（パープル）: `#6C577C`
- 罫線（実線）: `#D9D2C2`
- カード背景（帯セクション内）: `#F5F2EC`
- 写真プレースホルダー背景: `#DDE3DE`（グリーン系）/ `#EEE1CD`（ゴールド系）/ `#E4DCE9`（パープル系）/ `#EAE7DD`（QR用）
- ステップ番号ボックス背景（コピーボックス）: `#F0EDE5`

### Typography
- 見出し用: **Shippori Mincho**（明朝体）weight 500/600
- 本文用: **Zen Kaku Gothic New** weight 400/500/700
- キッカー・ラベル・数値用: **JetBrains Mono** weight 400/500
- 見出しサイズ: `clamp(38px,6.4vw,60px)`（ブランド名）、`clamp(26px,4.6vw,38px)`〜`clamp(30px,5.6vw,48px)`（H1/H2各種）
- 本文サイズ: 13px〜15px程度
- キッカー: 11px〜12px、letter-spacing 0.14em〜0.18em、uppercase
- line-height: 本文全体で1.85（body基準）

### Spacing
- コンテンツ最大幅: 1040px（Heroテキストのみ760px）
- 左右パディング: 28px
- セクション間パディング: 48px〜64px
- カードpadding: 20px前後
- グリッドgap: 16px〜28px

### Border Radius
- ボタン・写真枠: 2px
- カード: 4px

### Shadows
使用なし（フラットデザイン、罫線ベース）

## Assets
- `assets/rucor-logo.png` — RuCOR.グループロゴ（ユーザー提供画像から抽出）
- 写真: すべて `<image-slot>` というカスタム要素によるドラッグ&ドロップ・プレースホルダー。本番実装では実際の写真アセットに差し替えが必要（本ハンドオフ時点で未提供の枠あり／一部は既にサンプル画像が仮置きされている）
- QRコード: プレースホルダー（Bhappy登録用の実QR画像に差し替え要）
- アイコン: 使用なし（矢印は「→」のテキスト文字）

## Files
- `RuCOR Group Hub.dc.html` — トップページ（3ブランド入口+ レビュー/アクセス/SNS/採用）
- `RuCOR ReFa Online.dc.html` — ReFa/Bhappy登録案内ページ
- `image-slot.js` — 写真プレースホルダー用のカスタム要素（本番実装では通常の`<img>`に置き換える想定。ドラッグ&ドロップでの画像差し込みはプロトタイプ確認用の機能）
- `support.js` — プロトタイプ実行用のランタイム（本番実装では不要）
- `assets/rucor-logo.png` — ロゴ画像

## Notes for Implementation
- 参照した既存サイト: `https://rucor-umily-hair.hp.peraichi.com/Refa`（ReFa/Bhappyページの内容ソース）、`https://www.bhappy-platform.jp/shop/`（ReFaページHeroの全幅バナーレイアウトの参照）
- テキストコピーの多くは仮のプレースホルダーです。正式なコピーはクライアントから別途提供される想定のため、実装時はコピー差し替えを前提とした構造にしてください。
- リンク先が `#` のものは未確定です（10のこだわり、Home Care、ReFa VEENA、採用情報ページ）。
