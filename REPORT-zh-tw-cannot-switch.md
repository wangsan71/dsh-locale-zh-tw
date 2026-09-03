# 繁體中文「切換無效」排查與修復報告

- **日期**：2026-02-10
- **版本**：0.1.1
- **现象**：安裝 0.1.0 且啟動錯誤（見 `REPORT-dsh-plugin-errors.md`）修復後，設定 → 一般 → 語言 里選「繁體中文」**切不過去**——要麼界面閃一下立刻彈回簡體，要麼刷新後 localStorage 的記憶不生效。
- **結論**：插件代碼沒有報錯，zh-TW 的選擇被 DSH 核心的「主機設置回退」機制**每次都在異步層面蓋掉**。這是設計層面的衝突，不是語法 / 運行時錯誤。

---

## 1. 涉及的核心代碼（均為只讀參照，未改動）

| 角色 | 位置 |
|---|---|
| 核心語言運行時 `LocaleRuntime` | `@deepseek-ai/dsh-client-locale/lib/client.js` |
| 核心主機端 settings schema | `@deepseek-ai/dsh-client-locale/lib/index.js` |
| 設置傳輸 / 失敗恢復 | `@deepseek-ai/dsh-client-ui-settings/lib/client.js` |
| 快照存儲（通知不短路） | `@deepseek-ai/dsh-client-runtime/lib/client.js` `createSnapshotStore` |

## 2. 排查過程

1. **確認掛載鏈路完好**（排除「插件根本沒跑」）：profile 的 `package.json` 依賴與 bundles、插件 `cordis.patch.yml`、首頁 `__DSH_BOOT__` 圖中本包的行（`inject: ["@deepseek-ai/dsh-client-locale"], immediately: true`）、`GET /plugins/dsh-locale-zh-tw/client.js` 返回 200 —— 全部正常。
2. **核對補丁假設的每個觸點**：`snapshot` / `publish` / `lookup` / `setLocale` / `dicts` / `host` 在核心 0.1.1-rc.2 裡都存在且語義吻合。
3. **追异步行為**，定位到回退鏈：
   - 主機端註冊的 locale schema：`preference: union("zh" | "en")` —— **zh-TW 是非法值**；
   - `SettingsScopeController.write()`：寫失敗 → `recover()` → `mirror.load()` 重載設置；
   - `LocaleRuntime` 構造時訂閱了該 scope，任何重載完成都觸發 `adopt()`：

   ```js
   adopt(host) {
     const section = host.getSnapshot().value;
     if (section === void 0) return;
     const target = section.preference ?? this.provisional; // zh-TW 被拒 → 讀到舊值/無值 → "zh"
     if (this.snapshot.active === target) return;
     this.publish(target, true);                            // ← 把 zh-TW 打回 zh
   }
   ```

   - `createSnapshotStore.update` 用 `setState(replace)` **不做相等性短路**，值沒變也通知訂閱者，所以 `adopt` 被觸發的時機無處不在（首次同步、任意命名空間寫失敗的恢復等）。

## 3. 根因

0.1.0 切 zh-TW 的時序是：**publish(zh-TW) → 寫 localStorage → 寫主機 preference="zh-TW"**。第三步必然失敗（schema 只認 zh/en），失敗觸發恢復重載，重載觸發 `adopt()` 把語言 publish 回 zh：

- 用戶視角：點「繁體中文」→ 界面閃一下變回簡體 → 「換不了繁體」；
- 刷新視角：localStorage 恢復 zh-TW 後，第一次主機設置同步到達，同樣被 `adopt()` 蓋回 zh。

## 4. 修復（0.1.1，均在瀏覽端補丁 `lib/client.js` 內）

### 4.1 新增 `publish` 守衛（apply 最前）

`publish()` 是核心快照變更為數唯一的出口，在此攔截：只要瀏覽器端偏好是 zh-TW，任何想把界面回退到 zh/en 的 publish 都在**快照落地前**被改寫回 zh-TW，連瞬間閃回簡體都不會有。

### 4.2 重排 `setLocale`

- **先**把偏好寫進 localStorage，**再** publish（守衛讀到新值才擋得住回退）；
- zh-TW **完全不寫主機**（寫了必被拒、還觸發恢復重載 → adopt 回退）；zh / en 照常走核心持久化。

反向切換不受影響：選「簡體中文」或 English 時，localStorage 先更新為 `zh`/`en`，守衛即失效，恢復核心正常行為。

### 4.3 安全性

- 沿用既有實例層防呆模式：`__zhTwPatched` 冪等標記、整體 try/catch、失敗靜默降級；
- 不修改任何核心文件、不新增依賴；未來核心原生支持 zh-TW 時守衛自動跳過；
- 主機設置裡殘留的舊 `locale.preference`（zh/en）照常工作。

## 5. 驗證

- `node --check lib/client.js` 通過；
- `GET /plugins/dsh-locale-zh-tw/client.js` 200 且已含守衛代碼（bundle 實時從磁盤讀取、`cache-control: no-cache`，**不需要重啟 dsh web**，刷新頁面即生效）；
- 刷新後：設定 → 一般 → 語言 → 繁體中文，保持繁體且重啟/刷新記住。

## 6. 持久化語義（已知代價）

zh-TW 偏好存在瀏覽器 localStorage（鍵 `dsh.locale.preference`），**按瀏覽器生效**；換瀏覽器或清站點數據後需重選一次。這是繞開主機 schema 限制的固有代價。長期正解是推動核心在 locale schema 放行 `zh-TW`（或提供語系註冊 API），屆時守衛可整體退役。
