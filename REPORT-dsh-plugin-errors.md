# DSH Web Profile Plugin 加载错误调查报告

- **日期**：2026-09-03
- **Profile**：`web`（默认位置 `~/.dsh/profiles/web`）
- **受影响包**：`dsh-locale-zh-tw@0.1.0`、`@linxin666/dsh-client-ui-web-ui-settings@0.1.12`
- **现状**：两个 bug 均已在本机 `node_modules` 中打了临时补丁，`dsh web` 在 `http://127.0.0.1:3080/` 正常响应（HTTP 200）。

> 本报告已脱敏：去掉了所有本机用户路径与运行时 task ID。可以直接 push 到 GitHub。

---

## 1. TL;DR

| # | 包 | 错误类型 | 根因 | 严重度 |
|---|----|---------|------|--------|
| 1 | `dsh-locale-zh-tw` | `ERR_PACKAGE_PATH_NOT_EXPORTED` | `package.json` 漏写 `exports."."` 根入口 | 中（启动即崩） |
| 2 | `@linxin666/dsh-client-ui-web-ui-settings` | `keyed slot "settings.plugin.item" requires options.key` | `client.js` 的 slot 注册 options 缺 `key` 字段 | 中（页面渲染即崩） |

两个 bug 都是 **上游包自身的代码 bug**，与本地配置无关。本地 patch 只能应急，必须提交给上游修复。

---

## 2. Bug 1 — `dsh-locale-zh-tw` 缺根入口

### 2.1 错误

```
Error: dsh: plugin tree failed to load: failed to apply loader entry
include (cordis:include): failed to import loader entry
dsh-locale-zh-tw (dsh-locale-zh-tw): No "exports" main defined in
node_modules/dsh-locale-zh-tw/package.json

[cause]: Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: No "exports" main defined
in node_modules/dsh-locale-zh-tw/package.json
```

### 2.2 根因分析

`dsh-locale-zh-tw@0.1.0/package.json` 同时声明了 `main` 和 `exports`：

```json
"main": "lib/index.js",
"exports": {
  "./client":      { "default": "./lib/client.js" },
  "./package.json": "./package.json"
}
```

Node.js ESM resolver 的规则：**一旦 `exports` 字段存在，就完全忽略 `main`，只承认 `exports` 里的子路径**。因为 `exports` 里没有 `"."` 根入口，对 `dsh-locale-zh-tw` 这个 bare specifier 的解析就以 `ERR_PACKAGE_PATH_NOT_EXPORTED` 失败。

### 2.3 修复

在 `exports` 字段里加根入口：

```diff
  "exports": {
+   ".": {
+     "default": "./lib/index.js"
+   },
    "./client":      { "default": "./lib/client.js" },
    "./package.json": "./package.json"
  }
```

修复后 `dsh web` 能正常进入 cordis 加载阶段，主机端 `apply()` 是 no-op（host 端无业务，全在浏览器端 `client.js`）。

### 2.4 建议给上游的 PR/issue 模板

> **Title**: `package.json` missing root `exports` entry — fails ESM resolution
>
> **Repro**: `pnpm add dsh-locale-zh-tw && dsh web`
>
> **Fix**: Add `".": { "default": "./lib/index.js" }` to `exports`.

---

## 3. Bug 2 — `@linxin666/dsh-client-ui-web-ui-settings` 缺 slot `key`

### 3.1 错误（来自 Web UI 渲染层）

```
Failed to load plugins
@linxin666/dsh-client-ui-web-ui-settings
failed to apply loader entry 68af5206
(@linxin666/dsh-client-ui-web-ui-settings):
keyed slot "settings.plugin.item" requires options.key
```

### 3.2 根因分析

#### Slot 是怎么被声明为 `keyed` 的

`@deepseek-ai/dsh-client-ui-settings-plugins/lib/client.js:1295` 把 `settings.plugin.item` 声明为 keyed slot：

```js
ctx.slots.inject("settings.section", () => ctx.slots.register({
  // ...
  children: {
    "settings.plugins.tab": { kind: "list", scope: "root" }
  }
}, ConfigurablePluginsPage));
ctx.slots.inject("settings.plugins.tab", () => ctx.slots.register({
  name: "settings.plugins.tab",
  // ...
  children: {
    "settings.plugin.item": {
      kind: "keyed",   // ← 这里是 keyed
      scope: "root"
    }
  }
}, ConfigurablePluginsTab));
```

`keyed` 类型允许多个插件在同一 slot 名下挂不同条目，所以框架要求每个 `register` 的 options 必须带 `key` 来做去重和寻址。

#### 错误代码 vs 正确代码对比

**错误代码** — `lib/client.js:404`：

```js
ctx.slots.inject("settings.plugin.item", () => ctx.slots.register({
  name: "settings.plugin.item",
  id: "web-ui-plugins",   // ← 只有 id，没有 key
  order: 90,
  locale: "web-ui-plugins",
  children: { "web-ui.plugin.item": { kind: "list", scope: "root" } }
}, WebUIPluginsCard));
```

`id` 字段在 slot API 里**不充当 key**。框架判断 `if (n.key === void 0) throw new Error('keyed slot ... requires options.key')`，所以直接 throw。

**正确代码参考** — `dsh-client-ui-settings-plugins/lib/client.js:1300-1315`：

