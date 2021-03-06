module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: 3,
        modules: false,
      },
    ],
	],
	plugins: [
		"@babel/plugin-proposal-class-properties"
	],
  sourceType: "unambiguous",
};
