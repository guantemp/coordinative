class Setting {
	constructor(
		appName
	) {
		this._appName = appName; // 应用名称
	}
	get appName() {
		return this._appName;
	}
}
export default new Setting(
	"HOPRXI协助工具"
}