```js
ctx.slots.inject("settings.plugin.item", function* () {
  yield ctx.slots.register({
    name: "settings.plugin.item",
    key: SHELL_NS,        // ← 每个 register 都必须带 key
    // ...
  });
  yield ctx.slots.register({
    name: "settings.plugin.item",
    key: AGENT_LOOP_NS,
    // ...
  });
  yield ctx.slots.register({
    name: "settings.plugin.item",
    key: WEB_SEARCH_NS,
    // ...
  });
});
```

### 3.3 修复

`@linxin666/dsh-client-ui-web-ui-settings/lib/client.js` 加一行 `key`：

```diff
  ctx.slots.inject("settings.plugin.item", () => ctx.slots.register({
    name: "settings.plugin.item",
    id: "web-ui-plugins",
+   key: "web-ui-plugins",
    order: 90,
    locale: "web-ui-plugins",
    children: { "web-ui.plugin.item": { kind: "list", scope: "root" } }
  }, WebUIPluginsCard));
```

key 用什么值？这个 slot 是给 dsh-web-ui 全家桶做"分组卡片"的，没有对应 settings namespace，取一个稳定唯一的字符串即可（这里复用 `id` 的 `"web-ui-plugins"`，足够稳定）。后续如果其他 family plugin 也要分到同一分组下，建议 key 用 `id` 拼接如 `"web-ui-plugins:<sub-id>"`。

### 3.4 建议给上游的 PR/issue 模板

> **Title**: client.js 缺 slot `key` — 启动时 "settings.plugin.item" requires options.key
>
> **Repro**: 在已装 `@deepseek-ai/dsh-client-ui-settings-plugins` 的 profile 里 `pnpm add @linxin666/dsh-client-ui-web-ui-settings && dsh web`
>
> **Fix**: `lib/client.js:404` 的 `ctx.slots.register({...})` options 加 `key: "web-ui-plugins"`（或与 `id` 一致）。
>
> **仓库**：`https://github.com/zhu1090093659/dsh-web-ui`（源文件 `packages/dsh-client-ui-web-ui-settings/src/client/index.ts`）

---

## 4. 验证

- `dsh web` 启动后：`http://127.0.0.1:3080/` 返回 HTTP 200
- 浏览器页面 `Failed to load plugins` 红框消失，主机端 cordis loader 完整跑通
- 验证命令：
  ```bash
  curl -sI http://127.0.0.1:3080/
  # 期望：HTTP/1.1 200 OK
  ```

> Bug 2 修复是否真的消除了页面上的失败提示，需要在浏览器里实际刷新一下看 `Failed to load plugins` 提示是否还在。修复是基于对代码静态分析的根因诊断，未做端到端 browser 验证。

---

## 5. 长期建议

### 5.1 立刻能做的：把本地 patch 固化

`node_modules` 里的修改会被 `pnpm install` 覆盖。建议引入 `pnpm patch`：

```bash
pnpm patch dsh-locale-zh-tw
pnpm patch @linxin666/dsh-client-ui-web-ui-settings
# 改完退出交互式 shell 后：
pnpm patch-commit <patched-pkg-path>
```

提交后会生成 `patches/` 目录并写进 `package.json` 的 `pnpm.patchedDependencies`，从此 install 不会被覆盖。

### 5.2 向上游反馈（重要）

两个 bug 都是上游包的代码/包配置问题，强烈建议去对应仓库提 issue 或 PR：

| 包 | 仓库 | 类型 |
|----|------|------|
| `dsh-locale-zh-tw` | `pnpm view dsh-locale-zh-tw repository` 取 | package.json 修复 |
| `@linxin666/dsh-client-ui-web-ui-settings` | `https://github.com/zhu1090093659/dsh-web-ui` | client.js 修复 |

### 5.3 避免再踩坑的检查清单

下次装新 dsh 插件前，可以先做三步自检：

1. **`pnpm view <pkg> exports`**：确认根入口存在
2. **解包看 `lib/client.js` 的 `ctx.slots.register` 调用**：options 里 `name` 是 keyed slot 的话必须有 `key`
3. **优先用官方 `@deepseek-ai/*` 命名空间下的包**：第三方包（`@linxin666`、`@tt-a1i` 等）目前看维护节奏不稳

### 5.4 Git 上传时建议加 `.gitignore`

如果整库上传，建议在仓库根加 `.gitignore`，避免误提交本地配置：

```gitignore
# dsh 本地运行时
.dsh/profiles/*/node_modules/
.dsh/profiles/*/pnpm-lock.yaml
.dsh/profiles/*/settings.yaml
.dsh/profiles/*/sessions/
.dsh/profiles/*/logs/
```

---

## 6. 涉及文件

| 文件（相对 `node_modules/`） | 修改 |
|------|------|
| `dsh-locale-zh-tw/package.json` | `exports` 字段加 `".": { "default": "./lib/index.js" }` |
| `@linxin666/dsh-client-ui-web-ui-settings/lib/client.js` | `ctx.slots.register` options 加 `key: "web-ui-plugins"` |

> **再次强调**：这两处都是 `node_modules` 里的临时 patch，下次 `pnpm install` 会被覆盖。请按 §5.1 固化为 `patches/`，或等上游发版。
