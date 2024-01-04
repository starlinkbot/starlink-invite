const { override, addBabelPlugins, fixBabelImports, addLessLoader, addWebpackAlias } = require('customize-cra')
const path = require("path")
module.exports = override(
	fixBabelImports("import", {
		libraryName: "antd",
		libraryDirectory: "es",
		style: true,
	}),
	addBabelPlugins([
		"@babel/plugin-proposal-decorators", {
			"legacy": true
		}
	]),
	addLessLoader({
		javascriptEnabled: true
	}),
	addWebpackAlias({
		"@": path.resolve(__dirname, "src")
	}),
	(config) => {
		return config
	}
)