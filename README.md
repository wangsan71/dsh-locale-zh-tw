# dsh-locale-zh-tw

[![npm version](https://img.shields.io/npm/v/dsh-locale-zh-tw)](https://www.npmjs.com/package/dsh-locale-zh-tw)
[![npm downloads](https://img.shields.io/npm/dm/dsh-locale-zh-tw)](https://www.npmjs.com/package/dsh-locale-zh-tw)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

DSH Web 介面的**繁體中文（台灣）語言包**。`npm install` 安裝後，設定 → 一般 → 語言 會多出「繁體中文」，全介面自動轉成繁體；`zh-TW / zh-Hant / zh-HK / zh-MO` 的瀏覽器還會自動切換。

不需要改任何 DSH 核心檔案，也不動其他插件的程式碼——其他插件的簡體字典由本套件在瀏覽端即時簡轉繁。

## 安裝

```bash
# 在你的 profile 目錄（例如 ~/.dsh/profiles/web）安裝
npm install dsh-locale-zh-tw

# 然後把它加入 profile 的 bundles（或直接用 dsh CLI）
dsh plugin --profile web add dsh-locale-zh-tw
```

等價於手動在 `profiles/<name>/package.json` 加上：

```jsonc
{
  "dependencies": {
    "dsh-locale-zh-tw": "^0.1.0"
  },
  "dsh": {
    "profile": {
      "bundles": [
        // ...原有 bundles...
        "dsh-locale-zh-tw"
      ]
    }
  }
}
```

**重新啟動 `dsh web`** 後生效（新增 bundle 需要重啟；之後切換語言只需重整頁面）。

## 使用

- 設定 → 一般 → **語言** → 選「繁體中文」，整頁立即變成繁體。
- 瀏覽器語言是 `zh-TW` / `zh-Hant` / `zh-HK` / `zh-MO` 時，開啟後自動選繁體。
- 選擇會用 localStorage 記住（主機端 settings schema 只認 `zh`/`en`，所以偏好存在瀏覽器端；這是刻意為之，避免改動核心）。

## 原理（簡短版）

核心 `@deepseek-ai/dsh-client-locale` 只內建 `zh`/`en`，語系清單是固定常數、沒有對外註冊新語系的 API。本套件完全不修改核心檔案，改在瀏覽端對 `LocaleRuntime` 實例做**防呆擴充**：

1. 把 `zh-TW` 加入語系快照（語言列可選）。
2. 查詢鏈在 zh-TW 下變成「明確 zh-TW → zh 簡轉繁 → en」——任何命名空間只要有小字典就有繁體，不會掉回英文。
3. 偏好改用 localStorage 持久化。
4. 繁中地區瀏覽器自動選繁體。
5. `<html lang>` 在 zh-TW 時設為 `zh-Hant-TW`。

所有步驟都包在 try/catch：**任何失敗都只會靜默降級，不會影響 dsh web 載入**。若未來核心內建 zh-TW，補丁會自動偵測並跳過。

## 相容性

- 適用於 `@deepseek-ai/dsh-client-locale@0.1.1-rc.2` 系列的 LocaleRuntime 結構。
- 瀏覽端 bundle 零外部依賴（不 require 任何套件），主機端零依賴，安裝到任何 profile 都不會缺套件。
- 簡轉繁採用台灣用語（設定/儲存/搜尋/載入/訊息/外掛程式/資料夾/檔案/快取/金鑰/逾時/唯讀…），共 89 組片語 + 389 字元對照。

## 授權

MIT
