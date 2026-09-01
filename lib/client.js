window.__ModuleLoader__.load({
	id: "dsh-locale-zh-tw",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const TRADITIONAL_TERMS = [
			["临时文件", "暫存檔案"],
			["设置文档", "設定文件"],
			["设置文件", "設定檔"],
			["配置文件", "設定檔"],
			["后台任务", "背景任務"],
			["内容块", "內容區塊"],
			["退出码", "結束代碼"],
			["工具栏", "工具列"],
			["工具行", "工具列"],
			["工作流", "工作流程"],
			["后台", "背景"],
			["设置", "設定"],
			["配置", "設定"],
			["保存", "儲存"],
			["存储", "儲存"],
			["搜索", "搜尋"],
			["加载", "載入"],
			["消息", "訊息"],
			["信号", "訊號"],
			["信息", "資訊"],
			["文件夹", "資料夾"],
			["文件", "檔案"],
			["窗口", "視窗"],
			["用户", "使用者"],
			["默认", "預設"],
			["预设", "預設"],
			["缺省", "預設"],
			["插件", "外掛程式"],
			["审批", "審核"],
			["归档", "封存"],
			["会话", "對話"],
			["支持", "支援"],
			["调用", "呼叫"],
			["访问", "存取"],
			["获取", "取得"],
			["查看", "檢視"],
			["视图", "檢視"],
			["界面", "介面"],
			["接口", "介面"],
			["地址", "位址"],
			["字段", "欄位"],
			["协议", "協定"],
			["密钥", "金鑰"],
			["认证", "驗證"],
			["鉴权", "驗證"],
			["适配器", "轉接器"],
			["缓存", "快取"],
			["分辨率", "解析度"],
			["滚动", "捲動"],
			["拖动", "拖曳"],
			["反馈", "回饋"],
			["导出", "匯出"],
			["循环", "迴圈"],
			["终端", "終端機"],
			["卸载", "解除安裝"],
			["内置", "內建"],
			["派生", "衍生"],
			["凭据", "憑證"],
			["凭证", "憑證"],
			["程序", "程式"],
			["通过", "透過"],
			["应用", "套用"],
			["字符", "字元"],
			["字节", "位元組"],
			["超时", "逾時"],
			["标识符", "識別碼"],
			["连字符", "連字號"],
			["计划", "計畫"],
			["自定义", "自訂"],
			["注册", "註冊"],
			["恢复", "恢復"],
			["复制", "複製"],
			["重命名", "重新命名"],
			["创建", "建立"],
			["新建", "新增"],
			["添加", "新增"],
			["文档", "文件"],
			["启用", "啟用"],
			["激活", "啟用"],
			["运行中", "執行中"],
			["运行时", "執行階段"],
			["运行", "執行"],
			["打开", "開啟"],
			["发送", "傳送"],
			["发消息", "傳訊息"],
			["只读", "唯讀"],
			["刷新", "重新整理"],
			["回到底部", "回到最底部"]
		].sort((a, b) => b[0].length - a[0].length);
		/** Per-character simplified→traditional mapping (Taiwan forms). */
				const SIMPLIFIED_TO_TRADITIONAL = {
			"个": "個", "为": "為", "与": "與", "专": "專", "东": "東", "丝": "絲",
			"丢": "丟", "丰": "豐", "临": "臨", "乐": "樂", "乡": "鄉", "书": "書",
			"买": "買", "乱": "亂", "争": "爭", "亏": "虧", "云": "雲", "亚": "亞",
			"亩": "畝", "亲": "親", "亿": "億", "仅": "僅", "从": "從", "仑": "侖",
			"仓": "倉", "们": "們", "价": "價", "众": "眾", "优": "優", "会": "會",
			"伟": "偉", "传": "傳", "伪": "偽", "伤": "傷", "体": "體", "余": "餘",
			"侧": "側", "侦": "偵", "儿": "兒", "兑": "兌", "关": "關", "兴": "興",
			"养": "養", "兽": "獸", "内": "內", "冈": "岡", "军": "軍", "农": "農",
			"冯": "馮", "冲": "衝", "决": "決", "况": "況", "净": "淨", "减": "減",
			"凑": "湊", "几": "幾", "凤": "鳳", "凭": "憑", "凯": "凱", "击": "擊",
			"别": "別", "删": "刪", "剂": "劑", "剑": "劍", "剧": "劇", "刚": "剛",
			"创": "創", "办": "辦", "务": "務", "动": "動", "劳": "勞", "势": "勢",
			"劝": "勸", "区": "區", "医": "醫", "单": "單", "卖": "賣", "协": "協",
			"华": "華", "卫": "衛", "却": "卻", "厂": "廠", "厅": "廳", "历": "歷",
			"压": "壓", "厌": "厭", "县": "縣", "发": "發", "变": "變", "叙": "敘",
			"叶": "葉", "号": "號", "吗": "嗎", "听": "聽", "启": "啟", "员": "員",
			"响": "響", "问": "問", "团": "團", "图": "圖", "场": "場", "坏": "壞",
			"块": "塊", "坚": "堅", "坛": "壇", "坝": "壩", "坟": "墳", "执": "執",
			"扩": "擴", "扫": "掃", "扬": "揚", "拟": "擬", "择": "擇", "挂": "掛",
			"挡": "擋", "挤": "擠", "挥": "揮", "损": "損", "换": "換", "据": "據",
			"摄": "攝", "摆": "擺", "携": "攜", "断": "斷", "无": "無", "时": "時",
			"显": "顯", "晒": "曬", "暂": "暫", "术": "術", "机": "機", "权": "權",
			"杀": "殺", "杂": "雜", "条": "條", "来": "來", "杨": "楊", "极": "極",
			"构": "構", "标": "標", "样": "樣", "档": "檔", "检": "檢", "楼": "樓",
			"梦": "夢", "欢": "歡", "归": "歸", "气": "氣", "汇": "匯", "沟": "溝",
			"状": "狀", "现": "現", "画": "畫", "异": "異", "当": "當", "疗": "療",
			"盘": "盤", "着": "著", "码": "碼", "矿": "礦", "础": "礎", "确": "確",
			"碍": "礙", "视": "視", "祷": "禱", "离": "離", "种": "種", "称": "稱",
			"稳": "穩", "穷": "窮", "竖": "豎", "竞": "競", "笔": "筆", "简": "簡",
			"类": "類", "级": "級", "纪": "紀", "约": "約", "组": "組", "细": "細",
			"终": "終", "经": "經", "结": "結", "绝": "絕", "统": "統", "继": "繼",
			"绩": "績", "绪": "緒", "续": "續", "绳": "繩", "维": "維", "网": "網",
			"罗": "羅", "义": "義", "习": "習", "联": "聯", "职": "職", "胜": "勝",
			"脑": "腦", "艺": "藝", "获": "獲", "处": "處", "虽": "雖", "补": "補",
			"装": "裝", "里": "裡", "见": "見", "规": "規", "览": "覽", "观": "觀",
			"触": "觸", "计": "計", "订": "訂", "认": "認", "讨": "討", "让": "讓",
			"训": "訓", "议": "議", "讯": "訊", "记": "記", "讲": "講", "许": "許",
			"设": "設", "访": "訪", "证": "證", "评": "評", "识": "識", "词": "詞",
			"试": "試", "询": "詢", "话": "話", "该": "該", "详": "詳", "语": "語",
			"误": "誤", "说": "說", "请": "請", "读": "讀", "课": "課", "谁": "誰",
			"调": "調", "谈": "談", "谋": "謀", "谢": "謝", "谦": "謙", "负": "負",
			"贡": "貢", "财": "財", "责": "責", "货": "貨", "质": "質", "费": "費",
			"资": "資", "赖": "賴", "赞": "贊", "赠": "贈", "跃": "躍", "踪": "蹤",
			"车": "車", "轨": "軌", "软": "軟", "载": "載", "输": "輸", "辞": "辭",
			"边": "邊", "达": "達", "过": "過", "运": "運", "还": "還", "这": "這",
			"进": "進", "远": "遠", "违": "違", "连": "連", "迟": "遲", "迹": "跡",
			"选": "選", "适": "適", "递": "遞", "针": "針", "钟": "鐘", "钢": "鋼",
			"错": "錯", "录": "錄", "长": "長", "门": "門", "闭": "閉", "间": "間",
			"闲": "閒", "闹": "鬧", "闻": "聞", "阅": "閱", "队": "隊", "阶": "階",
			"阳": "陽", "阴": "陰", "阵": "陣", "际": "際", "陆": "陸", "险": "險",
			"随": "隨", "隐": "隱", "难": "難", "电": "電", "顶": "頂", "项": "項",
			"顺": "順", "须": "須", "预": "預", "领": "領", "频": "頻", "题": "題",
			"额": "額", "风": "風", "飞": "飛", "马": "馬", "验": "驗", "惊": "驚",
			"鱼": "魚", "鸟": "鳥", "麦": "麥", "齐": "齊", "齿": "齒", "龙": "龍",
			"龟": "龜", "币": "幣", "师": "師", "应": "應", "废": "廢", "开": "開",
			"弃": "棄", "张": "張", "导": "導", "尽": "盡", "层": "層", "复": "複",
			"划": "劃", "于": "於", "万": "萬", "数": "數", "后": "後", "备": "備",
			"产": "產", "两": "兩", "业": "業", "举": "舉", "丽": "麗", "败": "敗",
			"缩": "縮", "键": "鍵", "点": "點", "编": "編", "栏": "欄", "审": "審",
			"态": "態", "馈": "饋", "钥": "鑰", "实": "實", "双": "雙", "帮": "幫",
			"盖": "蓋", "径": "徑", "转": "轉", "节": "節", "缓": "緩", "宽": "寬",
			"页": "頁", "总": "總", "骤": "驟", "愿": "願", "筛": "篩", "给": "給",
			"册": "冊", "户": "戶", "浅": "淺", "荐": "薦", "浏": "瀏", "范": "範",
			"围": "圍", "准": "準", "轮": "輪", "环": "環", "将": "將", "写": "寫",
			"头": "頭", "线": "線", "储": "儲", "则": "則", "并": "並"
		};;
		/**
		* Convert one Simplified Chinese string to Taiwan-traditional Chinese.
		* @param input - the source string (usually a zh dictionary value).
		* @returns the converted string.
		*/
		function toTraditional(input) {
			let result = "";
			let index = 0;
			outer: while (index < input.length) {
				for (const [source, target] of TRADITIONAL_TERMS) {
					if (input.startsWith(source, index)) {
						result += target;
						index += source.length;
						continue outer;
					}
				}
				const char = input[index];
				result += SIMPLIFIED_TO_TRADITIONAL[char] ?? char;
				index += 1;
			}
			return result;
		}
		

		//#region zh-TW locale patch
		/**
		* dsh-locale-zh-tw — 讓 DSH Web 介面支援繁體中文（台灣）的瀏覽端補丁。
		*
		* 核心的 @deepseek-ai/dsh-client-locale 只內建 zh / en 兩種語系，語系清單
		* 是固定常數，也沒有任何對外註冊新語系的 API。這個套件在瀏覽端對
		* LocaleRuntime 實例做最小的、防呆的擴充（不修改任何核心檔案）：
		*   1. 把 zh-TW 加入可選擇的語系清單（快照層擴充）；
		*   2. 查詢鏈在 zh-TW 下改為「明確 zh-TW → zh 簡轉繁 → en」；
		*   3. 語言偏好改用 localStorage 持久化（主機端 schema 只認 zh/en）；
		*   4. 繁中地區（zh-TW / zh-Hant / zh-HK / zh-MO）瀏覽器自動選繁體；
		*   5. <html lang> 在 zh-TW 時設為 zh-Hant-TW。
		*
		* 所有步驟都包在 try/catch 裡：任何失敗都只會靜默降級，絕不影響
		* dsh web 載入。若核心已內建 zh-TW（升級後），補丁自動偵測並跳過。
		*/
		const LOCALE_STORAGE_KEY = "dsh.locale.preference";
		const LANG_TAG = "zh-Hant-TW";
		const ZH_TW_LOCALE = { id: "zh-TW", label: "繁體中文" };
		/** 主機端 schema 只接受 zh/en；這裡用 localStorage 記住使用者選擇。 */
		function readStoredLocale() {
			try {
				return window.localStorage.getItem(LOCALE_STORAGE_KEY) || "";
			} catch (error) {
				return "";
			}
		}
		function writeStoredLocale(id) {
			try {
				window.localStorage.setItem(LOCALE_STORAGE_KEY, id);
			} catch (error) {
				/* 隱私模式等環境下 localStorage 不可用：忽略 */
			}
		}
		/** 繁中地區瀏覽器偵測（與核心的 primary-subtag 偵測互補）。 */
		function detectTraditionalBrowser() {
			try {
				if (typeof window === "undefined" || typeof navigator === "undefined") return false;
				for (const tag of [...navigator.languages ?? [], navigator.language]) {
					const lower = String(tag || "").toLowerCase();
					if (lower === "zh-tw" || lower === "zh-hk" || lower === "zh-mo" || lower.startsWith("zh-hant")) return true;
					if (lower === "zh-cn" || lower === "zh-sg" || lower.startsWith("zh-hans")) return false;
				}
			} catch (error) {
				/* 忽略 */
			}
			return false;
		}
		/** 需要的服務：核心語言套件（補丁只依附它）。 */
		const inject = ["locale"];
		/**
		* 套件主體：對 LocaleRuntime 做防呆擴充。全程 try/catch，
		* 失敗時靜默降級，不影響 dsh web 載入。
		* @param ctx - 瀏覽端 cordis context。
		*/
		function apply(ctx) {
			try {
				const locale = ctx.get("locale");
				if (!locale || typeof locale.getLocale !== "function") return;
				const snapshot = () => locale.getLocale();
				const hasZhTW = () => snapshot().locales.some((entry) => entry.id === "zh-TW");

				// 1) 擴充語系清單：讓 zh-TW 變成可選擇項目（快照層），插在 zh 之後。
				if (!hasZhTW()) {
					const current = snapshot();
					const index = current.locales.findIndex((entry) => entry.id === "zh");
					const extended = [...current.locales.slice(0, index + 1), Object.freeze({ ...ZH_TW_LOCALE }), ...current.locales.slice(index + 1)];
					locale.snapshot = Object.freeze({
						...current,
						locales: Object.freeze(extended)
					});
					// 通知所有語系消費者（Language 列、LocaleFace）清單已更新。
					locale.publish(locale.snapshot.active, true);
				}

				// 2) zh-TW 查詢鏈：明確 zh-TW → zh 簡轉繁 → en。
				if (typeof locale.lookup === "function" && locale.lookup.__zhTwPatched !== true) {
					const originalLookup = locale.lookup.bind(locale);
					const patchedLookup = function lookup(ns, key) {
						if (locale.getLocale().active === "zh-TW") {
							const locales = locale.dicts.get(ns);
							const direct = locales?.get("zh-TW")?.[key];
							if (direct !== void 0) return direct;
							const simplified = locales?.get("zh")?.[key];
							if (simplified !== void 0) return toTraditional(simplified);
							const english = locales?.get("en")?.[key];
							if (english !== void 0) return english;
							return void 0;
						}
						return originalLookup(ns, key);
					};
					patchedLookup.__zhTwPatched = true;
					locale.lookup = patchedLookup;
				}

				// 3) setLocale：照常 publish + 主機端寫入，另加 localStorage 持久化。
				if (typeof locale.setLocale === "function" && locale.setLocale.__zhTwPatched !== true) {
					const originalSetLocale = locale.setLocale.bind(locale);
					const patchedSetLocale = function setLocale(id) {
						const match = locale.getLocale().locales.find((entry) => entry.id === id);
						if (match === void 0) throw new Error(`locale "${id}" is not registered`);
						if (locale.getLocale().active !== match.id) locale.publish(match.id, true);
						writeStoredLocale(match.id);
						try {
							locale.host?.set("preference", match.id);
						} catch (error) {
							/* zh-TW 會被主機 schema 溫和拒絕：忽略 */
						}
					};
					patchedSetLocale.__zhTwPatched = true;
					locale.setLocale = patchedSetLocale;
				}

				// 4) <html lang>：zh-TW → zh-Hant-TW（核心的 DOCUMENT_LANGUAGE 沒有這個鍵，
				//    補丁監聽器註冊在核心之後，會覆蓋它設的 undefined）。
				ctx.on("locale/change", (changed) => {
					try {
						if (changed.active === "zh-TW" && typeof document !== "undefined") {
							document.documentElement.lang = LANG_TAG;
						}
					} catch (error) {
						/* 忽略 */
					}
				});

				// 5) 起始狀態：先還原上次選擇，否則按瀏覽器語言自動判斷。
				const stored = readStoredLocale();
				if (stored && snapshot().locales.some((entry) => entry.id === stored)) {
					if (snapshot().active !== stored) locale.setLocale(stored);
				} else if (detectTraditionalBrowser() && snapshot().active === "zh") {
					locale.setLocale("zh-TW");
				}
			} catch (error) {
				// 語言包絕不允許破壞 dsh web：失敗即靜默降級。
				console.warn("dsh-locale-zh-tw:", error);
			}
		}
		//#endregion

		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
