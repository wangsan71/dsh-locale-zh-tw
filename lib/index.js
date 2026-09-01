/**
 * @module dsh-locale-zh-tw — host half.
 *
 * 主機端沒有需要做的事：整個繁體中文支援都在瀏覽端（lib/client.js）。
 * 這個 plugin row 存在只是為了讓 loader 啟用本套件的 entry（entry 有
 * fiber 後，瀏覽端的 client-modules 才會掃描並組合本套件的 client
 * bundle）。保持零依賴，安裝在任何 profile 都不會缺套件。
 */

/** Stable Cordis plugin name. */
const name = "dsh-locale-zh-tw";

/** Services required before the plugin can mount. */
const inject = [];

/**
 * Host half: nothing to host. The row exists so the loader activates the
 * entry, which lets the browser client-modules compose this package's
 * client bundle (the zh-TW locale patch lives entirely in the browser).
 * @param ctx - plugin context.
 */
function apply(ctx) {}

export { apply, inject, name };
